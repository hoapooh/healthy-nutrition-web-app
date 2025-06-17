import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const defaultSections = [
  {
    title: "Sản phẩm",
    links: [
      { name: "Tổng quan", href: "#" },
      { name: "Bảng giá", href: "#" },
      { name: "Thị trường", href: "#" },
      { name: "Tính năng", href: "#" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { name: "Về chúng tôi", href: "/about" },
      { name: "Đội ngũ", href: "#" },
      { name: "Bài viết", href: "/blog" },
      { name: "Tuyển dụng", href: "#" },
    ],
  },
  {
    title: "Tài nguyên",
    links: [
      { name: "Trợ giúp", href: "#" },
      { name: "Bán hàng", href: "#" },
      { name: "Quảng cáo", href: "#" },
      { name: "Bảo mật", href: "#" },
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
    href: "https://www.facebook.com/profile.php?id=100086812806936",
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
  { name: "Điều khoản và Điều kiện", href: "#" },
  { name: "Chính sách Bảo mật", href: "#" },
];

export { defaultSections, defaultSocialLinks, defaultLegalLinks };
