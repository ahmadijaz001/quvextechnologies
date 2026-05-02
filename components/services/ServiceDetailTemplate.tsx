"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  CheckCircle2, ArrowRight, ChevronRight, ChevronDown,
  Sparkles, Users, Zap, Target, BarChart3,
  Shield, Globe, Cpu, Layers, Code2, Smartphone,
  TrendingUp, Award, Clock, Headphones, Database,
  Star, Building2, Lock, Wifi, Server,
} from "lucide-react";
import CTABanner from "@/components/sections/CTABanner";
import ContactForm from "@/components/shared/ContactForm";
import Reveal from "@/components/shared/Reveal";
import type { Service, ServiceCategory } from "@/lib/services-data";

const Service3DBackdrop = dynamic(() => import("./Service3DBackdrop"), { ssr: false });

interface ServiceDetailTemplateProps {
  service: Service;
  category: ServiceCategory;
}

// ─────────────────────────────────────────────────────────────────
// EMBEDDED RICH CONTENT — Category-level defaults
// All 50+ service pages benefit from this data immediately.
// ─────────────────────────────────────────────────────────────────

type Benefit  = { iconName: string; title: string; description: string };
type Industry = { emoji: string; name: string; description: string };
type FaqItem  = { question: string; answer: string };

const CATEGORY_BENEFITS: Record<string, Benefit[]> = {
  erp: [
    { iconName: "BarChart3",   title: "Real-Time Business Visibility",   description: "Live dashboards and BI tools give leadership instant visibility into KPIs, cash flow, inventory, and operations across all departments and locations — eliminating blind spots that cost businesses millions." },
    { iconName: "Zap",         title: "End-to-End Process Automation",   description: "Eliminate repetitive manual tasks across finance, HR, procurement, and operations. Automated workflows reduce human error by up to 80% and free your team for high-value strategic work." },
    { iconName: "Shield",      title: "UAE Regulatory Compliance",        description: "Built-in compliance for UAE VAT (FTA), WPS payroll, MOHRE, ICP, GPSSA, and Corporate Tax requirements. Stay audit-ready without extra overhead or specialized compliance staff." },
    { iconName: "TrendingUp",  title: "Measurable ROI in 18 Months",     description: "Typical 25–40% efficiency improvement in targeted business processes, with an average 18-month payback period for mid-sized UAE implementations based on our project portfolio." },
    { iconName: "Globe",       title: "Scalable Multi-Entity Architecture", description: "Grow without technical constraints — add users, modules, branches, and companies as your business expands across the UAE and GCC. Multi-currency and multi-language ready from day one." },
    { iconName: "Users",       title: "Unified Team Collaboration",       description: "One platform breaks down departmental silos across finance, HR, sales, operations, and IT — enabling seamless cross-functional workflows and faster, data-driven decision-making." },
  ],
  "web-ecommerce": [
    { iconName: "Target",      title: "Conversion-Optimized Design",      description: "UX-led design frameworks that have delivered 15–40% conversion rate improvements for UAE clients. Every design decision is driven by user behavior data and UAE market insights." },
    { iconName: "Zap",         title: "Lightning-Fast Performance",       description: "Sub-2-second load times and perfect Core Web Vitals scores that boost Google rankings, reduce bounce rates, and deliver exceptional digital experiences across all devices." },
    { iconName: "Globe",       title: "Seamless System Integrations",     description: "Connect your digital platform to payment gateways (Network International, PayTabs, Stripe), ERPs, CRMs, shipping, and marketing tools through secure, scalable API integrations." },
    { iconName: "BarChart3",   title: "UAE SEO & Organic Growth",         description: "Built-in technical SEO architecture, Arabic/English content optimization, structured data markup, and Core Web Vitals tuning engineered for top Google rankings in UAE and GCC markets." },
    { iconName: "Shield",      title: "Enterprise Security & Compliance", description: "PCI DSS-compliant payment flows, SSL/TLS encryption, WAF protection, DDoS mitigation, and regular security audits safeguarding your customers and business reputation." },
    { iconName: "TrendingUp",  title: "Revenue Analytics & Insights",     description: "Track every dirham of revenue with Google Analytics 4, Meta Pixel, custom dashboards, and attribution modelling — giving you full visibility from first click to final sale." },
  ],
  "digital-marketing": [
    { iconName: "Target",      title: "UAE & GCC Market Expertise",       description: "Deep understanding of Arabic-language search behavior, Ramadan campaign strategies, regional platform preferences, and cultural nuances that no offshore agency can replicate." },
    { iconName: "BarChart3",   title: "Performance-Driven Campaigns",     description: "Every dirham tracked with ROI-focused reporting across CPL, ROAS, CPA, and revenue attribution. We optimize for business outcomes — not vanity metrics like impressions." },
    { iconName: "Globe",       title: "Full-Funnel Multi-Channel Reach",  description: "Integrated campaigns across Google, Meta, TikTok, Snapchat, LinkedIn, and email — designed to reach your audience at every stage of the buyer journey across all major UAE platforms." },
    { iconName: "TrendingUp",  title: "Long-Term Brand Authority",        description: "Consistent messaging, thought leadership content, and earned media strategies that build lasting brand equity, market recognition, and pricing power in the UAE market." },
    { iconName: "Users",       title: "Qualified Lead Generation",        description: "Intent-driven leads that match your ideal customer profile — not just traffic. Our campaign architecture filters out unqualified clicks and focuses budget on high-converting audiences." },
    { iconName: "Zap",         title: "Agile Weekly Optimization",        description: "Weekly optimization cycles, real-time budget reallocation, multivariate A/B testing, and creative refreshes that continuously compound campaign performance month over month." },
  ],
  "ai-automation": [
    { iconName: "Zap",         title: "30–60% Operational Cost Reduction", description: "Typical 30–60% reduction in operational costs for targeted processes within 12 months of deployment — with clear measurement frameworks from day one of the engagement." },
    { iconName: "BarChart3",   title: "Intelligent Decision Support",     description: "AI-powered predictive analytics, real-time dashboards, and automated reporting that transform raw business data into actionable intelligence for faster, more confident decisions." },
    { iconName: "Target",      title: "Sustained Competitive Advantage",  description: "Deploy AI capabilities that position your business years ahead of competitors still relying on manual processes — in a UAE market where digital maturity increasingly determines market share." },
    { iconName: "Globe",       title: "Exponential Scalability",          description: "Handle growing data volumes and process complexity without proportional increases in headcount. AI systems that scale infinitely — handling thousands of simultaneous operations effortlessly." },
    { iconName: "Clock",       title: "24/7 Autonomous Operations",       description: "AI-powered workflows that process transactions, answer customer queries, monitor systems, and generate reports around the clock — without fatigue, inconsistency, or human error." },
    { iconName: "Shield",      title: "Automated Risk & Compliance",      description: "Automated compliance monitoring, real-time anomaly detection, transaction risk scoring, and regulatory reporting that protect your business from financial, operational, and regulatory risks." },
  ],
  "it-infrastructure": [
    { iconName: "Shield",      title: "Enterprise-Grade Cybersecurity",   description: "Multi-layered, defense-in-depth security architecture aligned with UAE IA standards, NIST CSF, and ISO 27001 — protecting your data, systems, and business reputation from modern threats." },
    { iconName: "Zap",         title: "99.9% Uptime Guarantee",           description: "SLA-backed infrastructure with redundant systems, proactive 24/7 monitoring, automated health checks, and rapid failover — keeping your business running without costly interruptions." },
    { iconName: "BarChart3",   title: "Optimized Performance & Speed",    description: "Right-sized, fine-tuned infrastructure that delivers the application speed, network throughput, and user experience your operations demand — with regular performance benchmarking." },
    { iconName: "TrendingUp",  title: "CapEx to OpEx Cost Transformation", description: "Cloud and hybrid strategies that eliminate large upfront hardware investments, converting infrastructure costs to predictable monthly operational expenses with transparent billing." },
    { iconName: "Globe",       title: "Elastic Scalability",              description: "Infrastructure architected to scale elastically — adding compute, storage, or network capacity in hours, not weeks, without expensive rearchitecting or business disruption." },
    { iconName: "Database",    title: "Regulatory Compliance & Governance", description: "Infrastructure aligned with UAE TRA data sovereignty requirements, DIFC/ADGM data regulations, ISO 27001, PCI DSS, and HIPAA — with automated compliance reporting and audit trails." },
  ],
  "mobile-apps": [
    { iconName: "Sparkles",    title: "App Store–Quality Experience",     description: "Award-winning UI/UX design that users love — intuitive navigation, delightful micro-interactions, and visual polish that drives App Store ratings above 4.5 stars and strong user retention." },
    { iconName: "Globe",       title: "Cross-Platform Native Performance", description: "Native iOS (Swift/SwiftUI) and Android (Kotlin) apps, or cost-efficient React Native/Flutter solutions — all delivering flawless performance across every device, OS version, and screen size." },
    { iconName: "Shield",      title: "Military-Grade App Security",      description: "Biometric authentication, AES-256 encrypted storage, certificate pinning, secure API communication, and role-based access control — protecting your app and every user's data." },
    { iconName: "Zap",         title: "Offline-First Architecture",       description: "Apps engineered to work fully without internet connectivity and sync seamlessly when reconnected — critical for field teams, remote workers, and enterprise mobile deployments across the GCC." },
    { iconName: "TrendingUp",  title: "App Store Optimization & Growth",  description: "Launch strategies built on keyword research, metadata optimization, screenshot design, and download velocity tactics — maximizing your app's visibility and ranking from day one." },
    { iconName: "BarChart3",   title: "Data-Driven Continuous Improvement", description: "In-app analytics (Firebase, Mixpanel), crash reporting, session recording, A/B testing, and user feedback loops that fuel evidence-based feature prioritization and iterative improvement." },
  ],
};

