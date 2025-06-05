import { Button } from "@/components/ui/button";
import { Facebook, Youtube, Twitter, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-[#3b5998] hover:bg-[#3b5998]/90",
  },
  {
    name: "YouTube",
    icon: Youtube,
    color: "bg-[#FF0000] hover:bg-[#FF0000]/90",
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-[#0077b5] hover:bg-[#0077b5]/90",
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-[#E1306C] hover:bg-[#E1306C]/90",
  },
];

const BlogSocialLinks = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Follow Us</h2>
      <div className="grid grid-cols-2 gap-2">
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <Button
              key={social.name}
              variant="outline"
              size="sm"
              className={`${social.color} justify-start border-none text-white`}
            >
              <IconComponent className="mr-2 h-4 w-4" />
              {social.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogSocialLinks;
