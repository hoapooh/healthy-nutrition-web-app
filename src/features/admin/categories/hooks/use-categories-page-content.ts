import { useGetAllCategoriesQuery } from "@/services/category-services";
import { CategoryParams } from "@/types/category";
import React from "react";

const useCategoriesPageContent = () => {
  const [filters, setFilters] = React.useState<CategoryParams>({
    pageIndex: 1,
    limit: 10,
  });

  console.log(filters);

  const {
    data: categoriesResponse,
    isLoading,
    refetch,
  } = useGetAllCategoriesQuery(filters);

  const categories = categoriesResponse?.result?.items || [];
  const totalCount = categoriesResponse?.result?.totalCount || 0;

  const handleFiltersChange = (newFilters: CategoryParams) => {
    setFilters(newFilters);
  };

  const handleRefresh = () => {
    refetch();
  };

  return {
    categories,
    totalCount,
    isLoading,
    filters,
    handleFiltersChange,
    handleRefresh,
  };
};

export default useCategoriesPageContent;
