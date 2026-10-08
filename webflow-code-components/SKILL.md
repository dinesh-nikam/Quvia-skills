---
name: webflow-code-components
description: Build, define, and import React code components into Webflow via DevLink. Use when creating Webflow code components, configuring declareComponent definitions, working with prop types, styling within Shadow DOM, bundling with Webpack, or troubleshooting DevLink imports.
license: MIT
metadata:
  repository: "https://github.com/224-industries/webflow-skills"
  url: "https://skills.224ai.au/webflow-code-components.skill"
  version: "1.0.0"
  keywords: "ai, agent, skill, webflow, code-components, devlink, react, declareComponent, props, shadow-dom, bundling, webpack, library"
---

# Webflow Code Components

Build, define, and import React code components into Webflow using DevLink. Code components let you develop advanced, interactive React components in your codebase and deploy them to Webflow as shared libraries for visual composition on the canvas.

## Quick Start

> **Prerequisite:** Webflow Workspace on Freelancer, Core, Growth, Agency, or Enterprise plan (or a site on CMS, Business, or Enterprise). Node.js 20+ and npm 10+.

1. **Set up your project** â€” Install the CLI and dependencies
2. **Create a React component** â€” Build your standard React component
3. **Define the code component** â€” Create a `.webflow.tsx` file with `declareComponent`
4. **Import to Webflow** â€” Run `npx webflow library share`
5. **Use on canvas** â€” Install the library on a site, then drag and drop components

See `references/quick-start.md` for a full end-to-end tutorial.

## Key Concepts

- **Shadow DOM isolation** â€” Styles and DOM are sandboxed per component
- **Separate React roots** â€” No shared React Context or state between components. Use URL params, browser storage, Nano Stores, or custom events
- **SSR by default** â€” Server-rendered HTML is hydrated on the client. Disable with `ssr: false` for browser-only components
- **`declareComponent`** â€” Defines how your React component appears in Webflow. See `references/hooks.md` for the full API
- **Prop types** â€” 11 types available (`Text`, `Rich Text`, `Text Node`, `Link`, `Image`, `Number`, `Boolean`, `Variant`, `Visibility`, `Slot`, `ID`)
- **Bundling** â€” Webpack bundles your library (50MB max)

## Important Notes

- **File names are unique identifiers.** Renaming a `.webflow.tsx` file creates a new component and removes the old one â€” existing instances on sites will break.
- React Server Components are **not** supported. Use standard React components only.
- Components can fetch data client-side, but APIs must support CORS and you must never embed API keys in component code.

## Reference Documentation

Each reference file includes YAML frontmatter with `name`, `description`, and `tags` for searchability. Use the search script in `scripts/search_references.py` to find relevant references.

### Getting Started

- **[references/introduction.md](references/introduction.md)**: Overview of DevLink and code components
- **[references/quick-start.md](references/quick-start.md)**: End-to-end tutorial from setup to canvas
- **[references/installation.md](references/installation.md)**: CLI installation, `webflow.json` config, authentication

### Building Components

- **[references/define-code-component.md](references/define-code-component.md)**: `declareComponent`, props, decorators, options
- **[references/hooks.md](references/hooks.md)**: `declareComponent` and `useWebflowContext` hook reference
- **[references/component-architecture.md](references/component-architecture.md)**: Shadow DOM, SSR, state patterns, data fetching
- **[references/styling-components.md](references/styling-components.md)**: CSS in Shadow DOM, site variables, tag selectors
- **[references/frameworks-and-libraries.md](references/frameworks-and-libraries.md)**: Tailwind, styled-components, Emotion, Material UI, Shadcn/UI, Sass, Less

### Prop Types

- **[references/prop-types.md](references/prop-types.md)**: All prop types with usage, return values, and examples
- **[references/prop-types/text.md](references/prop-types/text.md)**: Text â€” single-line text input
- **[references/prop-types/rich-text.md](references/prop-types/rich-text.md)**: Rich Text â€” formatted HTML content
- **[references/prop-types/text-node.md](references/prop-types/text-node.md)**: Text Node â€” on-canvas editable text
- **[references/prop-types/link.md](references/prop-types/link.md)**: Link â€” URL with target and preload
- **[references/prop-types/image.md](references/prop-types/image.md)**: Image â€” asset library image selection
- **[references/prop-types/number.md](references/prop-types/number.md)**: Number â€” numeric input with range controls
- **[references/prop-types/boolean.md](references/prop-types/boolean.md)**: Boolean â€” true/false toggle
- **[references/prop-types/variant.md](references/prop-types/variant.md)**: Variant â€” predefined option dropdown
- **[references/prop-types/visibility.md](references/prop-types/visibility.md)**: Visibility â€” show/hide toggle
- **[references/prop-types/slot.md](references/prop-types/slot.md)**: Slot â€” child component insertion
- **[references/prop-types/id.md](references/prop-types/id.md)**: ID â€” HTML element identifier

### Bundling & CLI

- **[references/cli.md](references/cli.md)**: Webflow CLI commands, flags, CI/CD usage, troubleshooting
- **[references/bundling-and-import.md](references/bundling-and-import.md)**: Webpack bundling, CLI import, CI/CD, debugging

### Help

- **[references/faq.md](references/faq.md)**: Frequently asked questions â€” setup, styling, imports, troubleshooting, performance

### Searching References

```bash
# List all references with metadata
python scripts/search_references.py --list

# Search by tag (exact match)
python scripts/search_references.py --tag <tag>

# Search by keyword (across name, description, tags, and content)
python scripts/search_references.py --search <query>

# Search only prop type references
python scripts/search_references.py --prop-types
python scripts/search_references.py --prop-types --tag <tag>
python scripts/search_references.py --prop-types --search <query>
```

## Scripts

- **`scripts/search_references.py`**: Search reference files by tag, keyword, or list all with metadata