const CATEGORY_INDUSTRIES: Record<string, Industry[]> = {
  erp: [
    { emoji: "🏭", name: "Manufacturing & Production",    description: "Multi-site production planning, BOM management, quality control, capacity planning, and MRP for UAE manufacturers, free zone industrials, and JAFZA/KEZAD operators." },
    { emoji: "🏗️", name: "Real Estate & Construction",    description: "Project costing, subcontractor management, retention tracking, milestone billing, and Ejari/Tawtheeq compliance for UAE developers and construction contractors." },
    { emoji: "🛒", name: "Retail & FMCG Distribution",   description: "Multi-branch POS, automated inventory replenishment, loyalty programs, and e-commerce synchronization for retail chains and FMCG distributors across UAE." },
    { emoji: "🏥", name: "Healthcare & Life Sciences",    description: "Patient billing, insurance claims processing, pharmacy management, DHA/HAAD compliance, and clinical operations management for hospitals and medical centers." },
    { emoji: "💼", name: "Professional & Business Services", description: "Project billing, timesheet management, resource planning, and client portals for consulting, legal, audit, and professional services firms across the UAE." },
    { emoji: "🍽️", name: "Hospitality & Food & Beverage", description: "Restaurant POS integration, recipe costing, F&B procurement, central kitchen management, and hotel property management system integration for UAE hospitality groups." },
  ],
  "web-ecommerce": [
    { emoji: "🛍️", name: "Retail, Fashion & Lifestyle",   description: "Multi-currency storefronts, virtual try-on, size guides, wish lists, and loyalty programs for fashion, beauty, and lifestyle brands targeting UAE and GCC consumers." },
    { emoji: "🏠", name: "Real Estate & Property",        description: "Property listing portals, virtual tour integration, ROI calculators, mortgage tools, and agent CRM integration for UAE developers and real estate agencies." },
    { emoji: "🍕", name: "Food, Beverage & Delivery",     description: "Online ordering systems, delivery platform integration (Talabat, Deliveroo), multi-branch menus, and loyalty apps for UAE restaurants and food brands." },
    { emoji: "💊", name: "Healthcare & Wellness",         description: "DHA-compliant appointment booking, telehealth platforms, health product e-commerce, and patient data security for UAE clinics and wellness businesses." },
    { emoji: "🎓", name: "Education & eLearning",         description: "Course marketplaces, LMS integration, student portals, certification management, and live class platforms for UAE educational institutions and training providers." },
    { emoji: "🏭", name: "B2B & Industrial Commerce",     description: "B2B ordering portals, quote-to-order workflows, bulk pricing tiers, customer-specific catalogues, and ERP-integrated commerce for UAE distributors and manufacturers." },
  ],
  "digital-marketing": [
    { emoji: "🏠", name: "Real Estate & Proptech",        description: "High-volume lead generation for off-plan and secondary market properties, developer branding campaigns, and agent team digital marketing for UAE's AED 450B+ property market." },
    { emoji: "🛒", name: "Retail & eCommerce",            description: "Shopping campaigns, dynamic product ads, seasonal promotions, and retargeting sequences that drive consistent revenue for UAE online and physical retailers." },
    { emoji: "🍽️", name: "Hospitality & Tourism",         description: "Hotel booking campaigns, restaurant discovery marketing, UAE tourism experience promotion, and reputation management for hospitality brands across Dubai and Abu Dhabi." },
    { emoji: "🏥", name: "Healthcare & Medical Clinics",  description: "DHA-compliant patient acquisition campaigns, local SEO for clinics, doctor reputation management, and healthcare content marketing across UAE." },
    { emoji: "🎓", name: "Education & Training",          description: "Student enrollment campaigns for UAE schools, universities, and training providers — covering local recruitment, international student outreach, and course promotion." },
    { emoji: "💼", name: "Professional Services & Finance", description: "B2B lead generation, financial services marketing with regulatory compliance, LinkedIn thought leadership, and professional services brand positioning across the GCC." },
  ],
  "ai-automation": [
    { emoji: "🏦", name: "Banking & Financial Services",  description: "Real-time fraud detection, AI credit scoring, automated underwriting, intelligent customer service chatbots, and regulatory reporting automation for UAE banks and fintech firms." },
    { emoji: "🏥", name: "Healthcare & Life Sciences",    description: "Clinical decision support, medical image analysis, patient flow optimization, intelligent appointment management, and pharmaceutical supply chain automation." },
    { emoji: "🏭", name: "Manufacturing & Logistics",     description: "Predictive maintenance, computer vision quality inspection, demand forecasting, automated picking and packing, and end-to-end supply chain optimization." },
    { emoji: "🛒", name: "Retail & eCommerce",            description: "AI-powered personalized recommendation engines, dynamic pricing optimization, intelligent inventory forecasting, and customer churn prediction for UAE retailers." },
    { emoji: "🏠", name: "Real Estate & Property",        description: "Automated property valuation models, AI tenant screening, predictive maintenance for facilities management, and intelligent property search and matching tools." },
    { emoji: "💼", name: "Professional Services",         description: "Intelligent document processing, AI-powered contract analysis, automated knowledge management, and AI assistants for legal, consulting, and audit firms." },
  ],
  "it-infrastructure": [
    { emoji: "🏦", name: "Banking & Financial Services",  description: "Zero-trust security architecture, PCI DSS-certified networks, CBUAE-compliant data management, high-frequency trading infrastructure, and 24/7 SOC monitoring." },
    { emoji: "🏥", name: "Healthcare & Hospital Systems", description: "HL7/FHIR-integrated healthcare IT, HIPAA-aware data management, clinical systems integration, telemedicine infrastructure, and DHA-compliant security." },
    { emoji: "🏭", name: "Manufacturing & Industry 4.0", description: "OT/IT convergence architecture, industrial IoT connectivity, SCADA and DCS security, ruggedized networking for factory environments, and smart factory enablement." },
    { emoji: "🏢", name: "Commercial Real Estate & Smart Buildings", description: "Building management systems, structured cabling, IP surveillance, biometric access control, and IoT sensor integration for smart commercial properties." },
    { emoji: "🛒", name: "Retail & Multi-Site Operations", description: "PCI DSS-compliant payment networks, secure guest WiFi, POS connectivity, video analytics, centralized management, and branch networking for retail chains." },
    { emoji: "🏛️", name: "Government & Semi-Government", description: "UAE IA-compliant government cloud, ICP-integrated systems, e-government service integration, and national cybersecurity framework alignment for government entities." },
  ],
  "mobile-apps": [
    { emoji: "🛒", name: "Retail & eCommerce",            description: "Shopping apps with AR product try-on, loyalty rewards, push notification campaigns, personalized recommendations, and seamless UAE payment gateway integration." },
    { emoji: "🏥", name: "Healthcare & Wellness",         description: "DHA-compliant patient apps, telemedicine platforms, health monitoring integration (wearables), appointment booking, and secure digital health records management." },
    { emoji: "🏦", name: "Banking & Fintech",             description: "CBUAE-compliant mobile banking apps, digital wallets, peer-to-peer payment platforms, investment apps, and financial management tools for UAE consumers." },
    { emoji: "🚚", name: "Logistics & Last-Mile Delivery", description: "Driver management apps, real-time fleet tracking, proof-of-delivery with e-signature, customer tracking links, and automated dispatch optimization." },
    { emoji: "🏠", name: "Real Estate & Property Management", description: "Property search apps with virtual tours, tenant self-service portals, maintenance request management, digital tenancy agreements, and rent payment integration." },
    { emoji: "🎓", name: "Education & Corporate Learning",  description: "Learning management apps, virtual classroom platforms, student progress tracking, gamified education experiences, and corporate training portals." },
  ],
};

