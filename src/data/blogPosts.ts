
import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "emergent-behaviors",
    title: "Towards Measurable Security in Agentic AI",
    date: "June 17, 2025",
    summary: "An exploration of how security is evolving in multi-agent environments.",
    tags: [ "Multi-Agent Systems", "Security"],
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LBEj8Kl00SJP3kbXrqq35A.png",
    content: `

Once the domain of experimental prototypes, today's agents can manage tools, issue commands, and orchestrate complex workflows across multiple components. While functionality and efficiency have been eagerly benchmarked, security evaluation is just beginning to gain the structured attention it deserves. Foundational frameworks — such as the <a href="https://vineethsai.github.io/aivss/">OWASP Agentic AI Top 10 Vulnerability Scoring System (AIVSS)</a>, the MAESTRO framework, and the <a href="https://cloudsecurityalliance.org/research/working-groups/ai-safety-initiative">CSA's Red Teaming Guide</a> — have laid essential groundwork, thanks to the leadership of experts like Ken Huang.

These contributions provide a robust foundation for evaluating agentic risk. Now, the challenge lies in wider adoption and integration: building the infrastructure to make vulnerability scoring and quantitative risk assessments routine across ecosystems and diverse contexts. As agentic AI scales, so must our commitment to making its security measurable, teachable, and accessible. Automation and developer integration for these risks are critical, making this an exciting space for development.

<figure>
  <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*WqwYP5kmg1na9jFP" alt="An overview of the AIVSS methodology — https://vineethsai.github.io/aivss/" />
  <figcaption style="justify-self:center">An overview of the AIVSS methodology — <a href="https://vineethsai.github.io/aivss/">https://vineethsai.github.io/aivss/</a></figcaption>
</figure>



This article surveys the current state of Agentic AI security benchmarking and adoption. With the emergence of infrastructure like <a href="https://www.media.mit.edu/projects/mit-nanda/overview/#:~:text=NANDA%20%28Networked%20Agents%20and%20Decentralized,of%20autonomous%20AI%20agents%20that">MIT's NANDA</a>, a team at MIT creating the "Internet of AI Agents," the path is clearer than ever for a standardized approach to security evaluation. The challenge now is not identifying risks — they're well-documented — but turning that knowledge into testable, measurable, and repeatable metrics across ecosystems and contexts. As a student developer, I believe we urgently need to bring security literacy into the agent-building process. More and more student internships now ask not for Python fluency, but for experience working with MCP servers — architectures that didn't even exist a year ago.

<figure>
  <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*i2I58MrMkdJkd9Qj" alt="NANDA" />
  <figcaption style="justify-self:center">NANDA (Networked Agents And Decentralized AI) builds on Anthropic's Model Context Protocol (MCP) to create a true Internet of AI Agents. While MCP provides standardized interaction between AI agents, tools and resources, NANDA adds the critical infrastructure needed for distributed agent intelligence at scale. From <a href="https://nanda.media.mit.edu/">https://nanda.media.mit.edu/</a>.</figcaption>
</figure>



This is especially urgent as agentic systems grow more autonomous, connected, and permissioned. When agents can write to databases, run shell commands, or coordinate across frameworks, their vulnerabilities become networked liabilities. As OWASP AIVSS and the CSA Agentic AI Red Teaming Guide both outline, an agent's threat surface is shaped not just by its code, but by its autonomy, memory, tool usage, and delegation behavior.

## Understanding Multi-Agent System Infrastructure


The architecture behind multi-agent systems (MAS) is undergoing rapid evolution, moving from siloed implementations to visions of web-scale interoperability. At the core of this transformation is the recognition that agents are no longer single-threaded tools operating in isolation — they're collaborative, persistent, and increasingly responsible for orchestrating mission-critical workflows.

Several architectural protocols have emerged to facilitate coordination across autonomous agents:

- Model Context Protocol (MCP) by Anthropic enables agents to interface with tools and context servers, focusing on agent-to-environment communication.
- Agent2Agent (A2A) by Google introduces structured inter-agent communication via JSON-RPC and AgentCards, enabling agents to negotiate, delegate, and verify identities.
- Agent Communication Protocol (ACP) from IBM embraces RESTful paradigms for agent messaging and orchestration, emphasizing developer-accessible infrastructure.
- NANDA, MIT's experimental agent registry, builds on top of MCP to support distributed agent discovery and verifiable capability declarations through a federated system of AgentFacts.

Here is a great overview of more protocols and their use cases by Yang et al's A Survey of AI Agent Protocols:

<figure>
  <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*LBEj8Kl00SJP3kbXrqq35A.png" alt="Overview of popular agent protocols. From A Survey of AI Agent Protocols." />
  <figcaption style="justify-self:center">Overview of popular agent protocols. <a href="https://arxiv.org/abs/2504.16736">From A Survey of AI Agent Protocols</a>.</figcaption>
</figure>

Also, a great overview of how AI development has evolved over the past few years from the same paper:
<br/>
<figure>
  <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*D1VwITPWAnNnfAWJvYDdwA.png"/>
  <figcaption style="justify-self:center">A timeline of the development of agent protocols. From <a href="https://arxiv.org/abs/2504.16736">A Survey of AI Agent Protocols</a>.</figcaption>
</figure>


Some of these protocols admittedly share similarities. For instance, A2A, MCP, and ACP each support some core primitives — identity, messaging, and capability expression — but still have space to develop in discovery, state persistence, and memory consistency. Despite their strengths, these frameworks may operate in isolation. The result is a fragmented ecosystem where interoperability is the exception, not the norm. In fact, NANDA's paper calls for <a href="https://github.com/aidecentralized/nandapapers/blob/main/Collaborative%20Agentic%20AI%20Needs%20Interoperability%20Across%20Ecosystems.pdf">interoperability across ecosystems</a>, asking for the "adoption of minimal standards" rather than waiting for dominant solutions to emerge.

If you're interested in understanding how some of the current protocols work together, here's another great <a href="https://medium.com/@gaurisharma1686/towards-measurable-security-in-agentic-ai-2d0cc4147fe8#:~:text=here's%20another%20great-,article,-.%20To%20quote%20the">article</a>. To quote the author, Edwin Lisowski, "In short: we're early. But how we build and adopt these standards now will shape whether AI agents become a cohesive ecosystem — or a patchwork of silos." As interoperability evolves, it will increasingly shape the security architectures we design and deploy.

## Current Threats in Multi-Agent Workflows

<a href="https://aivss.owasp.org">OWASP's</a> Agentic AI Top 10 security risks covers the most imminent threats in these systems. The group's initial publication is slated for release in the upcoming weeks, but their ongoing work and GitHub are available at aivss.owasp.org. The core idea is straightforward: every interaction layer — whether between agents, tools, databases, or users — introduces potential vulnerabilities unless explicitly secured. OWASP AIVSS is developing a security calculator to quantify agentic risk in a standardized, actionable format — laying the groundwork for consistent evaluation across systems. It will be equally important to track how automation evolves in this space, potentially enabling real-time scoring, integration into CI/CD pipelines, and automated risk mitigation. Here's a summary of AIVSS's outlined risks:

### Top 10 Agentic AI Threats (AIVSS):

1. <strong>Agentic AI Tool Misuse</strong> — When AI agents interact with external tools, flawed logic, malicious tool registration, or adversarial inputs can cause unintended or harmful actions. A notable example is tool squatting, where agents are tricked into calling malicious tools due to deceptive naming or schema manipulation.
2. <strong>Agent Access Control Violation</strong> — Attackers may exploit or override an agent's permissions, causing it to perform tasks outside its authorized scope. These breaches often go unnoticed because the agent appears to behave legitimately while conducting unauthorized actions. 
3. <strong>Agent Impact Chain and Blast Radius</strong> — A compromise in one agent can ripple across connected systems, escalating a local vulnerability into a system-wide failure. This is especially dangerous in interconnected ecosystems where agents hold cross-domain access.  
4. <strong>Agent Orchestration and Multi-Agent Exploitation</strong> — Security flaws in how agents coordinate and trust one another can be exploited to manipulate or hijack multi-agent workflows. These interactions form complex, distributed attack surfaces vulnerable to system-wide disruption.  
5. <strong>Deepfake Agent Identity</strong> — AI-generated impersonation allows agents to present fake identities or credentials, deceiving both humans and other systems. This manipulation undermines trust and can lead to fraud, unauthorized access, or social engineering attacks.
6. <strong>Agent Memory and Context Manipulation</strong> — Attackers can tamper with how agents store or recall context, leading to compromised decision-making and leaked information. Since agents rely on persistent memory, such manipulation can have long-term effects.
7. <strong>Agent Critical Systems Interaction</strong> — When agents interface with operational or physical infrastructure, errors or attacks can lead to real-world consequences. These include malfunctions, safety risks, or unauthorized control over sensitive systems.
8. <strong>Agent Supply Chain and Dependency Attacks</strong> — Vulnerabilities in third-party tools, libraries, or infrastructure supporting AI agents can be exploited to introduce malware or backdoors. These attacks often compromise multiple agents at once by targeting trusted development pipelines.
9. <strong>Agent Untraceability</strong> — Agents often assume temporary roles or permissions, making it hard to trace actions back to a specific user or origin. This lack of accountability complicates auditing, incident response, and forensic analysis.
10. <strong>Agent Goal and Instruction Manipulation</strong> — By manipulating how agents interpret commands, attackers can cause them to behave maliciously while appearing normal. This often involves exploiting natural language processing to inject harmful intent into otherwise benign-looking instructions.

<figure>
  <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/0*k9L2CtyPhsUe3L-g">
  <figcaption style="justify-self:center">The AIVSS Framework — <a href="https://vineethsai.github.io/aivss">https://vineethsai.github.io/aivss/</a> </figcaption>
</figure>



## Quantitative Security Benchmarking Efforts

As OWASP AIVSS's work underscores, security in multi-agent systems (MAS) must be measurable to be actionable. While early benchmarks like HarmBench, AgentHarm, COMMA, and Cybench offer frameworks for assessing harmful LLM behavior, they primarily target single-agent scenarios or isolated adversarial robustness. What's missing is a structured approach to evaluating the compounded risks that emerge when agents coordinate, delegate, and operate in interconnected environments — a critical gap and a ripe area for development.

The path forward is clear: agent security must be built in, not bolted on. IDE plugins, CI/CD hooks, and agent graph visualizers that surface stale permissions or insecure delegation chains will be essential to making MAS security both actionable and teachable. Just as crucial is engaging students and early developers in this foundational work — helping them build awareness of infrastructure-level risks and ensuring their research and practices stay relevant in a landscape increasingly shaped by code generation tools and autonomous development practices.`
  },
  {
    slug: "benchmarking-agents",
    title: "Before Numbered Lines Came Prose and Poetry",
    date: "June 12, 2025",
    summary: "A blog about what first got me into computing :)",
    tags: ["Just for Fun"],
    image: "https://lh5.googleusercontent.com/proxy/p8IjEe_lg3by5crL67rJgVtHlkAVooQkmTzZc-pbMjehL5wE1de5qwq7y7BdBwF-IAs_GV1hh0KMzIWs6Ot0vUzw7PGLAFHoDuYU5CKGfHj06j-qhhT1uK8",
    content: `
If you’re taking the time to read this, thank you. It means a lot!

Like a lot of kids growing up with a family desktop, my first experience with computing was a game, Purble Place. I don’t even remember what the game was about, but the bright colors, baked goods, and vaguely Reddit-icon-looking characters were my first taste of how a computer could feel like a world I wanted to interact with.

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/en/6/68/Purble_Place_7.png" style="display:block; margin:auto; max-width:600px;" alt="Purble Place screenshot">
  <figcaption style="text-align:center">Purble Place characters</figcaption>
</figure>

Soon after came the structured version of computers: computer class in school. In fourth grade, I was "learning computers," in what we then called ICT class (Information and Communication Technology) which really meant messing around in MS Notepad and dragging arrows to build pixelated houses in MS Paint. I didn’t really understand what RAM or CPUs were, although in my naive diligence (ahem teachers pet) I could tell you a memorized definition from a textbook. But the idea that a box could store instructions and images, that definitely stuck with me.

What stood out even more were the stories tucked into the curriculum. Between keyboard shortcuts and hardware photos the pages held stories of Charles Babbage and the first mechanical computer, on Ada Lovelace and her handwritten algorithm. When I found out Ada was Lord Byron’s daughter, someone I had just read about in English class, my brain short-circuited with the crossover episode a little.

<figure>
  <img src="https://projectlovelace.net/static_prod/img/Diagram_for_the_computation_of_Bernoulli_numbers.jpg" style="display:block; margin:auto; max-width:600px;" alt="Ada Lovelace algorithm">
  <figcaption style="text-align:center">Ada Lovelace’s handwritten diagram for calculating Bernoulli numbers—one of the earliest known algorithms</figcaption>
</figure>

That was probably the moment the gears started turning,  not in a “I want to be a programmer” kind of way, but in the sense that this space had more to offer than instructions. It had *narrative*.

I started properly coding much later than most of my peers. While others played on code.org and explored scratch, I began with reading. From seventh to eighth grade, I found myself drawn to tech books I didn’t fully understand but couldn’t put down. *The Innovators* by Walter Isaacson. *Superintelligence* by Nick Bostrom (way too early, honestly — I should really revisit that one). And my favorite: *Algorithms to Live By*. That book changed how I thought. The 37% rule eventually became what I wrote alot of my college essays about. I appreciated how computer science wasn’t just a technical field, it was a way of thinking. One that could inform how you lived.

<figure>
  <img src="https://i.harperapps.com/hcanz/covers/9780007547999/y648.jpg" style="display:block; margin:auto; max-width:300px;" alt="Algorithms to Live By cover">
  <figcaption style="text-align:center"><em>Algorithms to Live By</em></figcaption>
</figure>

Around the same time, I got really into spoken word poetry. I was obsessed with rhythm, phrasing, the emotional texture of a sentence. Naturally, I started looking for parallels, between poetry and code, syntax and symbolism. I forced those connections sometimes, but they helped me see code not just as logic, but as language. Later, learning about embeddings and natural language processing felt like finding proof that those connections were real. I’m not sure I’m a poet (we’ll save the cathartic poetry for another blog post), but I’m pretty sure I’m a better programmer because of it.

I think that’s what made computing click for me. Without the books, without the metaphors, I don’t think I would’ve grown attached to the cold syntax of code. But once I started seeing CI/CD pipelines as story arcs, or error logs as plot twists, the abstraction lifted. Working in open source helped with that too, when you’re contributing to something larger than yourself, every pull request feels like a paragraph in an evolving draft. Looking back, it wasn’t just computers that pulled me in. It was the stories – of people, of systems, of ideas trying to make sense of complexity. Whether it was Ada Lovelace writing algorithms by hand or me trying to understand recursive functions with zero context, I kept coming back because I felt like I was learning a new way to see the world.

If anything in this story resonates, I hope it reminds you that there’s richness in the narrative of computing. Behind every system or interface is a story—of how a problem was felt, framed, and eventually solved. In the days of code gen, I think it's refreshing to remember the cognitive process of problem solving, or as I like to call it, the narrative that your code is a part of.

For me, that narrative began with a poem. A game. A strange textbook graphic in a fourth grade CS class that stuck with me for no good reason. And for learning to notice those moments, to build meaning from them, I have poetry, stories, and a little childhood curiosity to thank.


    `
  },
  {
    slug: "ai-research-reproducibility",
    title: "The Age of AI Backed Infrastructure",
    date: "July 7, 2025",
    summary: "A blog written during my internship with IBM Research's KubeStellar project and a review of how AI will impact cloud computing and maintenance.",
    tags: ["Cloud", "Open Source"],
    image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3BnzHppD57JdbHR-0d10Gw.png",
    content: `
    
          I recently had the chance to work with [KubeStellar](https://docs.kubestellar.io/release-0.28.0/), an open-source multi-cluster configuration management tool, where I helped develop a kubectl plugin called <code>multi</code>, for accessing content across multiple contexts. Early in the internship, I was also researching AI infrastructure in parallel for another project, specifically the Model Context Protocol (MCP), which stood out to me as a promising interface between LLMs and complex systems like Kubernetes.

      <figure>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*3BnzHppD57JdbHR-0d10Gw.png">
        <figcaption style="justify-self:center">Developing the plugin while experimenting with MCP on the side</figcaption>
      </figure>

      Developing the plugin while experimenting with MCP on the side, alongside using code generation platforms and supplementing my learning with kubectl documentation, was a great way to dive headfirst into cloud-native. What stood out was how MCP could support both the development and the use of such a plugin. By structuring how AI accesses and interacts with Kubernetes operations, MCP frameworks made Kubernetes feel more approachable. It also surfaced some bigger questions I hadn’t thought about before, not just how we build infrastructure for AI, but how that infrastructure itself evolves once AI starts participating in its management. As workloads become more dynamic and model behavior less predictable, it’s clear that the way we design and secure our systems will need to adapt accordingly.

      <figure>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*iBlHWbXS3Tpz3w_28LfOmg.png">
        <figcaption style="justify-self:center">Kubestellar Features</figcaption>
      </figure>

      ### MCP in k8s
      The Model Context Protocol (MCP) is a lightweight protocol that allows external agents (like AI tools) to access and manipulate structured contexts (such as APIs, file systems, or cloud platforms) in a way that’s intent-aware, auditable, and secure.

      In the case of Kubernetes, multiple [K8s MCP Servers](https://github.com/manusa/kubernetes-mcp-server) have sprung up, and act as a gateway between AI agents (like Claude or GPT-powered tools) and your cluster (more examples from [Docker Hub](https://hub.docker.com/mcp/server/kubernetes/overview), [GitHub](https://github.com/Flux159/mcp-server-kubernetes)). Instead of hardcoding commands or writing scripts, AI can now also facilitate actions such as:

      - “List all pods in the dev namespace.”
      - “Restart the payment service if CPU usage exceeds 80%.”
      - “Create an nginx deployment and expose it via a LoadBalancer.”

      <figure>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*9IG4Jnojn9-8K81NZbkAeQ.png">
        <figcaption style="justify-self:center">An example of a k8s MCP server. From <a href="https://hub.docker.com/r/mcp/kubernetes">https://hub.docker.com/r/mcp/kubernetes</a>.</figcaption>
      </figure>

      With tools like Claude Desktop now able to integrate with MCP servers, this kind of conversational DevOps is already possible. Further configuration management can allow such infra to be even more easily and potentially securely managed by MCP. Although, fair warning, new vulnerabilities seem to surface on the daily! Tools like [Kagent](https://medium.com/@gaurisharma1686/the-age-of-ai-backed-infrastructure-25a310c1c4a1#:~:text=daily!%20Tools%20like-,Kagent,-seem%20like%20promising) seem like promising venues to bring agentic development to cloud native management.

      <figure>
        <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QS_udW6NpgH3002prZKHnA.png">
        <figcaption style="justify-self:center">Kagent, an open source tool for running AI Agents in Kubernetes</figcaption>
      </figure>


      ### Implications: Infrastructure, Now With Intent
      This is bigger than just Kubernetes. The rise of MCP signals a shift from “Infrastructure-as-Code” to “Infrastructure-as-Conversation.” As more platforms adopt MCP-like protocols, from Postgres to API Gateways to CI/CD pipelines, we’ll see:

      - AgentOps teams emerge, managing AI co-pilots across infrastructure.  
      - Tooling for Trust, like role-based AI agents and agent-specific logs.  
      - Platform-level Assistants that troubleshoot, deploy, and self-heal using natural language.


      ### The Age of MCP Infrastructure
      The Age of MCP Infrastructure isn’t just about using AI to type faster. It’s about redesigning the interface layer between humans, machines, and the cloud.

      We’ve had command-line interfaces (CLI), then graphical interfaces (GUI), conversational interfaces, and now we’re entering the era of intent-based interfaces (IUI) — where high-level intent flows from humans to agents through secure protocols like MCP. IUI as defined in the paper [Towards Intent-based User Interfaces](https://arxiv.org/abs/2404.18196), explores IUI across multiple task types, but it would be interesting to explore how interfaces might develop specifically to cater to infrastructure management. At the same time, it’s just as important to equip newcomers in the industry with the knowledge and context to effectively harness tools like MCP not only for automation, but also as a learning scaffold for understanding complex systems like Kubernetes.

    
    `
  }
];