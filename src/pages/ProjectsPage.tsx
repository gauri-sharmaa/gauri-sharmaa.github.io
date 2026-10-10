
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import masImg from '../assets/mas.png';
import aegentImg from '../assets/aegent.png';
import simpliImg from '../assets/simpli.png';
import amdImg from '../assets/amd.jpg';
import podcastImg from '../assets/podcast.jpg';
import visualeaseImg from '../assets/visualease.jpg';
import engardeImg from '../assets/engarde.jpg';
import guardrailsImg from '../assets/guardrails.png';

const ProjectsPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    }
  }, [location]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Research papers, hackathons, and side projects.
        </p>
        
        <div className="space-y-12">
          
        {/* <ProjectCard 
            id="dummy"
            title="Dummy project"
            period="years"
            role="role"
            description="dummy"
            longDescription=""
            tags={["word"]}
            links={[
              { label: "Club Website", url: "https://gtbigdatabigimpact.com/" }
            ]}
            image="/src/assets/simpli.png"
          /> */}

          <ProjectCard 
            id="protocol-guardrails"
            title="Position: Protocol-Aware Guardrails Are Necessary for Multi-Agent Systems"
            period="Fall 2026"
            role="Co-author, with Vidhi Kulkarni"
            description="Poster at the NeurIPS 2026 Agents in the Wild workshop"
            longDescription="Most guardrails check one agent's messages, one turn at a time. But in multi-agent systems, harm usually comes from how agents hand off work and trust each other's outputs. We argue guardrails need to understand those protocols, and sketch what that could look like."
            tags={["Multi-Agent Systems", "AI Safety", "Guardrails", "NeurIPS Workshop"]}
            links={[
              { label: "Paper", url: "https://openreview.net/forum?id=lQNW0zvJG5" }
            ]}
            image={guardrailsImg}
          />

          <ProjectCard 
            id="benchmarking-mas"
            title="Towards Quantitative Benchmarking of MAS" 
            period="Summer 2025"
            role="Head Researcher"
            description="Research paper"
            longDescription="A framework for putting numbers on multi-agent security: how attacks chain across agents, how far a failure spreads, and how big the blast radius gets at the protocol level."
            tags={["Agentic AI", "LLM Safety", "Benchmarking", "Attack Vectors"]}
            links={[
              { label: "POV Paper", url: "https://arxiv.org/abs/2507.21146" }
            ]}
            image={masImg}
          />

        <ProjectCard 
            id="aegentdev"
            title="AegentDev" 
            period="Summer 2025"
            role="Co Founder"
            description="Fusen World Fellowship"
            longDescription="Tools for stress-testing agent systems over MCP, so you find where they break before someone else does."
            tags={["Agentic AI", "MCP", "Benchmarking", "Security"]}
            links={[
              { label: "Website", url: "https://aegentdev.com/" }
            ]}
            image={aegentImg}
          />

          <ProjectCard 
            id="simpli-earn"
            title="SimpliEarn"
            period="2024 - Present"
            role="Project Lead"
            description="Big Data Big Impact @ Georgia Tech"
            longDescription="Turns earnings calls into something investors can skim. I led the sentiment team and built a pipeline with FinBERT and Wav2Vec that lines up the audio with the transcript, which improved sentiment accuracy by 67%."
            tags={["Data Visualization", "Sentiment Analysis", "Python", "Finance"]}
            links={[
              { label: "Club Website", url: "https://gtbigdatabigimpact.com/" }
            ]}
            image={simpliImg}
          />




          <ProjectCard 
            id="acid-mine-drainage"
            title="Acid Mine Drainage Visualization"
            period="2024 - 2025"
            role="Grand Challenges, Researcher"
            description="Grand Challenges"
            longDescription="We used satellite imagery and Google Earth Engine to track acid mine drainage cleanup in West Virginia, and looked for rare earth elements that could help pay for it."
            tags={["Remote Sensing", "Google Earth Engine", "Python", "Satellite Imaging", "Environmental Science"]}
            links={[
              { label: "Website", url: "https://itsevelync.github.io/AMD-GC/" }
            ]}
            image={amdImg}
          />
          
          <ProjectCard 
            id="podcast-research"
            title="Podcast Audio-Textual Research"
            period="2024"
            role="Researcher"
            description="AP Research"
            longDescription="How do voice and word choice in news podcasts shape how listeners feel? I studied 30 NYT episodes to find out. Honorable mention at the 2024 AP Research MENA Forum."
            tags={["NLP", "Sentiment Analysis", "OPENSMILE", "TextBlob"]}
            links={[
              { label: "Paper", url: "https://drive.google.com/file/d/1oWdZqiYPbXr52UoqpPgSr0a-AYpqzhrt/view" }
            ]}
            image={podcastImg}
          />
          
          <ProjectCard 
            id="visualease"
            title="VisualEase"
            period="2024"
            role="Team Member"
            description="HackGT 2024"
            longDescription="Flashcards with AI-generated images, to help things stick."
            tags={["AI", "Memory Training", "GROQ", "Flux.1 API"]}
            links={[
              { label: "DevPost Submission", url: "https://devpost.com/software/visualease" }
            ]}
            image={visualeaseImg}
          />

          <ProjectCard 
            id="engarde"
            title="Engarde"
            period="2025"
            role="Team Member"
            description="Hackalytics 2025"
            longDescription="Helps international fencers get noticed by U.S. college coaches, with profiles, rankings, and practice footage in one place."
            tags={["Django", "Selenium", "Data Scraping", "Web Analytics"]}
            links={[
              { label: "DevPost Submission", url: "https://devpost.com/software/en-guarde" }
            ]}
            image={engardeImg}
          />
          
          
        </div>
      </div>
    </div>
  );
};

interface ProjectLink {
  label: string;
  url: string;
}

const ProjectCard = ({ 
  id,
  title, 
  period, 
  role, 
  description, 
  longDescription, 
  tags, 
  links, 
  image 
}: { 
  id: string;
  title: string; 
  period: string; 
  role: string; 
  description: string; 
  longDescription: string; 
  tags: string[]; 
  links: ProjectLink[]; 
  image?: string; 
}) => {
  return (
    <div id={id} className="bg-card rounded-lg border border-border overflow-hidden scroll-mt-[200px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 p-6 flex flex-col">
          {image && (
            <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          
          <div className="text-sm text-muted-foreground mb-1">{period}</div>
          <div className="text-sm text-muted-foreground mb-4">{role}</div>
          
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
          
          <div className="mt-auto flex flex-wrap gap-2">
            {links.map((link, index) => (
              <Button 
                key={index} 
                variant={link.label === "GitHub" ? "outline" : "default"} 
                size="sm" 
                asChild
              >
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  {link.label === "GitHub" ? (
                    <Github className="mr-2 h-4 w-4" />
                  ) : (
                    <ExternalLink className="mr-2 h-4 w-4" />
                  )}
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2 p-6 border-t md:border-t-0 md:border-l border-border">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-lg mb-4">{description}</p>
            <p>{longDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;