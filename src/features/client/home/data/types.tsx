export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Interface cho HomeBlogCard (homepage)
export interface HomeBlogCardData {
  image?: {
    src: string;
    alt: string;
  };
  title: string;
  description: string;
  minutesToRead?: number;
  date?: string;
  slug?: string;
}

// Interface cho BlogPost (trang blog)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: {
    src: string;
    alt: string;
  };
  date: string;
  tags: string[];
  minutesToRead?: number;
}
