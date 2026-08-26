import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";

describe("Resend configuration", () => {
  it("accepts the applied Resend API key", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY must be configured").toBeTruthy();

    expect(ENV.resendFromEmail).toBe("Vivianne Vilela <contato@e-vironment.com>");

    const response = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(8000),
    });

    expect(response.status).toBe(200);
  }, 12000);
});
