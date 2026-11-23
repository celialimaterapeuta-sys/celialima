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
 * Visual: fundo SVG do céu noturno com estrelas + overlay gradiente que
 * escurece a base para o texto sobre o fundo escuro ficar legível.
 *
 * O conteúdo é centralizado, com largura máxima padrão de max-w-5xl.
 */
export function PageHero({ children, className = "" }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Imagem de fundo: céu estrelado */}
      <div className="absolute inset-0">
        <Image
          src="/hero-paginas.svg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Overlay para legibilidade — preserva estrelas no topo,
            transiciona para fundo claro na base do hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background/95" />
        {/* Tint lilás-dourado sutil */}
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
