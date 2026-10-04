import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import profileImg from '../assets/profile.png';
import resumePdf from '../assets/gauri_resume.pdf';
import { experience, leadership, publications, Experience } from "@/data/experience";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="md:sticky md:top-24">
              <div className="rounded-lg overflow-hidden mb-4 max-w-xs mx-auto md:max-w-none">
                <img
                  src={profileImg}
                  alt="Gauri Sharma"
                  className="w-full aspect-square object-cover bg-background"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Button asChild className="w-full">
                  <a href={resumePdf} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </a>
                </Button>

                <a
                  href="https://www.linkedin.com/in/gs-softwaredev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <section className="mb-12">
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm in the integrated B.S./M.S. Computer Science program at <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Georgia Tech</a>, finishing in 2028. I like backend and low-latency systems: the parts where a retry, a partial write, or a few microseconds decide whether the thing works.
                </p>
                <p>
                  This summer I was an SDE intern at AWS, building the service behind the catalog's manual review portal. Most of my time went into making writes safe across S3, DynamoDB, and SNS, and making retries idempotent. Before that I built a Go order execution engine with a small team, supervised by Millennium, and a Kubernetes plug-in for IBM Research's KubeStellar.
                </p>
                <p>
                  On the research side, I work on cost-aware LLM routing with Prof. Stephen Mussmann, and on LLM safety and image privacy with the <a href="https://socweb.cc.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Social Dynamics & Wellbeing Lab</a> under <a href="https://www.cc.gatech.edu/people/munmun-de-choudhury" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Dr. Munmun De Choudhury</a>.
                </p>
                <p>
                  Outside of that I lead currencies research at Trading @ GT, run partnerships for Big Data Big Impact, and eat a lot of ramen.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Experience</h2>
              <div className="space-y-8">
                {experience.map(item => (
                  <TimelineItem key={`${item.org}-${item.title}`} item={item} />
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Publications</h2>
              <ul className="space-y-3">
                {publications.map(pub => (
                  <li key={pub.url}>
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary hover:underline">
                      {pub.title}
                    </a>
                    <span className="text-muted-foreground">. {pub.venue}.</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Leadership</h2>
              <div className="space-y-8">
                {leadership.map(item => (
                  <TimelineItem key={`${item.org}-${item.title}`} item={item} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-6">Education</h2>
              <div className="relative pl-8 border-l border-border">
                <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                <div className="text-sm text-muted-foreground mb-1">2024 – 2028</div>
                <h3 className="text-lg font-medium">B.S./M.S. in Computer Science</h3>
                <div className="text-muted-foreground mb-2">Georgia Institute of Technology</div>
                <p className="text-sm text-muted-foreground">
                  Certifications: Stanford ML Specialization, AWS Certified Cloud Practitioner, KCNA, Bloomberg Market Concepts
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ item }: { item: Experience }) => {
  return (
    <div className="relative pl-8 border-l border-border">
      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
      <div className="text-sm text-muted-foreground mb-1">{item.period}</div>
      <h3 className="text-lg font-medium">{item.title}</h3>
      <div className="text-muted-foreground mb-2">{item.org} · {item.location}</div>
      <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
        {item.points.map(point => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default AboutPage;
