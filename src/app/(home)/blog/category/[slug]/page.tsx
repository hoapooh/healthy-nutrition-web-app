// import type { Metadata } from "next";
// import { notFound } from "next/navigation";
// import {
//   getBlogPostsByCategory,
//   getBlogPosts,
// } from "@/features/client/blog/services/blog-api";
// import BlogCard from "@/features/client/blog/ui/components/blog-card";
// import BlogPagination from "@/features/client/blog/ui/components/blog-pagination";
// import BlogSidebar from "@/features/client/blog/ui/components/blog-sidebar";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface CategoryPageProps {
//   params: Promise<{ slug: string }>;
//   searchParams: Promise<{ page?: string }>;
// }

// export async function generateMetadata({
//   params,
// }: CategoryPageProps): Promise<Metadata> {
//   const allPosts = await getBlogPosts();
//   const category = allPosts.find(
//     async (post) => post.category.slug === (await params).slug,
//   )?.category;

//   if (!category) {
//     return {
//       title: "Category Not Found",
//       description: "The requested category could not be found.",
//     };
//   }

//   return {
//     title: `${category.name} - Blog`,
//     description: `Discover articles and recipes in the ${category.name} category.`,
//   };
// }

// const POSTS_PER_PAGE = 3;

// export default async function CategoryPage({
//   params,
//   searchParams,
// }: CategoryPageProps) {
//   const paramsResolved = await params;
//   if (!paramsResolved || !paramsResolved.slug) {
//     notFound();
//   }
//   const [searchParamsResolved] = await Promise.all([searchParams]);

//   const currentPage = Number(searchParamsResolved.page) || 1;
//   const allPosts = await getBlogPostsByCategory(paramsResolved.slug);

//   if (allPosts.length === 0) {
//     notFound();
//   }

//   const category = allPosts[0].category;

//   // Calculate pagination
//   const totalPosts = allPosts.length;
//   const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
//   const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
//   const endIndex = startIndex + POSTS_PER_PAGE;
//   const currentPosts = allPosts.slice(startIndex, endIndex);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Back Button */}
//         <div className="mb-6">
//           <Button variant="ghost" asChild>
//             <Link href="/blog" className="flex items-center gap-2">
//               <ArrowLeft className="h-4 w-4" />
//               Back to All Articles
//             </Link>
//           </Button>
//         </div>

//         {/* Header */}
//         <div className="mb-8 text-center">
//           <div className="mb-4">
//             <Badge
//               variant="secondary"
//               className="bg-blue-100 px-4 py-2 text-lg text-blue-800"
//             >
//               {category.name}
//             </Badge>
//           </div>
//           <h1 className="mb-4 text-4xl font-bold text-gray-900">
//             {category.name}
//           </h1>
//           <p className="text-lg text-gray-600">
//             {totalPosts} article{totalPosts !== 1 ? "s" : ""} in this category
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             {/* Blog Posts Grid */}
//             <div className="space-y-8">
//               {currentPosts.map((post) => (
//                 <BlogCard key={post.id} post={post} />
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <BlogPagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 baseUrl={`/blog/category/${paramsResolved.slug}`}
//               />
//             )}

//             {/* Posts Info */}
//             <div className="mt-6 text-center text-sm text-gray-500">
//               Showing {startIndex + 1}-{Math.min(endIndex, totalPosts)} of{" "}
//               {totalPosts} articles
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <BlogSidebar />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
