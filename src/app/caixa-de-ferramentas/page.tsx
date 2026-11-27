'use client'

import { useMemo, useState } from "react";
import { Search, Wrench } from "lucide-react";
import { getPraticas, contexts } from "@/lib/articles";
import { ArticleCard } from "@/components/article-card";
import { PageHero } from "@/components/page-hero";

export default function CaixaDeFerramentasPage() {
  const [query, setQuery] = useState("");
  const [selectedContext, setSelectedContext] = useState<string>("");

  const allPraticas = useMemo(() => getPraticas(), []);

  const filtered = useMemo(() => {
    let list = allPraticas.slice();
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
  }, [query, selectedContext, allPraticas]);

  return (
    <div className="flex flex-col">
      <PageHero>
        <div className="flex items-start gap-4 mb-6">
          <Wrench size={28} className="text-accent mt-1" />
          <p className="text-xs uppercase tracking-[0.25em] text-accent pt-2">
            Caixa de Ferramentas
          </p>
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6 max-w-3xl"
          style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
        >
          O que você pode fazer
          <span className="italic text-accent"> agora.</span>
        </h1>
        <p className="text-lg text-foreground/85 leading-relaxed max-w-2xl">
          Exercícios, técnicas e cuidados que você pode aplicar sozinho —
          respiração, florais, óleos essenciais, exercícios de proteção. Sempre
          como complemento, nunca como substituto do acompanhamento
          profissional.
        </p>
      </PageHero>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar prática por título, tema ou palavra-chave"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <select
              value={selectedContext}
              onChange={(e) => setSelectedContext(e.target.value)}
              className="px-4 py-3 bg-card border border-border rounded-sm text-foreground focus:outline-none focus:border-accent transition-colors"
            >
              <option value="">Todos os contextos</option>
              {contexts.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "prática encontrada" : "práticas encontradas"}
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">
                Nenhuma prática encontrada com esses critérios.
              </p>
              <button
                onClick={() => { setQuery(""); setSelectedContext(""); }}
                className="text-accent hover:underline text-sm"
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
                  accent="accent"
                  prefix="Prática · "
                  hrefPrefix="/caixa-de-ferramentas"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

