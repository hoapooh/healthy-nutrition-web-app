import Link from "next/link";

interface BlogCategoryBadgeProps {
  name: string;
  slug: string;
}

const BlogCategoryBadge = ({ name, slug }: BlogCategoryBadgeProps) => {
  return (
    <Link
      href={`/blog/category/${slug}`}
      className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 transition-colors hover:bg-green-200"
    >
      {name}
    </Link>
  );
};

export default BlogCategoryBadge;
