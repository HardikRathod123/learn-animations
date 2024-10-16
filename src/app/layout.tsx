import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { cn } from '@/lib/utils'
import './globals.css'

export const metadata = {
  title: 'Learn Framer',
  description: 'Master the art of fluid animations with Framer Motion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('flex min-h-screen flex-col font-sans antialiased')}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
