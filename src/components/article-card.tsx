import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";
import { getArticleImage } from "@/lib/articles";

type Accent = "primary" | "accent";

type ArticleCardProps = {
  article: Article;
  accent?: Accent;
  prefix?: string; // "Prática · " when needed
  hrefPrefix?: string; // "/saude-mental" | "/caixa-de-ferramentas"
};

/**
 * Card editorial estilo revista literária, com imagem no topo e glass-card.
 * Usado nas listagens de Publicações e Caixa de Ferramentas.
 *
 * Todos os cards usam a mesma proporção 4:5 (retrato) — padronização visual
 * independente da origem da imagem (local ou CloudFront).
 */
export function ArticleCard({
  article,
  accent = "primary",
  prefix,
  hrefPrefix = "/saude-mental",
}: ArticleCardProps) {
  const imageSrc = getArticleImage(article);
  const accentText = accent === "primary" ? "text-primary" : "text-accent";
  const accentHover = accent === "primary" ? "group-hover:text-primary" : "group-hover:text-accent";
  const accentBgTag = accent === "primary"
    ? "bg-primary/8 text-primary/80 border-primary/15"
    : "bg-accent/8 text-accent/80 border-accent/15";
  const accentCta = accent === "primary" ? "text-primary" : "text-accent";

  return (
    <Link
      href={`${hrefPrefix}/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-md glass-card lift-on-hover h-full"
    >
      {/* Imagem no topo — proporção 16:10 (paisagem) para TODOS os cards, mais compacto */}
      <div className="relative w-full overflow-hidden aspect-[16/10] bg-muted">
        <Image
          src={imageSrc}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Gradiente sutil para a imagem "pousar" no card */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Linha de metadados — contextLabel · data · tempo de leitura */}
        <p className={`text-[11px] uppercase tracking-[0.2em] ${accentText} mb-2`}>
          {prefix}
          {article.contextLabels[0]}
        </p>
        <p className="text-[11px] text-muted-foreground mb-3 flex items-center gap-1.5">
          <span>{article.readTime} min de leitura</span>
        </p>

        {/* Título serif */}
        <h2
          className={`text-xl md:text-[1.4rem] leading-snug mb-3 ${accentHover} transition-colors`}
          style={{ fontFamily: "var(--font-fraunces)", fontWeight: 500 }}
        >
          {article.title}
        </h2>

        {/* Subtítulo / deck */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {article.summary}
        </p>

        {/* Tags pequenas */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className={`text-[10px] px-2 py-0.5 border rounded-full ${accentBgTag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA no rodapé do card */}
        <p className={`mt-auto inline-flex items-center gap-1 text-xs ${accentCta} opacity-0 group-hover:opacity-100 transition-opacity`}>
          Ler texto <ArrowRight size={12} />
        </p>
      </div>
    </Link>
  );
}

