import { BlogParams } from "@/types/blog";
import { useEffect, useState } from "react";

interface BlogFiltersProps {
  filters: BlogParams;
  onFiltersChange: (filters: BlogParams) => void;
}

export const useBlogFilters = ({
  filters,
  onFiltersChange,
}: BlogFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<BlogParams>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = Boolean(
    (filters.tags && filters.tags.length > 0) ||
      filters.startDate ||
      filters.endDate,
  );

  const handleApplyFilters = () => {
    onFiltersChange({ ...localFilters, pageIndex: 1 });
    setIsOpen(false);
  };
  const handleClearFilters = () => {
    const clearedFilters = {
      title: filters.title,
      searchTerm: filters.searchTerm,
      pageIndex: 1,
      limit: filters.limit,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    setIsOpen(false);
  };

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return {
    localFilters,
    setLocalFilters,
    isOpen,
    setIsOpen,
    hasActiveFilters,
    handleApplyFilters,
    handleClearFilters,
  };
};
