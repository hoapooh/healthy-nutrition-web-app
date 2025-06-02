import Image from "next/image"
import { Star, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const recipes = [
  {
    id: 1,
    title: "Mixed Nut Chocolate Cake With Smooth Peanut Butter Layer",
    category: "Desserts",
    image: "/placeholder.svg?height=250&width=400",
    rating: 5,
    serves: 4,
    time: "50 mins",
  },
  {
    id: 2,
    title: "Banana Chocolate Peanut Butter Smoothie",
    category: "Drinks",
    image: "/placeholder.svg?height=250&width=400",
    rating: 4,
    serves: 2,
    time: "10 mins",
  },
  {
    id: 3,
    title: "Mixed Nut Chocolate Cake With Smooth Peanut Butter Layer",
    category: "Breakfast",
    image: "/placeholder.svg?height=250&width=400",
    rating: 4,
    serves: 1,
    time: "15 mins",
  },
]

export default function RecipesSection() {
  return (
    <section className="py-16 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Food background"
          width={1200}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Try Our
              <br />
              Delicious Recipes
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Try your hand at cooking with our amazingly quick & delicious recipes, catering for all diets too!
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">All Recipes</Button>
          </div>

          {/* Right Recipes */}
          <div className="space-y-6">
            {recipes.map((recipe) => (
              <Card key={recipe.id} className="bg-white/95 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="flex gap-4">
                    <div className="relative w-32 h-24 flex-shrink-0">
                      <Image
                        src={recipe.image || "/placeholder.svg"}
                        alt={recipe.title}
                        width={128}
                        height={96}
                        className="w-full h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {recipe.category}
                      </Badge>
                      <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{recipe.title}</h3>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < recipe.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Serves {recipe.serves}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {recipe.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
