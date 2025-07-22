
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
  image?: string; // Optional image URL
}