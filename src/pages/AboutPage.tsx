
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import profileImg from '../assets/profile.png';
import resumePdf from '../assets/gauri_resume.pdf';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Hello!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={profileImg} 
                  alt="Gauri Sharma" 
                  className="w-full aspect-square object-cover bg-background"
                />
              </div>
              
              <div className="flex flex-col gap-3">
                <a href={resumePdf} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                </a>
                
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
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">A little bit about me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a Computer Science student at <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Georgia Tech</a>, interested in agentic systems, LLM safety, and AI in finance. My current work focuses on securing multi-agent systems (MAS) that enable AI agents and humans to collaborate effectively.
                </p>
                <p>
                  I’m investigating emergent, framework-agnostic communication protocols in MAS, simulating attack vectors towards qunatative benchmarking such systems in the context of emerging protocols such as A2A and MCP. I'm grateful to be co-authoring this work with <a href="https://www.linkedin.com/in/kenhuang8/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ken Huang</a>, with applications in agentic communications and AI safety.
                </p>
                <p>
                  Previously, I researched online harassment and LLM behavior with the <a href="https://socweb.cc.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Social Dynamics & Wellbeing Lab</a> under the supervision of <a href="https://www.cc.gatech.edu/people/munmun-de-choudhury" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Dr. Munmun De Choudhury
                  </a>. I’m also a VIP researcher at the <a href="https://qcf.gatech.edu/partner" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Financial Services Innovation Lab</a> and contribute to <a href="https://developer.ibm.com/components/kubernetes/openprojects/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IBM Research</a>’s <a href="https://github.com/kubestellar/kubestellar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">KubeStellar</a> project for multi-cluster cloud management.
                </p>
                <p>
                  I currently serve as a project lead at Big Data Big Impact, where I guide teams in developing data-driven solutions that address real-world challenges in healthcare and social impact.
                </p>
              </div>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Research Interests</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Multi-agent reinforcement learning and emergent communication</li>
                <li>AI alignment and safety in autonomous systems</li>
                <li>Agent communication frameworks and protocols such as A2A/ACP/MCP</li>
                <li>Ethical considerations in AI development and deployment</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Experiences</h2>
              <div className="space-y-8">
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-1">May 2025 – July 2025</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">IBM SWE Intern for Open Source</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a summer intern for the open source <span className="text-foreground">KubeStellar</span> project with IBM Research and the GT open source program office, I collaborated with IBM research engineers to implement a <span className="text-foreground">krew plug-in</span> for <span className="text-foreground">parallel multi-cluster viewing</span>, reducing information aggregation time by <span className="text-foreground">72%</span>. I also implemented <span className="text-foreground">46 kubectl</span> commands for KubeStellar’s multi plug-in, strengthening <span className="text-foreground">CI/CD</span> and Kubernetes managementskills.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-1">May 2025 – Aug 2025</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Fusen World Fellowship – AegentDev Co-Founder</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a part of the Fusen World Fellowship, I developed AegentDev, a multi-agent framework for stress testing agentic systems through an MCP interface. I also collaborated with researchers from <span className="text-foreground">MIT’s NANDA</span> to co-authored a paper introducing a new benchmarking methodology for <span className="text-foreground">agent communication protocols</span>. This venture was supported by the team at Fusen World and <span className="text-foreground">Chris Klaus</span>, founder of Internet Security Systems (IBM Acquired)!
                  </p>
                </div>
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Machine Learning for Financial Markets Lab</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a student researcher with <span className="text-foreground">FSIL's Vertically Integrated Program</span> at Georgia Tech, I developed novel taxonomy to evaluate model performance on <span className="text-foreground">professional structured texts</span> such as SEC filings and legal contracts. I also ran data pipelines to <span className="text-foreground">accumulate textual and embedding data</span> for compliance-driven document generation tasks.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Social Dynamics and Wellbeing Lab @ Georgia Tech</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a research assistant, I co-authored a study on jailbroken LLM agents simulating real-world harassment using prompting, memory injection, and fine-tuning. I helped survey and develop jailbroken multi-agent pipelines (<span className="text-foreground">of SOTA models including GPT-4o, Claude 3.5 Sonnet, and Llama 3.1</span>) to evaluate toxic dialogues in 8 harassment types using ASR, TTS, and RR metrics.
                  </p>
                </div>
                
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">SimpliEarn Project @ Big Data Big Impact Club @ Georgia Tech</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As project lead, I built a multimodal sentiment pipeline for earnings calls by segmenting speech and timestamping audio to align with transcripts, using <span className="text-foreground">FinBERT</span> and <span className="text-foreground">Wav2Vec</span>. This boosted sentiment accuracy through cross-modal trend analysis and visualization.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">StartUpExchange @ Georgia Tech</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a member of the events board, I coordinated event operations for a startup club at Georgia Tech, organizing over five events annually with <span className="text-foreground">500+</span> in attendance. My responsibilities included staffing, and ensuring smooth execution of speaker presentations and logistics for each event.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-border">
                  <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <div className="text-sm text-muted-foreground mb-1">Jul 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Market Insights Head, Trading @ GT</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-1">
                    Currencies Team Lead | Macroeconomic Research, Market Strategy, Financial Writing
                  </p>
                  <p className="text-muted-foreground mb-3">
                    Led weekly macroeconomic research for <span className="text-foreground">FX markets</span>, translating global central bank signals and geopolitical events into weekly written trading briefs. These briefs were shared with <span className="text-foreground">400+ student investors</span> on LinkedIn. I also mentored new analysts and coordinated publishing cycles for the team.
                  </p>
                </div>
              </div>
            </section>


            <br></br>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">Education</h2>
              <div className="space-y-8">
                <TimelineItem 
                  period="Present - May 2027"
                  title="B.S. in Computer Science"
                  organization="Georgia Institute of Technology"
                  description="Concentration in Intelligence and Information Internetworks"
                  bullets={[
                    "Leading research on multi-agent communication protocols and AI security",
                    "Coaching Grand Challenges LLC teams in design thinking and problem solving",
                    "Project Lead at Big Data Big Impact developing in financial NLP",
                    "VIP researcher at Financial Services Innovation Lab",
                    "Researcher at Social Dynamics and Wellbeing Lab"
                  ]}
                />
                
                {/* <TimelineItem 
                  period="2020 - 2024"
                  title="High School"
                  organization="American School of Doha"
                  description=""
                  bullets={[
                    "Recipient of the Director's Scholarship Award",
                    "NHS President",
                    "Student Tutoring Organization President",
                    "Varsity Academic Games Team Captain",
                    "Varsity Badminton"
                  ]}
                /> */}
                
              </div>
            </section>
           
            
          </div>
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ 
  period, 
  title, 
  organization, 
  description,
  bullets 
}: { 
  period: string; 
  title: string; 
  organization: string; 
  description: string; 
  bullets?: string[];
}) => {
  return (
    <div className="relative pl-8 border-l border-border">
      <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
      <div className="text-sm text-muted-foreground mb-1">{period}</div>
      <h3 className="text-lg font-medium">{title}</h3>
      <div className="text-muted-foreground mb-2">{organization}</div>
      <p className="text-muted-foreground mb-3">{description}</p>
      {bullets && (
        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AboutPage;