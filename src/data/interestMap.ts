import guardrailsPdf from "@/assets/protocol_aware_guardrails.pdf";

// Data for the interactive interest map on /map.
// To add something: push a node below, then connect it to one or more
// interests in `mapEdges`. The first interest a node connects to sets its color.

export type MapNodeKind = "me" | "interest" | "topic" | "project" | "experience" | "writing";

export interface MapLink {
  label: string;
  href: string;
  // Internal links use the router; external links open in a new tab.
  external?: boolean;
}

export interface MapNode {
  id: string;
  label: string;
  kind: MapNodeKind;
  blurb: string;
  period?: string;
  link?: MapLink;
}

export const interestColors: Record<string, string> = {
  inference: "hsl(212 45% 60%)",
  agents: "hsl(258 35% 66%)",
  safety: "hsl(352 45% 66%)",
  finance: "hsl(150 28% 52%)",
  language: "hsl(36 55% 60%)",
  infra: "hsl(186 35% 52%)",
  tools: "hsl(318 30% 64%)",
  community: "hsl(18 50% 64%)",
  impact: "hsl(82 28% 52%)",
  writing: "hsl(220 10% 60%)",
};

export const mapNodes: MapNode[] = [
  {
    id: "me",
    label: "My Experience",
    kind: "me",
    blurb:
      "CS @ Georgia Tech. Everything here connects back to a few questions: how to make AI systems faster, safer, and more useful, especially where money and information move quickly.",
    link: { label: "About me", href: "/about" },
  },

  // Interests (hubs), in ring order: neighbors on the ring share the most links.
  {
    id: "inference",
    label: "Efficient Inference",
    kind: "interest",
    blurb: "My current research focus at Georgia Tech: making model inference cheaper and faster without giving up quality.",
  },
  {
    id: "agents",
    label: "Multi-Agent Systems",
    kind: "interest",
    blurb: "How AI agents talk to each other and to people, and how protocols like A2A and MCP shape that communication.",
  },
  {
    id: "safety",
    label: "AI Safety & Security",
    kind: "interest",
    blurb: "Measuring how agentic systems fail and how to guard them: attack vectors, cascading failures, protocol-aware guardrails, and jailbroken model behavior.",
  },
  {
    id: "impact",
    label: "AI for Social Good",
    kind: "interest",
    blurb: "Research aimed at real harms: online harassment and environmental damage.",
  },
  {
    id: "language",
    label: "NLP & Multimodal",
    kind: "interest",
    blurb: "Sentiment, speech, and structured text: the thread running through most of my research.",
  },
  {
    id: "tools",
    label: "Making Info Usable",
    kind: "interest",
    blurb: "Building tools that make complex information easier to work with, from earnings calls to satellite data.",
  },
  {
    id: "finance",
    label: "Financial ML & Markets",
    kind: "interest",
    blurb: "Applying ML to financial text, audio, and markets, plus writing about macro and FX.",
  },
  {
    id: "community",
    label: "Leading & Building",
    kind: "interest",
    blurb: "Leading project teams, co-founding, mentoring, and organizing events.",
  },
  {
    id: "writing",
    label: "Writing",
    kind: "interest",
    blurb: "Blog posts, research papers, and weekly market briefs.",
    link: { label: "Read the blog", href: "/blog" },
  },
  {
    id: "infra",
    label: "Cloud & Open Source",
    kind: "interest",
    blurb: "Kubernetes, multi-cluster tooling, and the infrastructure that ML systems run on.",
  },

  // Sub-topics
  {
    id: "llm-routing",
    label: "LLM Routing",
    kind: "topic",
    blurb: "Sending each request to the right model, so systems spend compute only where it helps.",
  },
  {
    id: "low-latency",
    label: "Low-Latency Systems",
    kind: "topic",
    blurb: "Systems work where microseconds matter, from model serving to trading.",
  },

  // Experiences
  {
    id: "gt-inference",
    label: "Inference Research @ GT",
    kind: "experience",
    period: "Present",
    blurb: "Research on methods for efficient inference at Georgia Tech.",
  },
  {
    id: "aws",
    label: "AWS Internship",
    kind: "experience",
    period: "May – Jul 2026",
    blurb:
      "SWE intern on the Partner Central Catalog Quality team. Designed and built the task-creation API for a compliance review portal used by 500 internal users, as a Java service with end-to-end idempotency and a rollback flow across S3, DynamoDB, and SNS.",
    link: { label: "Experience", href: "/about" },
  },
  {
    id: "ibm",
    label: "IBM · KubeStellar",
    kind: "experience",
    period: "May – Jul 2025",
    blurb:
      "Open-source SWE intern with IBM Research. Built a krew plug-in for parallel multi-cluster viewing (72% faster information aggregation) and 46 kubectl commands.",
    link: { label: "KubeStellar on GitHub", href: "https://github.com/kubestellar/kubestellar", external: true },
  },
  {
    id: "sdwl",
    label: "Social Dynamics Lab",
    kind: "experience",
    period: "2025",
    blurb:
      "Co-authored a study on jailbroken LLM agents simulating real-world harassment across 8 harassment types, with GPT-4o, Claude 3.5 Sonnet, and Llama 3.1.",
    link: { label: "Experience", href: "/about" },
  },
  {
    id: "fsil",
    label: "Fin. Services Innovation Lab",
    kind: "experience",
    period: "2025",
    blurb:
      "VIP researcher. Developed a taxonomy for evaluating models on professional structured text like SEC filings and legal contracts.",
    link: { label: "Experience", href: "/about" },
  },
  {
    id: "trading",
    label: "Trading @ GT · FX",
    kind: "experience",
    period: "Jul 2025 –",
    blurb: "Currencies team lead. Weekly macro and FX briefs for 400+ student investors, plus mentoring new analysts.",
    link: { label: "Experience", href: "/about" },
  },
  {
    id: "startup-exchange",
    label: "StartUpExchange",
    kind: "experience",
    blurb: "Events board for GT's startup club: 5+ events a year with 500+ attendees.",
    link: { label: "Experience", href: "/about" },
  },
  {
    id: "grand-challenges",
    label: "Grand Challenges Coach",
    kind: "experience",
    blurb: "Coaching Grand Challenges teams in design thinking and problem solving.",
  },

  // Projects
  {
    id: "guardrails-paper",
    label: "Protocol-Aware Guardrails",
    kind: "project",
    period: "NeurIPS 2026 · AIWILD",
    blurb:
      "Position paper with Vidhi Kulkarni, accepted as a poster at the NeurIPS 2026 Agents in the Wild workshop. Argues that multi-agent safety needs guardrails that reason over interaction protocols and execution traces, not single turns.",
    link: { label: "Read paper", href: guardrailsPdf, external: true },
  },
  {
    id: "echoes-paper",
    label: "Echoes of Human Malice",
    kind: "writing",
    period: "Submitted to ICWSM",
    blurb:
      "Paper from the Social Dynamics & Wellbeing Lab on jailbroken LLM agents reproducing real-world harassment. Submitted to ICWSM.",
  },
  {
    id: "mas-paper",
    label: "Benchmarking MAS Security",
    kind: "project",
    period: "Summer 2025",
    blurb:
      "Research paper proposing metrics for agent impact chains, cascading failures, and protocol-level blast radius in multi-agent systems.",
    link: { label: "Project", href: "/projects#benchmarking-mas" },
  },
  {
    id: "aegent",
    label: "AegentDev",
    kind: "project",
    period: "Summer 2025",
    blurb:
      "Co-founded through the Fusen World Fellowship: a multi-agent framework for stress testing agentic systems over MCP, with researchers from MIT NANDA.",
    link: { label: "Project", href: "/projects#aegentdev" },
  },
  {
    id: "simpliearn",
    label: "SimpliEarn",
    kind: "project",
    period: "2024 –",
    blurb:
      "Project lead at Big Data Big Impact. Multimodal earnings-call sentiment with FinBERT and Wav2Vec, aligning speech with transcripts.",
    link: { label: "Project", href: "/projects#simpli-earn" },
  },
  {
    id: "amd",
    label: "Acid Mine Drainage",
    kind: "project",
    period: "2024 – 2025",
    blurb: "Remote sensing with Google Earth Engine to monitor acid mine drainage remediation in West Virginia.",
    link: { label: "Project", href: "/projects#acid-mine-drainage" },
  },
  {
    id: "podcast",
    label: "Podcast Audio Research",
    kind: "project",
    period: "2024",
    blurb: "Linked audio style and text in 30 NYT podcasts to listener sentiment. Honorable mention at the AP Research MENA Forum.",
    link: { label: "Project", href: "/projects#podcast-research" },
  },
  {
    id: "visualease",
    label: "VisualEase",
    kind: "project",
    period: "HackGT 2024",
    blurb: "Memory training with AI-generated images and interactive flashcards.",
    link: { label: "Project", href: "/projects#visualease" },
  },
  {
    id: "engarde",
    label: "EnGarde",
    kind: "project",
    period: "Hackalytics 2025",
    blurb: "A recruiting platform connecting international fencers with U.S. college coaches.",
    link: { label: "Project", href: "/projects#engarde" },
  },

  // Writing
  {
    id: "blog-security",
    label: "Measurable Security in Agentic AI",
    kind: "writing",
    period: "Jun 2025",
    blurb: "How security is evolving in multi-agent environments.",
    link: { label: "Read post", href: "/blog/emergent-behaviors" },
  },
  {
    id: "blog-infra",
    label: "The Age of AI Backed Infrastructure",
    kind: "writing",
    period: "Jul 2025",
    blurb: "Written during the KubeStellar internship: how AI will change cloud computing and maintenance.",
    link: { label: "Read post", href: "/blog/ai-research-reproducibility" },
  },
  {
    id: "blog-prose",
    label: "Before Numbered Lines Came Prose",
    kind: "writing",
    period: "Jun 2025",
    blurb: "What first got me into computing.",
    link: { label: "Read post", href: "/blog/benchmarking-agents" },
  },
];

