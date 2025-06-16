'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login({ email, password }: { email: string; password: string }) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return { error }
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

export async function signup({ firstname, lastname, email, password, phone, userType, address, agreeToTerms }: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    userType: string;
    address: string;
    agreeToTerms: boolean;
}) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        return { error }
    }

    if (data.user) {
        const { error: insertError } = await supabase
            .from('users')
            .insert({
                id: data.user.id,
                email,
                phone,
                user_type: userType,
                address,
                first_name: firstname,
                last_name: lastname,
                is_verified: false,
                is_active: true,
                agreeToTerms,
                created_at: new Date(),
            })

        if (insertError) {
            return { error: insertError }
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
export async function logout() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return { error }
    }

    revalidatePath('/', 'layout');
    redirect('/');
}