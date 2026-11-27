'use client'

import { useState } from "react";
import { Send, MessageCircle } from "lucide-react";

const DESTINO_EMAIL = "celialima.terapeuta@gmail.com";

export default function ContatoPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${DESTINO_EMAIL}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email || "nao-informado@site.local",
            message: form.message,
            _subject: `Contato pelo site — ${form.name || "sem nome"}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Falha no envio");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-14 md:py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-medium mb-6">
            Contato
          </p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl text-foreground hover:text-primary transition-colors leading-[1.1] mb-6 max-w-3xl"
            style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
          >
            Vamos conversar.
          </h1>
          <p className="text-lg text-foreground/85 leading-relaxed max-w-2xl">
            Se algum texto tocou algo, ou se você sente que é hora de começar a terapia,
            escreva aqui. Conversas mais profundas acontecem por telefone ou
            presencialmente — a mensagem é só o primeiro oi.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2
                className="text-2xl text-foreground mb-6"
                style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
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
                    placeholder="Envie sua mensagem aqui!"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors mt-2 disabled:opacity-60"
                >
                  <Send size={16} />
                  {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                </button>
                {status === "sent" && (
                  <p className="text-sm text-primary font-medium">
                    Mensagem enviada com sucesso. Obrigada pelo contato!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-primary">
                    Não foi possível enviar agora. Você também pode falar direto pelo WhatsApp +55 11 97408-0178.
                  </p>
                )}
              </form>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-6 bg-muted/30 rounded-sm border border-border">
                <h3 className="text-lg text-foreground mb-3" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
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
                <h3 className="text-lg text-foreground mb-3" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
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
                <h3 className="text-lg mb-3" style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}>
                  Prefere falar direto?
                </h3>
                <p className="text-sm text-primary-foreground/90 mb-3">
                  Para conversas mais profundas, prefira telefone ou
                  atendimento presencial — detalhes pessoais ficam para esse
                  espaço protegido.
                </p>
                <p className="text-sm text-primary-foreground/85 mb-4">
                  <strong>E-mail:</strong> {DESTINO_EMAIL}<br />
                  <strong>WhatsApp:</strong> +55 11 97408-0178
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=5511974080178"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground text-primary rounded-full text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
                >
                  <MessageCircle size={14} />
                  Fale Comigo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}