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
// Mapa slug -> caminho relativo em /public/artigos/[contexto]/.
// Para artigos sem imagem local, o helper getArticleImage() retorna um
// placeholder editorial (não usa mais o thumbnail remoto do CloudFront).
const LOCAL_IMAGES: Record<string, string> = {
  // ============ Dinâmica Familiar e Criação de Filhos (13) ============
  "o-desafio-de-cuidar-de-pais-idosos-2-m6511": "/artigos/dinamica-familiar/01-o-desafio-de-cuidar-de-pais-idosos.jpg",
  "ausencia-paterna-m5315": "/artigos/dinamica-familiar/02-voce-sente-ausencia-paterna.jpg",
  "voce-cuida-sozinha-dos-seus-filhos-2-m528": "/artigos/dinamica-familiar/03-voce-cuida-sozinha-dos-seus-filhos.jpg",
  "competicao-entre-maes-e-filhas-m6189": "/artigos/dinamica-familiar/04-competicao-entre-maes-e-filhas.jpg",
  "lei-da-palmada-polemica-construtiva-2-m2038": "/artigos/dinamica-familiar/05-lei-da-palmada-polemica-construtiva.jpg",
  "familia-em-primeiro-lugar-m2919": "/artigos/dinamica-familiar/06-familia-em-primeiro-lugar.jpg",
  "que-tipo-de-nora-voce-e-2-m2627": "/artigos/dinamica-familiar/07-que-tipo-de-nora-voce-e.jpg",
  "que-tipo-de-sogra-voce-e-2-m1405": "/artigos/dinamica-familiar/08-que-tipo-de-sogra-voce-e.jpg",
  "cumplicidade-entre-irmaos-m388": "/artigos/dinamica-familiar/09-cumplicidade-entre-irmaos.jpg",
  "avos-modernas-sem-perder-a-docura-m1601": "/artigos/dinamica-familiar/10-avos-modernas-sem-perder-a-docura.jpg",
  "nao-quero-ter-filhos-e-agora-m1427": "/artigos/dinamica-familiar/11-nao-quero-ter-filhos-e-agora.jpg",
  "como-deixar-a-culpa-de-lado-m154": "/artigos/dinamica-familiar/12-da-para-deixar-a-culpa-de-lado.jpg",
  "dicas-para-buscar-o-equilibrio-nesse-delicado-relacionamento-m41": "/artigos/dinamica-familiar/13-pais-e-filhos-adolescentes.jpg",

  // ============ Ansiedade, Estresse e Esgotamento (5) ============
  "impacto-da-pandemia-e-do-isolamento-social-m86776": "/artigos/ansiedade-estresse/01-impacto-da-pandemia-e-do-isolamento-social.jpg",
  "relacoes-familiares-na-pandemia-e-quarentena-m85171": "/artigos/ansiedade-estresse/02-como-ficam-as-relacoes-familiares-na-pandemia-e-quarentena.jpg",
  "como-encontrar-paz-m77369": "/artigos/ansiedade-estresse/03-como-encontrar-paz-quando-e-dificil-controlar-os-sentimentos.jpg",
  "emocoes-que-voce-alimenta-sao-as-que-mais-crescem-2-m8072": "/artigos/ansiedade-estresse/04-emocoes-que-voce-alimenta-sao-as-que-mais-crescem.jpg",
  "tire-ferias-dos-problemas-m191": "/artigos/ansiedade-estresse/05-tire-ferias-das-preocupacoes.jpg",

  // ============ Autocrítica, Limites e Autoestima (11) ============
  "papel-de-vitima-ou-sobrevivente-m272008": "/artigos/autocritica-limites/01-papel-de-vitima-ou-sobrevivente-entenda-a-diferenca.jpg",
  "juiz-interior-m268770": "/artigos/autocritica-limites/02-como-o-juiz-interior-pode-impedir-a-vida-de-fluir.jpg",
  "o-que-e-teimosia-m128440": "/artigos/autocritica-limites/03-o-que-e-teimosia-entenda-essa-caracteristica.jpg",
  "por-que-fazer-terapia-m53837": "/artigos/autocritica-limites/04-por-que-fazer-terapia.jpg",
  "por-que-voce-quer-saber-como-ser-perfeito-m45031": "/artigos/autocritica-limites/05-por-que-voce-quer-saber-como-ser-perfeito.jpg",
  "como-lidar-com-o-odio-alheio-m30615": "/artigos/autocritica-limites/06-como-lidar-com-o-odio-alheio.jpg",
  "voce-e-ou-conhece-uma-pessoa-chata-2-m1915": "/artigos/autocritica-limites/07-voce-e-ou-conhece-uma-pessoa-chata.jpg",
  "decepcao-como-lidar-com-a-dor-da-expectativa-frustrada-m6125": "/artigos/autocritica-limites/08-decepcao-como-lidar-com-a-dor-da-expectativa-frustrada.jpg",
  "a-face-positiva-da-fofoca-2-m4939": "/artigos/autocritica-limites/09-a-face-positiva-da-fofoca.jpg",
  "e-possivel-admirar-sem-desejar-2-m2084": "/artigos/autocritica-limites/10-e-possivel-admirar-sem-desejar.jpg",
  "mulher-com-m-de-maravilha-m418": "/artigos/autocritica-limites/11-mulher-com-m-de-maravilha.jpg",

  // ============ Espiritualidade e Autoconhecimento (6) ============
  "dor-limites-m248400": "/artigos/espiritualidade-autoconhecimento/01-entre-a-dor-e-os-limites-como-adolescencia-expoe-complexidades.jpg",
  "por-que-tanto-preconceito-nas-redes-sociais-m5655": "/artigos/espiritualidade-autoconhecimento/02-por-que-tanto-preconceito-nas-redes-sociais.jpg",
  "futebol-politica-e-religiao-se-discutem-m5151": "/artigos/espiritualidade-autoconhecimento/03-futebol-politica-e-religiao-se-discutem.jpg",
  "a-espiritualidade-que-esta-no-cotidiano-2-m2683": "/artigos/espiritualidade-autoconhecimento/04-a-espiritualidade-que-esta-no-cotidiano.jpg",
  "do-virtual-para-o-mundo-real-2-m2100": "/artigos/espiritualidade-autoconhecimento/05-do-virtual-para-o-mundo-real.jpg",
  "psicodrama-encenando-emocoes-2-m1767": "/artigos/espiritualidade-autoconhecimento/06-psicodrama-encenando-emocoes.jpg",

  // ============ Produtividade, Carreira e Organização (4) ============
  "dificuldades-com-colegas-de-trabalho-tem-origem-no-seu-lar-2-m6801": "/artigos/produtividade-carreira/01-dificuldades-com-colegas-de-trabalho-tem-origem-no-seu-lar.jpg",
  "voce-precisa-de-tudo-que-tem-m2499": "/artigos/produtividade-carreira/02-voce-precisa-de-tudo-que-tem.jpg",
  "vocacao-vale-mais-que-dinheiro-m206": "/artigos/produtividade-carreira/03-vocacao-vale-mais-que-dinheiro.jpg",
  "capacidade-e-competencia-bastam-m372": "/artigos/produtividade-carreira/04-capacidade-e-competencia-bastam.jpg",

  // ============ Relacionamentos Amorosos e Sexualidade (18) ============
  "carencia-afetiva-m273696": "/artigos/relacionamentos-sexualidade/01-carencia-afetiva-relacionamentos-abusivos.jpg",
  "violencia-domestica-do-silencio-a-agressividade-fisica-m96018": "/artigos/relacionamentos-sexualidade/02-violencia-domestica-silencio-agressividade-fisica.jpg",
  "o-que-e-masturbacao-m85207": "/artigos/relacionamentos-sexualidade/03-o-que-e-masturbacao-puberdade-a-maturidade.jpg",
  "relacionamento-aberto-ou-exclusividade-m37858": "/artigos/relacionamentos-sexualidade/04-relacionamento-aberto-ou-exclusividade.jpg",
  "quer-exclusividade-em-seu-relacionamento-m2282": "/artigos/relacionamentos-sexualidade/05-quer-exclusividade-em-seu-relacionamento.jpg",
  "celular-a-arma-que-dispara-contra-sua-relacao-2-m7806": "/artigos/relacionamentos-sexualidade/06-celular-a-arma-que-dispara-contra-sua-relacao.jpg",
  "a-dor-de-quem-decide-pela-separacao-m622": "/artigos/relacionamentos-sexualidade/07-a-dor-de-quem-decide-pela-separacao.jpg",
  "meuamigosecreto-denunciou-abusos-sofridos-por-mulheres-m7107": "/artigos/relacionamentos-sexualidade/08-meuamigosecreto-denunciou-abusos-sofridos-por-mulheres.jpg",
  "amor-entre-mulheres-maduras-e-homens-jovens-m5581": "/artigos/relacionamentos-sexualidade/09-amor-entre-mulheres-maduras-e-homens-jovens.jpg",
  "filhos-prejudicam-a-relacao-m174": "/artigos/relacionamentos-sexualidade/10-filhos-prejudicam-a-relacao.jpg",
  "mulheres-vida-sexual-e-tabus-m436": "/artigos/relacionamentos-sexualidade/11-mulheres-vida-sexual-e-tabus.jpg",
  "casais-que-moram-em-casas-separadas-2-m1493": "/artigos/relacionamentos-sexualidade/12-casais-que-moram-em-casas-separadas.jpg",
  "beijei-alguem-do-mesmo-sexo-m1197": "/artigos/relacionamentos-sexualidade/13-psicoterapeuta-esclarece-homossexualidade-e-bissexualidade.jpg",
  "egoismo-ou-generosidade-m128": "/artigos/relacionamentos-sexualidade/14-generosidade-ou-egoismo.jpg",
  "amor-no-ambiente-profissional-m616": "/artigos/relacionamentos-sexualidade/15-amor-no-ambiente-profissional.jpg",
  "amor-nao-precisa-rimar-com-dor-m404": "/artigos/relacionamentos-sexualidade/16-amor-nao-precisa-rimar-com-dor.jpg",
  "equilibrando-a-razao-e-a-emocao-m189": "/artigos/relacionamentos-sexualidade/17-equilibrando-a-razao-e-a-emocao.jpg",
  "encare-o-prazer-de-outra-forma-m121": "/artigos/relacionamentos-sexualidade/18-encare-o-prazer-de-outra-forma.jpg",

  // ============ Sintomas Psicossomáticos e Saúde Emocional (10) ============
  "terapias-alternativas-m100716": "/artigos/sintomas-psicossomaticos-saude-emocional/01-terapias-alternativas-profissional-e-fundamental-para-evitar-ciladas.jpg",
  "medicina-tradicional-e-terapias-alternativas-m89134": "/artigos/sintomas-psicossomaticos-saude-emocional/02-medicina-tradicional-e-terapias-alternativas-complementares-ou-conflitantes.jpg",
  "compulsao-alimentar-e-fome-emocional-m49229": "/artigos/sintomas-psicossomaticos-saude-emocional/03-entenda-a-relacao-entre-compulsao-alimentar-e-fome-emocional.jpg",
  "metamorfoses-ao-longo-da-vida-pedem-desapego-e-trazem-liberdade-m33300": "/artigos/sintomas-psicossomaticos-saude-emocional/04-metamorfoses-ao-longo-da-vida-pedem-desapego-e-trazem-liberdade.jpg",
  "prevencao-ao-suicidio-m31352": "/artigos/sintomas-psicossomaticos-saude-emocional/05-prevencao-ao-suicidio-passa-pelo-acolhimento-e-por-informacao.jpg",
  "odeio-o-natal-aprenda-a-lidar-com-a-data-sem-culpa-m340": "/artigos/sintomas-psicossomaticos-saude-emocional/06-odeio-o-natal.jpg",
  "o-que-uma-doenca-pode-nos-ensinar-m6009": "/artigos/sintomas-psicossomaticos-saude-emocional/07-o-que-uma-doenca-pode-nos-ensinar.jpg",
  "a-dor-e-o-choque-da-morte-subita-2-m4965": "/artigos/sintomas-psicossomaticos-saude-emocional/08-a-dor-e-o-choque-da-morte-subita.jpg",
  "cuidar-das-emocoes-e-cuidar-do-corpo-m34": "/artigos/sintomas-psicossomaticos-saude-emocional/09-cuidar-das-emocoes-e-cuidar-do-corpo.jpg",
  "aprenda-com-seu-corpo-m35": "/artigos/sintomas-psicossomaticos-saude-emocional/10-aprenda-com-seu-corpo-qual-emocao-desencadeou-sua-doenca.jpg",
};

/**
 * Retorna a imagem de capa do artigo ou prática:
 * - Se for artigo e tiver foto local (gerada pela Célia), usa ela
 * - Se for PRÁTICA sem foto local, usa o SVG do contexto correspondente
 *   (mantém coerência visual com os cards da home)
 * - Em último caso, usa placeholder editorial abstrato
 */
export function getArticleImage(article: Article): string {
  // 1. Tem foto local mapeada? Usa ela.
  if (LOCAL_IMAGES[article.slug]) {
    return LOCAL_IMAGES[article.slug];
  }
  // 2. É prática (Caixa de Ferramentas)? Usa o SVG do primeiro contexto
  //    associado a ela — mantém coerência visual com os cards da home.
  if (article.contentType === "pratica" && article.contexts[0]) {
    return `/contextos/${article.contexts[0]}.svg`;
  }
  // 3. Fallback final: placeholder editorial abstrato
  return "/artigos/_placeholder.svg";
}

/** true quando o artigo tem imagem editorial local (não placeholder/svg de contexto) */
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
