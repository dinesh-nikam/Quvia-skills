# Contributing to Quvia Skills

Thank you for your interest in contributing to Quvia Skills! This repository contains 1000+ AI skills for coding assistants. Whether you're fixing a typo, adding a new skill, or improving existing ones, your contributions are welcome.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Adding a New Skill](#adding-a-new-skill)
3. [Editing Existing Skills](#editing-existing-skills)
4. [Style Guidelines](#style-guidelines)
5. [Testing Your Changes](#testing-your-changes)
6. [Pull Request Process](#pull-request-process)
7. [Code of Conduct](#code-of-conduct)

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

```bash
git clone https://github.com/YOUR-USERNAME/quvia-skills.git
cd quvia-skills
```

3. **Create a branch** for your feature:

```bash
git checkout -b feat/new-skill-name
```

4. **Make your changes** following the guidelines below
5. **Commit** with a clear message:

```bash
git commit -m "feat: add my-new-skill"
```

6. **Push** and open a Pull Request

---

## Adding a New Skill

Each skill lives in its own folder at the root of the repository. To add a new skill:

### Step 1: Create the skill folder

```bash
mkdir my-new-skill
```

### Step 2: Create the `SKILL.md` file

Every skill must have a `SKILL.md` file at the root of its folder. Use the [skill template](docs/SKILL_TEMPLATE.md) as a starting point.

**Example:**

```markdown
---
name: my-skill-name
description: "What this skill does"
---

# Skill Title

## Overview
[What this skill does]

## When to Use
- Use when [scenario]

## Instructions
[Step-by-step guide]

## Examples
[Code examples]
```

### Step 3: Add supporting resources (optional)

```
my-new-skill/
├── SKILL.md                 # Main skill definition (required)
├── resources/               # Supporting documentation
│   └── implementation-playbook.md
├── examples/                # Usage examples
│   └── example-1.md
└── scripts/                 # Helper scripts (optional)
    └── helper.py
```

---

## Editing Existing Skills

When editing an existing skill:

1. Navigate to the skill folder: `cd existing-skill/`
2. Edit `SKILL.md` directly
3. Keep the frontmatter format consistent
4. Update any related resources or examples

**Best practices:**
- Make minimal, focused changes
- Preserve the existing tone and style
- Add examples where helpful
- Update descriptions if the scope changes

---

## Style Guidelines

### Writing Style
- Use clear, actionable language
- Write at a 6th-grade reading level when possible
- Prefer bullet points over paragraphs
- Use code examples liberally
- Include "When to Use" and "Do not use when" sections

### Frontmatter Fields
| Field | Required | Description |
|---|---|---|
| `name` | Yes | Skill name (matches folder name) |
| `description` | Yes | Brief description of what the skill does |
| `version` | No | Version number (semver) |
| `risk` | No | `safe`, `caution`, or `dangerous` |
| `category` | No | Skill category |
| `tags` | No | Array of relevant tags |

### Formatting
- Use `##` for main sections, `###` for subsections
- Use backticks for inline code
- Use fenced code blocks with language for code examples
- Use emojis sparingly (max 1-2 per section)

---

## Testing Your Changes

### Validate Markdown

Ensure your `SKILL.md` is valid markdown:

```bash
npx markdownlint my-new-skill/SKILL.md
```

### Check for Broken Links

```bash
npx markdown-link-check my-new-skill/SKILL.md
```

### Preview Your Skill

1. Install skills locally:
```bash
npx quvia-skills --skill my-skill-name
```

2. Open your AI assistant and invoke the skill:
```
@my-skill-name help me with X
```

---

## Pull Request Process

1. **Create a draft PR** if your work is in progress
2. **Ensure all checks pass** (linting, formatting)
3. **Request a review** from at least one maintainer
4. **Address feedback** promptly
5. **Merge** once approved

### PR Checklist
- [ ] Created `SKILL.md` with proper frontmatter
- [ ] Added a clear description of what the skill does
- [ ] Included "When to Use" and "Do not use when" sections
- [ ] Provided step-by-step instructions
- [ ] Added examples where applicable
- [ ] Used clear, accessible language
- [ ] Checked for broken links and formatting

---

## Code of Conduct

### Our Standards

- Be respectful and constructive in all interactions
- Welcome newcomers and answer questions patiently
- Give credit where credit is due
- Keep discussions focused and productive

### Reporting Issues

If you encounter a bug, have a feature request, or need help, please [open an issue](https://github.com/quvia-skills/quvia-skills/issues).

---

## License

By contributing to Quvia Skills, you agree that your contributions will be licensed under the [MIT License](LICENSE).
