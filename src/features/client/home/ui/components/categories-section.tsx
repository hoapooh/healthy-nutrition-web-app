import Image from "next/image"
import Link from "next/link"

const categories = [
  {
    name: "Organic Fruit & Veg",
    image: "/placeholder.svg?height=200&width=300",
    href: "/categories/fruit-veg",
  },
  {
    name: "Raw Organic Meats",
    image: "/placeholder.svg?height=200&width=300",
    href: "/categories/meats",
  },
  {
    name: "Seeds & Dried Fruits",
    image: "/placeholder.svg?height=200&width=300",
    href: "/categories/seeds-fruits",
  },
  {
    name: "Healthy Snacks",
    image: "/placeholder.svg?height=200&width=300",
    href: "/categories/snacks",
  },
]

const benefits = [
  {
    title: "Live A Healthier Life",
    description:
      "Cras tempor fringilla leo. Phasellus blandit nunc nec rhoncus facilisis. Nullam finibus neque non cursus scelerisque.",
  },
  {
    title: "Home Grown Goodness",
    description:
      "Cras tempor fringilla leo. Phasellus blandit nunc nec rhoncus facilisis. Nullam finibus neque non cursus scelerisque.",
  },
  {
    title: "Chilled Courier Service",
    description:
      "Cras tempor fringilla leo. Phasellus blandit nunc nec rhoncus facilisis. Nullam finibus neque non cursus scelerisque.",
  },
  {
    title: "Fresh & Pesticide Free",
    description:
      "Cras tempor fringilla leo. Phasellus blandit nunc nec rhoncus facilisis. Nullam finibus neque non cursus scelerisque.",
  },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Why RawOrganic Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Why RawOrganic</h2>
          <p className="text-green-600 font-medium">The organic specialists</p>
        </div>

        {/* Benefits with Center Image */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Benefits */}
            <div className="space-y-8">
              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefits[0].title}</h3>
                <p className="text-gray-600">{benefits[0].description}</p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefits[2].title}</h3>
                <p className="text-gray-600">{benefits[2].description}</p>
              </div>
            </div>

            {/* Right Benefits */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefits[1].title}</h3>
                <p className="text-gray-600">{benefits[1].description}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefits[3].title}</h3>
                <p className="text-gray-600">{benefits[3].description}</p>
              </div>
            </div>
          </div>

          {/* Center Image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Fresh organic fruits and vegetables"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
