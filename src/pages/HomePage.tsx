
import { Link } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import GraphPattern from "@/components/GraphPattern";
import { ArrowRight, Github, Linkedin, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { projects } from "@/data/projects";
import profileImg from '../assets/profile.png';
import resumePdf from '../assets/gauri_resume.pdf';

const HomePage = () => {
  // Get the 3 most recent blog posts
  const recentPosts = blogPosts.slice(0, 3);
  const featured = projects.filter(p => p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-slate-50/30 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 relative z-10 pointer-events-none">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="relative mb-8 pointer-events-auto">
              <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img 
                  src={profileImg} 
                  alt="Gauri Sharma" 
                  className="w-full h-full object-cover bg-background"
                />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Gauri Sharma
            </h1>
            
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">
              B.S./M.S. Computer Science @ Georgia Tech
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              I build backend and low-latency systems, and research cost-aware LLM routing.
              Previously SDE intern at AWS and SWE intern at IBM Research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto mb-6">
              <Button asChild size="lg">
                <Link to="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">
                  Read Blog <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center gap-2 mb-8 pointer-events-auto">
              <Button asChild variant="outline" size="icon" aria-label="GitHub">
                <a href="https://github.com/gauri-sharmaa" target="_blank" rel="noopener noreferrer">
                  <Github size={32} />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" aria-label="LinkedIn">
                <a href="https://www.linkedin.com/in/gs-softwaredev/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={32} />
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" aria-label="Medium">
                <a href="https://medium.com/@gaurisharma1686" target="_blank" rel="noopener noreferrer">
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' width='32' height='32' fill='currentColor'><path d='M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6 .6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z'/></svg>
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" aria-label="Resume">
                <a href={resumePdf} target="_blank" rel="noopener noreferrer">
                  <BookOpen size={32} />
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 z-0">
          <GraphPattern />
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              Recent systems and research work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map(project => (
              <ProjectCard
                key={project.id}
                title={project.title}
                role={project.role}
                period={project.period}
                description={project.summary}
                tags={project.tags}
                link={`/projects#${project.id}`}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Recent Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Writing</h2>
            <p className="text-muted-foreground max-w-2xl">
              Notes on agent security, research, and infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <BlogPostCard 
                key={post.slug}
                title={post.title}
                date={post.date}
                summary={post.summary}
                tags={post.tags}
                slug={post.slug}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline">
              <Link to="/blog">View All Articles</Link>
            </Button> 
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectCard = ({ 
  title, 
  role, 
  period, 
  description, 
  tags, 
  link 
}: { 
  title: string; 
  role: string; 
  period: string; 
  description: string; 
  tags: string[]; 
  link: string; 
}) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex flex-col gap-1 mb-4">
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="text-sm text-muted-foreground">{period}</p>
      </div>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button asChild variant="link" className="p-0">
        <Link to={link}>Learn More</Link>
      </Button>
    </div>
  );
};

const BlogPostCard = ({ 
  title, 
  date, 
  summary, 
  tags, 
  slug 
}: { 
  title: string; 
  date: string; 
  summary: string; 
  tags: string[]; 
  slug: string; 
}) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="text-sm text-muted-foreground mb-2">{date}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="mb-4 text-muted-foreground">{summary}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span 
            key={index} 
            className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <Button asChild variant="link" className="p-0">
        <Link to={`/blog/${slug}`}>Read Article</Link>
      </Button>
    </div>
  );
};

export default HomePage;