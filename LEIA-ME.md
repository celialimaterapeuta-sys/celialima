# Refinamentos Lilás-Dourado — Alinhamento com Main ✨

Pacote com os refinamentos solicitados para o branch `v3-lilas-dourado`,
alinhando-o com o que foi feito no main (terracota).

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

### 4. Caminho de imagens padronizado
- `articles.ts`: `/imagens/dinamica-familiar/` → `/artigos/dinamica-familiar/`
- Agora bate com o main (terracota/turquesa).
- **Atenção**: precisa mover a pasta física das imagens (ver Passo 1 abaixo).

## 📦 Arquivos neste pacote

```
src/app/page.tsx                              (só remoção de data do "artigo da semana"; hero intacto)
src/app/saude-mental/[slug]/page.tsx          (página do artigo)
src/app/caixa-de-ferramentas/[slug]/page.tsx  (página da prática)
src/components/page-hero.tsx                  (hero reutilizável das seções)
src/components/article-card.tsx               (card editorial das listagens)
src/lib/articles.ts                           (mapa de imagens + helpers)
```

## 🚀 Passo a passo de aplicação

### Passo 0 — Confirmar que está no branch lilás
```cmd
git branch
```
Deve aparecer `* v3-lilas-dourado` (ou o nome do branch lilás).
Se não estiver: `git checkout v3-lilas-dourado`

### Passo 1 — Mover a pasta de imagens (IMPORTANTÍSSIMO)
Como mudamos o caminho de `/imagens/` para `/artigos/`, precisa mover a pasta física:

```cmd
move public\imagens\dinamica-familiar public\artigos\dinamica-familiar
```

*(se a pasta `public\artigos` não existir, crie primeiro: `mkdir public\artigos`)*

Depois pode remover a pasta `imagens` se ficou vazia:
```cmd
rmdir public\imagens
```

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
git add public\artigos src\app\page.tsx src\components\page-hero.tsx src\components\article-card.tsx src\lib\articles.ts "src\app\saude-mental\[slug]\page.tsx" "src\app\caixa-de-ferramentas\[slug]\page.tsx"
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
- **Imagens**: carregando de `/artigos/dinamica-familiar/` (mesmo path do main)
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
- Imagens em /artigos/dinamica-familiar/
- Heroes com contraste adequado para texto branco