const CATEGORY_FAQ: Record<string, FaqItem[]> = {
  erp: [
    {
      question: "How long does an ERP implementation typically take?",
      answer: "Timelines depend on scope. A standard SME implementation covering 5–10 modules and 20–50 users typically takes 8–16 weeks. Enterprise deployments with complex customizations, multiple company setups, and full data migrations range from 4–9 months. We provide a detailed project schedule with milestones during the initial assessment phase — no surprises.",
    },
    {
      question: "Can you migrate our data from our existing system?",
      answer: "Yes — data migration is a core part of every implementation. We have successfully migrated data from SAP, Oracle, Microsoft Dynamics, QuickBooks, Tally, Sage, and custom-built systems. Our process includes a full data audit, field mapping, multiple test migration cycles with validation, and a final cut-over migration with rollback protocols.",
    },
    {
      question: "Is the ERP solution fully compliant with UAE regulations?",
      answer: "Absolutely. All implementations are configured for UAE VAT (FTA compliance with compliant invoices and returns), WPS payroll with SIF file generation, MOHRE labor law compliance (Federal Decree-Law No. 33 of 2021), GPSSA reporting for Abu Dhabi nationals, UAE Corporate Tax, and Central Bank requirements for financial institutions. We issue updates whenever regulations change.",
    },
    {
      question: "What ongoing support is included after go-live?",
      answer: "We offer tiered SLA-backed support packages: Standard (8×5, 24-hour response for critical issues), Business (12×6, 4-hour response), and Enterprise (24×7, 1-hour response). All plans include bug fixes, regulatory compliance updates, and quarterly system health reviews. Enterprise clients receive a dedicated account manager and priority escalation path.",
    },
    {
      question: "How is training provided for our team?",
      answer: "Comprehensive, role-based training is included in every project. We provide separate tracks for end-users, managers, system administrators, and IT teams. Sessions are conducted on-site (Dubai/Abu Dhabi) or virtually, in English and Arabic. We also deliver recorded video libraries and user manuals so new joiners can onboard independently post-go-live.",
    },
    {
      question: "Cloud-hosted or on-premise — what do you recommend?",
      answer: "Cloud hosting (AWS UAE, Azure UAE North, or Odoo.sh) is recommended for most businesses — offering lower total cost of ownership, automatic updates, remote access, and no server maintenance burden. On-premise is available for organizations with strict data sovereignty requirements or significant existing infrastructure. Hybrid deployments are also possible.",
    },
  ],
  "web-ecommerce": [
    {
      question: "How long does it take to build a professional website or e-commerce store?",
      answer: "A professional business website (5–15 pages, custom design) typically takes 4–8 weeks from kickoff to launch. A fully custom e-commerce store with payment gateway integration, ERP sync, and custom features: 8–16 weeks. Complex platforms like B2B portals, multi-vendor marketplaces, or headless commerce builds: 4–6 months. Scope-dependent timelines are confirmed during the discovery call.",
    },
    {
      question: "Which e-commerce platform do you recommend for UAE businesses?",
      answer: "Platform selection depends on your business model, catalogue size, and growth plans. Shopify Plus excels for DTC and mid-market retail (fastest to market, best UAE app ecosystem). Magento/Adobe Commerce suits large catalogues and complex B2B pricing. WooCommerce is ideal for content-heavy sites needing flexibility. Odoo eCommerce integrates natively with your ERP. We recommend the right fit — not the most popular option.",
    },
    {
      question: "Will my website rank on Google UAE and GCC search?",
      answer: "Yes. Every website we build includes technical SEO fundamentals: semantic URL structure, optimized meta tags, Open Graph, structured data (JSON-LD), Core Web Vitals optimization, image compression, and mobile responsiveness. For competitive ranking in UAE markets, we also offer ongoing SEO retainers covering content strategy, link building, and local SEO targeting Dubai, Abu Dhabi, and key GCC cities.",
    },
    {
      question: "Can you integrate my website with Odoo, SAP, or another ERP?",
      answer: "Yes — ERP and CRM integration is one of our core specialties. We have delivered live integrations between websites/stores and Odoo, SAP Business One, Zoho CRM, HubSpot, Salesforce, and custom systems. Integration can be real-time (REST API/GraphQL webhooks) or batch-scheduled depending on data sensitivity and system capabilities.",
    },
    {
      question: "Do you handle website maintenance after launch?",
      answer: "Yes. We offer monthly maintenance retainers covering security patches, CMS and plugin updates, SSL renewal, uptime monitoring (99.9% SLA), performance checks, Google Search Console monitoring, and minor content updates. Larger feature additions are scoped as separate projects. Emergency security patching is handled within 4 hours for retainer clients.",
    },
    {
      question: "How do UAE payment gateways work and which do you integrate?",
      answer: "We integrate all major UAE-approved payment gateways: Network International (the most widely used), PayTabs (popular for SMEs), Stripe (for international businesses), PayFort (Amazon), Telr, and Checkout.com. For UAE e-commerce, we configure 3D Secure 2.0, Arabic checkout flows, and installment payment options (Tabby, Tamara, Spotii) to maximize conversion.",
    },
  ],
  "digital-marketing": [
    {
      question: "How quickly will I see results from digital marketing in UAE?",
      answer: "Paid advertising (Google Ads, Meta Ads) can drive traffic and leads within 48–72 hours of launch, but campaigns typically reach optimized performance after 30–90 days of data accumulation and refinement. SEO is a longer-term investment — significant ranking improvements in competitive UAE keywords typically take 3–6 months. We set realistic, segment-specific timelines during onboarding.",
    },
    {
      question: "What monthly budget do I need for effective digital marketing in the UAE?",
      answer: "Impactful campaigns are possible from AED 5,000–10,000/month in ad spend for focused niches. Competitive verticals like real estate, healthcare, and retail typically require AED 15,000–100,000+/month for meaningful market share. Our engagement minimum is AED 3,000/month in management fees (separate from ad spend). We provide ROI projections before any commitment based on your specific industry and goals.",
    },
    {
      question: "How do you measure and report on campaign performance?",
      answer: "We define success by your business goals: cost per qualified lead (CPL), return on ad spend (ROAS), customer acquisition cost (CAC), or revenue attribution. All clients receive real-time performance dashboards plus monthly reports covering channel performance, audience insights, creative analysis, budget utilization, and the next month's recommendations. No hiding behind vanity metrics.",
    },
    {
      question: "Do you create Arabic-language ad campaigns?",
      answer: "Yes — Arabic campaigns are a core strength. We have native Arabic copywriters and strategists who produce culturally appropriate, high-converting Arabic ad copy, landing pages, and social content. In our experience, Arabic-language campaigns frequently outperform English-only campaigns by 25–50% for UAE residential audiences, particularly in real estate, healthcare, retail, and education verticals.",
    },
    {
      question: "Can you manage both B2B and B2C marketing?",
      answer: "Yes. Our team handles both segments with specialized strategies. B2C focuses on consumer platforms (Meta, TikTok, Google Shopping, Snapchat) with emotional creative and direct-response optimization. B2B strategies emphasize LinkedIn, intent-based Google Search, content marketing, and account-based marketing (ABM) for longer sales cycles and higher deal values.",
    },
    {
      question: "Do you also handle content creation and creative production?",
      answer: "Yes — we are a full-service digital marketing agency. Creative services include photography and videography briefing and management, graphic design for ads and social, copywriting in English and Arabic, motion graphics, and short-form video (Reels, TikToks). All creative is produced by our in-house team or vetted production partners based in Dubai.",
    },
  ],
  "ai-automation": [
    {
      question: "How do we know if AI is the right solution for our specific business problem?",
      answer: "AI delivers highest value where you have: repetitive, rules-based tasks at scale; large data volumes with patterns difficult for humans to detect; customer interactions needing 24/7 availability; or complex decision-making that can be modelled from historical data. During our free AI Readiness Assessment (2–3 hours), we evaluate your specific use cases, data availability, technical readiness, and ROI potential — before recommending any investment.",
    },
    {
      question: "How long does an AI or automation project take to deliver?",
      answer: "Scope drives timeline. Simple RPA bots for process automation: 3–6 weeks. AI chatbots with Arabic NLP: 8–14 weeks. Predictive analytics models: 10–18 weeks. Custom machine learning platforms: 4–8 months. Enterprise AI transformations: 9–18 months in phases. Every project begins with a proof-of-concept (PoC) sprint to validate feasibility and ROI before full investment.",
    },
    {
      question: "Do we need large volumes of historical data to benefit from AI?",
      answer: "Not always. Chatbots, RPA, and NLP solutions work effectively with minimal historical data. Predictive analytics and machine learning models typically need 12–36 months of clean historical data for reliable accuracy. For data-limited situations, we employ transfer learning from pre-trained models, synthetic data generation, or simpler rule-based automation as appropriate bridges.",
    },
    {
      question: "How do you ensure AI systems are accurate and won't make costly mistakes?",
      answer: "Rigorous validation is fundamental to every AI project. We use train/test/validation dataset splits, cross-validation, precision/recall optimization, and real-world shadow testing before deployment. All production AI systems include confidence thresholds, human-in-the-loop escalation for low-confidence decisions, automated performance monitoring, and model drift detection with retraining triggers.",
    },
    {
      question: "Is our business data secure when used to build AI models?",
      answer: "Data security is non-negotiable. We operate under strict NDAs, use isolated secure data environments, anonymize or pseudonymize PII before model training wherever possible, and follow ISO 27001-aligned data handling practices. All AI models are trained and deployed within your approved data perimeter — no data is shared with third-party AI providers without explicit written consent.",
    },
    {
      question: "Can AI be integrated with our existing Odoo, SAP, or CRM systems?",
      answer: "Yes — seamless integration with existing systems is how AI delivers practical value. We build production integrations between AI/ML models and Odoo, SAP, Salesforce, Microsoft Dynamics, custom databases, and third-party APIs using REST, webhooks, and native connectors. The goal is embedding intelligence into your existing workflows — not creating isolated tools that teams won't adopt.",
    },
  ],
  "it-infrastructure": [
    {
      question: "How do you assess our current IT infrastructure before recommending solutions?",
      answer: "We conduct a comprehensive IT Infrastructure Assessment covering: network topology and performance, server capacity and utilization, security posture (vulnerability scan + gap analysis), software and licensing inventory, backup and disaster recovery readiness, and alignment between IT capabilities and business requirements. The output is a prioritized Infrastructure Improvement Roadmap — typically delivered within 5–10 business days.",
    },
    {
      question: "Cloud vs. on-premise — what's right for UAE businesses in 2025?",
      answer: "Most UAE enterprises benefit from a hybrid approach. Cloud (AWS UAE Region, Azure UAE North) delivers lower CapEx, elastic scaling, global connectivity, and managed maintenance. On-premise suits organizations with data sovereignty requirements (government, defence, regulated finance), ultra-low-latency needs, or major existing hardware investments. We conduct a TCO analysis and workload assessment to recommend the optimal mix for your specific situation.",
    },
    {
      question: "How do you approach cybersecurity for our infrastructure?",
      answer: "We implement a defense-in-depth security model: next-generation firewalls and network segmentation, endpoint detection and response (EDR), zero-trust access with MFA, email security and anti-phishing, privileged access management (PAM), SIEM for threat detection, and annual penetration testing. All aligned with UAE IA (Information Assurance) standards, NIST Cybersecurity Framework, and ISO 27001.",
    },
    {
      question: "What is included in your managed IT services?",
      answer: "Our fully managed IT service covers: 24/7 infrastructure monitoring with automated alerting, proactive patching and maintenance, backup verification and integrity testing, security update deployment, helpdesk support (8×5 to 24×7 options), incident response, change management, and quarterly business reviews with your IT leadership. Single-pane-of-glass visibility across all managed assets.",
    },
    {
      question: "How do you protect our business from data loss or system failure?",
      answer: "We design and implement comprehensive BCDR (Business Continuity and Disaster Recovery) solutions: automated incremental and full backups, offsite replication to secondary UAE data centers or cloud, documented recovery runbooks, automated failover for critical systems, and annual DR drills with written test reports. Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO) are contractually agreed and measured.",
    },
    {
      question: "Can you support multi-site deployments across UAE and GCC?",
      answer: "Yes — multi-site and multi-country deployments are standard for us. We have designed and currently manage IT infrastructure across numerous UAE locations (Dubai, Abu Dhabi, Sharjah, RAK, Fujairah) and GCC countries (Saudi Arabia, Bahrain, Kuwait, Qatar, Oman). Our NOC provides unified monitoring, single-ticket support, and centralized patch management across all sites.",
    },
  ],
  "mobile-apps": [
    {
      question: "How long does mobile app development typically take?",
      answer: "Simple apps (8–12 screens, basic features, minimal backend): 6–10 weeks. Mid-complexity apps with custom backend, third-party integrations, and role-based access: 12–20 weeks. Enterprise apps with complex workflows, offline sync, multi-language support, and advanced security: 5–10 months. We start every project with a 2-week Discovery Sprint to define scope accurately and eliminate estimation surprises.",
    },
    {
      question: "Should we build native iOS/Android or cross-platform (React Native/Flutter)?",
      answer: "Native (Swift/SwiftUI for iOS, Kotlin/Jetpack Compose for Android) delivers the best performance, smoothest animations, and deepest OS feature access — ideal for AR/camera features, complex graphics, or performance-critical applications. React Native and Flutter deliver near-native performance at 30–40% lower cost and timeline — suitable for most business, enterprise, and consumer apps. We recommend based on your feature requirements, timeline, and budget.",
    },
    {
      question: "How do you ensure quality and performance before launching the app?",
      answer: "Our QA process is rigorous and systematic: automated unit testing (70%+ code coverage), integration testing, UI automation testing with Detox/Appium, performance testing under load, and real-device testing across 40+ iOS and Android device/OS combinations. Apps undergo security scanning (OWASP Mobile Top 10), code review, and App Store compliance pre-check before any submission.",
    },
    {
      question: "Can you integrate the app with our ERP, CRM, or internal systems?",
      answer: "Yes — backend integration is core to our mobile development practice. We build secure REST APIs or GraphQL services connecting your mobile app to Odoo, SAP, Salesforce, custom Node.js/Python backends, and third-party services. We also implement offline-first architectures with conflict resolution, WebSocket real-time data, push notifications (FCM/APNs), biometric auth, and SSO (SAML/OAuth 2.0).",
    },
    {
      question: "What happens after the app is launched — maintenance and updates?",
      answer: "Post-launch, we offer app maintenance retainers covering: bug fixes and crash resolution (typically within 24 hours), iOS/Android OS compatibility updates, App Store and Google Play policy compliance updates, performance monitoring via Firebase, crash analytics review, and quarterly feature planning sessions. Dedicated mobile engineers are available for priority support for retainer clients.",
    },
    {
      question: "How do you handle App Store and Google Play submission?",
      answer: "We manage the complete submission process: Apple App Store (including Apple ID setup, app privacy details, age rating, screenshot design, and App Review response if questioned) and Google Play (including content rating, target audience, data safety declaration, and staged rollout configuration). Our pre-submission compliance review gives us a 95%+ first-attempt approval rate.",
    },
  ],
};

