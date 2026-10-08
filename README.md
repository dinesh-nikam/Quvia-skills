# <p align="center"><img src="assets/banner.svg" alt="Ultra Skills Banner" width="100%" /></p>

<p align="center">
  <a href="https://github.com/ultra-skills/ultra-skills">
    <img src="https://img.shields.io/badge/Ultra%20Skills-1000%2B%20Skills-brightgreen?style=for-the-badge&labelColor=667eea&color=764ba2" alt="Skills Count" />
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&labelColor=667eea&color=764ba2" alt="License" />
  </a>
  <a href="https://github.com/ultra-skills/ultra-skills/stargazers">
    <img src="https://img.shields.io/github/stars/ultra-skills/ultra-skills?style=for-the-badge&labelColor=667eea&color=764ba2" alt="Stars" />
  </a>
  <img src="https://img.shields.io/badge/Supports-Claude%20Code%20%7C%20Cursor%20%7C%20Aider%20%7C%20OpenCode-brightgreen?style=for-the-badge&labelColor=667eea&color=764ba2" alt="Supported Platforms" />
</p>

---

## 🚀 One-Line Install

```bash
npx ultra-skills
```

That's it. This command installs the entire Ultra Skills collection directly into your AI assistant's skills directory — no clone, no manual setup, no config files to edit.

---

## 🎯 What Are Ultra Skills?

Ultra Skills is the world's largest curated collection of **1000+ specialized AI skills** designed to supercharge your AI coding assistant. Each skill is a focused instruction set that transforms your AI into a domain expert on demand.

**Think of it as a Swiss Army knife for AI coding assistants** — whether you're doing security audits, architecture reviews, UI design, database optimization, or full-stack development, there's a skill ready to activate.

---

## 🔑 Key Features

| Feature | Description |
|---|---|
| **1000+ Skills** | Comprehensive coverage across 50+ domains |
| **One-Command Install** | `npx ultra-skills` sets up everything instantly |
| **Multi-Assistant Support** | Works with Claude Code, Cursor, Aider, OpenCode, and more |
| **Zero Dependencies** | No global installs, no npm packages required |
| **Always Fresh** | Skills auto-update when you run the installer |
| **Professional Grade** | Battle-tested patterns from real engineering teams |

---

## 📂 Repository Structure

```
ultra-skills/
├── assets/                        # Static assets (animations, images)
│   └── banner.svg                 # Animated banner
├── docs/                          # Project-level documentation
│   ├── PERFORMANCE.md             # Performance optimisation cheatsheet
│   └── SKILL_TEMPLATE.md          # Template for creating new skills
├── bin/
│   └── install.js                 # npx install script
├── package.json                   # Node.js package manifest
├── LICENSE                        # MIT License
├── .gitignore                     # Git ignore rules
├── .gitattributes                 # Git attribute rules
├── README.md                      # This file
├── CONTRIBUTING.md                # Contributing guide
├── api-design/                    # Individual skill folders (900+ total)
│   ├── SKILL.md                   # Skill definition (required)
│   ├── resources/                 # Supporting resources (optional)
│   └── examples/                  # Usage examples (optional)
└── ...                            # More skill folders
```

---

## 🛠️ Quick Start

### Install All Skills

```bash
npx ultra-skills
```

### Install a Single Skill

```bash
npx ultra-skills --skill api-design
```

### Install Specific Categories

```bash
npx ultra-skills --category backend
npx ultra-skills --category frontend
npx ultra-skills --category security
```

### Update Existing Skills

```bash
npx ultra-skills --update
```

---

## 🎨 Skill Categories

### Development & Engineering
Skills for coding, testing, debugging, and code review across 20+ languages.

**Popular picks:** `@test-driven-development`, `@systematic-debugging`, `@code-reviewer`, `@git-pushing`

### Security & Pentesting
Comprehensive security skills covering OWASP Top 10, cloud security, network testing, and more.

**Popular picks:** `@ethical-hacking-methodology`, `@aws-penetration-testing`, `@owasp-top-10`, `@burp-suite-testing`

### Frontend & UI/UX
Modern frontend development, UI design, animation, and user experience patterns.

**Popular picks:** `@frontend-design`, `@nextjs-developer`, `@tailwind-design-system`, `@motion-patterns`

### Backend & Infrastructure
Backend architecture, database optimization, cloud deployment, and system design.

**Popular picks:** `@backend-architect`, `@database-optimizer`, `@django-pro`, `@springboot-patterns`

### Mobile & Cross-Platform
Mobile development skills for React Native, Flutter, Flutter, and native platforms.

**Popular picks:** `@flutter-expert`, `@react-native-expert`, `@android-clean-architecture`

### AI & Machine Learning
Specialized skills for LLM engineering, ML pipelines, RAG systems, and AI product development.

**Popular picks:** `@rag-architect`, `@ml-pipeline`, `@ai-product-strategy`, `@ai-evals`

### Design & Creative
Visual design, animation, branding, and creative content generation skills.

**Popular picks:** `@frontend-design`, `@css-styling`, `@banner-design`, `@content-engine`

### Planning & Workflow
Strategic planning, project management, and workflow optimization skills.

**Popular picks:** `@brainstorming`, `@writing-plans`, `@product-vision`, `@goal-setting-okrs`

---

## 📖 How It Works

1. **Install** — Run `npx ultra-skills` to install skills into your assistant's directory
2. **Invoke** — Use `@skill-name` in your chat to activate a specific skill
3. **Collaborate** — Your AI assistant loads the skill and becomes an expert in that domain

### Example Usage

```
@react-expert Build a todo app with React 19, Tailwind CSS, and TypeScript
@security-review Review my authentication implementation for vulnerabilities
@database-design Create a schema for a multi-tenant e-commerce platform
```

---

## 🧪 Supported Assistants

| Assistant | Status |
|-----------|--------|
| Claude Code | ✅ Full support |
| Cursor | ✅ Full support |
| Aider | ✅ Full support |
| OpenCode | ✅ Full support |
| GitHub Copilot CLI | ✅ Full support |
| Windsurf | ✅ Full support |

---

## 🤝 Contributing

Contributions are welcome! Whether you're fixing a typo, adding a new skill, or improving documentation:

1. Fork the repository
2. Create a new skill folder: `new-skill/SKILL.md`
3. Follow the [skill template](docs/SKILL_TEMPLATE.md)
4. Submit a pull request

Read our [contributing guide](CONTRIBUTING.md) for details.

---

## 📊 Stats

![GitHub commits](https://img.shields.io/github/commits-since/ultra-skills/ultra-skills/v1.0.0?label=Contributions&color=667eea)
![GitHub last commit](https://img.shields.io/github/last-commit/ultra-skills/ultra-skills?color=764ba2)
![Repository size](https://img.shields.io/github/repo-size/ultra-skills/ultra-skills?color=f093fb)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

Each skill may have its own license. Check individual skill folders for license information.

---

## ⭐ Star the Repository

If you find Ultra Skills useful, please consider starring the repository to show your support!

---

<p align="center">
  <img src="assets/banner.svg" alt="Ultra Skills Banner" width="600" />
</p>

<p align="center">
  Made with ❤️ by the AI Engineering Community
</p>
