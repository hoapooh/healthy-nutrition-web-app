import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HomeBlogCardProps {
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  minutesToRead?: number;
  date?: string;
}

const HomeBlogCard = ({
  image = {
    src: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
    alt: "Blog post image",
  },
  title,
  description,
  minutesToRead,
  date,
}: HomeBlogCardProps) => {
  return (
    <div className="rounded-md border border-gray-200 p-2 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="overflow-hidden rounded-md">
        <Link href={"/"}>
          <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={200}
            className="max-h-40 w-full rounded-md object-cover transition-transform duration-200 hover:scale-110"
          />
        </Link>
      </div>
      <div className="mt-2">
        <Link href={"/"} className="block">
          <h3 className="text-base font-semibold transition-colors duration-200 hover:text-green-600">
            {title}
          </h3>
        </Link>

        <p className="my-3 line-clamp-2 text-sm text-gray-500">{description}</p>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          {date && (
            <Badge className="text-xs" variant={"calendar"}>
              <Calendar className="size-3" /> {date}
            </Badge>
          )}
          {minutesToRead && (
            <Badge className="text-xs" variant={"minutes"}>
              <Clock className="size-3" /> {minutesToRead} Min Read
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBlogCard;
