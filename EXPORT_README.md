# Exportação da Landing Page Vivianne Vilela

## Diagnóstico

A página pode ser exportada e hospedada em outro servidor, mas ela não é apenas HTML/CSS estático. O projeto atual é uma aplicação React com backend Node/Express e tRPC. O build de produção foi validado com sucesso e gera `dist/public` para o frontend e `dist/index.js` para o servidor.

| Parte | Pode ser exportada? | Observação |
| --- | --- | --- |
| HTML, CSS e JavaScript compilados | Sim | Estão em `dist/public`. |
| Vídeo do YouTube | Sim | Usa embed público do vídeo fornecido. |
| Fotos da landing page | Parcialmente | O código referencia URLs `/manus-storage/...`; para outro servidor, hospede os assets em S3/CDN e substitua essas URLs. |
| Formulário de contato | Não como HTML puro | O envio usa backend/tRPC e Resend; exige servidor Node e variáveis de ambiente. |
| WhatsApp, e-mail e âncoras | Sim | São links client-side. |
| Autenticação e infraestrutura Manus | Não automaticamente | Devem ser removidas, substituídas ou reconfiguradas no novo provedor. |

## Opção recomendada: hospedar a aplicação completa

Use o pacote `vivianne-vilela-speaker-fullstack-export.zip`. Em um servidor Node compatível:

```bash
unzip vivianne-vilela-speaker-fullstack-export.zip
cd vivianne-vilela-speaker
pnpm install --frozen-lockfile
pnpm build
NODE_ENV=production pnpm start
```

Configure antes as variáveis do ambiente, especialmente `DATABASE_URL`, `JWT_SECRET`, `RESEND_API_KEY` e `RESEND_FROM_EMAIL`. Se o formulário continuar usando o Resend, o remetente precisa pertencer a um domínio verificado. Também será necessário substituir o armazenamento `/manus-storage/...` por URLs permanentes de um bucket ou CDN no novo servidor.

## Opção somente frontend

O diretório `dist/public` pode ser servido por Nginx, Apache, Netlify, Vercel ou outro servidor estático. Nesse modo, a apresentação visual, o vídeo e os links funcionam, mas o formulário não terá envio real porque a procedure server-side não estará disponível. Para manter o formulário, conecte-o a um endpoint próprio ou a um serviço de formulários.

## Pontos que precisam ser adaptados fora do ambiente atual

O código compilado contém referências ao proxy de storage, às variáveis do ambiente Manus e às rotas `/api/trpc`. A migração mais simples é manter a aplicação completa em um servidor Node e trocar o storage por S3/CDN. Uma migração puramente estática exige substituir o formulário por um serviço externo e reescrever as referências de assets.

## Validação realizada

O build foi executado com sucesso. O bundle frontend foi gerado em `dist/public` e o servidor compilado em `dist/index.js`. O pacote completo inclui código-fonte, configuração, testes e artefatos de produção para facilitar a migração.
