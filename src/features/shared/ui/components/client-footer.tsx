import Link from "next/link"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ClientFooter() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Search */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">RawOrganic</h3>
                <p className="text-xs text-gray-500">Natural Foods Healthy Living</p>
              </div>
            </div>
            <div className="relative">
              <Input type="search" placeholder="Search products" className="pr-10" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600">
                  Homepage
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-gray-600 hover:text-green-600">
                  Delivery & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-600 hover:text-green-600">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Groceries */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Groceries</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/jams-spreads" className="text-gray-600 hover:text-green-600">
                  Jams & Spreads
                </Link>
              </li>
              <li>
                <Link href="/baking-cooking" className="text-gray-600 hover:text-green-600">
                  Baking & Cooking
                </Link>
              </li>
              <li>
                <Link href="/oils-sauces" className="text-gray-600 hover:text-green-600">
                  Oils & Sauces
                </Link>
              </li>
              <li>
                <Link href="/soya-dairy-free" className="text-gray-600 hover:text-green-600">
                  Soya & Dairy Free
                </Link>
              </li>
              <li>
                <Link href="/cereals" className="text-gray-600 hover:text-green-600">
                  Cereals
                </Link>
              </li>
              <li>
                <Link href="/groceries" className="text-gray-600 hover:text-green-600">
                  Shop all Groceries
                </Link>
              </li>
            </ul>
          </div>

          {/* Raw Foods & Promise */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Raw Foods</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/raw-jams" className="text-gray-600 hover:text-green-600">
                  Raw Jams
                </Link>
              </li>
              <li>
                <Link href="/raw-cereals" className="text-gray-600 hover:text-green-600">
                  Raw Cereals
                </Link>
              </li>
              <li>
                <Link href="/raw-pasta" className="text-gray-600 hover:text-green-600">
                  Raw Pasta
                </Link>
              </li>
              <li>
                <Link href="/raw-honey" className="text-gray-600 hover:text-green-600">
                  Raw Honey
                </Link>
              </li>
              <li>
                <Link href="/raw-noodles" className="text-gray-600 hover:text-green-600">
                  Raw Noodles
                </Link>
              </li>
              <li>
                <Link href="/raw-foods" className="text-gray-600 hover:text-green-600">
                  Shop all Raw Foods
                </Link>
              </li>
            </ul>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Our Promise To You</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-600">Same Product Cheaper? We'll Match It!</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-600">Fresh & Delicious Products, Everytime</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-600">No Hassle Refund Policy</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-600">Free Delivery on Orders Over £39</span>
                </li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <div className="flex gap-2">
                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AE</span>
                </div>
                <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-600">Copyright © 2025. RawOrganic by CMSSuperheros. All Rights Reserved</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/login" className="text-gray-600 hover:text-green-600">
              Login
            </Link>
            <Link href="/create-account" className="text-gray-600 hover:text-green-600">
              Create Account
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-green-600">
              Help
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
