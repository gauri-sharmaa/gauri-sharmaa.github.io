export interface Experience {
  period: string;
  title: string;
  org: string;
  location: string;
  points: string[];
}

export const experience: Experience[] = [
  {
    period: "May 2026 – Aug 2026",
    title: "Software Development Engineer Intern",
    org: "Amazon Web Services",
    location: "Seattle, WA",
    points: [
      "Built a production Java service behind the AWS catalog's manual review portal, used by 500+ internal reviewers worldwide. Owned the Smithy API model, CDK infrastructure, DynamoDB persistence, SNS eventing, and TestNG integration tests across 6 packages.",
      "Designed a compensating-transaction write path across S3, two DynamoDB tables, and SNS, where no native transaction spans all three, so a failed create never leaves a half-written task behind.",
      "Implemented end-to-end request idempotency: composite keys, request canonicalization, conflict detection for reused tokens, and conditional-write race handling.",
      "Defined DynamoDB key and query constraints that surface the highest-value catalog items to reviewers first.",
    ],
  },
  {
    period: "Jan 2026 – Present",
    title: "Research Assistant, LLM Routing",
    org: "ADDAPT Lab, Georgia Tech (Prof. Stephen Mussmann)",
    location: "Atlanta, GA",
    points: [
      "Researching cost-aware routing that sends each prompt to the cheapest LLM that can answer it, and adds new models without retraining.",
      "Replaced hard topic clustering with soft, difficulty-aware probe weighting, gaining +0.030 Area over UniRoute when only 30 probe prompts are labeled.",
      "Found headroom is anti-correlated with oracle gain (Spearman −0.50 across 27 tasks), a model-pool confound in how routers are evaluated.",
      "Awarded a $1K OpenAI Research Grant and Georgia Tech's President's Undergraduate Research Award (PURA).",
    ],
  },
  {
    period: "Jan 2025 – Present",
    title: "Research Assistant",
    org: "Social Dynamics & Wellbeing Lab, Georgia Tech",
    location: "Atlanta, GA",
    points: [
      "Co-authored a study benchmarking jailbroken LLM agents in multi-turn online harassment, accepted to ICWSM 2027.",
      "Built an open-source image PII detector with YOLO, CLIP, and a VLM, reaching 73% accuracy on VISPR categories.",
    ],
  },
  {
    period: "Jan 2025 – Present",
    title: "Research Assistant",
    org: "Financial Services Innovation Lab, Georgia Tech",
    location: "Atlanta, GA",
    points: [
      "Built a macro forecasting pipeline (ADSN shapelets, Granger causality, RidgeCV) for jobless claims and fed funds, beating autoregressive baselines by 12% (RMSE, Diebold-Mariano tested).",
      "Built compliance retrieval benchmarks for embedding models from FATF standards, consumer-finance policy, and card disclosures.",
    ],
  },
  {
    period: "May 2025 – Jul 2025",
    title: "Software Engineering Intern",
    org: "IBM Research, Open Source",
    location: "Atlanta, GA",
    points: [
      "Built a cross-cluster krew plug-in in Go with 46 custom kubectl commands for KubeStellar, a CNCF Kubernetes project.",
      "Parallelized per-cluster API queries with goroutines, cutting cross-cluster workload aggregation latency by 72%.",
    ],
  },
  {
    period: "May 2025 – Aug 2025",
    title: "Co-founder, AegentDev",
    org: "Fusen World Fellowship",
    location: "Atlanta, GA",
    points: [
      "Built an agent security harness that connects to CrewAI and LangGraph agents over MCP and runs agent-to-agent scans in Docker, cutting scan time by 32%. Granted $30K in GCP credits by Google.",
      "Prototyped an Agent Cascade Injection attack framework with MIT NANDA. Invited to YC Startup School (2026) to keep building.",
    ],
  },
];

export const leadership: Experience[] = [
  {
    period: "Jan 2025 – Present",
    title: "Currencies Team Lead, Market Insights Head",
    org: "Trading @ Georgia Tech",
    location: "Atlanta, GA",
    points: [
      "Lead weekly FX research, turning central bank signals into briefs for 400+ student investors. Mentor 6 analysts.",
    ],
  },
  {
    period: "Jan 2025 – Present",
    title: "Partnerships Lead",
    org: "Big Data Big Impact & StartUpExchange @ Georgia Tech",
    location: "Atlanta, GA",
    points: [
      "Run sponsorships for BDBI's events, workshops, and recruiting. For StartUpExchange's AI ATL, partnered with Google, Microsoft, and Anthropic to secure $900K+ in AI credits for 300+ founders.",
    ],
  },
];

export const publications = [
  {
    title: "Echoes of Human Malice in Agents: Benchmarking LLMs for Multi-Turn Online Harassment Attacks",
    venue: "ICWSM 2027",
    url: "https://arxiv.org/abs/2510.14207",
  },
  {
    title: "Towards Unifying Quantitative Security Benchmarking for Multi Agent Systems",
    venue: "arXiv preprint, 2025",
    url: "https://arxiv.org/abs/2507.21146",
  },
];
