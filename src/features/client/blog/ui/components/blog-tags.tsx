import Link from "next/link";

interface BlogTagsProps {
  tags: string[];
}

const BlogTags = ({ tags }: BlogTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Related Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link
            key={`tag-${tag}`}
            href={`/blog/tag/${tag}`}
            className="rounded-full bg-gray-100 px-4 py-2 text-sm transition-colors hover:bg-green-100 hover:text-green-700"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
