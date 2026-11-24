import articles from "@/data/articles.json";

export type Article = {
  slug: string;
  title: string;
  summary: string;
  categoryOriginal: string;
  contentType: "artigo" | "pratica";
  contexts: string[];
  contextLabels: string[];
  contextDescription?: string;
  datePublished: string;
  dateDisplay: string;
  keywords: string[];
  tags?: string[];
  wordCount: number;
  readTime: number;
  thumbnail: string;
  html: string;
};

export type Context = {
  slug: string;
  label: string;
  description: string;
  count: number;
};

export type Service = {
  id: string;
  name: string;
  forWhom: string;
  format: string;
  modality: string;
};

export const allArticles = articles as Article[];

// --- Imagens editoriais locais (geradas pela Célia) ------------------------
// Mapa slug -> caminho relativo em /public. Para artigos sem imagem local,
// o helper getArticleImage() retorna o thumbnail remoto (CloudFront).
const LOCAL_IMAGES: Record<string, string> = {
  "o-desafio-de-cuidar-de-pais-idosos-2-m6511": "/imagens/dinamica-familiar/01-o-desafio-de-cuidar-de-pais-idosos.jpg",
  "ausencia-paterna-m5315": "/imagens/dinamica-familiar/02-voce-sente-ausencia-paterna.jpg",
  "voce-cuida-sozinha-dos-seus-filhos-2-m528": "/imagens/dinamica-familiar/03-voce-cuida-sozinha-dos-seus-filhos.jpg",
  "competicao-entre-maes-e-filhas-m6189": "/imagens/dinamica-familiar/04-competicao-entre-maes-e-filhas.jpg",
  "lei-da-palmada-polemica-construtiva-2-m2038": "/imagens/dinamica-familiar/05-lei-da-palmada-polemica-construtiva.jpg",
  "familia-em-primeiro-lugar-m2919": "/imagens/dinamica-familiar/06-familia-em-primeiro-lugar.jpg",
  "que-tipo-de-nora-voce-e-2-m2627": "/imagens/dinamica-familiar/07-que-tipo-de-nora-voce-e.jpg",
  "que-tipo-de-sogra-voce-e-2-m1405": "/imagens/dinamica-familiar/08-que-tipo-de-sogra-voce-e.jpg",
  "cumplicidade-entre-irmaos-m388": "/imagens/dinamica-familiar/09-cumplicidade-entre-irmaos.jpg",
  "avos-modernas-sem-perder-a-docura-m1601": "/imagens/dinamica-familiar/10-avos-modernas-sem-perder-a-docura.jpg",
  "nao-quero-ter-filhos-e-agora-m1427": "/imagens/dinamica-familiar/11-nao-quero-ter-filhos-e-agora.jpg",
  "como-deixar-a-culpa-de-lado-m154": "/imagens/dinamica-familiar/12-da-para-deixar-a-culpa-de-lado.jpg",
  "dicas-para-buscar-o-equilibrio-nesse-delicado-relacionamento-m41": "/imagens/dinamica-familiar/13-pais-e-filhos-adolescentes.jpg",
};

/**
 * Retorna a imagem de capa do artigo: prioriza imagem editorial local;
 * se não houver, usa o thumbnail remoto (CloudFront).
 */
export function getArticleImage(article: Article): string {
  return LOCAL_IMAGES[article.slug] || article.thumbnail;
}

/** true quando o artigo tem imagem editorial local (não CloudFront) */
export function hasLocalImage(article: Article): boolean {
  return Boolean(LOCAL_IMAGES[article.slug]);
}

// --- 7 contextos consolidados (v2) ------------------------------------------
const CONTEXT_INFO: Record<string, { label: string; description: string }> = {
  "dinamica-familiar": {
    label: "Dinâmica Familiar e Criação de Filhos",
    description: "Mães, pais, filhos, sogras, avós. A família como primeiro espelho e território de aprendizado.",
  },
  "relacionamentos-sexualidade": {
    label: "Relacionamentos Amorosos e Sexualidade",
    description: "Amor, parceria, sexo, escolhas, separação. Tudo que envolve escolher e ser escolhido por outro.",
  },
  "ansiedade-estresse": {
    label: "Ansiedade, Estresse e Esgotamento",
    description: "Quando o corpo pede calma e a cabeça não consegue parar. Cansaço, exaustão, dificuldade de relaxar.",
  },
  "autocritica-limites": {
    label: "Autocrítica, Limites e Autoestima",
    description: "Aprender a dizer não, reconhecer o próprio valor, calar o juiz interior, cuidar de si sem culpa.",
  },
  "sintomas-psicossomaticos-saude-emocional": {
    label: "Sintomas Psicossomáticos e Saúde Emocional",
    description: "Emoção e corpo: como o que sentimos vira sintoma, doença como mensagem, terapias integrativas.",
  },
  "produtividade-carreira": {
    label: "Produtividade, Carreira e Organização",
    description: "Vocação, propósito, dinheiro como energia, trabalho como construção de sentido.",
  },
  "espiritualidade-autoconhecimento": {
    label: "Espiritualidade e Autoconhecimento",
    description: "Espiritualidade no cotidiano, meditação, exercícios de proteção, autoavaliação, paz interior.",
  },
};

