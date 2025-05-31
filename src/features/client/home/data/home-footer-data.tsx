import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  {
    icon: <FaInstagram className="size-5" />,
    href: "#",
    label: "Instagram",
    color: "#e91e63", // Instagram brand color
  },
  {
    icon: <FaFacebook className="size-5" />,
    href: "#",
    label: "Facebook",
    color: "#2563eb", // blue-600
  },
  {
    icon: <FaTwitter className="size-5" />,
    href: "#",
    label: "Twitter",
    color: "#60a5fa", // blue-400
  },
  {
    icon: <FaLinkedin className="size-5" />,
    href: "#",
    label: "LinkedIn",
    color: "#1d4ed8", // blue-700
  },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "#" },
  { name: "Privacy Policy", href: "#" },
];

export { defaultSections, defaultSocialLinks, defaultLegalLinks };
