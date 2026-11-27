'use client'

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContatoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Envia para o e-mail da Célia — detalhes pessoais só em conversa
    // telefônica/presencial, por questões éticas.
    const subject = `Contato pelo site — ${form.name || 'sem nome'}`;
    const mailtoUrl = `mailto:celialima.terapeuta@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(form.message)}`;
    window.location.href = mailtoUrl;
    setSent(true);
  }

  return (
    <div className="flex flex-col">
      {/* Hero com céu estrelado */}
      <section className="border-b border-border bg-muted/20"><div className="mx-auto max-w-5xl px-6 lg:px-8 py-14 md:py-16">
        <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">
          Contato
        </p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-foreground hover:text-primary transition-colors leading-[1.1] mb-6 max-w-3xl"
          style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
        >
          Vamos conversar.
        </h1>
        <p className="text-lg text-foreground/85 leading-relaxed max-w-2xl">
          Se algum texto tocou algo, ou se você sente que é hora de começar a terapia,
          escreva aqui. Conversas mais profundas acontecem por telefone ou
          presencialmente — o e-mail é só o primeiro oi.
        </p>
      </div></section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Formulário */}
            <div>
              <h2
                className="text-2xl text-foreground mb-6"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
              >
                Escreva sua mensagem
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                    E-mail (opcional)
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                    Mensagem
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Escreva sua mensagem"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors mt-2"
                >
                  <Send size={16} />
                  Enviar por e-mail
                </button>
                {sent && (
                  <p className="text-sm text-accent">
                    Abrindo seu app de e-mail... Se não abrir automaticamente, envie
                    para <strong>celialima.terapeuta@gmail.com</strong>.
                  </p>
                )}
              </form>
            </div>

            {/* Info lateral */}
            <div className="flex flex-col gap-6">
              <div className="p-6 bg-muted/30 rounded-sm border border-border">
                <h3 className="text-lg text-foreground mb-3" style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 600 }}>
                  Como funciona
                </h3>
                <ol className="space-y-3 text-sm text-foreground/85">
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">1.</span>
                    <span>Você manda a primeira mensagem, sem compromisso.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">2.</span>
                    <span>Respondo e combinamos horário para uma conversa inicial.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary font-semibold">3.</span>
                    <span>A primeira conversa serve para você sentir se faz sentido seguir.</span>
                  </li>
                </ol>
              </div>

              <div className="p-6 bg-muted/30 rounded-sm border border-border">
                <h3 className="text-lg text-foreground mb-3" style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 600 }}>
                  Atendimento
                </h3>
                <ul className="space-y-2 text-sm text-foreground/85">
                  <li>Online (videochamada) ou presencial</li>
                  <li>Sessões de 50 minutos</li>
                  <li>Segunda a sexta, horário comercial</li>
                  <li className="pt-2 italic text-muted-foreground text-xs">
                    O contato é feito por mim, sem secretária eletrônica.
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-primary text-primary-foreground rounded-sm">
                <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 600 }}>
                  Prefere falar direto?
                </h3>
                <p className="text-sm text-primary-foreground/90 mb-3">
                  Para conversas mais profundas, prefira telefone ou
                  atendimento presencial — detalhes pessoais ficam para esse
                  espaço protegido.
                </p>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  <strong>E-mail:</strong> celialima.terapeuta@gmail.com<br/>
                  <strong>WhatsApp:</strong> +55 11 97408-0178
                </p>
                <a
                  href="mailto:celialima.terapeuta@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground text-primary rounded-full text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
                >
                  <Send size={14} />
                  Enviar para o e-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
