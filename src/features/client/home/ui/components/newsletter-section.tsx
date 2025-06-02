"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="py-12 bg-gray-50 border-t">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          {isSubscribed ? (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you for subscribing!</h3>
              <p className="text-gray-600">You'll receive our latest updates soon.</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                Enter your Email Address to Subscribe to our Newsletter and Save 10% off Your First Order!
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
                <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-900 text-white">
                  Subscribe For Free
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
