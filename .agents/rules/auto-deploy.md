# Automated Deployment Rule

When the user says:
- "deploy it"
- "deploy"
- "deploy this"
- "push and deploy"
- or any similar deployment request:

The agent MUST automatically execute the automated deployment pipeline:
1. Run `node scripts/deploy.mjs "<user description or automated commit message>"` (or run `npx astro check && npm run build && git add . && git commit -m "..." && git push origin main`).
2. Verify that the build output succeeds with 0 errors.
3. Confirm that commits have been pushed to `origin main` to trigger Cloudflare Pages.
4. Report back the deployment status along with the live URL: https://palmreading-b0v.pages.dev/
