
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useEffect } from "react";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  
  useEffect(() => {
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Find related posts (sharing at least one tag)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        
        <article>
          <header className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground mb-3">
              <Calendar className="mr-2 h-4 w-4" />
              {post.date}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="flex items-center bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full hover:bg-secondary/80 transition-colors"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Link>
              ))}
            </div>
            
            <p className="text-xl text-muted-foreground">{post.summary}</p>
          </header>
          
          <div 
            className="blog-content"
            dangerouslySetInnerHTML={{ 
              __html: markdownToHtml(post.content) 
            }} 
          />
        </article>
        
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RelatedPostCard = ({ post }: { post: typeof blogPosts[0] }) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
      <h3 className="text-lg font-medium mb-2">
        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
          {post.title}
        </Link>
      </h3>
      <div className="flex flex-wrap gap-1 mb-2">
        {post.tags.map(tag => (
          <span 
            key={tag} 
            className="bg-secondary text-secondary-foreground text-xs px-1.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

// Simple markdown to HTML converter
// In a real app, you would use a proper markdown library
const markdownToHtml = (markdown: string): string => {
  // Split content into lines
  const lines = markdown.split('\n');
  let html = '';
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      continue;
    }
    
    // Headers
    if (line.startsWith('# ')) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h1>${line.substring(2)}</h1>\n`;
    } else if (line.startsWith('## ')) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h2>${line.substring(3)}</h2>\n`;
    } else if (line.startsWith('### ')) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h3>${line.substring(4)}</h3>\n`;
    }
    // Bullet points
    else if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `<li>${line.substring(2)}</li>\n`;
    }
    // Code blocks
    else if (line.startsWith('```')) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      // Find the closing ```
      let codeBlock = '';
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeBlock += lines[i] + '\n';
        i++;
      }
      html += `<pre><code>${codeBlock.trim()}</code></pre>\n`;
    }
    // Regular paragraphs
    else {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      // Handle inline formatting
      let formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      html += `<p>${formattedLine}</p>\n`;
    }
  }
  
  // Close any open list
  if (inList) {
    html += '</ul>\n';
  }
  
  return html;
};

export default BlogPostPage;