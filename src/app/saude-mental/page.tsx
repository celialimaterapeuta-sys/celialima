'use client'

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getArtigos, contexts } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { PageHero } from "@/components/page-hero";

export default function SaudeMentalPage() {
  const [query, setQuery] = useState("");
  const [selectedContext, setSelectedContext] = useState<string>("");

  const allArtigos = useMemo(() => getArtigos(), []);

  const filtered = useMemo(() => {
    let list = allArtigos.slice();
    if (selectedContext) {
      list = list.filter((a) => a.contexts.includes(selectedContext));
    }
    const q = query.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.keywords.some((k) => k.toLowerCase().includes(q)) ||
          a.contextLabels.some((c) => c.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [query, selectedContext, allArtigos]);

  return (
    <div className="flex flex-col">
      {/* Hero editorial com fundo de céu estrelado */}
      <PageHero>
        <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">
          Publicações
        </p>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-8 max-w-4xl"
          style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
        >
          Histórias e reflexões
          <span className="italic text-accent"> de consultório.</span>
        </h1>
        <div className="max-w-3xl space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            Em mais de três décadas ouvindo as dores e angústias no meu
            espaço, decidi transformar as experiências dessa trajetória em
            conteúdos e artigos que possam ser compartilhados não só com
            meus pacientes, mas com todos os interessados em alcançar uma
            vida mais plena e íntegra — num processo de autoconhecimento
            conduzido com leveza, acolhimento e gentileza.
          </p>
          <p className="italic text-muted-foreground">
            — Célia Lima
          </p>
        </div>
      </PageHero>

      {/* Busca + filtros */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por título, tema ou palavra-chave"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <select
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
              className="px-4 py-3 bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">Todos os contextos</option>
              {contexts.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "texto encontrado" : "textos encontrados"}
          </p>
        </div>
      </section>

      {/* Lista editorial — grid 3 colunas no desktop, glass cards com imagem */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                Nenhum texto encontrado com esses critérios.
              </p>
              <button
                onClick={() => { setQuery(""); setSelectedContext(""); }}
                className="text-primary hover:underline text-sm"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  accent="primary"
                  hrefPrefix="/saude-mental"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

