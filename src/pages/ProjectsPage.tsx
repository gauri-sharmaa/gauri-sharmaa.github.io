import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects, Project } from "@/data/projects";

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
          Systems, research, and hackathon builds, newest first.
        </p>

        <div className="space-y-12">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { id, title, period, role, summary, points, tags, links, image } = project;

  return (
    <div id={id} className="bg-card rounded-lg border border-border overflow-hidden scroll-mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 p-6 flex flex-col">
          {image && (
            <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
              <img
                src={image}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h3 className="text-xl font-semibold mb-2">{title}</h3>

          <div className="text-sm text-muted-foreground mb-1">{period}</div>
          <div className="text-sm text-muted-foreground mb-4">{role}</div>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <span
                key={tag}
                className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {links.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-2">
              {links.map(link => (
                <Button
                  key={link.url}
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
          )}
        </div>

        <div className="md:col-span-2 p-6 border-t md:border-t-0 md:border-l border-border">
          <p className="text-lg mb-4">{summary}</p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            {points.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
