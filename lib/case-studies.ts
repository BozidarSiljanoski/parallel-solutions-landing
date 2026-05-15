export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  headline: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  tags: string[];
  placeholderImage: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "nexus-analytics",
    title: "937 appointments for Nexus Analytics",
    client: "Nexus Analytics",
    industry: "GovTech / SaaS",
    headline: "Local government pipeline at scale",
    summary:
      "We helped Amanda's team focus on high-value deals by setting 937 qualified appointments with local government buyers.",
    challenge:
      "Nexus had strong product-market fit but a thin outbound motion. AEs were doing their own prospecting and missing enterprise cycles.",
    solution:
      "Parallel built a dedicated SDR pod with bespoke messaging for municipal buyers, CRM integration, and weekly SQL reviews.",
    results: [
      { metric: "Appointments set", value: "937" },
      { metric: "SQL conversion", value: "34%" },
      { metric: "Pipeline influenced", value: "$4.2M" },
    ],
    testimonial: {
      quote:
        "Before Parallel, we booked ~16 meetings per month. Now we average 83 — our AEs finally sell instead of prospect.",
      author: "Amanda Chen",
      role: "VP Revenue, Nexus Analytics",
    },
    tags: ["Appointment Setting", "B2B SaaS"],
    placeholderImage: "NA",
  },
  {
    slug: "vertex-systems",
    title: "807 opportunities for Vertex Systems",
    client: "Vertex Systems",
    industry: "Risk & Compliance",
    headline: "US market expansion for an APAC leader",
    summary:
      "We helped Terry expand into the US by identifying 807 opportunities with risk managers at mid-market enterprises.",
    challenge:
      "Vertex needed credible US presence without hiring a full internal SDR bench before proving ROI.",
    solution:
      "Multichannel outbound with deep qualification research, localized playbooks, and handoff SLAs to AEs.",
    results: [
      { metric: "Opportunities identified", value: "807" },
      { metric: "Meetings held", value: "412" },
      { metric: "Closed-won influenced", value: "$2.8M" },
    ],
    testimonial: {
      quote:
        "They sound like us on every call. Our brand stayed intact while we cracked a new geography.",
      author: "Terry Okonkwo",
      role: "Managing Director, Vertex Systems",
    },
    tags: ["Market Research", "Expansion"],
    placeholderImage: "VS",
  },
  {
    slug: "horizon-health",
    title: "298 appointments for Horizon Health",
    client: "Horizon Health",
    industry: "Healthcare IT",
    headline: "MSP channel diversification",
    summary:
      "We helped Stephen diversify pipeline by setting 298 appointments with managed service providers.",
    challenge:
      "Horizon relied on inbound and one channel partner. Leadership wanted predictable outbound without burning brand trust.",
    solution:
      "Full SDR appointment setting with tailored MSP talk tracks, LinkedIn social proof, and RevOps dashboards.",
    results: [
      { metric: "Appointments set", value: "298" },
      { metric: "Show rate", value: "72%" },
      { metric: "New logos", value: "41" },
    ],
    testimonial: {
      quote:
        "Hands down the best outsourced sales partner we've worked with — disciplined, transparent, and effective.",
      author: "Stephen Spiegel",
      role: "CEO, Horizon Health",
    },
    tags: ["SDR Outsourcing", "Healthcare"],
    placeholderImage: "HH",
  },
  {
    slug: "cascade-logistics",
    title: "Pipeline rebuild for Cascade Logistics",
    client: "Cascade Logistics",
    industry: "Supply Chain / SaaS",
    headline: "From empty funnel to predictable SQLs",
    summary:
      "Cascade's pipeline stalled post-Series B. We rebuilt outbound from zero to 180+ SQLs in six months.",
    challenge:
      "Founders were closing deals themselves. No repeatable top-of-funnel after the first 50 customers.",
    solution:
      "Demand gen playbook, ICP workshop, dedicated SDR + Sales Ops support, and Calendly-integrated handoffs.",
    results: [
      { metric: "SQLs delivered", value: "180+" },
      { metric: "Avg. deal size", value: "+28%" },
      { metric: "Sales cycle", value: "-19 days" },
    ],
    tags: ["RevOps", "Logistics"],
    placeholderImage: "CL",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((c) => c.slug);
}
