import Link from "next/link";

interface BlogPopularTagsProps {
  tags: string[];
}

const BlogPopularTags = ({ tags }: BlogPopularTagsProps) => {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {tags.slice(0, 15).map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className="rounded bg-gray-100 px-3 py-1 text-sm transition-colors hover:bg-green-100 hover:text-green-700"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPopularTags;
