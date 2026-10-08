#!/usr/bin/env node

/**
 * Quvia Skills Installer
 *
 * Run with: npx quvia-skills
 *
 * Installs all (or selected) AI skills into your assistant's skills directory.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gradient: '\x1b[38;2;102;126;234m'
};

// ASCII art banner
const BANNER = `
${colors.cyan}${colors.bright}
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║      ██████╗   ██╗   ██╗ ██╗   ██╗ ██╗  █████╗           ║
    ║     ██╔═══██╗  ██║   ██║ ██║   ██║ ██║ ██╔══██╗          ║
    ║     ██║   ██║  ██║   ██║ ██║   ██║ ██║ ███████║          ║
    ║     ██║ █╗██║  ██║   ██║ ╚██╗ ██╔╝ ██║ ██╔══██║          ║
    ║     ╚██████╔╝  ╚██████╔╝  ╚████╔╝  ██║ ██║  ██║          ║
    ║      ╚═══██╗    ╚═════╝    ╚═══╝   ╚═╝ ╚═╝  ╚═╝          ║
    ║                                                          ║
    ║        1000+ AI Skills for Coding Assistants             ║
    ╚══════════════════════════════════════════════════════════╝
${colors.reset}
`;

// Skill categories mapping
const CATEGORIES = {
  backend: [
    'backend-architect', 'backend-dev-guidelines', 'backend-development-feature-development',
    'backend-patterns', 'backend-security-coder', 'nodejs-backend-patterns', 'nodejs-best-practices',
    'express-patterns', 'nestjs-patterns', 'nestjs-expert', 'spring-boot-engineer',
    'springboot-patterns', 'springboot-security', 'django-pro', 'django-patterns',
    'django-security', 'flask-expert', 'golang-pro', 'golang-patterns', 'golang-testing',
    'rust-engineer', 'rust-patterns', 'rust-testing', 'python-pro', 'python-patterns',
    'python-testing', 'java-architect', 'java-coding-standards', 'csharp-developer',
    'dotnet-architect', 'dotnet-patterns', 'prisma-expert', 'prisma-patterns',
    'postgresql', 'postgres-pro', 'postgres-patterns', 'mysql-patterns',
    'redis-patterns', 'mongodb-patterns', 'database-admin', 'database-architect',
    'database-design', 'database-migration', 'database-optimizer', 'database-migrations',
    'sql-optimization-patterns', 'supabase-postgres-best-practices', 'clickhouse-io',
    'mongodb', 'oracle-patterns'
  ],
  frontend: [
    'frontend-design', 'frontend-developer', 'frontend-patterns', 'frontend-a11y',
    'frontend-design-direction', 'frontend-dev-guidelines', 'frontend-security-coder',
    'frontend-slides', 'frontend-ui-dark-ts', 'ui-styling', 'tailwind-patterns',
    'tailwind-design-system', 'react-expert', 'react-modernization', 'react-patterns',
    'react-performance', 'react-state-management', 'react-testing', 'react-ui-patterns',
    'nextjs-app-router-patterns', 'nextjs-best-practices', 'nextjs-developer',
    'nextjs-supabase-auth', 'nextjs-turbopack', 'angular-architect', 'angular-developer',
    'vue-expert', 'vue-expert-js', 'vue-patterns', 'svelte-expert', 'sveltekit-patterns',
    'flutter-expert', 'dart-flutter-patterns', 'flutter-dart-code-review',
    'react-native-expert', 'react-native-patterns', 'mobile-native'
  ],
  security: [
    'ethical-hacking-methodology', 'aws-penetration-testing', 'cloud-penetration-testing',
    'web-security', 'owasp-top-10', 'burp-suite-testing', 'sql-injection-testing',
    'sqlmap-database-pentesting', 'xss-html-injection', 'broken-authentication',
    'file-path-traversal', 'idor-testing', 'html-injection-testing',
    'active-directory-attacks', 'api-fuzzing-bug-bounty', 'api-security-best-practices',
    'security-reviewer', 'security-scan', 'secure-code-guardian', 'backend-security-coder',
    'frontend-security-coder', 'code-review-checklist', 'pentest-checklist',
    'pentest-commands', 'red-team-tools', 'scanning-tools', 'shodan-reconnaissance',
    'smtp-penetration-testing', 'ssh-penetration-testing', 'wireshark-analysis',
    'wordpress-penetration-testing', 'top-web-vulnerabilities', 'privilege-escalation-methods',
    'linux-privilege-escalation', 'windows-privilege-escalation', 'network-101',
    'metasploit-framework', 'privilege-escalation', 'file-uploads', 'attack-tree-construction',
    'binary-analysis-patterns', 'cloud-security', 'django-security', 'springboot-security',
    'quarkus-security', 'defi-amm-security', 'evm-token-decimals',
    'nodejs-keccak256', 'llm-trading-agent-security'
  ],
  'ai-ml': [
    'ai-agents-architect', 'ai-assisted-prototyping', 'ai-evals', 'ai-native-ux',
    'ai-product', 'ai-product-strategy', 'ai-wrapper-product', 'agent-evaluation',
    'agent-framework-azure-ai-py', 'agent-manager-skill', 'agent-memory-mcp',
    'agent-memory-systems', 'agent-orchestration-improve-agent',
    'agent-orchestration-multi-agent-optimize', 'agent-tool-builder',
    'agent-usability-test', 'agents-v2-py', 'autonomous-agent-patterns',
    'autonomous-agents', 'backend-architect', 'clean-code', 'code-review-ai-ai-review',
    'ml-adoption-playbook', 'ml-pipeline', 'mle-workflow', 'rag-architect',
    'fine-tuning-expert', 'langchain-pro', 'llamaindex-expert', 'autogen-pro',
    'crewai'
  ],
  'devops-deployment': [
    'devops-engineer', 'deployment-engineer', 'deployment-pipeline-design',
    'deployment-patterns', 'deployment-procedures', 'docker-expert', 'docker-patterns',
    'kubernetes-patterns', 'kubernetes-specialist', 'github-actions-templates',
    'github-automation', 'github-workflow-automation', 'gitlab-automation',
    'gitlab-ci-patterns', 'terraform-engineer', 'terraform-skill',
    'github-pr-workflows', 'git-workflow', 'git-advanced-workflows',
    'ci-cd-automation-workflow-automate', 'bazel-build-optimization',
    'nix-developer', 'flox-environments'
  ],
  'design-creative': [
    'frontend-design', 'ui-styling', 'tailwind-design-system', 'design',
    'apple-design', 'banner-design', 'algorithmic-art', 'animate',
    'animate-expo', 'animation-vocabulary', 'motion-advanced', 'motion-foundations',
    'motion-patterns', 'css-styling', 'brand', 'brand-voice', 'content-engine',
    'content-marketer', 'design-is', 'emil-design-eng', 'figma-automation',
    'improve-animations', 'make-interfaces-feel-better', 'review-animations',
    'liquid-glass-design'
  ],
  planning: [
    'brainstorming', 'writing-plans', 'planning-with-files', 'executing-plans',
    'concise-planning', 'verification-before-completion', 'goal-setting-okrs',
    'product-vision', 'defining-product-strategy', 'evaluating-trade-offs',
    'high-stakes-decisions', 'managing-up', 'product-lens', 'product-capability',
    'product-experiments', 'product-tool-stack', 'product-taste', 'pricing-strategy',
    'positioning', 'storytelling', 'user-onboarding-activation'
  ],
  'data-database': [
    'database-admin', 'database-architect', 'database-design', 'database-migration',
    'database-optimizer', 'database-migrations', 'sql-pro', 'sql-optimization-patterns',
    'mysql-patterns', 'postgres-patterns', 'postgres-pro', 'postgresql',
    'redis-patterns', 'nosql-expert', 'clickhouse-io', 'supabase-postgres-best-practices',
    'prisma-expert', 'prisma-patterns', 'mongodb-patterns', 'database-migrations-sql-migrations',
    'database-migrations-migration-observability'
  ],
  'cloud-platforms': [
    'aws-skills', 'azure-ai-agents-persistent-dotnet', 'azure-ai-agents-persistent-java',
    'azure-ai-anomalydetector-java', 'azure-ai-contentsafety-java', 'azure-ai-contentsafety-py',
    'azure-ai-contentsafety-ts', 'azure-ai-contentunderstanding-py',
    'azure-ai-document-intelligence-dotnet', 'azure-ai-document-intelligence-ts',
    'azure-ai-formrecognizer-java', 'azure-ai-ml-py', 'azure-ai-openai-dotnet',
    'azure-ai-projects-dotnet', 'azure-ai-projects-java', 'azure-ai-projects-py',
    'azure-ai-projects-ts', 'azure-ai-textanalytics-py', 'azure-ai-transcription-py',
    'azure-ai-translation-document-py', 'azure-ai-translation-text-py',
    'azure-ai-translation-ts', 'azure-ai-vision-imageanalysis-java',
    'azure-ai-vision-imageanalysis-py', 'azure-ai-voicelive-dotnet',
    'azure-ai-voicelive-java', 'azure-ai-voicelive-py', 'azure-ai-voicelive-ts',
    'azure-appconfiguration-java', 'azure-appconfiguration-py', 'azure-appconfiguration-ts',
    'azure-communication-callautomation-java', 'azure-communication-callingserver-java',
    'azure-communication-chat-java', 'azure-communication-common-java',
    'azure-communication-sms-java', 'azure-compute-batch-java',
    'azure-containerregistry-py', 'azure-cosmos-db-py', 'azure-cosmos-java',
    'azure-cosmos-py', 'azure-cosmos-rust', 'azure-cosmos-ts',
    'azure-data-tables-java', 'azure-data-tables-py', 'azure-eventgrid-dotnet',
    'azure-eventgrid-java', 'azure-eventgrid-py', 'azure-eventhub-dotnet',
    'azure-eventhub-java', 'azure-eventhub-py', 'azure-eventhub-rust',
    'azure-eventhub-ts', 'azure-functions', 'azure-identity-dotnet',
    'azure-identity-java', 'azure-identity-py', 'azure-identity-rust',
    'azure-identity-ts', 'azure-keyvault-certificates-rust', 'azure-keyvault-keys-rust',
    'azure-keyvault-keys-ts', 'azure-keyvault-py', 'azure-keyvault-secrets-rust',
    'azure-keyvault-secrets-ts', 'azure-maps-search-dotnet',
    'azure-messaging-webpubsub-java', 'azure-messaging-webpubsubservice-py',
    'azure-mgmt-apicenter-dotnet', 'azure-mgmt-apicenter-py',
    'azure-mgmt-apimanagement-dotnet', 'azure-mgmt-apimanagement-py',
    'azure-mgmt-applicationinsights-dotnet', 'azure-mgmt-botservice-dotnet',
    'azure-mgmt-botservice-py', 'azure-mgmt-fabric-dotnet', 'azure-mgmt-fabric-py',
    'azure-mgmt-mongodbatlas-dotnet', 'azure-mgmt-weightsandbiases-dotnet',
    'azure-microsoft-playwright-testing-ts', 'azure-monitor-ingestion-java',
    'azure-monitor-ingestion-py', 'azure-monitor-opentelemetry-exporter-java',
    'azure-monitor-opentelemetry-exporter-py', 'azure-monitor-opentelemetry-py',
    'azure-monitor-opentelemetry-ts', 'azure-monitor-query-java',
    'azure-monitor-query-py', 'azure-postgres-ts', 'azure-resource-manager-cosmosdb-dotnet',
    'azure-resource-manager-durabletask-dotnet', 'azure-resource-manager-mysql-dotnet',
    'azure-resource-manager-playwright-dotnet', 'azure-resource-manager-postgresql-dotnet',
    'azure-resource-manager-redis-dotnet', 'azure-resource-manager-sql-dotnet',
    'azure-search-documents-dotnet', 'azure-search-documents-py',
    'azure-search-documents-ts', 'azure-security-keyvault-keys-dotnet',
    'azure-security-keyvault-keys-java', 'azure-security-keyvault-secrets-java',
    'azure-servicebus-dotnet', 'azure-servicebus-py', 'azure-servicebus-ts',
    'azure-speech-to-text-rest-py', 'azure-storage-blob-java', 'azure-storage-blob-py',
    'azure-storage-blob-rust', 'azure-storage-blob-ts', 'azure-storage-file-datalake-py',
    'azure-storage-file-share-py', 'azure-storage-file-share-ts',
    'azure-storage-queue-py', 'azure-storage-queue-ts', 'azure-web-pubsub-ts',
    'gcp-cloud-run', 'google-workspace-ops'
  ]
};

const ASSISTANT_DIRS = {
  claude: {
    name: 'Claude Code / Claude Desktop',
    paths: [
      path.join(os.homedir(), '.claude', 'skills'),
      path.join(os.homedir(), '.cursor', 'skills'),
      path.join(process.cwd(), '.claude', 'skills'),
      path.join(process.cwd(), '.agent', 'skills')
    ]
  },
  cursor: {
    name: 'Cursor',
    paths: [
      path.join(os.homedir(), '.cursor', 'skills'),
      path.join(process.cwd(), '.cursor', 'skills')
    ]
  },
  aider: {
    name: 'Aider',
    paths: [
      path.join(os.homedir(), '.aider', 'skills'),
      path.join(process.cwd(), '.aider', 'skills')
    ]
  },
  codex: {
    name: 'OpenAI Codex',
    paths: [
      path.join(os.homedir(), '.codex', 'skills'),
      path.join(process.cwd(), '.codex', 'skills')
    ]
  },
  opencode: {
    name: 'OpenCode',
    paths: [
      path.join(os.homedir(), '.opencode', 'skills'),
      path.join(process.cwd(), '.opencode', 'skills')
    ]
  },
  'copilot-cli': {
    name: 'GitHub Copilot CLI',
    paths: [
      path.join(os.homedir(), '.copilot', 'skills'),
      path.join(process.cwd(), '.copilot', 'skills')
    ]
  }
};

function detectAssistant() {
  // Check for existing skill directories
  for (const [key, config] of Object.entries(ASSISTANT_DIRS)) {
    for (const dir of config.paths) {
      if (fs.existsSync(dir)) {
        return { key, name: config.name, dir };
      }
    }
  }
  // Default to Claude Code
  return { key: 'claude', name: ASSISTANT_DIRS.claude.name, dir: ASSISTANT_DIRS.claude.paths[0] };
}

function getSkillDirs() {
  const cwd = process.cwd();
  // If running from the quvia-skills repo itself
  let skillsDir = path.join(cwd, 'skills');
  if (!fs.existsSync(skillsDir)) {
    skillsDir = cwd;
  }

  const dirs = [];
  for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const skillPath = path.join(skillsDir, entry.name);
      const skillMd = path.join(skillPath, 'SKILL.md');
      if (fs.existsSync(skillMd)) {
        dirs.push({ name: entry.name, path: skillPath });
      }
    }
  }
  return dirs;
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function printBanner() {
  console.log(BANNER);
  console.log(`${colors.cyan}${colors.bright}Installing Quvia Skills — 1000+ AI skills for your coding assistant${colors.reset}`);
  console.log();
}

function printStep(step, total, message) {
  process.stdout.write(`${colors.blue}[${step}/${total}]${colors.reset} ${message}... `);
}

function printSuccess(message) {
  console.log(`${colors.green}✓${colors.reset} ${message}`);
}

function printError(message) {
  console.log(`${colors.red}✗${colors.reset} ${message}`);
}

function printWarning(message) {
  console.log(`${colors.yellow}!${colors.reset} ${message}`);
}

function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    skill: null,
    category: null,
    update: false,
    list: false,
    help: false,
    all: true
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
      case '--skill':
      case '-s':
        result.skill = args[++i];
        result.all = false;
        break;
      case '--category':
      case '-c':
        result.category = args[++i];
        result.all = false;
        break;
      case '--update':
      case '-u':
        result.update = true;
        break;
      case '--list':
      case '-l':
        result.list = true;
        result.all = false;
        break;
      case '--help':
      case '-h':
        result.help = true;
        result.all = false;
        break;
      case '--all':
        result.all = true;
        break;
    }
  }

  return result;
}

function printHelp() {
  console.log(`
${colors.bright}Quvia Skills Installer${colors.reset}

${colors.cyan}USAGE:${colors.reset}
  npx quvia-skills [options]

${colors.cyan}OPTIONS:${colors.reset}
  -s, --skill <name>      Install a single skill by name
  -c, --category <name>   Install all skills in a category
  -u, --update            Update already-installed skills
  -l, --list              List all available skills
  -h, --help              Show this help message

${colors.cyan}CATEGORIES:${colors.reset}
  ${Object.keys(CATEGORIES).join(', ')}

${colors.cyan}EXAMPLES:${colors.reset}
  npx quvia-skills                    Install all skills
  npx quvia-skills --skill react-expert  Install a single skill
  npx quvia-skills --category security   Install all security skills
  npx quvia-skills --update            Update existing skills

${colors.cyan}AVAILABLE SKILLS:${colors.reset}
  Run "npx quvia-skills --list" to see all 1000+ skills.
`);
}

function listSkills() {
  const skills = getSkillDirs();
  console.log(`\n${colors.bright}Available skills (${skills.length} total):${colors.reset}\n`);
  const cols = 3;
  const colWidth = 40;
  for (let i = 0; i < skills.length; i += cols) {
    let row = '';
    for (let j = 0; j < cols; j++) {
      if (i + j < skills.length) {
        row += colors.green + skills[i + j].name.padEnd(colWidth) + colors.reset;
      }
    }
    console.log(row);
  }
  console.log();
}

async function main() {
  const args = parseArgs();

  printBanner();

  if (args.help) {
    printHelp();
    return;
  }

  if (args.list) {
    listSkills();
    return;
  }

  const assistant = detectAssistant();
  console.log(`${colors.cyan}Detected assistant:${colors.reset} ${assistant.name}`);
  console.log(`${colors.cyan}Install directory:${colors.reset} ${assistant.dir}`);
  console.log();

  let skillsToInstall;
  const allSkills = getSkillDirs();

  if (args.skill) {
    skillsToInstall = allSkills.filter(s => s.name === args.skill);
    if (skillsToInstall.length === 0) {
      printError(`Skill "${args.skill}" not found.`);
      console.log(`Run ${colors.cyan}npx quvia-skills --list${colors.reset} to see available skills.`);
      process.exit(1);
    }
  } else if (args.category) {
    const categorySkills = CATEGORIES[args.category];
    if (!categorySkills) {
      printError(`Category "${args.category}" not found.`);
      console.log(`${colors.cyan}Available categories:${colors.reset} ${Object.keys(CATEGORIES).join(', ')}`);
      process.exit(1);
    }
    skillsToInstall = allSkills.filter(s => categorySkills.includes(s.name));
    if (skillsToInstall.length === 0) {
      printWarning(`No skills found in category "${args.category}".`);
      return;
    }
  } else {
    skillsToInstall = allSkills;
  }

  // Create install directory
  if (!fs.existsSync(assistant.dir)) {
    fs.mkdirSync(assistant.dir, { recursive: true });
    printSuccess(`Created skills directory: ${assistant.dir}`);
  }

  const total = skillsToInstall.length;
  const isUpdate = args.update;
  const modeLabel = isUpdate ? 'Updated' : 'Installed';

  console.log(`${colors.cyan}Installing ${total} skills...${colors.reset}\n`);

  let installed = 0;
  let skipped = 0;
  const batchSize = Math.max(1, Math.floor(total / 20));

  for (let i = 0; i < total; i++) {
    const skill = skillsToInstall[i];
    const destPath = path.join(assistant.dir, skill.name);

    if (isUpdate && fs.existsSync(destPath)) {
      // Remove old version
      fs.rmSync(destPath, { recursive: true, force: true });
    } else if (fs.existsSync(destPath)) {
      skipped++;
      continue;
    }

    try {
      copyDir(skill.path, destPath);
      installed++;

      if (installed % batchSize === 0 || installed === total) {
        process.stdout.cursorTo(0);
        const progress = Math.round((installed / total) * 100);
        const bar = '█'.repeat(Math.floor(progress / 5)).padEnd(20, '░');
        process.stdout.write(`${colors.cyan}Progress:${colors.reset} [${colors.green}${bar}${colors.reset}] ${progress}% (${installed}/${total})`);
        if (installed === total) {
          process.stdout.write('\n');
        }
      }
    } catch (err) {
      printError(`Failed to install ${skill.name}: ${err.message}`);
    }
  }

  console.log();
  console.log(`${colors.green}✅ Complete!${colors.reset}`);
  console.log(`${colors.green}  ${installed} skills ${modeLabel}${colors.reset}`);
  if (skipped > 0) {
    console.log(`${colors.yellow}  ${skipped} skills already installed (skipped)${colors.reset}`);
  }
  if (!isUpdate) {
    console.log(`${colors.cyan}  Skipped existing skills. Use --update to overwrite.${colors.reset}`);
  }

  console.log();
  console.log(`${colors.bright}Next steps:${colors.reset}`);
  console.log(`  1. Open your AI coding assistant (Claude Code, Cursor, etc.)`);
  console.log(`  2. Type @ followed by a skill name, e.g.: ${colors.green}@brainstorming${colors.reset}`);
  console.log(`  3. Or run ${colors.cyan}npx quvia-skills --list${colors.reset} to see all skills.`);
  console.log();
}

main().catch(err => {
  console.error(colors.red, 'Fatal error:', err.message, colors.reset);
  process.exit(1);
});
