import { Button } from "@/components/ui/button";
import { Facebook, Youtube, Twitter, Linkedin, Instagram } from "lucide-react";

const SocialLinks = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Follow Us</h2>
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-none bg-[#3b5998] text-white hover:bg-[#3b5998]/90"
        >
          <Facebook className="mr-2 h-4 w-4" />
          Facebook
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-none bg-[#FF0000] text-white hover:bg-[#FF0000]/90"
        >
          <Youtube className="mr-2 h-4 w-4" />
          YouTube
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-none bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
        >
          <Twitter className="mr-2 h-4 w-4" />
          Twitter
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-none bg-[#0077b5] text-white hover:bg-[#0077b5]/90"
        >
          <Linkedin className="mr-2 h-4 w-4" />
          LinkedIn
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-none bg-[#E1306C] text-white hover:bg-[#E1306C]/90"
        >
          <Instagram className="mr-2 h-4 w-4" />
          Instagram
        </Button>
      </div>
    </div>
  );
};

export default SocialLinks;
