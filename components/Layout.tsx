import { NextComponentType, NextPageContext } from 'next'
import React, { Children } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-100 h-min-screen">
      <Navbar />
        {children}
      <Footer />
    </div>
  )
}
