# Infrastructure: Agent Party Planner

## Domain Management

- **Potential Name:** `agentsparty.dev`
- **Registrar:** Namecheap
- **Cost:** ~£10/year
- **Status:** Pending finalization of the alpha iteration to ensure the name aligns with the product's final direction.

## Hosting & Deployment

- **Provider:** Netlify (Free Tier currently)
- **Goal:** Maintain a low-cost profile even if the site gains significant traffic.
- **Scaling Strategy:**
  - Leverage Astro's static site generation (SSG) to minimize server-side processing costs.
  - Monitor bandwidth usage to stay within free tier limits as long as possible.
  - Consider edge functions only if dynamic features (like complex prompt merging that can't be done client-side) require it.

## Cost Considerations

- **Risk:** High traffic leading to unexpected infrastructure bills.
- **Mitigation:**
  - Stick to static assets and client-side logic for the "Forge" (template engine) and "Courier" (export service) wherever possible.
  - If server-side processing is needed, investigate "Pay-as-you-go" models with hard caps to avoid "bill shocks".
