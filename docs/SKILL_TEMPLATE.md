# Skill Template

Use this template to create a new skill. Copy it to `your-skill-name/SKILL.md` and fill in the sections.

---

## Frontmatter

Start with YAML frontmatter containing at minimum `name` and `description`:

```markdown
---
name: your-skill-name
description: "What this skill does — be specific and actionable. Mention key techniques, tools, or frameworks covered."
version: 1.0.0
risk: safe
category: development
tags: [tag1, tag2, tag3]
---
```

### Frontmatter Fields

| Field | Required | Type | Description |
|---|---|---|---|
| `name` | ✅ | string | Skill name (must match folder name) |
| `description` | ✅ | string | Clear, concise description of the skill's purpose |
| `version` | ❌ | string | Semantic version (e.g., "1.0.0") |
| `risk` | ❌ | string | `safe` (no code execution), `caution` (moderate risk), or `dangerous` (high risk) |
| `category` | ❌ | string | High-level category (e.g., `backend`, `frontend`, `security`) |
| `tags` | ❌ | array | Relevant keywords for searchability |

---

## Body Structure

### 1. Title

```markdown
# Your Skill Title

A single, clear heading that matches the skill's purpose.
```

### 2. Overview

```markdown
## Overview

A brief paragraph explaining what this skill does. Keep it under 3 sentences.
Include the key value proposition and any unique approaches.
```

### 3. When to Use

```markdown
## When to Use This Skill

- Use when [scenario 1]
- Use when [scenario 2]
- Use when [scenario 3]
```

### 3b. Do Not Use When

```markdown
## Do Not Use This Skill When

- [Scenario where this skill is not appropriate]
- [Alternative skill to use instead]
```

### 4. Instructions

```markdown
## Instructions

[Step-by-step guide. Numbered list for multi-step processes.
Use clear, actionable language. Reference tools and techniques explicitly.]
```

### 5. Examples

```markdown
## Examples

### Example 1: [Title]

**Prompt:** `@your-skill-name [specific task]`

**Expected behavior:** [What the AI should do]

```language
// Code example
```

### Example 2: [Title]

[Repeat as needed]
```

### 6. Resources (optional)

```markdown
## Resources

- [External Link](https://example.com) - Description
- [Documentation](https://example.com/docs) - Official docs
```

### 7. Safety (for high-risk skills)

```markdown
## Safety

[For skills involving security testing, code execution, etc.:
- Authorization requirements
- Legal constraints
- Ethical guidelines
- Scope limitations]
```

---

## Full Example

See any existing skill's `SKILL.md` for a complete example, such as `api-design/SKILL.md` or `test-driven-development/SKILL.md`.

---

## Tips

- **Be specific**: "Build a React component with TypeScript" is better than "Build a component"
- **Be actionable**: Use commands and verbs, not just descriptions
- **Be safe**: If your skill involves security testing, always include authorization requirements
- **Be inclusive**: Avoid jargon that assumes specific background knowledge
- **Be concise**: Quality over quantity — a focused, well-written skill is more valuable than a long, unfocused one
