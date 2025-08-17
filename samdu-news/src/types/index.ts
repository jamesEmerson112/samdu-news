// Post type definitions
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured: boolean;
  readTime: number; // in minutes
}

// SEO metadata types
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

// Component prop types
export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export interface PostListProps {
  posts: Post[];
  title?: string;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

// Pagination types
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}
