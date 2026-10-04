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
  period: string;
  role: string;
  summary: string;
  points: string[];
  tags: string[];
  links: ProjectLink[];
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "order-engine",
    title: "Low-Latency Order Execution Engine",
    period: "Jan 2026 – May 2026",
    role: "Backend API owner, 3-person team (supervised by Millennium)",
    summary: "An order execution engine in Go with 26µs engine latency, presented at Millennium's Miami office.",
    points: [
      "Lock-free ring buffer on the hot path, write-ahead log for crash recovery, raw FIX 4.2 connectivity, and inline pre-trade risk checks.",
      "Designed the idempotent order API: request keys, dedup state, and safe retries after client-side timeouts.",
      "Built a zero-allocation ML momentum predictor that runs inline on the order path in about 100ns.",
    ],
    tags: ["Go", "FIX 4.2", "Lock-free", "WAL"],
    links: [],
    featured: true,
  },
  {
    id: "llm-routing",
    title: "Difficulty-Aware LLM Routing",
    period: "Jan 2026 – Present",
    role: "Researcher, ADDAPT Lab",
    summary: "When a new model joins the pool, a router has to learn what it's good at from a handful of probe prompts. I'm working on making that work when probes are scarce.",
    points: [
      "Replaced UniRoute's hard topic clusters with soft probe weighting by topic and predicted difficulty: +0.030 Area at 30 probes, beating an embedding k-NN baseline at 7 of 8 probe budgets (400 trials, 112 models).",
      "Explained why: 30 probes barely cover a 768-dim embedding space but densely cover a 1-D difficulty axis, so per-model error estimates and routing decisions get better.",
      "Found headroom is anti-correlated with oracle gain (Spearman −0.50, 27 tasks): the model pool, not the router, drives much of what benchmarks report.",
      "Funded by a $1K OpenAI Research Grant and Georgia Tech's PURA. Paper in progress.",
    ],
    tags: ["Python", "PyTorch", "Hugging Face", "Slurm"],
    links: [],
    featured: true,
  },
  {
    id: "vla-steering",
    title: "Inference-Time Steering for Frozen VLA Policies",
    period: "Jan 2026 – May 2026",
    role: "ML 7641 course project",
    summary: "Steering a frozen OpenVLA robot policy on LIBERO to respect constraints, with no fine-tuning.",
    points: [
      "Built the constraint-violation evaluator (collision, low-jerk, spatial-routing rules) that auto-labeled 6,405 rollout windows with zero human annotation, then trained an XGBoost steering critic on them.",
      "Designed a 630-instruction dataset (30 tasks × 21 paraphrases) and showed constraint types form separable clusters in OpenVLA's frozen Llama-2 embeddings.",
      "Replaced manual box drawing by projecting object poses through a calibrated camera to train a ResNet-18 + FPN detector.",
    ],
    tags: ["PyTorch", "XGBoost", "OpenVLA", "LIBERO"],
    links: [],
    featured: true,
  },
  {
    id: "aegentdev",
    title: "AegentDev",
    period: "May 2025 – Aug 2025",
    role: "Co-founder, Fusen World Fellowship",
    summary: "A security harness for multi-agent systems that scans agents the way agents attack each other.",
    points: [
      "Connects to CrewAI and LangGraph agents over MCP and runs agent-to-agent security scans in Docker, 32% faster end to end.",
      "$30K in GCP credits from Google; invited to YC Startup School (2026) to keep building.",
    ],
    tags: ["Python", "MCP", "CrewAI", "LangGraph", "Docker"],
    links: [
      { label: "Website", url: "https://aegentdev.com/" },
    ],
    image: aegentImg,
    featured: true,
  },
  {
    id: "harassment-benchmark",
    title: "Echoes of Human Malice in Agents",
    period: "2025",
    role: "Co-author, Social Dynamics & Wellbeing Lab",
    summary: "Benchmarking how jailbroken LLM agents carry out multi-turn online harassment. Accepted to ICWSM 2027.",
    points: [
      "Built the data generation for jailbroken multi-agent dialogues across GPT-4o, Claude 3.5 Sonnet, and Llama 3.1, using prompting, memory injection, and fine-tuning.",
    ],
    tags: ["LLM Safety", "Benchmarking", "Python"],
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2510.14207" }],
  },
  {
    id: "agent-cascade-injection",
    title: "Agent Cascade Injection",
    period: "Summer 2025",
    role: "Lead author, with MIT NANDA",
    summary: "A framework for measuring how one compromised agent spreads damage through a multi-agent system.",
    points: [
      "Defines impact chains, cascading failure scenarios, and protocol-level blast radius for agents talking over MCP and A2A, so MAS security can be benchmarked with numbers instead of anecdotes.",
    ],
    tags: ["Multi-Agent Systems", "Security", "MCP"],
    links: [{ label: "Paper", url: "https://arxiv.org/abs/2507.21146" }],
    image: masImg,
  },
  {
    id: "simpli-earn",
    title: "SimpliEarn",
    period: "Jan 2025 – Present",
    role: "Project Co-lead, Big Data Big Impact",
    summary: "Turns earnings calls into sentiment signals investors can read in minutes.",
    points: [
      "Built a multimodal sentiment pipeline that aligns call audio with transcripts, combining FinBERT and Wav2Vec for 67% higher sentiment accuracy.",
      "Served through a FastAPI and Supabase backend with a Chart.js dashboard.",
    ],
    tags: ["Python", "FinBERT", "Wav2Vec", "FastAPI", "Supabase"],
    links: [{ label: "Club Website", url: "https://gtbigdatabigimpact.com/" }],
    image: simpliImg,
  },
  {
    id: "visualease",
    title: "VisualEase",
    period: "2024",
    role: "HackGT 11",
    summary: "A flashcard app that generates images to help with active recall.",
    points: ["Llama 3 on Groq for card text, FLUX.1-schnell for images, with a Flask backend and React frontend."],
    tags: ["React", "Flask", "Groq", "FLUX.1"],
    links: [{ label: "Devpost", url: "https://devpost.com/software/visualease" }],
    image: visualeaseImg,
  },
  {
    id: "engarde",
    title: "EnGarde",
    period: "2025",
    role: "Hacklytics 2025",
    summary: "A recruiting platform connecting international fencers with U.S. college coaches.",
    points: ["Athlete profiles with rankings and footage, with rankings data scraped using Selenium."],
    tags: ["Django", "Selenium"],
    links: [{ label: "Devpost", url: "https://devpost.com/software/en-guarde" }],
    image: engardeImg,
  },
  {
    id: "acid-mine-drainage",
    title: "Acid Mine Drainage Monitoring",
    period: "2024 – 2025",
    role: "Researcher, Grand Challenges",
    summary: "Satellite monitoring of acid mine drainage in West Virginia, with a focus on recoverable rare earth elements.",
    points: ["Used Google Earth Engine imagery to track remediation chemical use across sites and flag where rare earth recovery could help fund cleanup."],
    tags: ["Google Earth Engine", "Python", "Remote Sensing"],
    links: [{ label: "Website", url: "https://itsevelync.github.io/AMD-GC/" }],
    image: amdImg,
  },
  {
    id: "podcast-research",
    title: "Podcast Audio and Text Analysis",
    period: "2024",
    role: "Researcher, AP Research",
    summary: "How vocal style and wording in news podcasts relate to listener sentiment.",
    points: ["Analyzed 30 NYT podcasts with openSMILE and TextBlob. Received an honorable mention for empirical process at the 2024 AP Research MENA Forum."],
    tags: ["NLP", "openSMILE", "TextBlob"],
    links: [{ label: "Paper", url: "https://drive.google.com/file/d/1oWdZqiYPbXr52UoqpPgSr0a-AYpqzhrt/view" }],
    image: podcastImg,
  },
];
