import type { BlogPost } from "@/features/client/home/data/types";
import type { JSX } from "react";
import Image from "next/image";

interface BlogDetailContentProps {
  post: BlogPost;
}

// Tạo nội dung chi tiết khác nhau cho tất cả 20 bài blog
const getDetailedContent = (slug: string) => {
  const contentMap: Record<string, JSX.Element> = {
    "delicious-vegan-recipes": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Vegan cooking has evolved tremendously over the past decade. Gone are
          the days when plant-based meals were considered bland or boring.
          Today's vegan cuisine is vibrant, flavorful, and satisfying even for
          the most dedicated meat-eaters.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Essential Vegan Ingredients
          </h2>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 leading-relaxed text-gray-700">
                The key to delicious vegan cooking lies in understanding how to
                build layers of flavor using plant-based ingredients. Umami-rich
                foods like mushrooms, tomatoes, and fermented products can
                create depth, while herbs and spices add complexity.
              </p>

              <ul className="mb-6 space-y-2 text-gray-700">
                <li>• Nutritional yeast for cheesy flavor</li>
                <li>• Cashews for creamy textures</li>
                <li>• Mushrooms for umami depth</li>
                <li>• Coconut milk for richness</li>
              </ul>
            </div>

            <div className="relative">
              <Image
                src="/images/blog/colorful-vegan-ingredients.jpg?height=300&width=400"
                alt="Colorful vegan ingredients"
                width={400}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="mt-8 border-l-4 border-green-500 bg-green-50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-green-800">
              Nutrition Tip
            </h3>
            <p className="text-green-700">
              Combining different plant proteins throughout the day ensures you
              get all essential amino acids for optimal health.
            </p>
          </div>
        </div>
      </div>
    ),

    "cooking-with-kids": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Cooking with children does more than just create delicious meals—it
          builds essential life skills, encourages healthy eating habits, and
          creates precious family memories. The kitchen becomes a classroom
          where math, science, and creativity come together.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Age-Appropriate Kitchen Tasks
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-blue-900">
                Ages 3-5: Little Helpers
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Washing fruits and vegetables in a colander</li>
                <li>• Tearing lettuce leaves for fresh salads</li>
                <li>• Mixing dry ingredients in large bowls</li>
                <li>• Decorating cookies with colorful sprinkles</li>
                <li>• Setting the table with supervision</li>
              </ul>
            </div>

            <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-purple-900">
                Ages 6-10: Junior Chefs
              </h3>
              <ul className="space-y-2 text-purple-800">
                <li>• Measuring ingredients with cups and spoons</li>
                <li>• Using child-safe knives for soft vegetables</li>
                <li>• Operating simple appliances like blenders</li>
                <li>• Following recipe steps independently</li>
                <li>• Cracking eggs and separating yolks</li>
              </ul>
            </div>
          </div>
        </div>

        <blockquote className="border-l-4 border-orange-500 bg-orange-50 py-4 pl-6 text-lg text-gray-800 italic">
          "The kitchen is the heart of the home, and cooking together creates
          bonds that last a lifetime."
        </blockquote>
      </div>
    ),

    "delicious-smoothies": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Smoothies have revolutionized how we consume fruits and vegetables,
          making nutrition convenient and delicious. These blended beverages
          pack a powerful nutritional punch while satisfying sweet cravings in a
          healthy way.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Perfect Smoothie Formula
          </h2>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <div className="mb-2 text-2xl">🍓</div>
              <h4 className="font-semibold text-green-800">Fruits</h4>
              <p className="text-sm text-green-600">1-2 cups fresh or frozen</p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <div className="mb-2 text-2xl">🥬</div>
              <h4 className="font-semibold text-blue-800">Greens</h4>
              <p className="text-sm text-blue-600">1 handful spinach/kale</p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 text-center">
              <div className="mb-2 text-2xl">🥛</div>
              <h4 className="font-semibold text-purple-800">Liquid</h4>
              <p className="text-sm text-purple-600">1 cup milk/water</p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4 text-center">
              <div className="mb-2 text-2xl">🥜</div>
              <h4 className="font-semibold text-orange-800">Protein</h4>
              <p className="text-sm text-orange-600">1 tbsp nuts/seeds</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border p-6 transition-shadow hover:shadow-md">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                🌴 Tropical Green Paradise
              </h3>
              <p className="mb-3 text-gray-600">
                Mango, pineapple, spinach, coconut water, lime juice
              </p>
              <span className="rounded bg-green-100 px-2 py-1 text-sm text-green-800">
                Beginner Friendly
              </span>
            </div>
          </div>
        </div>
      </div>
    ),

    "seasonal-cooking-autumn-harvest": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Autumn brings a rich harvest of root vegetables, squashes, apples, and
          hearty greens that form the foundation of comforting meals as
          temperatures drop. Seasonal cooking connects us to nature's rhythms
          while providing peak nutrition and flavor.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Autumn's Bounty
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-orange-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-orange-800">
                🎃 Squashes & Gourds
              </h3>
              <ul className="space-y-1 text-orange-700">
                <li>• Butternut squash</li>
                <li>• Acorn squash</li>
                <li>• Delicata squash</li>
                <li>• Sugar pumpkins</li>
              </ul>
            </div>

            <div className="rounded-lg bg-red-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-red-800">
                🍎 Tree Fruits
              </h3>
              <ul className="space-y-1 text-red-700">
                <li>• Honeycrisp apples</li>
                <li>• Bosc pears</li>
                <li>• Persimmons</li>
                <li>• Pomegranates</li>
              </ul>
            </div>

            <div className="rounded-lg bg-yellow-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800">
                🥕 Root Vegetables
              </h3>
              <ul className="space-y-1 text-yellow-700">
                <li>• Sweet potatoes</li>
                <li>• Carrots</li>
                <li>• Parsnips</li>
                <li>• Turnips</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-amber-500 bg-amber-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-amber-800">
            Seasonal Cooking Tip
          </h3>
          <p className="text-amber-700">
            Roasting autumn vegetables at 425°F caramelizes their natural
            sugars, creating deep, complex flavors that capture the essence of
            the season.
          </p>
        </div>
      </div>
    ),

    "homemade-bread-beginners": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          There's something deeply satisfying about creating bread from
          scratch—watching simple ingredients transform into a fragrant, crusty
          loaf through the alchemy of fermentation and heat. This ancient
          practice connects us to culinary traditions spanning thousands of
          years.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Essential Bread-Making Equipment
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Must-Have Tools
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>
                    <strong>Large mixing bowl:</strong> For combining
                    ingredients and initial mixing
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>
                    <strong>Kitchen scale:</strong> For accurate measurements
                    (highly recommended)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>
                    <strong>Bench scraper:</strong> For handling sticky dough
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>
                    <strong>Dutch oven:</strong> Creates steam for crusty
                    artisan loaves
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                The Four Ingredients
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-800">Flour</h4>
                  <p className="text-sm text-blue-700">
                    Bread flour preferred for higher protein content
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">Water</h4>
                  <p className="text-sm text-green-700">
                    Room temperature, filtered if possible
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <h4 className="font-semibold text-yellow-800">Salt</h4>
                  <p className="text-sm text-yellow-700">
                    Sea salt or kosher salt for best flavor
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-4">
                  <h4 className="font-semibold text-purple-800">Yeast</h4>
                  <p className="text-sm text-purple-700">
                    Active dry or instant yeast both work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    "superfoods-facts-marketing": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          The term "superfood" has become ubiquitous in health media, promising
          extraordinary benefits from specific foods. While many of these foods
          are indeed nutritious, the marketing often outpaces the science. Let's
          examine the evidence behind popular superfood claims.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Superfood Reality Check
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                ✅ Evidence-Based Superfoods
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-green-700">Blueberries</h4>
                  <p className="text-sm text-green-600">
                    High in antioxidants, supports brain health
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Leafy Greens</h4>
                  <p className="text-sm text-green-600">
                    Rich in vitamins, minerals, and fiber
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Fatty Fish</h4>
                  <p className="text-sm text-green-600">
                    Omega-3 fatty acids for heart health
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-700">Greek Yogurt</h4>
                  <p className="text-sm text-green-600">
                    Probiotics and high-quality protein
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800">
                ⚠️ Overhyped Foods
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-yellow-700">
                    Açaí Berries
                  </h4>
                  <p className="text-sm text-yellow-600">
                    Nutritious but not significantly better than local berries
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700">Coconut Oil</h4>
                  <p className="text-sm text-yellow-600">
                    High in saturated fat; benefits are overstated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <blockquote className="border-l-4 border-blue-500 bg-blue-50 py-4 pl-6 text-lg text-gray-800 italic">
          "The best 'superfood' is a varied, balanced diet rich in whole foods
          from all food groups."
        </blockquote>
      </div>
    ),

    "mediterranean-diet-lifestyle": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          The Mediterranean diet consistently ranks among the healthiest eating
          patterns globally, backed by decades of research linking it to reduced
          risk of heart disease, certain cancers, and cognitive decline.
          However, this approach extends beyond food choices to encompass a
          holistic lifestyle.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Mediterranean Food Pyramid
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg bg-green-100 p-4">
              <h3 className="font-semibold text-green-800">Daily Foundation</h3>
              <p className="text-green-700">
                Fruits, vegetables, whole grains, olive oil, nuts, legumes,
                herbs, and spices
              </p>
            </div>

            <div className="rounded-lg bg-blue-100 p-4">
              <h3 className="font-semibold text-blue-800">Weekly Additions</h3>
              <p className="text-blue-700">
                Fish and seafood (2-3 times), poultry, eggs, dairy (moderate
                amounts)
              </p>
            </div>

            <div className="rounded-lg bg-red-100 p-4">
              <h3 className="font-semibold text-red-800">Occasional Treats</h3>
              <p className="text-red-700">
                Red meat (limited), sweets, and processed foods
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Key Principles
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Emphasize plant foods</li>
              <li>• Use olive oil as primary fat</li>
              <li>• Enjoy meals with family and friends</li>
              <li>• Stay physically active</li>
              <li>• Moderate wine consumption (optional)</li>
            </ul>
          </div>

          <div className="relative">
            <Image
              src="/images/blog/mediterranean-meal-spread.jpg?height=300&width=400"
              alt="Mediterranean meal spread"
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    ),

    "urban-gardening-small-spaces": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Urban gardening represents a powerful movement to reconnect city
          dwellers with food production, improve access to fresh produce, and
          create green spaces in concrete landscapes. Even the smallest balcony,
          windowsill, or countertop can become a productive growing space.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Space-Maximizing Techniques
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                🌱 Vertical Growing
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• Wall-mounted planters</li>
                <li>• Stackable containers</li>
                <li>• Trellises for vining crops</li>
                <li>• Hanging baskets</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-800">
                🪴 Container Gardens
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Self-watering planters</li>
                <li>• Window boxes</li>
                <li>• Repurposed containers</li>
                <li>• Fabric grow bags</li>
              </ul>
            </div>

            <div className="rounded-lg bg-purple-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-purple-800">
                💡 Indoor Systems
              </h3>
              <ul className="space-y-2 text-purple-700">
                <li>• LED grow lights</li>
                <li>• Hydroponic setups</li>
                <li>• Microgreen trays</li>
                <li>• Herb gardens</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-green-500 bg-green-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-green-800">
            Urban Gardening Tip
          </h3>
          <p className="text-green-700">
            Start small with easy-to-grow herbs like basil, mint, and parsley.
            Success with simple plants builds confidence for more challenging
            crops.
          </p>
        </div>
      </div>
    ),

    "fermentation-basics-preserving": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Fermentation represents one of humanity's oldest food preservation
          techniques, dating back thousands of years across virtually all
          cultures. This microbial transformation not only prevents spoilage but
          also creates complex flavors and increases nutritional value.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Fermentation Fundamentals
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Types of Fermentation
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">
                    Lactic Acid Fermentation
                  </h4>
                  <p className="text-sm text-blue-700">
                    Sauerkraut, kimchi, pickles
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">
                    Alcoholic Fermentation
                  </h4>
                  <p className="text-sm text-green-700">Kombucha, wine, beer</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">
                    Acetic Acid Fermentation
                  </h4>
                  <p className="text-sm text-purple-700">
                    Vinegar, some kombuchas
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Essential Equipment
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Glass jars (mason jars work perfectly)</li>
                <li>• Non-metal lids or cheesecloth</li>
                <li>• Kitchen scale for precise measurements</li>
                <li>• Clean cutting board and knife</li>
                <li>• Sea salt (no additives)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-yellow-800">
            ⚠️ Safety First
          </h3>
          <p className="text-yellow-700">
            Always use clean equipment and follow tested recipes. Trust your
            senses—if something smells off or looks moldy, discard it and start
            fresh.
          </p>
        </div>
      </div>
    ),

    "plant-based-protein-guide": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Protein remains one of the most misunderstood nutrients, particularly
          for those following plant-based diets. This guide clarifies actual
          protein requirements based on current nutritional science and
          addresses common misconceptions about plant proteins.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Plant Protein Powerhouses
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                🫘 Legumes
              </h3>
              <ul className="space-y-1 text-green-700">
                <li>• Lentils: 18g per cup</li>
                <li>• Chickpeas: 15g per cup</li>
                <li>• Black beans: 15g per cup</li>
                <li>• Edamame: 17g per cup</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-800">
                🌾 Grains & Seeds
              </h3>
              <ul className="space-y-1 text-blue-700">
                <li>• Quinoa: 8g per cup</li>
                <li>• Hemp seeds: 10g per 3 tbsp</li>
                <li>• Chia seeds: 5g per 2 tbsp</li>
                <li>• Oats: 6g per cup</li>
              </ul>
            </div>

            <div className="rounded-lg bg-purple-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-purple-800">
                🥜 Nuts & Soy
              </h3>
              <ul className="space-y-1 text-purple-700">
                <li>• Tofu: 20g per cup</li>
                <li>• Tempeh: 31g per cup</li>
                <li>• Almonds: 6g per ounce</li>
                <li>• Peanut butter: 8g per 2 tbsp</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-green-500 bg-green-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-green-800">
            Complete Protein Myth
          </h3>
          <p className="text-green-700">
            You don't need to combine proteins at every meal. Eating a variety
            of plant foods throughout the day provides all essential amino acids
            your body needs.
          </p>
        </div>
      </div>
    ),

    "mindful-eating-relationship-food": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Mindful eating offers a refreshing alternative to the restrictive diet
          mentality that dominates nutrition discourse. Rather than focusing on
          what to eat, this approach emphasizes how we eat, encouraging
          presence, awareness, and connection during meals.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            The Five Senses of Mindful Eating
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-red-50 p-6 text-center">
              <div className="mb-3 text-3xl">👁️</div>
              <h3 className="mb-2 text-lg font-semibold text-red-800">Sight</h3>
              <p className="text-sm text-red-700">
                Notice colors, textures, and presentation of your food
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-6 text-center">
              <div className="mb-3 text-3xl">👃</div>
              <h3 className="mb-2 text-lg font-semibold text-orange-800">
                Smell
              </h3>
              <p className="text-sm text-orange-700">
                Breathe in aromas before taking your first bite
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-6 text-center">
              <div className="mb-3 text-3xl">👂</div>
              <h3 className="mb-2 text-lg font-semibold text-yellow-800">
                Sound
              </h3>
              <p className="text-sm text-yellow-700">
                Listen to the crunch, sizzle, or bubbling of food
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-6 text-center">
              <div className="mb-3 text-3xl">✋</div>
              <h3 className="mb-2 text-lg font-semibold text-green-800">
                Touch
              </h3>
              <p className="text-sm text-green-700">
                Feel temperature, texture, and weight in your mouth
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-6 text-center">
              <div className="mb-3 text-3xl">👅</div>
              <h3 className="mb-2 text-lg font-semibold text-blue-800">
                Taste
              </h3>
              <p className="text-sm text-blue-700">
                Savor sweet, sour, salty, bitter, and umami flavors
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-6 text-center">
              <div className="mb-3 text-3xl">🧠</div>
              <h3 className="mb-2 text-lg font-semibold text-purple-800">
                Intuition
              </h3>
              <p className="text-sm text-purple-700">
                Trust your body's hunger and fullness signals
              </p>
            </div>
          </div>
        </div>

        <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 py-4 pl-6 text-lg text-gray-800 italic">
          "When we eat mindfully, we transform a basic necessity into a moment
          of meditation and gratitude."
        </blockquote>
      </div>
    ),

    "spice-cabinet-essentials": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Spices represent one of the most powerful tools in a cook's arsenal,
          capable of transforming simple ingredients into complex, satisfying
          meals. A thoughtfully stocked spice cabinet opens doors to global
          cuisines without requiring extensive specialty shopping.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Essential Spice Collection
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                The Foundation Five
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🧄</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Garlic Powder
                    </h4>
                    <p className="text-sm text-gray-600">
                      Versatile base for most cuisines
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌶️</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Paprika</h4>
                    <p className="text-sm text-gray-600">
                      Adds color and mild pepper flavor
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Cumin</h4>
                    <p className="text-sm text-gray-600">
                      Earthy warmth for Middle Eastern and Mexican dishes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">⚫</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Black Pepper
                    </h4>
                    <p className="text-sm text-gray-600">
                      Fresh-ground makes all the difference
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🟡</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Turmeric</h4>
                    <p className="text-sm text-gray-600">
                      Golden color and anti-inflammatory properties
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Global Flavor Profiles
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-red-50 p-4">
                  <h4 className="font-semibold text-red-800">
                    🇮🇳 Indian Cuisine
                  </h4>
                  <p className="text-sm text-red-700">
                    Garam masala, coriander, cardamom, fenugreek
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">
                    🇲🇽 Mexican Cuisine
                  </h4>
                  <p className="text-sm text-green-700">
                    Chili powder, oregano, lime zest, chipotle
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-800">
                    🇫🇷 French Cuisine
                  </h4>
                  <p className="text-sm text-blue-700">
                    Herbes de Provence, thyme, bay leaves, tarragon
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-4">
                  <h4 className="font-semibold text-yellow-800">
                    🇨🇳 Chinese Cuisine
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Five-spice powder, star anise, Sichuan peppercorns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    "meal-prep-mastery": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Meal preparation has evolved from a bodybuilding subculture practice
          to a mainstream strategy for maintaining healthy eating habits amid
          busy schedules. This approach recognizes that time constraints often
          drive food choices and addresses this challenge through strategic
          planning.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Meal Prep Strategies
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-800">
                🍱 Batch Cooking
              </h3>
              <p className="mb-3 text-blue-700">
                Cook large quantities of staples like grains, proteins, and
                roasted vegetables
              </p>
              <ul className="space-y-1 text-sm text-blue-600">
                <li>• Sunday prep sessions</li>
                <li>• Freezer-friendly portions</li>
                <li>• Mix-and-match components</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                🥗 Component Prep
              </h3>
              <p className="mb-3 text-green-700">
                Prepare individual ingredients that can be combined in various
                ways
              </p>
              <ul className="space-y-1 text-sm text-green-600">
                <li>• Washed and chopped vegetables</li>
                <li>• Cooked grains and legumes</li>
                <li>• Homemade dressings and sauces</li>
              </ul>
            </div>

            <div className="rounded-lg bg-purple-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-purple-800">
                🍽️ Complete Meals
              </h3>
              <p className="mb-3 text-purple-700">
                Fully assembled meals ready to heat and eat
              </p>
              <ul className="space-y-1 text-sm text-purple-600">
                <li>• Grab-and-go convenience</li>
                <li>• Portion-controlled servings</li>
                <li>• Perfect for busy weekdays</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-orange-500 bg-orange-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-orange-800">
            Meal Prep Success Tip
          </h3>
          <p className="text-orange-700">
            Start small with just 2-3 meals per week. As you build the habit and
            find what works for your lifestyle, you can gradually increase your
            prep volume.
          </p>
        </div>
      </div>
    ),

    "cooking-methods-explained": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Cooking methods represent different ways of applying heat to food,
          each producing distinct flavors, textures, and nutritional outcomes.
          Understanding these techniques transforms you from a recipe follower
          to an intuitive cook capable of adapting to ingredients and
          circumstances.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Heat Transfer Methods
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                🔥 Dry Heat Methods
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-red-800">
                    Roasting & Baking
                  </h4>
                  <p className="text-sm text-red-700">
                    Oven heat surrounds food, creating caramelization
                  </p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-orange-800">
                    Grilling & Broiling
                  </h4>
                  <p className="text-sm text-orange-700">
                    Direct high heat creates distinctive char flavors
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-yellow-800">
                    Sautéing & Stir-frying
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Quick cooking in minimal fat preserves texture
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                💧 Moist Heat Methods
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-800">
                    Braising & Stewing
                  </h4>
                  <p className="text-sm text-blue-700">
                    Low, slow cooking in liquid tenderizes tough cuts
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-800">
                    Steaming & Poaching
                  </h4>
                  <p className="text-sm text-green-700">
                    Gentle heat preserves delicate textures and nutrients
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-800">
                    Pressure Cooking
                  </h4>
                  <p className="text-sm text-purple-700">
                    High-pressure steam cooks food rapidly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            🔬 The Science Behind Cooking
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-700">Maillard Reaction</h4>
              <p className="text-sm text-gray-600">
                Proteins and sugars brown at 280°F+, creating complex flavors
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">Caramelization</h4>
              <p className="text-sm text-gray-600">
                Sugars break down at 320°F+, producing sweet, nutty flavors
              </p>
            </div>
          </div>
        </div>
      </div>
    ),

    "edible-flowers-meals": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Edible flowers have adorned plates across cultures for centuries,
          adding visual beauty, subtle flavors, and in some cases, nutritional
          benefits to dishes. From delicate violets to spicy nasturtiums, these
          botanical ingredients offer creative possibilities that extend far
          beyond mere garnishes.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Popular Edible Flowers
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-purple-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-purple-800">
                🌸 Violets
              </h3>
              <p className="mb-2 text-sm text-purple-700">
                <strong>Flavor:</strong> Sweet, perfumed
              </p>
              <p className="text-sm text-purple-600">
                Perfect for desserts, salads, and crystallizing
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-orange-800">
                🌻 Nasturtiums
              </h3>
              <p className="mb-2 text-sm text-orange-700">
                <strong>Flavor:</strong> Peppery, watercress-like
              </p>
              <p className="text-sm text-orange-600">
                Excellent in salads, sandwiches, and compound butters
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800">
                🌼 Calendula
              </h3>
              <p className="mb-2 text-sm text-yellow-700">
                <strong>Flavor:</strong> Mild, slightly bitter
              </p>
              <p className="text-sm text-yellow-600">
                Known as "poor man's saffron" for golden color
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-800">
                🌺 Hibiscus
              </h3>
              <p className="mb-2 text-sm text-blue-700">
                <strong>Flavor:</strong> Tart, cranberry-like
              </p>
              <p className="text-sm text-blue-600">
                Popular in teas, cocktails, and Middle Eastern cuisine
              </p>
            </div>

            <div className="rounded-lg bg-pink-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-pink-800">
                🌹 Rose Petals
              </h3>
              <p className="mb-2 text-sm text-pink-700">
                <strong>Flavor:</strong> Floral, sweet
              </p>
              <p className="text-sm text-pink-600">
                Classic in Middle Eastern and Indian desserts
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                🌿 Lavender
              </h3>
              <p className="mb-2 text-sm text-green-700">
                <strong>Flavor:</strong> Floral, slightly medicinal
              </p>
              <p className="text-sm text-green-600">
                Use sparingly in baked goods and honey
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-red-800">
            ⚠️ Safety Guidelines
          </h3>
          <ul className="space-y-2 text-red-700">
            <li>• Only eat flowers you can positively identify as edible</li>
            <li>
              • Avoid flowers from florists, roadsides, or treated with
              pesticides
            </li>
            <li>• Remove pistils and stamens before eating</li>
            <li>• Start with small amounts to test for allergic reactions</li>
          </ul>
        </div>
      </div>
    ),

    "knife-skills-foundation": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Knife skills represent perhaps the most fundamental technique in
          cooking, impacting everything from preparation time to ingredient
          texture and even flavor release. Mastering basic cutting techniques
          transforms your cooking experience by improving efficiency,
          consistency, and safety.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Essential Knife Cuts
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Basic Cuts
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🔪</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Julienne</h4>
                    <p className="text-sm text-gray-600">
                      Thin matchstick cuts, 1/8" × 1/8" × 2"
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🥕</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Brunoise</h4>
                    <p className="text-sm text-gray-600">
                      Fine dice, 1/8" × 1/8" × 1/8"
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🧅</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Medium Dice</h4>
                    <p className="text-sm text-gray-600">
                      Standard dice, 1/2" × 1/2" × 1/2"
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Chiffonade</h4>
                    <p className="text-sm text-gray-600">
                      Thin ribbon cuts for herbs and leafy greens
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Knife Safety
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">✅ Do</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    <li>• Keep knives sharp and clean</li>
                    <li>• Use a stable cutting board</li>
                    <li>• Curl fingertips under when holding food</li>
                    <li>• Cut away from your body</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <h4 className="font-semibold text-red-800">❌ Don't</h4>
                  <ul className="space-y-1 text-sm text-red-700">
                    <li>• Leave knives in sinks or drawers</li>
                    <li>• Try to catch a falling knife</li>
                    <li>• Use knives on glass or stone surfaces</li>
                    <li>• Rush your cuts</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-blue-500 bg-blue-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-blue-800">
            Professional Tip
          </h3>
          <p className="text-blue-700">
            A sharp knife is safer than a dull one. Dull knives require more
            pressure and are more likely to slip, causing accidents. Invest in
            regular sharpening or learn to use a whetstone.
          </p>
        </div>
      </div>
    ),

    "cooking-with-children-activities": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Involving children in cooking does more than create family memories—it
          builds essential life skills, encourages healthy eating habits, and
          provides natural opportunities for learning across multiple domains.
          From counting eggs to understanding chemical reactions, the kitchen
          offers rich educational experiences.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Age-Appropriate Kitchen Activities
          </h2>

          <div className="space-y-6">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-yellow-800">
                👶 Ages 2-4: Tiny Helpers
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="space-y-2 text-yellow-700">
                  <li>• Washing fruits and vegetables in a colander</li>
                  <li>• Tearing lettuce leaves for salads</li>
                  <li>• Stirring ingredients in large bowls</li>
                  <li>• Sprinkling cheese or herbs on dishes</li>
                </ul>
                <ul className="space-y-2 text-yellow-700">
                  <li>• Mashing bananas or avocados</li>
                  <li>• Arranging items on plates</li>
                  <li>• Wiping down surfaces</li>
                  <li>• Sorting ingredients by color or size</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-green-200 bg-green-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-green-800">
                🧒 Ages 5-8: Little Chefs
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="space-y-2 text-green-700">
                  <li>• Measuring ingredients with cups and spoons</li>
                  <li>• Cracking eggs (with help)</li>
                  <li>• Using child-safe knives for soft foods</li>
                  <li>• Operating simple appliances like blenders</li>
                </ul>
                <ul className="space-y-2 text-green-700">
                  <li>• Reading simple recipe steps</li>
                  <li>• Kneading dough</li>
                  <li>• Decorating cookies or cupcakes</li>
                  <li>• Setting timers and watching the clock</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-blue-800">
                👦 Ages 9-12: Junior Cooks
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <ul className="space-y-2 text-blue-700">
                  <li>• Following complete recipes independently</li>
                  <li>• Using sharp knives with supervision</li>
                  <li>• Operating stovetop and oven safely</li>
                  <li>• Planning simple meals</li>
                </ul>
                <ul className="space-y-2 text-blue-700">
                  <li>• Understanding food safety basics</li>
                  <li>• Multitasking with multiple recipe steps</li>
                  <li>• Adjusting seasonings to taste</li>
                  <li>• Teaching younger siblings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-purple-500 bg-purple-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-purple-800">
            Learning Through Cooking
          </h3>
          <p className="text-purple-700">
            Cooking naturally incorporates math (measuring, fractions), science
            (chemical reactions, states of matter), reading (following recipes),
            and cultural studies (exploring cuisines from around the world).
          </p>
        </div>
      </div>
    ),

    "understanding-umami": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Umami, often described as savory or meaty, represents the fifth basic
          taste alongside sweet, sour, salty, and bitter. Though long recognized
          in Asian cuisines, particularly Japanese cooking, Western food science
          only officially acknowledged umami in the late 20th century.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Understanding the Fifth Taste
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                What Creates Umami?
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-red-50 p-4">
                  <h4 className="font-semibold text-red-800">Glutamates</h4>
                  <p className="text-sm text-red-700">
                    Naturally occurring amino acids that trigger umami receptors
                    on the tongue
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="font-semibold text-blue-800">Nucleotides</h4>
                  <p className="text-sm text-blue-700">
                    Compounds like inosinate and guanylate that enhance umami
                    perception
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">
                    Synergy Effect
                  </h4>
                  <p className="text-sm text-green-700">
                    Combining glutamate-rich and nucleotide-rich foods
                    multiplies umami intensity
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Umami-Rich Ingredients
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍅</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Tomatoes</h4>
                    <p className="text-sm text-gray-600">
                      Especially when cooked or sun-dried
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧀</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Aged Cheese</h4>
                    <p className="text-sm text-gray-600">
                      Parmesan, aged cheddar, blue cheese
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🍄</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Mushrooms</h4>
                    <p className="text-sm text-gray-600">
                      Shiitake, porcini, and dried varieties
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🐟</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Fish Sauce</h4>
                    <p className="text-sm text-gray-600">
                      Fermented anchovy essence
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🫘</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">Miso Paste</h4>
                    <p className="text-sm text-gray-600">
                      Fermented soybean paste
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-l-4 border-indigo-500 bg-indigo-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-indigo-800">
            Umami Cooking Tip
          </h3>
          <p className="text-indigo-700">
            Layer umami by combining ingredients like tomatoes + parmesan, or
            mushrooms + soy sauce. This creates depth of flavor that makes
            dishes more satisfying and memorable.
          </p>
        </div>
      </div>
    ),

    "zero-waste-cooking": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Zero-waste cooking represents both a culinary philosophy and a
          practical approach to addressing the massive problem of food waste. By
          viewing ingredients holistically and finding culinary uses for parts
          typically discarded, this approach reduces environmental impact while
          discovering new flavors.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Creative Uses for Food Scraps
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                🥬 Vegetable Scraps
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">Carrot Tops</h4>
                  <p className="text-sm text-green-700">
                    Make pesto, add to salads, or use in chimichurri
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">
                    Broccoli Stems
                  </h4>
                  <p className="text-sm text-green-700">
                    Peel and slice for stir-fries or grate for slaw
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">Potato Peels</h4>
                  <p className="text-sm text-green-700">
                    Roast with oil and salt for crispy snacks
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="font-semibold text-green-800">Herb Stems</h4>
                  <p className="text-sm text-green-700">
                    Blend into sauces or freeze in ice cubes
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                🍞 Bread & Grains
              </h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-orange-50 p-4">
                  <h4 className="font-semibold text-orange-800">Stale Bread</h4>
                  <p className="text-sm text-orange-700">
                    Transform into breadcrumbs, croutons, or bread pudding
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-4">
                  <h4 className="font-semibold text-orange-800">
                    Leftover Rice
                  </h4>
                  <p className="text-sm text-orange-700">
                    Perfect for fried rice, rice pudding, or stuffed vegetables
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 p-4">
                  <h4 className="font-semibold text-orange-800">Pasta Water</h4>
                  <p className="text-sm text-orange-700">
                    Starchy water perfect for thinning sauces
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-3 text-lg font-semibold text-blue-800">
            💡 Zero-Waste Kitchen Tips
          </h3>
          <ul className="space-y-2 text-blue-700">
            <li>
              • Save vegetable scraps in the freezer to make homemade stock
            </li>
            <li>
              • Regrow green onions, celery, and lettuce from kitchen scraps
            </li>
            <li>
              • Use citrus peels to make flavored salts or cleaning solutions
            </li>
            <li>• Pickle vegetable trimmings for tangy condiments</li>
          </ul>
        </div>
      </div>
    ),

    "global-breakfast-traditions": (
      <div className="space-y-8">
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Breakfast represents one of the most culturally distinctive meals,
          reflecting local ingredients, cultural values, and lifestyle patterns.
          From hearty English fry-ups to delicate Japanese rice and fish,
          morning meals offer fascinating insights into different approaches to
          starting the day.
        </p>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Breakfast Around the World
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-red-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-red-800">
                🇯🇵 Japan
              </h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Steamed rice with nori seaweed</li>
                <li>• Miso soup with tofu and wakame</li>
                <li>• Grilled fish (often salmon)</li>
                <li>• Pickled vegetables (tsukemono)</li>
                <li>• Green tea</li>
              </ul>
            </div>

            <div className="rounded-lg bg-blue-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-blue-800">
                🇫🇷 France
              </h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Fresh croissants or pain au chocolat</li>
                <li>• Strong coffee or café au lait</li>
                <li>• Butter and jam</li>
                <li>• Fresh orange juice</li>
                <li>• Simple and elegant presentation</li>
              </ul>
            </div>

            <div className="rounded-lg bg-green-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-green-800">
                🇲🇽 Mexico
              </h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Huevos rancheros or scrambled eggs</li>
                <li>• Fresh tortillas</li>
                <li>• Refried beans</li>
                <li>• Fresh salsa and avocado</li>
                <li>• Café de olla (spiced coffee)</li>
              </ul>
            </div>

            <div className="rounded-lg bg-yellow-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-yellow-800">
                🇮🇳 India
              </h3>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Idli or dosa with sambar</li>
                <li>• Coconut chutney</li>
                <li>• Masala chai</li>
                <li>• Fresh fruit</li>
                <li>• Regional variations across states</li>
              </ul>
            </div>

            <div className="rounded-lg bg-purple-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-purple-800">
                🇬🇧 England
              </h3>
              <ul className="space-y-2 text-sm text-purple-700">
                <li>• Full English breakfast</li>
                <li>• Eggs, bacon, sausages</li>
                <li>• Baked beans and grilled tomatoes</li>
                <li>• Toast and black pudding</li>
                <li>• Strong black tea</li>
              </ul>
            </div>

            <div className="rounded-lg bg-orange-50 p-6">
              <h3 className="mb-3 text-lg font-semibold text-orange-800">
                🇹🇷 Turkey
              </h3>
              <ul className="space-y-2 text-sm text-orange-700">
                <li>• Fresh bread and simit</li>
                <li>• White cheese and olives</li>
                <li>• Tomatoes and cucumbers</li>
                <li>• Honey and jam</li>
                <li>• Turkish tea (çay)</li>
              </ul>
            </div>
          </div>
        </div>

        <blockquote className="border-l-4 border-teal-500 bg-teal-50 py-4 pl-6 text-lg text-gray-800 italic">
          "Breakfast traditions reflect not just what we eat, but how we value
          time, family, and the start of each new day."
        </blockquote>
      </div>
    ),
  };

  return contentMap[slug] || contentMap["default"];
};

const BlogDetailContent = ({ post }: BlogDetailContentProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      {getDetailedContent(post.slug)}
    </div>
  );
};

export default BlogDetailContent;
