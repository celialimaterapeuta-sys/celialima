import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  /**
   * Conteúdo do hero — tipicamente:
   *   <p className="text-xs ...">eyebrow</p>
   *   <h1 className="text-4xl ...">título</h1>
   *   <p>texto introdutório</p>
   */
  children: ReactNode;
  /**
   * Padding vertical — padrão alto (py-20 md:py-28) para respiro editorial.
   */
  className?: string;
};

/**
 * Hero reutilizável para páginas intermediárias (sobre, contato, atendimento,
 * livro, publicações, caixa-de-ferramentas).
 *
 * Visual: fundo SVG do céu noturno com estrelas — SEM overlay clareando.
 * O céu fica escuro do topo à base, com os títulos em branco/dourado.
 */
export function PageHero({ children, className = "" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Imagem de fundo: céu estrelado — sem overlay, escuro total */}
      <div className="absolute inset-0">
        <Image
          src="/hero-paginas.svg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Tint índigo-dourado muito sutil — só pra dar unidade */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/8 via-transparent to-accent/6" />
        {/* Orbs decorativos — luz suave nas extremidades */}
        <div
          className="absolute -top-20 -right-20 w-[24rem] h-[24rem] rounded-full bg-primary/12 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-20 w-[22rem] h-[22rem] rounded-full bg-accent/12 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className={`relative mx-auto max-w-5xl px-6 lg:px-8 py-20 md:py-28 ${className}`}>
        {children}
      </div>
    </section>
  );
}