export const mapEdges: [string, string][] = [
  // Me to each interest
  ...mapNodes.filter((n) => n.kind === "interest").map((n) => ["me", n.id] as [string, string]),

  ["llm-routing", "inference"],
  ["llm-routing", "agents"],
  ["low-latency", "inference"],
  ["low-latency", "finance"],
  ["low-latency", "infra"],

  ["gt-inference", "inference"],
  ["gt-inference", "llm-routing"],
  ["aws", "infra"],
  ["ibm", "infra"],
  ["ibm", "community"],
  ["sdwl", "safety"],
  ["sdwl", "language"],
  ["sdwl", "impact"],
  ["fsil", "finance"],
  ["fsil", "language"],
  ["trading", "finance"],
  ["trading", "writing"],
  ["trading", "community"],
  ["startup-exchange", "community"],
  ["grand-challenges", "community"],
  ["grand-challenges", "impact"],

  ["guardrails-paper", "safety"],
  ["guardrails-paper", "agents"],
  ["guardrails-paper", "writing"],
  ["guardrails-paper", "mas-paper"],
  ["echoes-paper", "safety"],
  ["echoes-paper", "sdwl"],
  ["echoes-paper", "writing"],
  ["mas-paper", "agents"],
  ["mas-paper", "safety"],
  ["mas-paper", "writing"],
  ["aegent", "agents"],
  ["aegent", "safety"],
  ["aegent", "community"],
  ["aegent", "mas-paper"],
  ["simpliearn", "finance"],
  ["simpliearn", "language"],
  ["simpliearn", "tools"],
  ["simpliearn", "community"],
  ["amd", "impact"],
  ["amd", "tools"],
  ["podcast", "language"],
  ["visualease", "tools"],
  ["engarde", "tools"],

  ["blog-security", "safety"],
  ["blog-security", "agents"],
  ["blog-security", "writing"],
  ["blog-infra", "infra"],
  ["blog-infra", "writing"],
  ["blog-infra", "ibm"],
  ["blog-prose", "writing"],
];
