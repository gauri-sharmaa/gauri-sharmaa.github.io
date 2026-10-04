import aegentImg from "@/assets/aegent.jpg";
import masImg from "@/assets/mas.png";
import simpliImg from "@/assets/simpli.jpg";
import amdImg from "@/assets/amd.jpg";
import podcastImg from "@/assets/podcast.jpg";
import visualeaseImg from "@/assets/visualease.jpg";
import engardeImg from "@/assets/engarde.jpg";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  when: string;
  blurb: string;
  tags: string[];
  links: ProjectLink[];
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "order-engine",
    title: "Order Execution Engine",
    when: "2026 · mentored by Millennium",
    blurb: "A trading engine in Go that handles an order in 26µs.",
    tags: ["Go", "FIX"],
    links: [],
    featured: true,
  },
  {
    id: "llm-routing",
    title: "LLM Routing",
    when: "Now · ADDAPT Lab",
    blurb: "Sending each prompt to the cheapest model that can still get it right.",
    tags: ["Python", "PyTorch"],
    links: [],
    featured: true,
  },
  {
    id: "vla-steering",
    title: "Steering Robot Policies",
    when: "2026 · class project",
    blurb: "Getting a robot model to follow rules without retraining it.",
    tags: ["PyTorch", "OpenVLA"],
    links: [],
    featured: true,
  },
  {
    id: "aegentdev",
    title: "AegentDev",
    when: "2025 · co-founder",
    blurb: "A startup that tests AI agents by letting other agents attack them.",
    tags: ["Python", "MCP"],
    links: [{ label: "Website", url: "https://aegentdev.com/" }],
    image: aegentImg,
    featured: true,
  },
  {
    id: "harassment-benchmark",
    title: "Echoes of Human Malice in Agents",
    when: "ICWSM 2027",
    blurb: "How far jailbroken AI agents will go when told to harass someone.",
    tags: ["LLM safety"],
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2510.14207" }],
  },
  {
    id: "agent-cascade-injection",
    title: "Agent Cascade Injection",
    when: "2025 · with MIT NANDA",
    blurb: "What happens to the rest of the system when one agent gets hacked.",
    tags: ["Agents", "Security"],
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2507.21146" }],
    image: masImg,
  },
  {
    id: "simpli-earn",
    title: "SimpliEarn",
    when: "2025 · Big Data Big Impact",
    blurb: "Listens to earnings calls so investors don't have to.",
    tags: ["Python", "FastAPI"],
    links: [{ label: "Club Website", url: "https://gtbigdatabigimpact.com/" }],
    image: simpliImg,
  },
  {
    id: "visualease",
    title: "VisualEase",
    when: "HackGT 11",
    blurb: "Flashcards that draw their own pictures.",
    tags: ["React", "Flask"],
    links: [{ label: "Devpost", url: "https://devpost.com/software/visualease" }],
    image: visualeaseImg,
  },
  {
    id: "engarde",
    title: "EnGarde",
    when: "Hacklytics 2025",
    blurb: "Helps international fencers get noticed by U.S. college coaches.",
    tags: ["Django"],
    links: [{ label: "Devpost", url: "https://devpost.com/software/en-guarde" }],
    image: engardeImg,
  },
  {
    id: "acid-mine-drainage",
    title: "Acid Mine Drainage",
    when: "2024 · Grand Challenges",
    blurb: "Tracking mine pollution in West Virginia from space.",
    tags: ["Earth Engine"],
    links: [{ label: "Website", url: "https://itsevelync.github.io/AMD-GC/" }],
    image: amdImg,
  },
  {
    id: "podcast-research",
    title: "Podcast Research",
    when: "2024 · AP Research",
    blurb: "Does the way a host sounds change how you feel about the news?",
    tags: ["NLP"],
    links: [{ label: "Paper", url: "https://drive.google.com/file/d/1oWdZqiYPbXr52UoqpPgSr0a-AYpqzhrt/view" }],
    image: podcastImg,
  },
];
