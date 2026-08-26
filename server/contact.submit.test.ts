import { afterEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const ctx = {
  user: null,
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
} satisfies TrpcContext;

describe("contact.submit", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("rejects malformed contact data before dispatch", async () => {
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.submit({
        name: "A",
        phone: "123",
        email: "not-an-email",
        message: "short",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });

  it("sends valid contact data to Resend", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "email_test" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const caller = appRouter.createCaller(ctx);

    await expect(caller.contact.submit({
      name: "Ana Souza",
      phone: "11988999181",
      email: "ana@example.com",
      message: "Gostaria de convidar a Vivianne para um evento.",
    })).resolves.toEqual({ success: true });

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"to":["contato@e-vironment.com"]'),
      }),
    );
  });
});
