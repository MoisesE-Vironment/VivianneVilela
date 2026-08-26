import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { z } from "zod";
import { ENV } from "./_core/env";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().trim().min(2).max(120),
          phone: z.string().trim().min(8).max(30),
          email: z.string().trim().email().max(320),
          message: z.string().trim().min(10).max(4000),
        }),
      )
      .mutation(async ({ input }) => {
        const emailText = [
          `Nome: ${input.name}`,
          `Telefone: ${input.phone}`,
          `E-mail: ${input.email}`,
          "",
          "Mensagem:",
          input.message,
        ].join("\\n");

        if (ENV.resendApiKey) {
          const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${ENV.resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: ENV.resendFromEmail,
              to: ["contato@e-vironment.com"],
              reply_to: input.email,
              subject: `Novo contato para Vivianne Vilela — ${input.name}`,
              text: emailText,
            }),
          });

          if (response.ok) return { success: true } as const;

          const detail = await response.text().catch(() => "");
          console.warn(`[Contact] Resend rejected the message (${response.status}): ${detail}`);
        }

        const notified = await notifyOwner({
          title: `Novo contato para Vivianne Vilela — ${input.name}`,
          content: `Destino comercial: contato@e-vironment.com\\n${emailText}`,
        });

        if (!notified) {
          throw new Error("Não foi possível encaminhar a mensagem agora.");
        }

        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
