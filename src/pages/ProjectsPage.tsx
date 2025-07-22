
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
          A collection of my work across research papers, hackathons, and personal projects in MAS, AI Safety, Finance and more.
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
            id="benchmarking-mas"
            title="Towards Quantitative Benchmarking of MAS" 
            period="Summer 2025"
            role="Head Researcher"
            description="Towards Quantitative Benchmarking of MAS - Research Paper"
            longDescription="Towards Quantitative Benchmarking for Multi-Agent System Security is an ongoing research paper that proposes a formal framework for evaluating the security of agentic AI systems. The work introduces metrics for agent impact chains, cascading failure scenarios, and protocol-level blast radius estimation, drawing from real-world agent coordination and adversarial prompting techniques. By defining measurable threat surfaces in multi-agent ecosystems, the paper aims to support reproducible, rigorous benchmarking standards for evaluating AI system robustness at scale."
            tags={["Agentic AI", "LLM Safety", "Benchmarking", "Attack Vectors"]}
            links={[
              { label: "Website", url: "https://aegentdev.com/" }
            ]}
            image="/src/assets/mas.png"
          />

        <ProjectCard 
            id="aegentdev"
            title="AegentDev" 
            period="Summer 2025"
            role="Co Founder"
            description="AegentDev – Fusen Fellowship Project"
            longDescription="Aegent Dev is an experimental research and development initiative focused on securing agentic AI systems and multi-agent communication. The project explores protocol-level safeguards for agent-to-agent interaction using the Model Context Protocol (MCP) and evaluates cascading vulnerabilities via custom benchmark scenarios. We're developing tools to audit, simulate, and harden collaborative AI workflows—paving the way for more interpretable, intent-aligned, and resilient agent-based infrastructure."
            tags={["Agentic AI", "MCP", "Benchmarking", "Security"]}
            links={[
              { label: "Website", url: "https://aegentdev.com/" }
            ]}
            image="/src/assets/aegent.png"
          />

          <ProjectCard 
            id="simpli-earn"
            title="SimpliEarn"
            period="2024 - Present"
            role="Project Lead"
            description="SimpliEarn project @ Big Data Big Impact at GT"
            longDescription="SimpliEarn is an AI-powered platform that transforms earnings calls into actionable insights. As Project Lead of the sentiment analysis team, I developed a multimodal sentiment analysis pipeline using FinBERT and Wav2Vec, aligning speech with transcripts to boost sentiment accuracy by 67%. The platform enables investors to quickly digest earnings calls through summarized content, trend visualizations, and natural language insights—supporting faster, data-informed financial decisions."
            tags={["Data Visualization", "Sentiment Analysis", "Python", "Finance"]}
            links={[
              { label: "Club Website", url: "https://gtbigdatabigimpact.com/" }
            ]}
            image="/src/assets/simpli.png"
          />




          <ProjectCard 
            id="acid-mine-drainage"
            title="Acid Mine Drainage Visualization"
            period="2024 - 2025"
            role="Grand Challenges, Researcher"
            description="Grand Challenges Remote Sensing Project"
            longDescription="This year long research project leveraged Google Earth Engine and satellite imagery to remotely monitor and send chemicals for Acid Mine Drainage remediation in West Virginia. By utilizing satellite data, the system tracks and assesses chemical usage and distribution across various regions. We also novelly, focus on rare earth element detection for this project, allowing for potential AMD remediation efforts to be more fiscally lucrative. This approach provides an efficient, real-time solution for monitoring environmental impacts. We chose to focus on Acid Mine Drainage because it is a major environmental issue in West Virginia, and it is a problem that is not well understood, and remediation efforts are not well funded."
            tags={["Remote Sensing", "Google Earth Engine", "Python", "Satellite Imaging", "Environmental Science"]}
            links={[
              { label: "Website", url: "https://itsevelync.github.io/AMD-GC/" }
            ]}
            image="/src/assets/amd.jpg"
          />
          
          <ProjectCard 
            id="podcast-research"
            title="Podcast Audio-Textual Research"
            period="2024"
            role="Researcher"
            description="Audio Stylistic and Textual Analysis of Podcasts."
            longDescription="This machine learning project analyzed audio stylistic and textual variations linked to listener sentiments in news podcasts. Using OPENSMILE and TextBlob, I analyzed transcripts and listener feedback from 30 NYT podcasts to understand audience engagement. This paper recieved an honorable mention for its emperical process at the 2024 AP Research MENA Forum at AU Dubai"
            tags={["NLP", "Sentiment Analysis", "OPENSMILE", "TextBlob"]}
            links={[
              { label: "Paper", url: "https://drive.google.com/file/d/1oWdZqiYPbXr52UoqpPgSr0a-AYpqzhrt/view" }
            ]}
            image="/src/assets/podcast.jpg"
          />
          
          <ProjectCard 
            id="visualease"
            title="VisualEase"
            period="2024"
            role="Team Member"
            description="Hack GT 2024 Project"
            longDescription="VisualEase is an innovative memory training web application designed to enhance active recall through AI-generated images and an interactive flashcard interface. The seamless and responsive front-end experience is powered by LLAMA3, Node.js, and Flask."
            tags={["AI", "Memory Training", "GROQ", "Flux.1 API"]}
            links={[
              { label: "DevPost Submission", url: "https://devpost.com/software/visualease" }
            ]}
            image="/src/assets/visualease.jpg"
          />

          <ProjectCard 
            id="engarde"
            title="Engarde"
            period="2025"
            role="Team Member"
            description="Hackalytics 2025 Project"
            longDescription="EnGarde is a web platform designed to streamline the fencing recruitment process, bridging the gap between international athletes and U.S. collegiate coaches. The platform allows fencers to create profiles showcasing their skills, rankings, and practice footage."
            tags={["Django", "Selenium", "Data Scraping", "Web Analytics"]}
            links={[
              { label: "DevPost Submission", url: "https://devpost.com/software/en-guarde" }
            ]}
            image="/src/assets/engarde.jpg"
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
  image: string; 
}) => {
  return (
    <div id={id} className="bg-card rounded-lg border border-border overflow-hidden scroll-mt-[200px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 p-6 flex flex-col">
          <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
          
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