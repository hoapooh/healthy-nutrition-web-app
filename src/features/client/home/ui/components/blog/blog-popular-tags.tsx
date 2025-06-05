import Link from "next/link";
import type { Tag } from "@/features/client/home/data/types";

interface BlogPopularTagsProps {
  tags: Tag[];
}

const BlogPopularTags = ({ tags }: BlogPopularTagsProps) => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${tag.slug}`}
            className="rounded-md bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-gray-200"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPopularTags;
