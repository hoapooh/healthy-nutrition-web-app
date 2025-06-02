"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Melissa Wright",
    role: "RawOrganic Customer",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Cras tempor fringilla leo. Phasellus blandit nunc nec rhoncus facilisis. Nullam finibus neque non cursus scelerisque. Pellentesque fermentum, eros quis volutpat tempus, mauris dolor vehicula libero, a suscipit eros erat viverra magna. Donec rhoncus, dolor et aliquam imperdiet, odio nulla fermentum elit, sed venenatis nunc enim a quam.",
  },
  {
    id: 2,
    name: "John Smith",
    role: "RawOrganic Customer",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "Amazing quality products and excellent customer service. I've been ordering from RawOrganic for over a year now and they never disappoint. The organic vegetables are always fresh and the delivery is super fast.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "RawOrganic Customer",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The best organic food supplier I've found. Their range of products is incredible and everything tastes so much better than supermarket alternatives. Highly recommend to anyone looking for quality organic food.",
  },
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">What They Think</h2>
          <p className="text-green-600 font-medium">Our customers are awesome!</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Customer Images */}
          <div className="flex justify-center gap-4 mb-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all ${
                  index === currentTestimonial ? "border-green-600 scale-110" : "border-gray-300"
                }`}
              >
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Testimonial Content */}
          <div className="text-center relative">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="max-w-2xl">
                <p className="text-gray-600 text-lg leading-relaxed mb-6">{testimonials[currentTestimonial].content}</p>
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-green-600 font-medium">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
