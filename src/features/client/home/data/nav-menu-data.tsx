import { Building2, Sunset, Zap } from "lucide-react";

export const menuData = [
  { title: "Trang chủ", url: "/" },
  {
    title: "Cửa hàng",
    url: "/products",
  },
  {
    title: "Công ty",
    url: "#",
    items: [
      {
        title: "Về chúng tôi",
        description: "Tìm hiểu thêm về sứ mệnh và giá trị của chúng tôi",
        icon: <Sunset className="size-5 shrink-0" />,
        url: "/about",
      },
      {
        title: "Tuyển dụng",
        description:
          "Xem danh sách việc làm và khám phá nơi làm việc của chúng tôi",
        icon: <Building2 className="size-5 shrink-0" />,
        url: "#",
      },
      {
        title: "Hỗ trợ",
        description: "Liên hệ với đội ngũ hỗ trợ của chúng tôi",
        icon: <Zap className="size-5 shrink-0" />,
        url: "#",
      },
    ],
  },
  {
    title: "Bài viết",
    url: "/blog",
  },
];
