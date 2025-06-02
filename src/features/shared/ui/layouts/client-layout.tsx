import type React from "react"
import ClientHeader from "../components/client-header"
import ClientFooter from "../components/client-footer"
import CartSidebar from "../components/cart-sidebar"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ClientHeader />
      <main className="min-h-screen">{children}</main>
      <ClientFooter />
      <CartSidebar />
    </>
  )
}
