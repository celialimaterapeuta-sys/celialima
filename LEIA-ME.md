# Refinamentos Lilás-Dourado — Alinhamento com Main ✨

Pacote com os refinamentos solicitados para o branch `v3-lilas-dourado`,
alinhando-o com o que foi feito no main (terracota).

---

## 🔄 ATUALIZAÇÃO pós-deploy — 2 correções (versão 2)

Correção de 2 errinhos percebidos após o primeiro deploy.
**Só precisa copiar 2 arquivos e redeployar — sem mover imagens.**

### Fix A — Cards do contexto "Dinâmica Familiar" agora uniformes
- **Sintoma**: os cards de Dinâmica Familiar pareciam diferentes dos outros
  contextos (proporção mais alta + imagem quebrada).
- **Causa**: `articles.ts` tinha um mapa `LOCAL_IMAGES` com 13 artigos apontando
  para `/artigos/dinamica-familiar/*.jpg` que **não existiam** (HTTP 404 no
  deploy). Esses cards usavam proporção 4:5 + imagem vazia, enquanto os demais
  usavam proporção 16:10 + thumbnail remoto do CloudFront.
- **Correção**: mapa `LOCAL_IMAGES` esvaziado. Agora TODOS os artigos usam o
  thumbnail remoto do CloudFront — proporção e visual uniformes em todos os
  contextos, incluindo Dinâmica Familiar.
- **Arquivo**: `src/lib/articles.ts`

### Fix B — Card "Espiritualidade" da home com largura de 1 coluna
- **Sintoma**: o card Espiritualidade ocupava a largura toda ("2 colunas").
- **Causa**: `bentoConfig[6]` estava em `lg:col-span-4` (largura total).
- **Correção**: trocado para `lg:col-span-2` — mesma largura dos outros 6 cards
  de contexto.
- **Arquivo**: `src/app/page.tsx`

## ⚡ Deploy rápido desta atualização (versão 2)

Como o primeiro deploy já foi feito, basta:

1. **Copiar os 2 arquivos** do pacote (substituindo os anteriores):
   - `src/lib/articles.ts`
   - `src/app/page.tsx`
2. `npm run build` → deve aparecer `✓ Compiled successfully`
3. `git add src/lib/articles.ts src/app/page.tsx`
4. `git commit -m "fix: cards dinamica-familiar uniformes + espiritualidade 1 coluna"`
5. `vercel --prod`
6. Hard refresh (Ctrl+Shift+R) em janela anônima

> **Não precisa mover imagens**: o mapa `LOCAL_IMAGES` está vazio, então nenhum
> arquivo de imagem local é referenciado. Todos os cards usam thumbnails remotos.

---

## 🎯 O que mudou

### 1. Heroes intermediários sem overlay claro (contraste branco)
- **PageHero** (usado em sobre, contato, atendimento, livro, publicações, caixa-de-ferramentas):
  removido o gradiente que clareava a base (`to-background/95`).
  Substituído por véu escuro uniforme `bg-foreground/35` + fade escuro na base.
  Agora o céu estrelado fica escuro em toda a extensão, garantindo contraste do texto branco.
- **Hero da home**: MANTIDO intacto (já estava bom do jeito que estava).

### 2. Datas removidas (alinhado com main)
Removido `dateDisplay` de todos os pontos de exibição:
- `article-card.tsx` (cards de Publicações + Caixa de Ferramentas)
- `saude-mental/[slug]/page.tsx` (cabeçalho, legenda da imagem, artigos relacionados)
- `caixa-de-ferramentas/[slug]/page.tsx` (cabeçalho, legenda, relacionadas)
- `page.tsx` home (card "artigo da semana")

Agora mostra só: `Por Célia Lima · X min de leitura` (ou `min de prática`).

### 3. Cards alinhados com a home
- `article-card.tsx`: `rounded-md` → `rounded-xl` (mesmo raio dos cards da home).
- Já tinha `glass-card lift-on-hover` (mesma classe da home) ✅
- Grade de 3 colunas já configurada ✅

### 4. Imagens locais desativadas (uniformidade visual)
- `articles.ts`: mapa `LOCAL_IMAGES` esvaziado (era 13 entradas apontando para
  `/artigos/dinamica-familiar/*.jpg` que não existiam → HTTP 404).
- Agora todos os artigos usam o thumbnail remoto do CloudFront — proporção 16:10
  e visual idênticos em todos os contextos.
- **Não precisa mover nenhuma pasta de imagens.** Para reativar imagens locais
  no futuro: coloque os `.jpg` em `public/artigos/dinamica-familiar/` e
  readicione os caminhos no mapa `LOCAL_IMAGES` de `articles.ts`.

## 📦 Arquivos neste pacote

