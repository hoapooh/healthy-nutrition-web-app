import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  defaultLegalLinks,
  defaultSections,
  defaultSocialLinks,
} from "../../../data/home-footer-data";

interface HomeFooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    titleSpecial?: React.ReactElement;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
    color: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const HomeFooter = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "/healthy-nutrition.png",
    alt: "logo",
    title: "Healthy Nutrition",
    titleSpecial: (
      <p className="text-xl font-semibold tracking-wide text-green-600">
        Healthy<span className="text-black">Nutrition</span>
      </p>
    ),
  },
  sections = defaultSections,
  description = "A small company selling healthy products. We are committed to providing the best quality products to our customers.",
  socialLinks = defaultSocialLinks,
  copyright = `© ${new Date().getFullYear()} HealthyNutrition. All rights reserved.`,
  legalLinks = defaultLegalLinks,
}: HomeFooterProps) => {
  return (
    <section className="pt-32">
      <div className="container mx-auto px-2 lg:px-0">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          {/* Left Section */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logo.url}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  width={200}
                  height={50}
                />
              </Link>
              {/* <h2 className="text-xl font-semibold">{logo.titleSpecial}</h2> */}
            </div>
            <p className="text-muted-foreground max-w-[70%] text-sm">
              {description}
            </p>{" "}
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li
                  key={idx}
                  className="font-medium transition-colors duration-200 hover:text-[var(--hover-color)]"
                  style={
                    { "--hover-color": social.color } as React.CSSProperties & {
                      "--hover-color": string;
                    }
                  }
                >
                  <Link
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Section */}
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-green-600"
                    >
                      <Link href={link.href}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="text-muted-foreground mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-green-600">
                <Link href={link.href}> {link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomeFooter;
