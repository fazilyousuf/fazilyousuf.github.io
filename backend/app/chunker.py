import json
from pathlib import Path
from typing import List, Dict

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


class Chunk:
    def __init__(self, id: str, source: str, text: str):
        self.id = id
        self.source = source  # e.g. "about_me", "experience", "projects"
        self.text = text

    def to_dict(self) -> Dict:
        return {"id": self.id, "source": self.source, "text": self.text}


# ---------- ABOUT ME ----------

def load_about_me_chunks() -> List[Chunk]:
    path = DATA_DIR / "about_me.json"
    data = json.loads(path.read_text(encoding="utf-8"))

    chunks: List[Chunk] = []

    name = data.get("name")
    headline = data.get("headline")
    location = data.get("location")
    summary = data.get("summary")

    # Basic profile
    profile_parts = []
    if name:
        profile_parts.append(f"Name: {name}")
    if headline:
        profile_parts.append(f"Headline: {headline}")
    if location:
        profile_parts.append(f"Location: {location}")
    if profile_parts:
        chunks.append(
            Chunk("about_profile", "about_me", "\n".join(profile_parts))
        )

    # Summary
    if summary:
        chunks.append(
            Chunk("about_summary", "about_me", summary)
        )

    # Links/contact
    contact_parts = []
    email = data.get("email")
    phone = data.get("phone")
    portfolio = data.get("portfolio")
    linkedin = data.get("linkedin")
    github = data.get("github")

    if email:
        contact_parts.append(f"Email: {email}")
    if phone:
        contact_parts.append(f"Phone: {phone}")
    if portfolio:
        contact_parts.append(f"Portfolio: {portfolio}")
    if linkedin:
        contact_parts.append(f"LinkedIn: {linkedin}")
    if github:
        contact_parts.append(f"GitHub: {github}")

    if contact_parts:
        chunks.append(
            Chunk("about_links", "about_me", "Contact & Links:\n" + "\n".join(contact_parts))
        )

    return chunks


# ---------- EXPERIENCE ----------

def load_experience_chunks() -> List[Chunk]:
    path = DATA_DIR / "experience.json"
    experiences = json.loads(path.read_text(encoding="utf-8"))

    chunks: List[Chunk] = []
    for idx, exp in enumerate(experiences):
        company = exp.get("company", "")
        role = exp.get("role", "")
        location = exp.get("location", "")
        start = exp.get("start", "")
        end = exp.get("end", "")
        responsibilities = exp.get("responsibilities", [])

        header_parts = []
        if role:
            header_parts.append(f"Role: {role}")
        if company:
            header_parts.append(f"Company: {company}")
        if location:
            header_parts.append(f"Location: {location}")
        if start or end:
            header_parts.append(f"Duration: {start} – {end}")

        text_parts = []
        if header_parts:
            text_parts.append(" | ".join(header_parts))
        if responsibilities:
            resp_text = "Key responsibilities:\n" + "\n".join(
                f"- {r}" for r in responsibilities
            )
            text_parts.append(resp_text)

        if text_parts:
            chunks.append(
                Chunk(f"experience_{idx}", "experience", "\n".join(text_parts))
            )

    return chunks


# ---------- EDUCATION ----------

def load_education_chunks() -> List[Chunk]:
    path = DATA_DIR / "education.json"
    education_list = json.loads(path.read_text(encoding="utf-8"))

    chunks: List[Chunk] = []
    for idx, edu in enumerate(education_list):
        degree = edu.get("degree", "")
        institution = edu.get("institution", "")
        location = edu.get("location", "")
        university = edu.get("university", "")
        cgpa = edu.get("cgpa", "")
        year = edu.get("year", "")

        parts = []
        if degree:
            parts.append(f"Degree: {degree}")
        if institution:
            parts.append(f"Institution: {institution}")
        if university:
            parts.append(f"University: {university}")
        if location:
            parts.append(f"Location: {location}")
        if cgpa:
            parts.append(f"CGPA: {cgpa}")
        if year:
            parts.append(f"Year: {year}")

        if parts:
            chunks.append(
                Chunk(f"education_{idx}", "education", "\n".join(parts))
            )

    return chunks


# ---------- PROJECTS ----------

