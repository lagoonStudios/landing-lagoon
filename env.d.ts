/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

type D1Database = import('@cloudflare/workers-types').D1Database

// Define the environment variables available to your Workers/Functions
interface Env {
  // Use the binding name you defined in wrangler.toml
  DB: D1Database
}

// Extend App.Locals to include the Cloudflare runtime environment
type Runtime = import('@astrojs/cloudflare').Runtime<Env>
declare namespace App {
  interface Locals extends Runtime {}
}
