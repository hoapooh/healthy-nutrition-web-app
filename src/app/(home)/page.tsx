import HomeBlog from "@/features/client/home/ui/components/home-blog";
import HomeHero from "@/features/client/home/ui/components/home-hero";
import HomeProposition from "@/features/client/home/ui/components/home-proposition";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Chào mừng đến với Healthy Nutrition - Nguồn thực phẩm lành mạnh và lời khuyên dinh dưỡng của bạn.",
};

export default function Home() {
  return (
    <div className="py-6 lg:p-8">
      {/* Hero */}{" "}
      <HomeHero
        heading="Chào mừng bạn đến với Healthy Nutrition"
        description="Khám phá các sản phẩm dinh dưỡng lành mạnh và mẹo ăn uống của chúng tôi để sống khỏe mạnh hơn mỗi ngày."
        badge="🥕🫛 Người bạn sức khỏe của bạn"
        buttons={{
          primary: { text: "Mua sắm ngay", url: "/products" },
          secondary: {
            text: "Xem tin tức",
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
      <div className="container mx-auto mt-4 mb-8">
        <Image
          src="/banner-decor.jpg"
          alt="Banner Decoration"
          width={1200}
          height={400}
          className="h-32 w-full object-cover lg:h-[400px] lg:rounded-md"
        />
      </div>
      {/* Blog / News */}{" "}
      <HomeBlog
        heading="Tin tức mới nhất"
        description="Xem những câu chuyện và bài viết mới nhất của chúng tôi"
      />
    </div>
  );
}
