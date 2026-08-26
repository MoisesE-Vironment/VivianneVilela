/*
 * Direção Presença que Conecta: editorial de palco contemporâneo, assimetria intencional,
 * azul quase-noturno + branco quente + Coral Presença (#F45170), tipografia DM Serif Display + Manrope.
 */
import { useRef, useState, type FormEvent } from "react";
import { trpc } from "@/lib/trpc";
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Mail, Mic2, Play, Send, Sparkles, Users } from "lucide-react";

const heroImage = "/manus-storage/vivianne-stage-hero_c85ee709.jpg";
const heroPortrait = "/manus-storage/vivianne-hero-upscaled_a9c3e1ab.png";
const portraitImage = "/manus-storage/vivianne-about-official_991f8023.jpg";
const eventImage = "/manus-storage/vivianne-stage-official_73cd9f72.jpg";
const markImage = "/manus-storage/vivianne-mark_4c70a64d.png";
const videoPosterImage = "/manus-storage/vivianne-video-stage-cover_3812c1f0.jpeg";
const whatsappUrl = "https://wa.me/5511988999181";

const talks = [
  {
    number: "01",
    title: "O futuro do varejo começa na experiência",
    description: "Uma leitura prática sobre comportamento, inovação e as escolhas que fazem uma marca ser lembrada — não apenas encontrada.",
    tags: ["CX / UX", "Inovação", "Mercado"],
    accent: "coral",
  },
  {
    number: "02",
    title: "Conteúdo é experiência",
    description: "Como transformar curadoria, repertório e contexto em conversas que conectam negócios, pessoas e novas possibilidades.",
    tags: ["Conteúdo", "Estratégia", "Conexão"],
    accent: "blue",
  },
  {
    number: "03",
    title: "Mulheres que fazem acontecer",
    description: "Um encontro sobre trajetória, voz e futuro profissional — com espaço para reconhecer caminhos e abrir novas conversas.",
    tags: ["Carreira", "Liderança", "Mulheres"],
    accent: "gold",
  },
];

const facts = [
  { value: "+11", label: "anos como Diretora de Conteúdo do E-Commerce Brasil" },
  { value: "+7", label: "anos em projetos nacionais no Sebrae" },
  { value: "Fórum", label: "curadoria e presença no maior evento de e-commerce das Américas" },
];

