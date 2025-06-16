import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/features/shared/ui/components/animated-counter";
import Image from "next/image";

interface AboutPageProps {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: number;
    type: string; // "number" | "percentage"
  }>;
}

const defaultCompanies = [
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://shadcnblocks.com/images/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Công ty được hỗ trợ", value: 300, type: "number" },
  { label: "Dự án hoàn thành", value: 800, type: "number" },
  { label: "Khách hàng hài lòng", value: 99, type: "percentage" },
  { label: "Giải thưởng được công nhận", value: 10, type: "number" },
];

const AboutContent = (
  {
    title = "Về chúng tôi",
    description = "Healthy Nutrition là một đội ngũ đam mê cam kết tạo ra những giải pháp sáng tạo giúp doanh nghiệp phát triển mạnh mẽ trong thời đại số.",
    mainImage = {
      src: "https://shadcnblocks.com/images/block/placeholder-1.svg",
      alt: "placeholder",
    },
    secondaryImage = {
      src: "https://shadcnblocks.com/images/block/placeholder-2.svg",
      alt: "placeholder",
    },
    breakout = {
      src: "https://shadcnblocks.com/images/block/block-1.svg",
      alt: "logo",
      title: "Hàng trăm khối tại Shadcnblocks.com",
      description:
        "Cung cấp cho doanh nghiệp những công cụ hiệu quả để cải thiện quy trình làm việc, tăng hiệu suất và khuyến khích tăng trưởng.",
      buttonText: "Khám phá thêm",
      buttonUrl: "https://shadcnblocks.com",
    },
    companiesTitle = "Được khách hàng trên toàn thế giới tin tưởng",
    companies = defaultCompanies,
    achievementsTitle = "Thành tựu của chúng tôi bằng con số",
    achievementsDescription = "Cung cấp cho doanh nghiệp những công cụ hiệu quả để cải thiện quy trình làm việc, tăng hiệu suất và khuyến khích tăng trưởng.",
    achievements = defaultAchievements,
  }: AboutPageProps = {
    title: "Về chúng tôi",
  },
) => {
  return (
    <section className="px-2 pt-[68px] lg:px-0">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <Image
            src={mainImage.src}
            alt={mainImage.alt}
            width={1200}
            height={800}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="bg-muted flex flex-col justify-between gap-6 rounded-xl p-7 md:w-1/2 lg:w-auto">
              <Image
                src={breakout.src}
                alt={breakout.alt}
                width={100}
                height={50}
                className="mr-auto h-12"
              />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <Image
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              width={800}
              height={600}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        {/* Companies */}
        <div className="py-32">
          <p className="text-center">{companiesTitle} </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <Image
                  src={company.src}
                  alt={company.alt}
                  width={100}
                  height={30}
                  className="h-6 w-auto md:h-8"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="relative overflow-hidden rounded-xl bg-green-600 p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center text-white md:text-left">
            <h2 className="text-4xl font-semibold">{achievementsTitle}</h2>
            <p className="max-w-xl text-shadow-white">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-10 text-center md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p className="text-white">{item.label}</p>
                <AnimatedCounter
                  value={item.value}
                  type={item.type as "number" | "percentage"}
                  className="text-4xl font-semibold text-white md:text-5xl"
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:80px_80px] opacity-15 md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
