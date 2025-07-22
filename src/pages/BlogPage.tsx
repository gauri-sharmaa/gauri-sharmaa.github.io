
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogPosts";
import { Search, Calendar } from "lucide-react";

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Initialize from URL parameters
  useEffect(() => {
    const tagFromUrl = searchParams.get('tag');
    if (tagFromUrl) {
      setSelectedTag(tagFromUrl);
    }
  }, [searchParams]);
  
  // Get all unique tags
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();
  
  // Filter posts based on search query and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });
  
  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    if (tag) {
      setSearchParams({ tag });
    } else {
      setSearchParams({});
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thoughts and insights on AI research, computer science, and academic life.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 flex items-center pointer-events-none">
              <Search className="text-muted-foreground h-4 w-4" />
            </div>
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => handleTagSelect(null)}
            >
              All
            </Button>
            
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => handleTagSelect(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <BlogPostCard key={post.slug} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery("");
                  handleTagSelect(null);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BlogPostCard = ({ post }: { post: typeof blogPosts[0] }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Calendar className="mr-2 h-4 w-4" />
            {post.date}
          </div>
          
          <h2 className="text-2xl font-semibold mb-3">
            <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </h2>
          
          <p className="text-muted-foreground mb-4">{post.summary}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Button asChild variant="link" className="p-0">
            <Link to={`/blog/${post.slug}`}>Read Article</Link>
          </Button>
        </div>
        
        {post.image && (
          <div className="hidden md:block flex-shrink-0">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-48 h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;