```
src/app/page.tsx                              (só remoção de data do "artigo da semana"; hero intacto)
src/app/saude-mental/[slug]/page.tsx          (página do artigo)
src/app/caixa-de-ferramentas/[slug]/page.tsx  (página da prática)
src/components/page-hero.tsx                  (hero reutilizável das seções)
src/components/article-card.tsx               (card editorial das listagens)
src/lib/articles.ts                           (LOCAL_IMAGES vazio — thumbnails CloudFront)
```

## 🚀 Passo a passo de aplicação

### Passo 0 — Confirmar que está no branch lilás
```cmd
git branch
```
Deve aparecer `* v3-lilas-dourado` (ou o nome do branch lilás).
Se não estiver: `git checkout v3-lilas-dourado`

### Passo 1 — Mover a pasta de imagens (NÃO MAIS NECESSÁRIO ❌)

> ⚠️ **Esta etapa foi cancelada na versão 2.** O mapa `LOCAL_IMAGES` foi
> esvaziado, então nenhum arquivo de imagem local é referenciado. Pode pular
> direto pro Passo 2.
>
> *(Se já tiver movido a pasta numa versão anterior, não tem problema — ela
> ficou lá, apenas não é mais usada. Pode deixar ou remover, não afeta nada.)*

### Passo 2 — Copiar os 6 arquivos do pacote

Baixe este pacote e copie os arquivos mantendo a estrutura de pastas:

```cmd
copy /Y "%USERPROFILE%\Downloads\lilas-refinamentos\src\app\page.tsx" src\app\page.tsx
copy /Y "%USERPROFILE%\Downloads\lilas-refinamentos\src\components\page-hero.tsx" src\components\page-hero.tsx
copy /Y "%USERPROFILE%\Downloads\lilas-refinamentos\src\components\article-card.tsx" src\components\article-card.tsx
copy /Y "%USERPROFILE%\Downloads\lilas-refinamentos\src\lib\articles.ts" src\lib\articles.ts
copy /Y "%USERPROFILE%\Downloads\lilas-refinamentos\src\app\saude-mental\[slug]\page.tsx" "src\app\saude-mental\[slug]\page.tsx"
copy /Y "%USERPROFILE%\Downloads\lilas-refinamentos\src\app\caixa-de-ferramentas\[slug]\page.tsx" "src\app\caixa-de-ferramentas\[slug]\page.tsx"
```

### Passo 3 — Testar o build
```cmd
npm run build
```
Se aparecer `✓ Compiled successfully` → continue.
Se der erro → me cola a mensagem.

### Passo 4 — Commit
```cmd
git add src\app\page.tsx src\components\page-hero.tsx src\components\article-card.tsx src\lib\articles.ts "src\app\saude-mental\[slug]\page.tsx" "src\app\caixa-de-ferramentas\[slug]\page.tsx"
git commit -m "refino: heroes escuros + sem datas + cards alinhados + path /artigos/"
```

*(se removeu a pasta imagens, adicione também: `git add -A public\imagens`)*

### Passo 5 — Garantir que Vercel aponta pro projeto lilás
```cmd
del .vercel
vercel link
```
Escolha o projeto lilás (`celialima-psicoterapia` associado à URL `6rumra9yk`).

### Passo 6 — Deploy
```cmd
vercel --prod
```

### Passo 7 — Hard refresh em janela anônima
Abra `https://celialima-psicoterapia-6rumra9yk-seuprojeto.vercel.app/`
em janela anônima → Ctrl + Shift + R.

## ✅ Resultado esperado

- **Heroes**: céu estrelado escuro em toda a extensão, texto branco com alto contraste
- **Cards**: sem datas, cantos arredondados (rounded-xl), vidro fosco + sombra da home
- **Grade**: 3 colunas no desktop
- **Imagens**: thumbnails remotos do CloudFront (uniformes em todos os contextos)
- **Uniformidade**: arquitetura alinhada com main e turquesa

## 📋 Resumo dos 3 visuais (pronto pra apresentar à Célia)

| # | Nome | URL | Paleta | Hero |
|---|---|---|---|---|
| 1 | Terracota | www.celialima.com.br | Terracota + creme | Claro, orbs suaves |
| 2 | Turquesa-noite | celialima-psicoterapia-cw1u.vercel.app | Turquesa + navy | Navy escuro |
| 3 | Lilás-dourado | celialima-psicoterapia-6rumra9yk-seuprojeto.vercel.app | Lilás + dourado | Céu estrelado escuro |

Todos os três agora compartilham a mesma arquitetura:
- Sem datas nas publicações/práticas
- Cards glass-card + lift-on-hover + rounded-xl
- Grade de 3 colunas
- Imagens: thumbnails CloudFront (uniformes em todos os contextos)
- Heroes com contraste adequado para texto branco
