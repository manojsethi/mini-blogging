// openapi.config.ts
import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8000/api/v1/openapi.json", // URL to your backend OpenAPI JSON
  output: "src/api/generated",                        // folder where types will go
});
