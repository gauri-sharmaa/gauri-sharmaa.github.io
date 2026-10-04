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
          Stuff I've built, newest first.
        </p>

        <div className="space-y-4">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const { id, title, when, blurb, tags, links, image } = project;

  return (
    <div id={id} className="bg-card rounded-lg border border-border overflow-hidden scroll-mt-24 flex flex-col sm:flex-row">
      {image && (
        <div className="sm:w-48 shrink-0 aspect-video sm:aspect-auto bg-muted">
          <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-sm text-muted-foreground">{when}</span>
        </div>

        <p className="text-muted-foreground">{blurb}</p>

        <div className="flex flex-wrap items-center gap-2 mt-1">
          {tags.map(tag => (
            <span
              key={tag}
              className="bg-secondary text-secondary-foreground text-xs px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {links.map(link => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center hover:underline ml-1"
            >
              {link.label === "GitHub" ? (
                <Github className="mr-1 h-4 w-4" />
              ) : (
                <ExternalLink className="mr-1 h-4 w-4" />
              )}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
