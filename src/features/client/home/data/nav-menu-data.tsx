import { Building2, Sunset, Zap } from "lucide-react";

export const menuData = [
  { title: "Home", url: "/" },
  {
    title: "Shop",
    url: "/products",
  },
  {
    title: "Company",
    url: "#",
    items: [
      {
        title: "About Us",
        description: "Learn more about our mission and values",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/about",
      },
      {
        title: "Careers",
        description: "Browse job listing and discover our workplace",
        icon: <Building2 className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Support",
        description: "Get in touch with our support team ",
        icon: <Zap className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
  {
    title: "Blog",
    url: "/blog",
  },
];