export const contexts: Context[] = Object.entries(CONTEXT_INFO).map(([slug, info]) => ({
  slug,
  label: info.label,
  description: info.description,
  count: allArticles.filter((a) => a.contexts.includes(slug)).length,
}));

export const services: Service[] = [
  {
    id: "psicoterapia-individual",
    name: "Psicoterapia individual",
    forWhom: "Quem quer trabalho profundo e contínuo",
    format: "Sessões semanais de 50 min, em curso",
    modality: "Presencial ou virtual",
  },
  {
    id: "escuta-inicial",
    name: "Sessão de escuta inicial",
    forWhom: "Quem está em dúvida se faz terapia",
    format: "Conversa única, 90 min, sem compromisso",
    modality: "Presencial ou virtual",
  },
  {
    id: "mentoria-pontual",
    name: "Mentoria terapêutica pontual",
    forWhom: "Quem tem uma questão, não quer entrar em processo",
    format: "Sessão única sobre um tema específico (ex.: luto, separação)",
    modality: "Presencial ou virtual",
  },
  {
    id: "grupo-terapia",
    name: "Grupo de estudos/terapia",
    forWhom: "Quem quer trabalhar questões em comunidade",
    format: "Grupo fechado de 2 a N pessoas, encontros mensais",
    modality: "Virtual",
  },
];

// --- Helpers ----------------------------------------------------------------
export function getArticle(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArtigos(): Article[] {
  return allArticles.filter((a) => a.contentType === "artigo");
}

export function getPraticas(): Article[] {
  return allArticles.filter((a) => a.contentType === "pratica");
}

export function getContext(slug: string): Context | undefined {
  return contexts.find((c) => c.slug === slug);
}

export function getArtigosByContext(contextSlug: string): Article[] {
  return allArticles
    .filter((a) => a.contentType === "artigo" && a.contexts.includes(contextSlug))
    .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""));
}

export function getPraticasByContext(contextSlug: string): Article[] {
  return allArticles
    .filter((a) => a.contentType === "pratica" && a.contexts.includes(contextSlug))
    .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""));
}

export function getArticlesByContext(contextSlug: string): Article[] {
  return allArticles
    .filter((a) => a.contexts.includes(contextSlug))
    .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""));
}

export function getRecentArticles(limit = 3): Article[] {
  return allArticles
    .slice()
    .sort((a, b) => (b.datePublished || "").localeCompare(a.datePublished || ""))
    .slice(0, limit);
}

export function getRecentArtigos(limit = 3): Article[] {
  return allArticles
    .filter((a) => a.contentType === "artigo")
    .slice(0, limit);
}

export function getRecentPraticas(limit = 3): Article[] {
  return allArticles
    .filter((a) => a.contentType === "pratica")
    .slice(0, limit);
}

export function searchArtigos(query: string): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allArticles
    .filter((a) => a.contentType === "artigo")
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)) ||
        (a.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        a.contextLabels.some((c) => c.toLowerCase().includes(q)),
    );
}

export function searchPraticas(query: string): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allArticles
    .filter((a) => a.contentType === "pratica")
    .filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.toLowerCase().includes(q)) ||
        (a.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        a.contextLabels.some((c) => c.toLowerCase().includes(q)),
    );
}

// Articulação cruzada: práticas/artigos relacionados (mesmo contexto)
export function getPraticasRelacionadas(article: Article, limit = 3): Article[] {
  return allArticles
    .filter(
      (a) =>
        a.contentType === "pratica" &&
        a.slug !== article.slug &&
        a.contexts.some((c) => article.contexts.includes(c)),
    )
    .slice(0, limit);
}

export function getArtigosRelacionados(pratica: Article, limit = 3): Article[] {
  return allArticles
    .filter(
      (a) =>
        a.contentType === "artigo" &&
        a.slug !== pratica.slug &&
        a.contexts.some((c) => pratica.contexts.includes(c)),
    )
    .slice(0, limit);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return allArticles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.contentType === article.contentType &&
        a.contexts.some((c) => article.contexts.includes(c)),
    )
    .slice(0, limit);
}
