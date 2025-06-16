import type { Metadata } from 'next'
import './globals.css'
import { UserProvider } from '@/context/userContext'

export const metadata: Metadata = {
  title: 'Crime Aabo',
  description: 'Created with Crime Aabo',
  generator: 'Crime Aabo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
       <UserProvider>
      <body>{children}</body>
      </UserProvider>
    </html>
  )
}
