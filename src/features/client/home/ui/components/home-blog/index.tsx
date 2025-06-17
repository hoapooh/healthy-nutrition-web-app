import { Badge } from "@/components/ui/badge";
import { ArrowRight, Newspaper } from "lucide-react";
import HomeBlogCard from "./home-blog-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { HomeBlogCardData } from "@/features/client/home/data/types";

interface HomeBlogProps {
  badge?: string;
  heading?: string;
  description?: string;
  posts?: HomeBlogCardData[];
}

const HomeBlog = ({
  badge = "Bài viết mới nhất",
  heading = "From Our Blog",
  description = "Stay updated with the latest news and articles from our blog.",
  posts,
}: HomeBlogProps) => {
  return (
    <section className="px-2 py-16 lg:px-0 lg:pt-32 lg:pb-0">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <Badge variant={"outline"}>
            <Newspaper className="size-3" />
            {badge}
          </Badge>
          <h2 className="mt-4 text-center text-2xl font-bold lg:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-center text-base font-semibold text-green-600 lg:text-sm">
            {description}
          </p>
        </div>

        {/* Body Cards */}
        <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts && posts.length > 0
            ? posts
                .slice(0, 3)
                .map((post, index) => (
                  <HomeBlogCard
                    key={`blog-card-${index}`}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    minutesToRead={post.minutesToRead}
                    image={post.image}
                    slug={post.slug}
                  />
                ))
            : [...Array(3)].map((_, index) => (
                <HomeBlogCard
                  key={`blog-card-${index}`}
                  title="How to build a successfull brand and business online in 2024"
                  description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Assumenda veniam corporis vitae delectus voluptas eveniet saepe sed omnis cupiditate ex?"
                  date="March 15, 2024"
                  minutesToRead={10}
                />
              ))}
        </div>

        {/* View All Blogs */}
        <div className="mt-12 text-center">
          <Link href={"/blog"} className="text-sm font-semibold">
            <Button
              variant={"outline"}
              className="hover:cursor-pointer hover:text-green-600/90"
            >
              View All Blogs <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
