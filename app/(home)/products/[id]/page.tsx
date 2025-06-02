import ProductDetailPage from "@/features/client/products/ui/components/product-detail-page";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const awaitedParams = await params;
  const id = awaitedParams.id;

  return <ProductDetailPage productId={id} />;
}
