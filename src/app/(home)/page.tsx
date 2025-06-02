import HomeBlog from "@/features/client/home/ui/components/home-blog";
import HomeHero from "@/features/client/home/ui/components/home-hero";
import HomeProposition from "@/features/client/home/ui/components/home-proposition";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Healthy Nutrition - Your source for healthy food and nutrition tips.",
};

export default function Home() {
  return (
    <div className="py-2 lg:p-8">
      {/* Hero */}
      <HomeHero
        heading="Welcome to Healthy Nutrition"
        badge="🥕🫛 Your Healthy Friend"
        buttons={{
          primary: { text: "Shop Now", url: "/shop" },
          secondary: {
            text: "View our news",
            url: "/blog",
          },
        }}
        image={{
          src: "/hero-banner.jpg",
          alt: "Hero Section for Healthy Nutrition shop",
        }}
      />
      {/* Proposition */}
      <HomeProposition />

      {/* Banner Decoration */}
      <div>
        <Image
          src="/banner-decor.jpg"
          alt="Banner Decoration"
          width={1200}
          height={400}
          className="h-32 w-full object-cover lg:h-[400px] lg:rounded-md"
        />
      </div>

      {/* Blog / News */}
      <HomeBlog
        heading="Latest News"
        description="Check out our latest stories and articles"
      />
    </div>
  );
}
