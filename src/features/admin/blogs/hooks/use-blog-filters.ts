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

  const hasActiveFilters = Boolean(filters.status || filters.author);

  const handleApplyFilters = () => {
    onFiltersChange({ ...localFilters, pageIndex: 1 });
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      title: filters.title,
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
