
import { Link } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import GraphPattern from "@/components/GraphPattern";
import { ArrowRight, Github, Linkedin, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { useState, useEffect } from "react";
import profileImg from '../assets/profile.png';
import resumePdf from '../assets/gauri_resume.pdf';
import cLogo from '../assets/c-1.svg';

const TypewriterText = ({ text, delay = 100 }: { text: string; delay?: number }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length) {
      // Wait a bit before starting over
      const restartTimeout = setTimeout(() => {
        setCurrentText("");
        setCurrentIndex(0);
        setIsTyping(true);
      }, 2000); // Wait 2 seconds before restarting

      return () => clearTimeout(restartTimeout);
    }
  }, [currentIndex, delay, text, isTyping]);

  return (
    <span className="inline-block">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HomePage = () => {
  // Get the 3 most recent blog posts
  const recentPosts = blogPosts.slice(0, 3);

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
              Computer Science @ Georgia Tech | Software Developer |
              AI Research 
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              I study multi-agent communication, AI safety, and AI in finance.
              <br />
              <TypewriterText text="Nice to meet you!" delay={150} />
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
              A selection of my recent work from projects and research!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="Towards Quantitative Benchmarking of MAS"
              role="Lead Researcher"
              period="2025 - Present"
              description="This research paper introduces a formal framework for evaluating the security of multi-agent systems, focusing on real-world attack vectors and protocol vulnerabilities. We propose a new benchmarking methodology for agentic AI, develop tools for simulating adversarial scenarios, and collaborate with leading researchers to set new standards for MAS security. Our work aims to make agent-based AI safer, more robust, and easier to audit at scale."
              tags={["Python", "PyTorch", "Multi-Agent RL"]}
              link="/projects"
            />
            
            <ProjectCard 
              title="SimpliEarn Project"
              role="Sentiment Analysis Team Lead"
              period="2024 - Present"
              description="SimpliEarn is an AI-powered platform that transforms earnings calls into actionable insights for investors and analysts. I led the development of a multimodal sentiment analysis pipeline, integrating text and audio analysis, explainable stock charting, and a RAG chatbot for financial Q&A. The platform leverages state-of-the-art NLP and deep learning to deliver fast, data-driven decision support for the finance industry."
              tags={["TensorFlow", "Human Studies", "Statistical Analysis"]}
              link="/projects#aegentdev"
            />
          </div>
          
          <div className="flex justify-center mt-12">
            <Button asChild variant="outline">
              <Link to="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 text-foreground">Tech Stack</h2>
            <p className="text-muted-foreground max-w-2xl mb-8">
              Frameworks I've used in research and development projects!
            </p>
          </div>
          
          <div className="mb-8">
          <h3 className="text-xl font-medium mb-4 text-center text-foreground">Development</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              <TechStackItem name="Python" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" />
              <TechStackItem name="Java" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" />
              <TechStackItem name="C" imageUrl={cLogo} />
              <TechStackItem name="C++" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" />
              <TechStackItem name="Go" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg" />
              <TechStackItem name="Node.js" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" />

            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              <TechStackItem name="Git" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" />
              <TechStackItem name="GitHub" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" />
              <TechStackItem name="VS Code" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" />
              <TechStackItem name="Django" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" />
              <TechStackItem name="IntelliJ IDEA" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg" />
              <TechStackItem name="PyCharm" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pycharm/pycharm-original.svg" />
              <TechStackItem name="Jupyter" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg" />
              <TechStackItem name="Kubernetes" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" />
            </div>
          </div>
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              <TechStackItem name="HTML5" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" />
              <TechStackItem name="CSS" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" />
              <TechStackItem name="JavaScript" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" />
              <TechStackItem name="Chart.js" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chartjs/chartjs-original.svg" />
              <TechStackItem name="Vercel" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" />
              <TechStackItem name="Netlify" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg" />
            
            </div>
          </div>


          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4 text-center text-foreground">Research</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              <TechStackItem name="Keras" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg" />
              <TechStackItem name="Matplotlib" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg" />
              <TechStackItem name="NumPy" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" />
              <TechStackItem name="Pandas" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" />
              <TechStackItem name="PyTorch" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" />
              <TechStackItem name="scikit-learn" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" />
              <TechStackItem name="TensorFlow" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" />
              <TechStackItem name="Google Colab" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecolab/googlecolab-original.svg" />
              <TechStackItem name="Terminal" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" />
              <TechStackItem name="Markdown" imageUrl="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/markdown/markdown-original.svg" />
           
            </div>
          </div>

          
        </div>
      </section>
      
      {/* Recent Blog Posts Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Articles</h2>
            <p className="text-muted-foreground max-w-2xl">
              Thoughts and insights on AI research, computer science, and academic life.
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
      <p className="mb-4">{description}</p>
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

const TechStackItem = ({
  name,
  imageUrl
}: {
  name: string;
  imageUrl: string;
}) => {
  // List of icons to invert in dark mode
  const invertInDark = [
    'GitHub',
    'Vercel',
    'Pandas',
    'Terminal',
    'Markdown'
  ];
  const shouldInvert = invertInDark.includes(name);
  return (
    <div className="group relative">
      <div className="w-14 h-14 bg-card rounded-md shadow-sm flex items-center justify-center p-2 border border-border group-hover:bg-black dark:group-hover:bg-white group-hover:border-black dark:group-hover:border-white transition-colors">
        <img 
          src={imageUrl} 
          alt={`${name} logo`} 
          className={`max-w-full max-h-full object-contain group-hover:opacity-0 transition-opacity${shouldInvert ? ' dark:invert' : ''}`}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[7px] font-light opacity-0 group-hover:opacity-100 transition-opacity text-white dark:text-black">
          {name}
        </span>
      </div>
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