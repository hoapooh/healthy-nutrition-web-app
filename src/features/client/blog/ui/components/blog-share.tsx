import { Button } from "@/components/ui/button";

const BlogShare = () => {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-600">Post share:</span>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="bg-[#3b5998] text-white hover:bg-[#3b5998]/90"
          >
            Facebook
          </Button>
          <Button
            size="sm"
            className="bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
          >
            Twitter
          </Button>
          <Button
            size="sm"
            className="bg-[#dd4b39] text-white hover:bg-[#dd4b39]/90"
          >
            Google+
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogShare;