// Why Choose aKross — static, used on all service pages
const WHY_AKROSS = [
  {
    iconName: "Award",
    title: "10+ Years of UAE Market Expertise",
    description: "Over a decade serving UAE and GCC businesses — we understand the regulatory landscape, business culture, and technology ecosystem that no offshore agency or new-market entrant can replicate.",
  },
  {
    iconName: "Shield",
    title: "Certified Technology Partnerships",
    description: "Odoo Gold Partner, AWS Select Tier, and certified partnerships with Microsoft Azure, Google Cloud, Cisco, Fortinet, and 12+ leading vendors — ensuring every project benefits from official partner support and access.",
  },
  {
    iconName: "Users",
    title: "End-to-End Project Ownership",
    description: "From strategy and design through implementation, integration, training, and ongoing support — we own the full project lifecycle. Dedicated project managers, clear milestones, and full accountability at every stage.",
  },
  {
    iconName: "Clock",
    title: "24/7 Support with Contractual SLAs",
    description: "Round-the-clock monitoring and support with guaranteed response times — not best-effort promises. Critical issues receive immediate attention from our UAE-based team without waiting for an offshore helpdesk to wake up.",
  },
];

type LucideIconComponent = React.FC<{ size?: number; style?: React.CSSProperties; className?: string }>;

