import { CategoryParams } from "@/types/category";
import { useEffect, useState } from "react";

interface CategoryFiltersProps {
  filters: CategoryParams;
  onFiltersChange: (filters: CategoryParams) => void;
}

const useCategoryFilters = ({
  filters,
  onFiltersChange,
}: CategoryFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<CategoryParams>(filters);
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = Boolean(filters.type || filters.description);

  const handleApplyFilters = () => {
    onFiltersChange({ ...localFilters, pageIndex: 1 });
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      name: filters.name,
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

export default useCategoryFilters;
