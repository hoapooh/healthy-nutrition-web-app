import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center py-20" style={{ backgroundImage: "url('/vegetables.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Welcome to
              <span className="text-green-500"> RawOrganic</span>
              <br />
              Helping Live Healthy Lives
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              We offer a wide range of fresh, organic fruits and vegetables sourced directly from local farms. Enjoy the
              taste of nature and nourish your body with the best quality produce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-green-500 hover:border-green-500"
              >
                <Link href="/recipes">Browse Recipes</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=600&width=500"
              alt="Healthy lifestyle"
              width={500}
              height={600}
              className="rounded-lg shadow-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