// Icon map for dynamic rendering
const iconMap: Record<string, LucideIconComponent> = {
  BarChart3, Zap, Shield, TrendingUp, Globe, Users, Target,
  Sparkles, Clock, Cpu, Layers, Code2, Smartphone, Award,
  CheckCircle2, Database, Lock, Wifi, Server, Headphones,
  Star, Building2,
};

const featureIcons: LucideIconComponent[] = [
  Sparkles, Target, Zap, Shield, BarChart3,
  Globe, Cpu, Layers, Code2, Smartphone, Users, CheckCircle2,
];

// Rotating feature support messages — more varied than a single static line
const featureMessages = [
  "Delivered by certified UAE specialists with deep domain expertise and hands-on implementation experience.",
  "Fully documented with comprehensive training materials, video guides, and post-deployment handover.",
  "Integrated seamlessly with your existing systems and business processes for immediate operational impact.",
  "Built to UAE and GCC regulatory standards with compliance documentation and audit trail support.",
  "Backed by our SLA-guaranteed support team with proactive monitoring and rapid issue resolution.",
  "Architected for scalability — grows with your business across UAE and GCC without expensive rework.",
  "Refined across 150+ UAE client engagements to eliminate common pitfalls and accelerate time-to-value.",
  "Delivered on a fixed timeline with clear milestones, weekly progress reports, and transparent management.",
  "Leveraging official vendor partnerships and certified expertise for best-in-class delivery outcomes.",
  "ROI-driven with clear measurement frameworks and performance benchmarking established from day one.",
  "Security-first design with data protection, access controls, and compliance built into the core architecture.",
  "Continuous improvement model with quarterly reviews, usage analytics, and proactive optimization cycles.",
];

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────

