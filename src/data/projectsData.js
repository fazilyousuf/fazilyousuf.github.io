import agenticxWebImg from "@/assets/projects/agenticx-web.svg";
import agenticxCandidateImg from "@/assets/projects/agenticx-candidate.svg";
import agenticxCertImg from "@/assets/projects/agenticx-cert.svg";
import agenticxApiImg from "@/assets/projects/agenticx-api.svg";

export const projects = [
  {
    id: "agenticx-website",
    title: "AgenticX Official Website",
    domain: "agenticx.co.in",
    image: agenticxWebImg,
    badge: "Main Website",
    description:
      "The primary public digital platform and corporate gateway for AgenticX Knowledge Solutions. Features dynamic course discovery, enterprise AI training tracks, admissions workflows, and unified access to the AgenticX ecosystem.",
    tech: ["React", "Vite", "JavaScript", "HTML5", "CSS3", "REST APIs", "Vercel"],
    live: "https://agenticx.co.in",
    buttonLabel: "Visit Website",
  },
  {
    id: "agenticx-candidate-portal",
    title: "Candidate Self-Service Portal",
    domain: "candidate.agenticx.co.in",
    image: agenticxCandidateImg,
    badge: "Student Portal",
    description:
      "Dedicated self-service platform for enrolled candidates and interns. Handles student onboarding, admissions, training track progress, Razorpay fee payments with webhook verification, and automated PDF receipts.",
    tech: ["React", "Vite", "JWT Auth", "Razorpay", "Supabase Storage", "REST APIs"],
    live: "https://candidate.agenticx.co.in",
    buttonLabel: "Open Portal",
  },
  {
    id: "agenticx-certificate-portal",
    title: "Certificate Verification Portal",
    domain: "certificate.agenticx.co.in",
    image: agenticxCertImg,
    badge: "Verification System",
    description:
      "Public verification system enabling instant, tamper-proof validation of AgenticX-issued certificates. Features automated digital signatures, JWT-signed cryptographic QR verification, and cloud lookup.",
    tech: ["React", "Vite", "JWT Verification", "QR Engine", "ReportLab", "REST APIs"],
    live: "https://certificate.agenticx.co.in",
    buttonLabel: "Verify Certificate",
  },
  {
    id: "agenticx-backend-api",
    title: "Central FastAPI Backend Engine",
    domain: "api.agenticx.co.in",
    image: agenticxApiImg,
    badge: "Unified Backend Engine",
    description:
      "High-throughput, asynchronous FastAPI REST engine serving the entire AgenticX ecosystem. Houses 120+ endpoints, async SQLAlchemy ORM, Pydantic v2 validation, JWT role-based access control, Razorpay payment webhooks, and ReportLab PDF automation.",
    tech: ["FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "Pydantic v2", "Razorpay", "ReportLab", "Render"],
    live: "https://api.agenticx.co.in/docs",
    buttonLabel: "API Docs",
    altLink: "https://api.agenticx.co.in",
    altLabel: "API Server",
  },
];

