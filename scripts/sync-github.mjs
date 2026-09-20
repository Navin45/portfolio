import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS = [
  'PFL Finance WhatsApp KPI Accountability Bot',
  'SonoLabs AI Audio SaaS Backend',
  'GCOS Cloud & Workflow Infrastructure',
  'Stancold Document Scanner',
  'LeadBoxer n8n Community Node',
];

async function syncGithub() {
  console.log('Fetching public repositories for Navin45...');
  const res = await fetch('https://api.github.com/users/Navin45/repos?per_page=100&sort=pushed&direction=desc', {
    headers: {
      'User-Agent': 'Navin45-Portfolio-Sync',
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch repos: ${res.status} ${res.statusText}`);
  }

  const repos = await res.json();
  console.log(`Fetched ${repos.length} repos.`);

  // Project matching logic
  const projectMatches = {};
  for (const title of PROJECTS) {
    const titleLower = title.toLowerCase();
    // Normalize keywords for matching
    const matched = repos.find((repo) => {
      const nameLower = repo.name.toLowerCase();
      const descLower = (repo.description || '').toLowerCase();

      // Check specific project patterns
      if (titleLower.includes('pfl finance') && (nameLower.includes('pfl') || nameLower.includes('finance-bot'))) {
        return true;
      }
      if (titleLower.includes('sonolabs') && (nameLower.includes('sonolabs') || nameLower.includes('sono-labs'))) {
        return true;
      }
      if (titleLower.includes('gcos') && nameLower.includes('gcos')) {
        return true;
      }
      if (titleLower.includes('stancold') && nameLower.includes('stancold')) {
        return true;
      }
      if (titleLower.includes('leadboxer') && (nameLower.includes('leadboxer') || nameLower.includes('n8n-nodes-leadboxer'))) {
        return true;
      }
      return false;
    });

    projectMatches[title] = matched
      ? { name: matched.name, url: matched.html_url, description: matched.description }
      : null;
  }

  // More on GitHub: up to 6 public, non-fork repos sorted by last push, excluding profile README repo ("Navin45")
  const moreRepos = repos
    .filter((repo) => !repo.fork && repo.name.toLowerCase() !== 'navin45')
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
    .slice(0, 6)
    .map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description || '',
      language: repo.language || '',
      stars: repo.stargazers_count || 0,
      pushedAt: repo.pushed_at,
    }));

  const dataDir = path.resolve(__dirname, '../src/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const outPath = path.join(dataDir, 'github.json');
  const payload = {
    syncedAt: new Date().toISOString(),
    projectMatches,
    moreRepos,
  };

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Saved GitHub data to ${outPath}`);

  console.log('\n--- Project Matches Summary ---');
  for (const [title, match] of Object.entries(projectMatches)) {
    if (match) {
      console.log(`[MATCH] "${title}" -> ${match.url}`);
    } else {
      console.log(`[NO MATCH] "${title}" (private / client repository)`);
    }
  }

  console.log('\n--- More on GitHub (up to 6) ---');
  moreRepos.forEach((r) => console.log(`- ${r.name} (${r.url})`));
}

syncGithub().catch((err) => {
  console.error(err);
  process.exit(1);
});