function FAQItem({ question, answer, accentHex }: FaqItem & { accentHex: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderRadius: "0.875rem",
        border: `1px solid ${open ? `${accentHex}25` : "var(--card-border)"}`,
        background: open ? `${accentHex}05` : "var(--card-bg)",
        overflow: "hidden",
        transition: "border-color 0.3s, background 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.375rem 1.5rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 600,
            fontSize: "0.9375rem",
            color: open ? "var(--text-primary)" : "var(--text-primary)",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: open ? `${accentHex}18` : "var(--bg-tertiary)",
            border: `1px solid ${open ? `${accentHex}35` : "var(--card-border)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s, background 0.3s, border-color 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={14} style={{ color: open ? accentHex : "var(--text-tertiary)" }} />
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? "600px" : "0",
          overflow: "hidden",
          transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          style={{
            padding: "0 1.5rem 1.375rem",
            fontSize: "0.9375rem",
            color: "var(--text-secondary)",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────

export default function ServiceDetailTemplate({ service, category }: ServiceDetailTemplateProps) {
  const accentHex = service.color;

  const benefits  = CATEGORY_BENEFITS[category.slug]  ?? CATEGORY_BENEFITS.erp;
  const industries = CATEGORY_INDUSTRIES[category.slug] ?? CATEGORY_INDUSTRIES.erp;
  const faq       = CATEGORY_FAQ[category.slug]       ?? CATEGORY_FAQ.erp;

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="svc-hero"
        style={{
          paddingTop: "clamp(6rem,12vw,9rem)",
          paddingBottom: "5rem",
          background: "var(--bg-primary)",
          borderBottom: "1px solid var(--border)",
          ["--accent" as never]: accentHex,
        }}
      >
        {/* 3D animated backdrop */}
        <Service3DBackdrop accentColor={accentHex} density="low" scale={0.45} />

        {/* Floating glow orbs (animated) */}
        <div aria-hidden="true" className="svc-hero-orb" style={{ top: "-18%", right: "-8%", width: "60vw", height: "60vw", maxWidth: 700, maxHeight: 700, background: `radial-gradient(circle, ${accentHex}14 0%, transparent 65%)`, animationDuration: "9s" }} />
        <div aria-hidden="true" className="svc-hero-orb" style={{ bottom: "-30%", left: "-5%", width: "40vw", height: "40vw", maxWidth: 500, maxHeight: 500, background: "radial-gradient(circle, rgba(123,47,255,0.10) 0%, transparent 65%)", animationDuration: "11s", animationDelay: "1.5s" }} />
        <div aria-hidden="true" className="svc-hero-orb" style={{ top: "30%", left: "55%", width: "30vw", height: "30vw", maxWidth: 380, maxHeight: 380, background: `radial-gradient(circle, ${accentHex}0d 0%, transparent 70%)`, animationDuration: "13s", animationDelay: "0.8s" }} />
        <div aria-hidden="true" className="svc-hero-orb" style={{ top: "10%", left: "10%", width: "20vw", height: "20vw", maxWidth: 240, maxHeight: 240, background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)", animationDuration: "14s", animationDelay: "2.2s" }} />

        <div className="section-container">
          {/* Breadcrumb */}
          <Reveal>
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "2rem", flexWrap: "wrap" }}>
              {[
                { label: "Home",       href: "/" },
                { label: "Services",   href: "/services" },
                { label: category.name, href: `/services/${category.slug}` },
                { label: service.name,  current: true },
              ].map((c, i, arr) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  {c.current
                    ? <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{c.label}</span>
                    : <Link href={c.href!} style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", textDecoration: "none" }}>{c.label}</Link>
                  }
                  {i < arr.length - 1 && <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />}
                </span>
              ))}
            </nav>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "3.5rem", alignItems: "center" }}>
            {/* Left content */}
            <div>
              <Reveal delay={50}>
                <span style={{ display: "inline-block", marginBottom: "1.25rem", padding: "0.3rem 0.875rem", borderRadius: "100px", background: `${accentHex}15`, color: accentHex, fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${accentHex}25` }}>
                  {service.category}
                </span>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="headline-section" style={{ marginBottom: "1.25rem", maxWidth: "22ch" }}>
                  {service.name}
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p style={{ fontSize: "1.125rem", color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: "580px", marginBottom: "2.5rem" }}>
                  {service.tagline}
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href={`/book-consultation?service=${service.slug}`} className="btn-primary">
                    Get a Free Quote
                  </Link>
                  <Link href="/contact" className="btn-outline">
                    Talk to an Expert
                  </Link>
                </div>
              </Reveal>

              {/* Trust micro-signals */}
              <Reveal delay={250}>
                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
                  {["Free consultation", "Response in 2 hrs", "No commitment required"].map(sig => (
                    <span key={sig} style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
                      <CheckCircle2 size={13} style={{ color: accentHex }} />
                      {sig}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — Contact form (replaces previous tech card so users can enquire directly) */}
            <Reveal direction="right" delay={150}>
              <div className="glass-card" style={{ borderRadius: "1.5rem", overflow: "hidden", border: `1px solid ${accentHex}20`, background: `linear-gradient(135deg, ${accentHex}08 0%, rgba(123,47,255,0.06) 50%, rgba(0,102,255,0.04) 100%)`, padding: "2rem", position: "relative" }}>
                <div style={{ position: "relative", zIndex: 1 }}>
                  <p className="label-tag" style={{ marginBottom: "0.5rem", color: accentHex }}>Contact Us</p>
                  <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.25 }}>
                    Enquire About {service.name}
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                    Get a tailored proposal within 2 business hours.
                  </p>
                  <ContactForm
                    defaultService={service.name}
                    compact={true}
                    accentColor={accentHex}
                  />
                </div>
                <div aria-hidden="true" style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${accentHex}12, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (max-width: 960px) {
            .svc-hero > div.section-container > div[style*="1.1fr 1fr"] { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          OVERVIEW + STATS
      ══════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <Reveal direction="left">
              <div>
                <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Service Overview</p>
                <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                  Why UAE Businesses Choose <br />
                  <span className="gradient-text">{service.name}</span>
                </h2>
                <p style={{ fontSize: "1.0625rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                  {service.overview}
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { value: "150+", label: "Projects Delivered" },
                  { value: "98%",  label: "Client Satisfaction" },
                  { value: "24/7", label: "Support Available" },
                  { value: "2 hrs", label: "Avg Response Time" },
                ].map(m => (
                  <div key={m.label} style={{ padding: "1.5rem", borderRadius: "1rem", background: "var(--card-bg)", border: `1px solid ${accentHex}18`, textAlign: "center" }}>
                    <div className="stat-number" style={{ fontSize: "1.875rem", fontWeight: 700, color: accentHex, lineHeight: 1 }}>{m.value}</div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginTop: "0.375rem" }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <style>{`@media (max-width: 768px) { section > div > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          BUSINESS BENEFITS  ← NEW SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Business Benefits</p>
              <h2 className="headline-section" style={{ marginBottom: "1rem", maxWidth: "28ch", margin: "0 auto 1rem" }}>
                What Your Business Gains from{" "}
                <span className="gradient-text">{service.name}</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "540px", margin: "0 auto", lineHeight: 1.75 }}>
                Tangible, measurable outcomes experienced by our UAE and GCC clients — not feature lists, but real business results.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {benefits.map((b, i) => {
              const Icon = iconMap[b.iconName] ?? Zap;
              return (
                <Reveal key={b.title} delay={i * 80} direction="up">
                  <div
                    style={{
                      padding: "2rem",
                      borderRadius: "1.25rem",
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      height: "100%",
                      transition: "border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${accentHex}30`;
                      el.style.background = `${accentHex}06`;
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = `0 20px 60px ${accentHex}0a`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--card-border)";
                      el.style.background = "var(--card-bg)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: "0.875rem", background: `${accentHex}12`, border: `1px solid ${accentHex}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                      <Icon size={22} style={{ color: accentHex }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.625rem", lineHeight: 1.3 }}>
                      {b.title}
                    </h3>
                    <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0 }}>
                      {b.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <style>{`@media (max-width: 900px) { .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 580px) { .benefits-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT WE OFFER (Features)
      ══════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p className="label-tag" style={{ marginBottom: "0.875rem" }}>What We Deliver</p>
              <h2 className="headline-section" style={{ marginBottom: "1rem", maxWidth: "26ch", margin: "0 auto 1rem" }}>
                Everything Included in{" "}
                <span className="gradient-text">{service.name}</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                A complete, end-to-end service — strategy, implementation, integration, training, and ongoing support included.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {service.features.map((feature, i) => {
              const Icon = featureIcons[i % featureIcons.length];
              return (
                <Reveal key={feature} delay={i * 60} direction="up">
                  <div
                    className="offer-card"
                    style={{ ["--hover-color" as string]: accentHex }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${accentHex}30`;
                      el.style.boxShadow = `0 20px 60px ${accentHex}0a`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--card-border)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: `${accentHex}12`, border: `1px solid ${accentHex}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem", flexShrink: 0 }}>
                      <Icon size={20} style={{ color: accentHex }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                      {feature}
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", lineHeight: 1.65, margin: 0 }}>
                      {featureMessages[i % featureMessages.length]}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INDUSTRIES SERVED  ← NEW SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ marginBottom: "3rem" }}>
              <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Industries We Serve</p>
              <h2 className="headline-section" style={{ marginBottom: "0.875rem" }}>
                Built for <span className="gradient-text">Every UAE Industry</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px", lineHeight: 1.75 }}>
                Our {service.name} solutions are tailored for the specific compliance requirements, workflows, and growth dynamics of each industry vertical.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 70} direction="up">
                <div
                  style={{
                    padding: "1.625rem",
                    borderRadius: "1rem",
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${accentHex}28`;
                    el.style.background = `${accentHex}05`;
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--card-border)";
                    el.style.background = "var(--card-bg)";
                  }}
                >
                  <span style={{ fontSize: "1.875rem", lineHeight: 1, flexShrink: 0 }}>{ind.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.4rem", lineHeight: 1.3 }}>
                      {ind.name}
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                      {ind.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <style>{`@media (max-width: 900px) { .industries-grid { grid-template-columns: repeat(2,1fr) !important; } } @media (max-width: 560px) { .industries-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TECHNOLOGIES USED
      ══════════════════════════════════════════════════════ */}
      <section style={{ padding: "2.75rem 0", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>
                Technologies &amp; Platforms
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", flex: 1 }}>
                {service.technologies.map((t, i) => (
                  <span key={t} style={{ padding: "0.375rem 0.875rem", borderRadius: "0.5rem", background: i === 0 ? `${accentHex}12` : "var(--bg-tertiary)", border: i === 0 ? `1px solid ${accentHex}30` : "1px solid var(--card-border)", fontSize: "0.8125rem", color: i === 0 ? accentHex : "var(--text-secondary)", fontFamily: "var(--font-space-mono), monospace", transition: "border-color 0.2s, background 0.2s, color 0.2s" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DELIVERY PROCESS
      ══════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container">
          <Reveal>
            <div style={{ marginBottom: "3rem" }}>
              <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Our Process</p>
              <h2 className="headline-section" style={{ marginBottom: "0.75rem" }}>
                How We Deliver <span className="gradient-text">Excellence</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "480px", lineHeight: 1.75 }}>
                A proven, repeatable methodology refined across 500+ engagements and adapted for UAE business culture and regulatory requirements.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(service.process.length, 5)}, 1fr)`, gap: "1rem" }}>
            {service.process.map((step, i) => (
              <Reveal key={step} delay={i * 80}>
                <div style={{ position: "relative", padding: "1.75rem 1.5rem", borderRadius: "1rem", background: "var(--card-bg)", border: `1px solid ${i === 0 ? `${accentHex}30` : "var(--card-border)"}`, height: "100%" }}>
                  <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6875rem", color: accentHex, fontWeight: 700, marginBottom: "0.875rem", letterSpacing: "0.1em" }}>
                    STEP {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    {step}
                  </h3>

                  {i < service.process.length - 1 && (
                    <div aria-hidden="true" style={{ position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", zIndex: 1, color: "var(--text-tertiary)" }}>
                      <ArrowRight size={14} />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <style>{`
            @media (max-width: 1024px) {
              section > div > div[style*="repeat(5"] { grid-template-columns: repeat(3, 1fr) !important; }
              section > div > div[style*="repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 600px) {
              section > div > div[style*="repeat(5"],
              section > div > div[style*="repeat(4"],
              section > div > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY CHOOSE QUVEX  ← NEW SECTION
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(4rem,8vw,6rem) 0",
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "80vw", height: "80vw", maxWidth: 900, maxHeight: 900, borderRadius: "50%", background: `radial-gradient(circle, ${accentHex}04 0%, transparent 60%)`, pointerEvents: "none" }} />

        <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Why aKross Information Technology</p>
              <h2 className="headline-section" style={{ marginBottom: "1rem" }}>
                The aKross <span className="gradient-text">Difference</span>
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75 }}>
                150+ UAE businesses chose aKross Information Technology. Here is what makes us different from every other technology provider in the market.
              </p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
            {WHY_AKROSS.map((w, i) => {
              const Icon = iconMap[w.iconName] ?? Shield;
              return (
                <Reveal key={w.title} delay={i * 90} direction="up">
                  <div
                    style={{
                      padding: "2rem 1.75rem",
                      borderRadius: "1.25rem",
                      background: "var(--card-bg)",
                      border: "1px solid var(--card-border)",
                      textAlign: "center",
                      transition: "border-color 0.3s, background 0.3s, transform 0.3s",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${accentHex}30`;
                      el.style.background = `${accentHex}06`;
                      el.style.transform = "translateY(-5px)";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--card-border)";
                      el.style.background = "var(--card-bg)";
                      el.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={{ width: 60, height: 60, borderRadius: "1rem", background: `${accentHex}12`, border: `1px solid ${accentHex}25`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                      <Icon size={26} style={{ color: accentHex }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.75rem", lineHeight: 1.3 }}>
                      {w.title}
                    </h3>
                    <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                      {w.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={200}>
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              <Link href="/about" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                About aKross Information Technology <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>

          <style>{`@media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2,1fr) !important; } } @media (max-width: 520px) { .why-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ SECTION  ← NEW SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="section-padding" style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5rem", alignItems: "start" }}>
            <Reveal direction="left">
              <div style={{ position: "sticky", top: "6rem" }}>
                <p className="label-tag" style={{ marginBottom: "0.875rem" }}>FAQ</p>
                <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                  Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "2rem" }}>
                  Common questions from UAE businesses considering {service.name} from aKross Information Technology. Don&apos;t see your question? Contact us directly.
                </p>
                <Link href="/contact" className="btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
                  Ask a Question <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>

            <Reveal direction="right" delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {faq.map((item, i) => (
                  <FAQItem key={i} question={item.question} answer={item.answer} accentHex={accentHex} />
                ))}
              </div>
            </Reveal>
          </div>

          <style>{`@media (max-width: 900px) { section > div > div[style*="1fr 2fr"] { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT FORM
      ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "clamp(4rem,8vw,6rem) 0",
          background: "var(--bg-secondary)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "5rem", alignItems: "start" }}>
            {/* Left – info */}
            <Reveal direction="left">
              <div>
                <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Get a Quote</p>
                <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--text-primary)", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                  Ready to Get Started with <br />
                  <span style={{ color: accentHex }}>{service.name}?</span>
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.75, marginBottom: "2rem" }}>
                  Fill out the form and a dedicated {service.category} specialist will contact you within 2 business hours with a tailored proposal aligned to your specific requirements.
                </p>

                {/* Contact info */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                  {[
                    { icon: "📞", label: "Call Us",    value: "+971 55 930 0437", href: "tel:+971559300437" },
                    { icon: "✉️", label: "Email Us",   value: "hello@akross.ae",  href: `mailto:hello@akross.ae?subject=${encodeURIComponent(`Enquiry: ${service.name}`)}` },
                    { icon: "💬", label: "WhatsApp",   value: "Chat with our team", href: `https://wa.me/971559300437?text=${encodeURIComponent(`Hi aKross, I am interested in your ${service.name} service.`)}` },
                    { icon: "📍", label: "Our Office", value: "Dubai, UAE & Abu Dhabi" },
                  ].map(item => {
                    const inner = (
                      <>
                        <span style={{ fontSize: "1.25rem", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.625rem", background: `${accentHex}10`, border: `1px solid ${accentHex}20` }}>{item.icon}</span>
                        <div>
                          <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{item.label}</div>
                          <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{item.value}</div>
                        </div>
                      </>
                    );
                    return item.href ? (
                      <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none" }}>
                        {inner}
                      </a>
                    ) : (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                        {inner}
                      </div>
                    );
                  })}
                </div>

                {/* Trust signals */}
                <div style={{ marginTop: "2rem", padding: "1.25rem", borderRadius: "0.875rem", background: `${accentHex}08`, border: `1px solid ${accentHex}18` }}>
                  {["No commitment required", "Response within 2 business hours", "Free initial consultation included", "NDA available upon request"].map(sig => (
                    <div key={sig} style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                      <CheckCircle2 size={13} style={{ color: accentHex, flexShrink: 0 }} />
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{sig}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right – form */}
            <Reveal direction="right" delay={100}>
              <div className="glass-card" style={{ padding: "2.5rem", border: `1px solid ${accentHex}18` }}>
                <ContactForm
                  defaultService={service.name}
                  compact={false}
                  accentColor={accentHex}
                  title={`Enquire About ${service.name}`}
                  subtitle="Our specialists will prepare a tailored proposal within 2 business hours."
                />
              </div>
            </Reveal>
          </div>

          <style>{`@media (max-width: 900px) { section > div > div[style*="2fr 3fr"] { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
