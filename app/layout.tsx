import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Input } from '@/components/ui/input'
import { MainNav } from '@/components/gen/main-nav'
import { UserNavMenu } from '@/components/gen/user-nav-menu'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My forum',
  description: 'Another forum app',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
            <UserNavMenu />
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px]"
            /> 
            </div>
          </div>
        </div> 
        </>
        <div className='md:container md:mx-auto'>
          {children}
        </div>
      
      <Toaster />
      </body>
    </html>
  )
}
