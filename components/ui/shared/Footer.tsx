import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex flex-col items-center gap-4 p-5 
      text-center sm:flex-row sm:justify-between">
        <Link href="/">
        <Image src="/assets/images/logo.svg" 
        alt='logo' width={128} height={38}/>
        </Link>
        <p>2025 Evently all rights reserved</p>
      </div>
    </footer>
  )
}