export default function Home() {
  const submitContact = trpc.contact.submit.useMutation();
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const videoFrameRef = useRef<HTMLIFrameElement>(null);

  const handleVideoStart = () => {
    setIsVideoStarted(true);
    videoFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*",
    );
  };

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormStatus("idle");
    setErrorMessage("");

    try {
      await submitContact.mutateAsync({
        name: String(data.get("name") ?? ""),
        phone: String(data.get("phone") ?? ""),
        email: String(data.get("email") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      form.reset();
      setFormStatus("success");
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível enviar agora.");
    }
  };

  return (
    <main className="site-shell">
      <header className="site-nav">
        <a href="#top" className="brand-lockup" aria-label="Vivianne Vilela, início">
          <img src={markImage} alt="" className="brand-mark" />
          <span>Vivianne<br /><em>Vilela</em></span>
        </a>
        <nav className="nav-links" aria-label="Navegação principal">
          <a href="#sobre">Sobre</a>
          <a href="#palestras">Palestras</a>
          <a href="#palcos">Palcos</a>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="nav-cta">Falar no WhatsApp <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> PALESTRANTE · CURADORA · MESTRE DE CERIMÔNIAS</div>
          <h1>Conteúdo que organiza o futuro <span>e faz a sala inteira prestar atenção.</span></h1>
          <p className="hero-lede">Vivianne Vilela leva repertório, presença e ritmo para os palcos onde negócios, tecnologia e pessoas se encontram.</p>
          <div className="hero-actions">
            <a href="#palestras" className="button button-primary">Conheça os temas <ArrowDownRight size={17} /></a>
            <a href="#sobre" className="text-link">Entenda a trajetória <ChevronRight size={16} /></a>
          </div>
          <div className="hero-note"><span className="pulse-dot" /> Em cena, a curadoria também é uma forma de liderança.</div>
        </div>
        <div className="hero-visual" aria-label="Vivianne Vilela em retrato sobre um palco de evento">
          <img className="hero-backdrop" src={heroImage} alt="Palco de conferência em tons azul e coral" />
          <div className="hero-person"><img src={heroPortrait} alt="Retrato oficial de Vivianne Vilela" /></div>
          <div className="hero-visual-overlay" />
          <div className="hero-caption"><span>01 / 04</span><strong>Presença que conecta</strong><small>Uma voz para cada momento do palco.</small></div>
          <div className="hero-vertical">E-COMMERCE · CULTURA · FUTURO</div>
        </div>
        <div className="hero-scroll"><span>role para explorar</span><ArrowDownRight size={16} /></div>
      </section>

      <section className="signal-strip" aria-label="Áreas de atuação">
        <div className="signal-intro"><span>01</span><strong>Uma experiência<br />que vai além da fala.</strong></div>
        <div className="signal-item"><Mic2 size={19} /><span>Palestras<br /><small>repertório aplicado</small></span></div>
        <div className="signal-item"><Users size={19} /><span>Mediação<br /><small>conversa com ritmo</small></span></div>
        <div className="signal-item"><Sparkles size={19} /><span>Curadoria<br /><small>conteúdo que conecta</small></span></div>
      </section>

      <section className="about-section section-light" id="sobre">
        <div className="section-index">02 <span>/ SOBRE VIVIANNE</span></div>
        <div className="about-grid">
          <div className="portrait-frame"><img src={portraitImage} alt="Retrato editorial de Vivianne Vilela" /><div className="portrait-tag">voz · contexto · presença</div></div>
          <div className="about-copy">
            <p className="kicker">Uma trajetória feita de encontros</p>
            <h2>O palco é onde o repertório encontra o presente.</h2>
            <p>Vivianne Vilela atua como Diretora de Conteúdo do E-Commerce Brasil há mais de 11 anos. À frente da curadoria de eventos como o Fórum E-Commerce Brasil, ela transforma tendências e desafios do mercado em conversas que fazem sentido para quem está na sala.</p>
            <p>Antes disso, passou mais de 7 anos em projetos nacionais do Sebrae, trabalhando pela inclusão, transformação e expansão do uso da tecnologia nos pequenos negócios brasileiros.</p>
            <div className="about-signature"><span>Conhecimento com temperatura humana.</span><ArrowUpRight size={18} /></div>
          </div>
        </div>
        <div className="facts-row">{facts.map((fact) => <div className="fact" key={fact.value}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div>
      </section>

      <section className="talks-section section-dark" id="palestras">
        <div className="section-index light-index">03 <span>/ PALESTRAS</span></div>
        <div className="talks-heading"><div><p className="kicker coral-kicker">Escolha a conversa certa para o seu palco</p><h2>Temas que abrem<br /><em>novos ângulos.</em></h2></div><p className="heading-aside">Do varejo à liderança, cada palestra parte do que está acontecendo agora para provocar a próxima pergunta.</p></div>
        <div className="talk-list">{talks.map((talk) => <article className={`talk-card ${talk.accent}`} key={talk.number}><div className="talk-number">{talk.number}</div><div className="talk-content"><div className="talk-tags">{talk.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{talk.title}</h3><p>{talk.description}</p><a href="#contato" aria-label={`Solicitar a palestra ${talk.title}`}>Levar para o meu evento <ArrowUpRight size={16} /></a></div><div className="talk-arrow"><ArrowUpRight size={24} /></div></article>)}</div>
      </section>

      <section className="host-section" id="palcos">
        <div className="section-index">04 <span>/ MESTRE DE CERIMÔNIAS</span></div>
        <div className="host-grid"><div className="host-copy"><p className="kicker">Quando o palco precisa de direção</p><h2>Conduzir é saber <span>quando acelerar,</span> quando escutar.</h2><p>Em grandes eventos, a energia não acontece por acaso. Vivianne conduz aberturas, transições, painéis e encerramentos com o olhar de quem entende o conteúdo — e sabe transformar programa em experiência.</p><ul>{["Presença e naturalidade entre os blocos", "Mediação que valoriza quem está no palco", "Ritmo, clareza e leitura de sala", "Conexão entre conteúdo, público e marca"].map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul><a href="#contato" className="button button-dark">Conversar sobre o seu palco <ArrowUpRight size={17} /></a></div><div className={`stage-card${isVideoStarted ? " video-started" : ""}`}><div className="stage-card-video"><iframe ref={videoFrameRef} src="https://www.youtube.com/embed/6U2V8v3BQBo?rel=0&enablejsapi=1" title="Vivianne Vilela em vídeo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /><div className={`stage-card-poster${isVideoStarted ? " is-hidden" : ""}`} aria-hidden="true"><img src={videoPosterImage} alt="" /><div className="stage-card-poster-shade" /></div><button type="button" className="stage-card-play" onClick={handleVideoStart} aria-label="Reproduzir vídeo de Vivianne Vilela"><Play size={24} fill="currentColor" /></button></div><div className="stage-card-top"><span>VÍDEO</span><span>FÓRUM ECBR</span></div><div className="stage-card-center" aria-hidden={isVideoStarted}><span>presença em movimento</span></div><div className="stage-card-bottom"><span>PAINÉIS · ABERTURAS · ENCONTROS</span><strong>05</strong></div></div></div>
      </section>

      <section className="women-section" id="mulheres"><div className="women-art"><div className="women-orbit orbit-one" /><div className="women-orbit orbit-two" /><div className="women-figure">V</div><span className="art-note">ELAS<br />FAZEM<br /><em>ACONTECER</em></span></div><div className="women-copy"><div className="section-index light-index">05 <span>/ TEMA ESPECIAL</span></div><p className="kicker coral-kicker">Para mulheres que estão construindo o próximo capítulo</p><h2>Mulheres que fazem <em>acontecer.</em></h2><p>Uma palestra inspirada na curadoria e condução do Summit Mulheres nas Profissões: uma conversa sobre voz, trajetória, escolhas e o poder de ocupar espaços com intenção.</p><div className="women-quote">“O seu lugar já está esperando por você.”</div><a href="#contato" className="button button-primary">Quero este tema no meu evento <ArrowUpRight size={17} /></a></div></section>

      <section className="contact-section section-light" id="contato"><div className="section-index">06 <span>/ VAMOS CONVERSAR</span></div><div className="contact-grid"><div><p className="kicker">Seu próximo palco começa aqui</p><h2>Qual conversa<br /><em>o seu evento</em><br />quer abrir?</h2><p className="contact-intro">Envie os detalhes do seu evento. A equipe da Vivianne recebe sua mensagem em <strong>contato@e-vironment.com</strong>.</p></div><div className="contact-card"><span className="contact-label">CONTATO COMERCIAL</span><a href="mailto:contato@e-vironment.com" className="contact-email">contato@e-vironment.com</a><form className="contact-form" onSubmit={handleContactSubmit}><label>Nome<input name="name" type="text" placeholder="Seu nome" required minLength={2} /></label><label>Telefone de contato<input name="phone" type="tel" placeholder="(11) 98899-9181" required minLength={8} /></label><label>E-mail<input name="email" type="email" placeholder="voce@empresa.com" required /></label><label>Mensagem<textarea name="message" placeholder="Conte um pouco sobre o evento..." required minLength={10} rows={4} /></label><div className="contact-button-row"><button type="submit" className="button button-dark" disabled={submitContact.isPending}>{submitContact.isPending ? "Enviando..." : "Enviar mensagem"} <Send size={17} /></button><a href={whatsappUrl} target="_blank" rel="noreferrer" className="button button-whatsapp">Abrir WhatsApp <ArrowUpRight size={17} /></a></div>{formStatus === "success" && <p className="form-feedback success">Mensagem enviada. Em breve entraremos em contato.</p>}{formStatus === "error" && <p className="form-feedback error">{errorMessage}</p>}</form></div></div></section>

      <footer className="site-footer"><div className="footer-brand"><img src={markImage} alt="" className="brand-mark" /><span>Vivianne Vilela</span></div><span>PALESTRAS · PALCOS · CONVERSAS</span><a href="#top">Voltar ao início <ArrowUpRight size={15} /></a></footer>
    </main>
  );
}
