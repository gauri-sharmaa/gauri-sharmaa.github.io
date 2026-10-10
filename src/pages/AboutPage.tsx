
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import profileImg from '../assets/profile.png';
import awsLogo from '../assets/logos/aws.png';
import ibmLogo from '../assets/logos/ibm.png';
import fusenLogo from '../assets/logos/fusen.png';
import gtLogo from '../assets/logos/gt.png';

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
                  I'm a Computer Science student at <a href="https://www.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Georgia Tech</a> in the integrated B.S./M.S. program, interested in efficient inference, agentic systems, and AI in finance. Right now I'm doing efficient inference research at Georgia Tech, along with some financial ML and low-latency systems work.
                </p>
                <p>
                  This past summer I was an SDE intern at <span className="text-foreground">Amazon Web Services</span>, where I built the task-creation API for a compliance review portal on the Partner Central Catalog Quality team. Before that, I interned with <a href="https://developer.ibm.com/components/kubernetes/openprojects/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">IBM Research</a> on <a href="https://github.com/kubestellar/kubestellar" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">KubeStellar</a>, an open-source project for multi-cluster cloud management.
                </p>
                <p>
                  On the research side, I've spent a lot of time on securing multi-agent systems. I co-authored a position paper on protocol-aware guardrails that was accepted at the NeurIPS 2026 Agents in the Wild workshop, and worked on benchmarking MAS security with <a href="https://www.linkedin.com/in/kenhuang8/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Ken Huang</a>.
                </p>
                <p>
                  I've also researched online harassment and LLM behavior with the <a href="https://socweb.cc.gatech.edu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Social Dynamics & Wellbeing Lab</a> under <a href="https://www.cc.gatech.edu/people/munmun-de-choudhury" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Dr. Munmun De Choudhury</a>, and I'm a VIP researcher at the <a href="https://qcf.gatech.edu/partner" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Financial Services Innovation Lab</a>. Outside of research, I lead the sentiment team on SimpliEarn at Big Data Big Impact and write weekly FX briefs for Trading @ GT.
                </p>
              </div>
            </section>
            
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">Research Interests</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Efficient inference and LLM routing</li>
                <li>Security and safety of multi-agent systems</li>
                <li>Agent communication protocols such as A2A and MCP</li>
                <li>Machine learning for financial markets</li>
                <li>Low-latency systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Experiences</h2>
              <div className="space-y-8 ml-6">
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark logo={awsLogo} alt="Amazon Web Services" />
                  <div className="text-sm text-muted-foreground mb-1">May 2026 – July 2026</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Amazon Web Services SDE Intern</span></h3>
                  <div className="text-muted-foreground mb-2">Seattle, WA</div>
                  <p className="text-muted-foreground mb-3">
                    As a summer intern on the <span className="text-foreground">AWS Partner Central Catalog Quality</span> team, I designed and built the <span className="text-foreground">task-creation API</span> for a compliance review portal used by <span className="text-foreground">500 internal users</span> for the manual review checks that decide what goes on the AWS catalog. I wrote the API design doc and implemented it as a <span className="text-foreground">Java</span> service, with end-to-end <span className="text-foreground">idempotency</span> for safe retries and a rollback flow spanning <span className="text-foreground">S3, DynamoDB, and SNS</span>, strengthening my distributed systems and API design skills.
                  </p>
                </div>
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark logo={ibmLogo} alt="IBM" />
                  <div className="text-sm text-muted-foreground mb-1">May 2025 – July 2025</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">IBM SWE Intern for Open Source</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a summer intern for the open source <span className="text-foreground">KubeStellar</span> project with IBM Research and the GT open source program office, I collaborated with IBM research engineers to implement a <span className="text-foreground">krew plug-in</span> for <span className="text-foreground">parallel multi-cluster viewing</span>, reducing information aggregation time by <span className="text-foreground">72%</span>. I also implemented <span className="text-foreground">46 kubectl</span> commands for KubeStellar’s multi plug-in, strengthening <span className="text-foreground">CI/CD</span> and Kubernetes management skills.
                  </p>
                </div>
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark logo={fusenLogo} alt="Fusen World" />
                  <div className="text-sm text-muted-foreground mb-1">May 2025 – Aug 2025</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Fusen World Fellowship – AegentDev Co-Founder</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a part of the Fusen World Fellowship, I developed AegentDev, a multi-agent framework for stress testing agentic systems through an MCP interface. I also collaborated with researchers from <span className="text-foreground">MIT’s NANDA</span> to co-authored a paper introducing a new benchmarking methodology for <span className="text-foreground">agent communication protocols</span>. This venture was supported by the team at Fusen World and <span className="text-foreground">Chris Klaus</span>, founder of Internet Security Systems (IBM Acquired)!
                  </p>
                </div>
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark logo={gtLogo} alt="Georgia Tech" />
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Machine Learning for Financial Markets Lab</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a student researcher with <span className="text-foreground">FSIL's Vertically Integrated Program</span> at Georgia Tech, I developed novel taxonomy to evaluate model performance on <span className="text-foreground">professional structured texts</span> such as SEC filings and legal contracts. I also ran data pipelines to <span className="text-foreground">accumulate textual and embedding data</span> for compliance-driven document generation tasks.
                  </p>
                </div>
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark logo={gtLogo} alt="Georgia Tech" />
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">Social Dynamics and Wellbeing Lab @ Georgia Tech</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a research assistant, I co-authored a study on jailbroken LLM agents simulating real-world harassment using prompting, memory injection, and fine-tuning. I helped survey and develop jailbroken multi-agent pipelines (<span className="text-foreground">of SOTA models including GPT-4o, Claude 3.5 Sonnet, and Llama 3.1</span>) to evaluate toxic dialogues in 8 harassment types using ASR, TTS, and RR metrics. This work was submitted to <span className="text-foreground">ICWSM</span> as <span className="text-foreground">"Echoes of Human Malice"</span>.
                  </p>
                </div>
                
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark />
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">SimpliEarn Project @ Big Data Big Impact Club @ Georgia Tech</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As project lead, I built a multimodal sentiment pipeline for earnings calls by segmenting speech and timestamping audio to align with transcripts, using <span className="text-foreground">FinBERT</span> and <span className="text-foreground">Wav2Vec</span>. This boosted sentiment accuracy through cross-modal trend analysis and visualization.
                  </p>
                </div>
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark />
                  <div className="text-sm text-muted-foreground mb-1">Jan 2025 – Present</div>
                  <h3 className="text-lg font-medium"><span className="text-foreground">StartUpExchange @ Georgia Tech</span></h3>
                  <div className="text-muted-foreground mb-2">Atlanta, GA</div>
                  <p className="text-muted-foreground mb-3">
                    As a member of the events board, I coordinated event operations for a startup club at Georgia Tech, organizing over five events annually with <span className="text-foreground">500+</span> in attendance. My responsibilities included staffing, and ensuring smooth execution of speaker presentations and logistics for each event.
                  </p>
                </div>
                <div className="relative pl-12 border-l border-border">
                  <TimelineMark />
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
              <div className="space-y-8 ml-6">
                <TimelineItem 
                  logo={gtLogo}
                  period="Present – May 2028"
                  title="B.S./M.S. in Computer Science (Integrated Master's)"
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

// The marker on the timeline: a company logo in a small circle, or a dot.
const TimelineMark = ({ logo, alt = "" }: { logo?: string; alt?: string }) =>
  logo ? (
    <div className="absolute left-[-24px] top-0 w-12 h-12 rounded-lg bg-white border border-border overflow-hidden flex items-center justify-center p-1">
      <img src={logo} alt={alt} className="w-full h-full object-contain" />
    </div>
  ) : (
    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary"></div>
  );

const TimelineItem = ({ 
  logo,
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
  logo?: string;
}) => {
  return (
    <div className="relative pl-12 border-l border-border">
      <TimelineMark logo={logo} alt={organization} />
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