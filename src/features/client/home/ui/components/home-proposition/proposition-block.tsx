import { cn } from "@/lib/utils";
import React from "react";
interface PropositionBlockProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
}

const PropositionBlock = ({
  className = "",
  icon,
  title,
  description,
}: PropositionBlockProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="group flex items-center justify-center rounded-full border border-green-600 p-6 transition-colors duration-150 hover:bg-green-600">
        {icon ? icon : <div className="text-green-600">🌱</div>}
      </div>
      <p className="mt-4 text-center text-sm font-bold uppercase">{title}</p>
      <p className="mt-3 text-center text-xs font-medium text-gray-500">
        {description}
      </p>
    </div>
  );
};

export default PropositionBlock;
