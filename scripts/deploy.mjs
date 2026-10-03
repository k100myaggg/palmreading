import { execSync } from 'child_process';

function run(command, desc) {
  console.log(`\n⏳ ${desc}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${desc} succeeded.`);
  } catch (error) {
    console.error(`❌ ${desc} failed! Aborting deployment.`);
    process.exit(1);
  }
}

const commitMsg = process.argv.slice(2).join(' ') || `Update and deploy site: ${new Date().toISOString()}`;

console.log('🚀 Starting Automated Cloudflare Pages Deployment Pipeline...');

// 1. Astro Check
run('npx astro check', 'Checking project types and diagnostics');

// 2. Astro Build
run('npm run build', 'Building production bundle into dist/');

// 3. Git Status check
try {
  const status = execSync('git status --porcelain').toString().trim();
  if (!status) {
    console.log('ℹ️ No unstaged changes detected. Ensuring main branch is pushed...');
    run('git push origin main', 'Pushing existing commits to GitHub');
  } else {
    run('git add .', 'Staging all modified and new files');
    run(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, 'Creating git commit');
    run('git push origin main', 'Pushing to GitHub (Triggers Cloudflare Pages Build)');
  }
} catch (err) {
  console.error('Error during git operations:', err);
  process.exit(1);
}

console.log('\n🎉 SUCCESS! Your update has been pushed to GitHub.');
console.log('🌐 Cloudflare Pages will automatically deploy it at: https://palmreading-b0v.pages.dev/');
