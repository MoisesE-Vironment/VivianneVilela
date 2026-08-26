const apiKey = process.env.RESEND_API_KEY;
const from = (process.env.RESEND_FROM_EMAIL ?? "").replaceAll("\\u003c", "<").replaceAll("\\u003e", ">");
const to = "contato@e-vironment.com";

if (!apiKey) throw new Error("RESEND_API_KEY is not configured");
if (!from) throw new Error("RESEND_FROM_EMAIL is not configured");

const response = await fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    from,
    to: [to],
    subject: "Teste técnico — formulário Vivianne Vilela",
    text: "Este é um teste técnico do encaminhamento do formulário para contato@e-vironment.com. Nenhuma ação é necessária.",
  }),
});

const body = await response.text();
if (!response.ok) {
  throw new Error(`Resend send failed (${response.status}): ${body}`);
}

console.log(`Resend accepted test email: ${body}`);
