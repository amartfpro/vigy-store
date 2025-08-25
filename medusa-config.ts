import { loadEnv, defineConfig, Modules } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    workerMode: (["shared", "worker", "server"].includes(process.env.MEDUSA_WORKER_MODE as string)
      ? (process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server")
      : "shared"),
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    {
      resolve: "./src/modules/sizeguide",
    },
    {
      resolve: "@medusajs/inventory",
      options: {},
    },
    {
      key: Modules.PAYMENT,
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            },
          },
        ],
      },
    },
    {
      resolve: "./src/modules/algolia",
      options: {
        appId: process.env.ALGOLIA_APP_ID!,
        apiKey: process.env.ALGOLIA_API_KEY!,
        productIndexName: process.env.ALGOLIA_PRODUCT_INDEX_NAME!,
      },
    },
    {
      key: Modules.EVENT_BUS,
      resolve: "@medusajs/event-bus-redis",
      options: { redisUrl: process.env.EVENTS_REDIS_URL! },
    },
    {
      // opcional pero recomendado
      key: "cacheService",
      resolve: "@medusajs/cache-redis",
      options: { redisUrl: process.env.EVENTS_REDIS_URL! },
    },
  ],
  plugins: [
    {
      resolve: "@medusajs/admin",
      options: {
        autoRebuild: true,
      },
    },
  ]
})
