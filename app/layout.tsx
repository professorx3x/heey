import type { Metadata } from 'next'
import { Poppins, Fredoka_One } from 'next/font/google'
import './globals.css'
import React from 'react'

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const fredoka = Fredoka_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BaddieVerse 💅 — A Nimisha Experience',
  description: 'A vibe delivery system for the ultimate Baddie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${fredoka.variable}`}>
      <body className="font-poppins antialiased">{children}</body>
    </html>
  )
}
