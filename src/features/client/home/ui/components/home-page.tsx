import HeroSection from "./hero-section"
import FeaturedProductsSection from "./featured-products-section"
import CategoriesSection from "./categories-section"
import RecipesSection from "./recipes-section"
import TestimonialsSection from "./testimonials-section"
import NewsletterSection from "./newsletter-section"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProductsSection />
      <CategoriesSection />
      <RecipesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  )
}
