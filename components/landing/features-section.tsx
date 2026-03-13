"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    number: "01",
    title: "Planner Agent",
    description: "Breaks your complex goal into 3-5 clear, actionable subtasks. Assigns each task to the right specialist agent. Outputs structured JSON for seamless orchestration.",
    visual: "planner",
  },
  {
    number: "02",
    title: "Researcher Agent",
    description: "Searches the live web via Serper API and Brave Search MCP. Reads uploaded documents. Never fabricates facts — always cites sources with URLs. Cross-references multiple sources.",
    visual: "researcher",
  },
  {
    number: "03",
    title: "Analyst Agent",
    description: "Processes raw research into structured insights. Identifies patterns, comparisons, and key data points. Flags conflicting information. Rates confidence in its own analysis.",
    visual: "analyst",
  },
  {
    number: "04",
    title: "Writer Agent",
    description: "Generates professional markdown reports with Executive Summary, Key Findings, Analysis, Risks, and clear YES/NO/MAYBE recommendations. Saves directly to your Notion workspace.",
    visual: "writer",
  },
  {
    number: "05",
    title: "Critic Agent",
    description: "Quality controller that scores every output 1-10 on Accuracy, Completeness, Relevance, and Clarity. Triggers auto-retry if score < 7. Ensures no unsupported claims make it to final report.",
    visual: "critic",
  },
];

function DeployVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <defs>
        <clipPath id="deployClip">
          <rect x="30" y="20" width="140" height="120" rx="4" />
        </clipPath>
      </defs>
      
      {/* Container */}
      <rect x="30" y="20" width="140" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Animated bars */}
      <g clipPath="url(#deployClip)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x="40"
            y={35 + i * 16}
            width="120"
            height="10"
            rx="2"
            fill="currentColor"
            opacity="0.15"
          >
            <animate
              attributeName="opacity"
              values="0.15;0.8;0.15"
              dur="2s"
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="width"
              values="20;120;20"
              dur="2s"
              begin={`${i * 0.15}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
      
      {/* Progress indicator */}
      <circle cx="100" cy="155" r="3" fill="currentColor" opacity="0.3">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function AIVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Central node */}
      <circle cx="100" cy="80" r="12" fill="currentColor">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Orbiting nodes */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 50;
        return (
          <g key={i}>
            {/* Connection line */}
            <line
              x1="100"
              y1="80"
              x2={100 + Math.cos(angle) * radius}
              y2={80 + Math.sin(angle) * radius}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </line>
            
            {/* Outer node */}
            <circle
              cx={100 + Math.cos(angle) * radius}
              cy={80 + Math.sin(angle) * radius}
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <animate
                attributeName="r"
                values="6;8;6"
                dur="2s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
      
      {/* Pulse rings */}
      <circle cx="100" cy="80" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="r" values="20;60" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function CollabVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* User A */}
      <g>
        <rect x="30" y="50" width="50" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="55" y="85" textAnchor="middle" fontSize="20" fontFamily="monospace" fill="currentColor">A</text>
        <circle cx="55" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
      
      {/* User B */}
      <g>
        <rect x="120" y="50" width="50" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <text x="145" y="85" textAnchor="middle" fontSize="20" fontFamily="monospace" fill="currentColor">B</text>
        <circle cx="145" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
      </g>
      
      {/* Connection */}
      <line x1="80" y1="80" x2="120" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-8" dur="0.5s" repeatCount="indefinite" />
      </line>
      
      {/* Data packet */}
      <circle r="4" fill="currentColor">
        <animateMotion dur="1.5s" repeatCount="indefinite">
          <mpath href="#dataPath" />
        </animateMotion>
      </circle>
      <path id="dataPath" d="M 80 80 L 120 80" fill="none" />
      
      {/* Sync indicator */}
      <g transform="translate(100, 130)">
        <circle r="6" fill="none" stroke="currentColor" strokeWidth="2">
          <animate attributeName="r" values="6;10;6" dur="1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

function SecurityVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Shield */}
      <path
        d="M 100 20 L 150 40 L 150 90 Q 150 130 100 145 Q 50 130 50 90 L 50 40 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      
      {/* Inner shield */}
      <path
        d="M 100 35 L 135 50 L 135 85 Q 135 115 100 128 Q 65 115 65 85 L 65 50 Z"
        fill="currentColor"
        opacity="0.1"
      >
        <animate attributeName="opacity" values="0.1;0.2;0.1" dur="2s" repeatCount="indefinite" />
      </path>
      
      {/* Lock icon */}
      <rect x="85" y="70" width="30" height="25" rx="3" fill="currentColor" />
      <path
        d="M 90 70 L 90 60 Q 90 50 100 50 Q 110 50 110 60 L 110 70"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Keyhole */}
      <circle cx="100" cy="80" r="4" fill="white" />
      <rect x="98" y="82" width="4" height="8" fill="white" />
      
      {/* Scan lines */}
      <line x1="60" y1="60" x2="140" y2="60" stroke="currentColor" strokeWidth="1" opacity="0">
        <animate attributeName="y1" values="40;120;40" dur="3s" repeatCount="indefinite" />
        <animate attributeName="y2" values="40;120;40" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

function PlannerVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Central hub */}
      <circle cx="100" cy="80" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <text x="100" y="85" textAnchor="middle" fontSize="10" fontFamily="monospace" fill="currentColor">PLAN</text>
      
      {/* Connected nodes */}
      {[
        { x: 50, y: 40, label: "1" },
        { x: 150, y: 40, label: "2" },
        { x: 50, y: 120, label: "3" },
        { x: 150, y: 120, label: "4" },
      ].map((node, i) => (
        <g key={i}>
          <line x1="100" y1="80" x2={node.x} y2={node.y} stroke="currentColor" strokeWidth="1" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </line>
          <circle cx={node.x} cy={node.y} r="12" fill="currentColor" opacity="0.2">
            <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize="10" fill="currentColor">{node.label}</text>
        </g>
      ))}
    </svg>
  );
}

function ResearcherVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Search bar */}
      <rect x="30" y="60" width="140" height="30" rx="15" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="75" r="4" fill="currentColor">
        <animate attributeName="cx" values="50;150;50" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Search results */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(30, ${100 + i * 15})`}>
          <rect x="0" y="0" width="100" height="8" rx="2" fill="currentColor" opacity="0.3">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </rect>
          <rect x="0" y="10" width="60" height="4" rx="1" fill="currentColor" opacity="0.2" />
        </g>
      ))}
      
      {/* Globe icon */}
      <circle cx="160" cy="40" r="15" fill="none" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="160" cy="40" rx="8" ry="15" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="145" y1="40" x2="175" y2="40" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function AnalystVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Chart bars */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={40 + i * 35}
          y={120 - (i + 1) * 20}
          width="25"
          height={(i + 1) * 20}
          fill="currentColor"
          opacity="0.3"
        >
          <animate attributeName="height" values={`${(i + 1) * 10};${(i + 1) * 25};${(i + 1) * 10}`} dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${120 - (i + 1) * 10};${120 - (i + 1) * 25};${120 - (i + 1) * 10}`} dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </rect>
      ))}
      
      {/* Magnifying glass */}
      <g transform="translate(140, 50)">
        <circle cx="0" cy="0" r="20" fill="none" stroke="currentColor" strokeWidth="3" />
        <line x1="14" y1="14" x2="30" y2="30" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="0" r="5" fill="currentColor" opacity="0.5">
          <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

function WriterVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Document */}
      <rect x="50" y="20" width="100" height="120" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      
      {/* Lines of text */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x="60"
          y={40 + i * 15}
          width={80 - i * 5}
          height="6"
          rx="2"
          fill="currentColor"
          opacity="0.3"
        >
          <animate attributeName="width" values={`${60 - i * 5};${80 - i * 5};${60 - i * 5}`} dur="2s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
        </rect>
      ))}
      
      {/* Pen writing */}
      <g transform="translate(140, 100)">
        <line x1="0" y1="0" x2="20" y2="-20" stroke="currentColor" strokeWidth="2" />
        <circle cx="20" cy="-20" r="3" fill="currentColor">
          <animate attributeName="cy" values="-20;-40;-20" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

function CriticVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Score gauge */}
      <path d="M 40 120 A 60 60 0 0 1 160 120" fill="none" stroke="currentColor" strokeWidth="8" opacity="0.2" />
      <path d="M 40 120 A 60 60 0 0 1 100 60" fill="none" stroke="currentColor" strokeWidth="8">
        <animate attributeName="d" values="M 40 120 A 60 60 0 0 1 70 68;M 40 120 A 60 60 0 0 1 130 68;M 40 120 A 60 60 0 0 1 70 68" dur="3s" repeatCount="indefinite" />
      </path>
      
      {/* Score number */}
      <text x="100" y="110" textAnchor="middle" fontSize="24" fontFamily="monospace" fill="currentColor">
        <tspan>
          <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
          8.5
        </tspan>
      </text>
      <text x="100" y="130" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">/10</text>
      
      {/* Check/X marks */}
      <g transform="translate(160, 50)">
        <circle r="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M -5 0 L 0 5 L 8 -6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="d" values="M -5 0 L 0 5 L 8 -6;M -6 -6 L 6 6 M -6 6 L 6 -6;M -5 0 L 0 5 L 8 -6" dur="2s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "planner":
      return <PlannerVisual />;
    case "researcher":
      return <ResearcherVisual />;
    case "analyst":
      return <AnalystVisual />;
    case "writer":
      return <WriterVisual />;
    case "critic":
      return <CriticVisual />;
    default:
      return <PlannerVisual />;
  }
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-foreground/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-muted-foreground">{feature.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {feature.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
          
          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-foreground">
              <AnimatedVisual type={feature.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Capabilities
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Five specialized agents.
            <br />
            <span className="text-muted-foreground">One verified report.</span>
          </h2>
        </div>

        {/* Features List */}
        <div>
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
