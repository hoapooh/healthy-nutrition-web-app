import Link from "next/link";
import { Tag } from "@/features/client/home/data/types";

interface BlogPopularTagsProps {
  tags: Tag[];
}

const BlogPopularTags = ({ tags }: BlogPopularTagsProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 15).map((tag) => (
          <Link
            key={tag.id}
            href={`/blog/tag/${tag.slug}`}
            className="rounded bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-green-100 hover:text-green-700"
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPopularTags;
