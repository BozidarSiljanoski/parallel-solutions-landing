export const siteConfig = {
  name: "Parallel Solutions",
  tagline: "Outsourced lead generation. Real results.",
  description:
    "Parallel Solutions builds qualified B2B pipeline for growth-stage companies — SDR outsourcing, appointment setting, and revenue operations so your team can focus on closing.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail: "hello@parallelsolutions.example",
  phone: "+1 (555) 012-3400",
  address: "128 Market Street, Suite 400, San Francisco, CA",
  bookingSectionHref: "/#book",
  social: {
    linkedin: "https://linkedin.com/company/parallel-solutions",
    twitter: "https://twitter.com/parallelsolutions",
  },
} as const;

export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
] as const;

export const heroStats = [
  { value: "60K+", label: "Qualified meetings booked" },
  { value: "200+", label: "Companies accelerated" },
  { value: "100+", label: "SDRs trained & managed" },
  { value: "1M+", label: "Outbound touches delivered" },
] as const;

export const services = [
  {
    title: "SDR Outsourcing",
    description:
      "Dedicated reps who sound like your brand — multichannel outbound across email, phone, and LinkedIn.",
    icon: "users" as const,
  },
  {
    title: "Sales Operations",
    description:
      "CRM hygiene, routing, reporting, and RevOps playbooks that keep your funnel measurable.",
    icon: "settings" as const,
  },
  {
    title: "Appointment Setting",
    description:
      "Uniquely qualified meetings booked directly on your AE calendars, not vanity MQLs.",
    icon: "calendar" as const,
  },
  {
    title: "Sales Enablement",
    description:
      "Messaging, ICP refinement, and coaching so every touchpoint reinforces your value prop.",
    icon: "sparkles" as const,
  },
  {
    title: "Market Research",
    description:
      "Deep qualification research and bespoke prospect data for complex enterprise cycles.",
    icon: "search" as const,
  },
  {
    title: "Revenue Consulting",
    description:
      "Go-to-market strategy, territory design, and pipeline diagnostics for leadership teams.",
    icon: "trending" as const,
  },
] as const;

export const whyUsPoints = [
  "20+ years of combined sales development leadership",
  "Hyper-personalized, human-first outbound — not spray-and-pray",
  "Fit-to-purpose teams built for your ICP and motion",
  "North America & Europe coverage with multilingual reps",
  "Transparent reporting with weekly pipeline reviews",
  "Brand-safe ambassadors trained on your voice and story",
] as const;

export const testimonials = [
  {
    quote:
      "Parallel Solutions became an extension of our revenue team. Discovery calls doubled within two quarters.",
    author: "Aurore Dupin",
    role: "Head of Global SDR, Nexus Analytics",
    rating: 5,
  },
  {
    quote:
      "They invested in onboarding deeply. Our SDRs finally hit monthly targets on cold outbound in APAC.",
    author: "David Baruc",
    role: "VP Sales, Vertex Systems",
    rating: 5,
  },
  {
    quote:
      "Responsive, flexible, and fun to work with — and the SQLs keep flowing month over month.",
    author: "Eric Edelstein",
    role: "Co-Founder & CRO, Horizon Health",
    rating: 5,
  },
] as const;

export const trustedLogos = [
  "Nexus Analytics",
  "Vertex Systems",
  "Horizon Health",
  "Cascade Logistics",
  "BrightPath AI",
  "Meridian Cloud",
] as const;
