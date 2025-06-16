import { Button } from "@/components/ui/button";

const socialLinks = [
  { name: "Facebook", color: "bg-[#3b5998] hover:bg-[#3b5998]/90" },
  { name: "YouTube", color: "bg-[#FF0000] hover:bg-[#FF0000]/90" },
  { name: "Twitter", color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90" },
  { name: "Google+", color: "bg-[#dd4b39] hover:bg-[#dd4b39]/90" },
  { name: "LinkedIn", color: "bg-[#0077b5] hover:bg-[#0077b5]/90" },
  { name: "Instagram", color: "bg-[#E1306C] hover:bg-[#E1306C]/90" },
];

const BlogSocialLinks = () => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Follow Us</h2>
      <div className="grid grid-cols-2 gap-2">
        {socialLinks.map((social) => (
          <Button
            key={social.name}
            variant="outline"
            size="sm"
            className={`${social.color} justify-center border-none text-white`}
          >
            {social.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BlogSocialLinks;
