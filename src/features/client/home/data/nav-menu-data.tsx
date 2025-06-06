import { Book, Building2, Sunset, Trees, Zap } from "lucide-react";

export const menuData = [
  { title: "Home", url: "/" },
  {
    title: "Company",
    url: "#",
    items: [
      {
        title: "Products",
        description: "We sell healthy products online",
        icon: <Trees className="size-5 shrink-0" />,
        url: "/products",
      },
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
    title: "Resources",
    url: "#",
    items: [
      {
        title: "Help Center",
        description: "Get all the answers you need right here",
        icon: <Zap className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Contact Us",
        description: "We are here to help you with any questions you have",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Status",
        description: "Check the current status of our services and APIs",
        icon: <Trees className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Terms of Service",
        description: "Our terms and conditions for using our services",
        icon: <Book className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
  {
    title: "Blog",
    url: "#",
  },
];
