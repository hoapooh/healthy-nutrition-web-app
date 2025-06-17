interface BlogHeaderProps {
  title: string;
  subtitle?: string;
}

const BlogHeader = ({ title, subtitle }: BlogHeaderProps) => {
  return (
    <div className="border-b pb-4">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default BlogHeader;
