import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import NavItems from './NavItems'
import MobileNav from './MobileNav'



function Header() {
  return (
    <header className='w-full border-b'>
        <div className="wrapper flex items-center justify-between">
            <Link href="/" className='w-36'>
            <Image src="/assets/images/logo.svg" height={38} width={128} alt='logo'/>
            </Link>
            <SignedIn>
                <nav className='hidden md:flex w-full max-w-xs'>
                    <NavItems/>
            </nav> 
            </SignedIn>
            
        <div className="flex w-32 justify-end gap-3">
            <SignedIn>
                <UserButton afterSignOutUrl='/'/>                
                    <MobileNav/>
            </SignedIn>
            <SignedOut>
                <Button asChild className='rounded-full' size={'lg'}>
                    <Link href="/sign-up">Log-In</Link>
                </Button>
            </SignedOut>
        </div>
        </div>
    </header>
  )
}

export default Header