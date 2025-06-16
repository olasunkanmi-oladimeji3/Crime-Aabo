"use client";
import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface UserTable {
  id: string;
  email: string;
  user_type: string;
    created_at: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    is_verified: boolean;
    is_active: boolean;
    agreeToTerms: boolean;

}
// ✅ Fix: Properly type the context value
interface UserContextType {
  login: (
    email: string,
    password: string
  ) => Promise<{
    success: boolean;
    message: string;
    userType?: string;
    userId?: string;
  }>;
  logout: () => void;
  user: UserTable | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ✅ Fix: Initial null context value
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserTable | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  // ✅ Session restoration
  useEffect(() => {
    const restoreSession = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getUser();
      const userId = data?.user?.id;

      if (userId) {
        setIsAuthenticated(true);

        const { data: userInfo } = await supabase
          .from("users")
          .select("*")
          .eq("id", userId)
          .single();

        if (userInfo) {
          setUser(userInfo);
        } else {
          router.push("/auth/login");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    };

    restoreSession();
  }, [router, supabase]);

  // ✅ Login function
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      let msg = error.message;

      if (msg.includes("invalid login credentials")) {
        msg = "Invalid email or password. Please try again.";
      } else if (msg.includes("User not confirmed")) {
        msg =
          "User not confirmed. Please check your email for confirmation link.";
      } else if (msg.includes("User not found")) {
        msg = "User not found. Please check your email.";
      } else if (msg.includes("Network error")) {
        msg = "Network error. Please check your internet connection.";
      } else if (msg.includes("Email not confirmed")) {
        msg =
          "Email not confirmed. Please check your email for confirmation link.";
      } else if (msg.includes("Invalid password")) {
        msg = "Invalid password. Please try again.";
      } else if (msg.includes("User already exists")) {
        msg = "User already exists. Please use a different email.";
      }

      return { success: false, message: msg };
    }

    if (!data.user) {
      return {
        success: false,
        message: "Login failed. No user data returned.",
      };
    }

    const { data: userInfo } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (!userInfo) {
      return { success: false, message: "User profile not found." };
    }

    setUser(userInfo);
    setIsAuthenticated(true);

    return {
      success: true,
      message: "Welcome back!",
      userType: userInfo.user_type,
      userId: userInfo.id,
    };
  };

  // ✅ Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      router.push("/auth/login");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, login, logout, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

// ✅ Hook
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