def load_project_chunks() -> List[Chunk]:
    path = DATA_DIR / "projects.json"
    projects = json.loads(path.read_text(encoding="utf-8"))

    chunks: List[Chunk] = []
    for idx, proj in enumerate(projects):
        title = proj.get("title", "")
        desc = proj.get("description", "")
        stack = proj.get("tech_stack", [])
        features = proj.get("features", [])

        text_parts = []
        if title:
            text_parts.append(f"Project: {title}")
        if desc:
            text_parts.append(f"Description: {desc}")
        if stack:
            text_parts.append("Tech stack: " + ", ".join(stack))
        if features:
            feat_text = "Key features:\n" + "\n".join(f"- {f}" for f in features)
            text_parts.append(feat_text)

        text = "\n".join(text_parts)
        if text.strip():
            chunks.append(
                Chunk(f"project_{idx}", "projects", text)
            )

    return chunks


# ---------- SKILLS ----------

def load_skills_chunks() -> List[Chunk]:
    path = DATA_DIR / "skills.json"
    skills = json.loads(path.read_text(encoding="utf-8"))

    chunks: List[Chunk] = []

    prog = skills.get("programming_languages", [])
    if prog:
        chunks.append(
            Chunk(
                "skills_programming",
                "skills",
                "Programming languages: " + ", ".join(prog),
            )
        )

    frameworks = skills.get("frameworks", [])
    if frameworks:
        chunks.append(
            Chunk(
                "skills_frameworks",
                "skills",
                "Frameworks: " + ", ".join(frameworks),
            )
        )

    frontend = skills.get("frontend", [])
    if frontend:
        chunks.append(
            Chunk(
                "skills_frontend",
                "skills",
                "Frontend: " + ", ".join(frontend),
            )
        )

    libs = skills.get("libraries", [])
    if libs:
        chunks.append(
            Chunk(
                "skills_libraries",
                "skills",
                "Libraries: " + ", ".join(libs),
            )
        )

    tools = skills.get("tools", [])
    if tools:
        chunks.append(
            Chunk(
                "skills_tools",
                "skills",
                "Tools: " + ", ".join(tools),
            )
        )

    ds = skills.get("data_science", [])
    if ds:
        chunks.append(
            Chunk(
                "skills_data_science",
                "skills",
                "Data science skills: " + ", ".join(ds),
            )
        )

    soft = skills.get("soft_skills", [])
    if soft:
        chunks.append(
            Chunk(
                "skills_soft",
                "skills",
                "Soft skills: " + ", ".join(soft),
            )
        )

    return chunks


# ---------- CERTIFICATIONS ----------

def load_certifications_chunks() -> List[Chunk]:
    path = DATA_DIR / "certifications.json"
    certs = json.loads(path.read_text(encoding="utf-8"))

    chunks: List[Chunk] = []

    for idx, cert in enumerate(certs):
        title = cert.get("title", "")
        org = cert.get("organization", "")
        duration = cert.get("duration", "")
        skills_learned = cert.get("skills_learned", [])
        details = cert.get("details", [])

        parts = []
        if title:
            parts.append(f"Certification: {title}")
        if org:
            parts.append(f"Issued by: {org}")
        if duration:
            parts.append(f"Duration: {duration}")
        if skills_learned:
            parts.append("Skills learned: " + ", ".join(skills_learned))
        if details:
            parts.append("Details:\n" + "\n".join(f"- {d}" for d in details))

        text = "\n".join(parts)
        if text.strip():
            chunks.append(
                Chunk(f"cert_{idx}", "certifications", text)
            )

    return chunks


# ---------- BIO (MARKDOWN) ----------

def load_bio_chunks() -> List[Chunk]:
    path = DATA_DIR / "bio.md"
    content = path.read_text(encoding="utf-8")

    paragraphs = [p.strip() for p in content.split("\n\n") if p.strip()]
    chunks: List[Chunk] = []
    for idx, para in enumerate(paragraphs):
        chunks.append(Chunk(f"bio_{idx}", "bio", para))

    return chunks


# ---------- ALL CHUNKS ----------

def load_all_chunks() -> List[Chunk]:
    chunks: List[Chunk] = []
    chunks.extend(load_about_me_chunks())
    chunks.extend(load_experience_chunks())
    chunks.extend(load_education_chunks())
    chunks.extend(load_project_chunks())
    chunks.extend(load_skills_chunks())
    chunks.extend(load_certifications_chunks())
    chunks.extend(load_bio_chunks())
    return chunks
