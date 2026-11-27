@echo off
REM ============================================================================
REM sync-conteudo.bat - Sincroniza MUDANCAS DE CONTEUDO entre branches
REM Projeto: Célia Lima (celialima-psicoterapia)
REM
REM Versao Windows CMD do sync-conteudo.sh (para quem nao usa Git Bash)
REM
REM Usa "git checkout <fonte> -- <arquivos>" para trazer SO os arquivos de
REM CONTEUDO do branch fonte, SEM tocar nos arquivos de TEMA (globals.css,
REM hero-fundo.svg, hero-paginas.svg, tailwind.config.ts).
REM Cada branch mantem sua paleta de cor original.
REM
REM USO:
REM   sync-conteudo.bat ^<branch-fonte^> ^<branch-destino^>
REM
REM CONFIRMADO (inspecao direta do repo, 2026-11-25):
REM   - Repo:  https://github.com/celialimaterapeuta-sys/celialima.git
REM   - 3 branches: main, v3-indigo-dourado, v3-lilas-dourado
REM   - FONTE das mudancas = v3-indigo-dourado
REM     (contato com email celialima.terapeuta@gmail.com + WhatsApp real)
REM
REM EXEMPLOS:
REM   sync-conteudo.bat v3-indigo-dourado main
REM   sync-conteudo.bat v3-indigo-dourado v3-lilas-dourado
REM
REM PRE-REQUISITOS:
REM   - git clone https://github.com/celialimaterapeuta-sys/celialima.git
REM   - Rodar de DENTRO da pasta do repo clonado
REM   - Nao ter mudancas nao commitadas (o script aborta se houver)
REM ============================================================================

setlocal enabledelayedexpansion

REM ---------- validacao de argumentos ----------
if "%~1"=="" goto :uso
if "%~2"=="" goto :uso

set "FONTE=%~1"
set "DESTINO=%~2"
set "REMOTE=origin"

echo.
echo ============================================================
echo   Sync de conteudo: %FONTE% -^> %DESTINO%
echo ============================================================
echo.

REM ---------- checar se ha mudancas nao commitadas ----------
git diff-index --quiet HEAD --
if %errorlevel% neq 0 (
  echo [X] Existem mudancas nao commitadas. Commit/stash antes de rodar o sync.
  git status -s
  goto :fim_erro
)

REM ---------- atualizar refs do remote ----------
echo [..] Buscando branches do remote...
git fetch %REMOTE% --prune
if %errorlevel% neq 0 (
  echo [X] Erro ao buscar branches do remote.
  goto :fim_erro
)

REM ---------- trocar pro branch destino ----------
echo.
echo [--] Trocando para %DESTINO%...
git checkout %DESTINO%
if %errorlevel% neq 0 (
  echo [X] Branch nao encontrado: %DESTINO%
  echo     Branches disponiveis:
  git branch -a
  goto :fim_erro
)

git pull %REMOTE% %DESTINO% --ff-only
if %errorlevel% neq 0 (
  echo [X] Erro ao fazer pull do %DESTINO%. Tente resolver manualmente.
  goto :fim_erro
)

REM ---------- trazer arquivos de CONTEUDO da fonte ----------
echo.
echo [--] Trazendo arquivos de conteudo de %FONTE%...
echo.

REM --- PAGINAS (uma por uma, pula se nao existir na fonte) ---
call :trazer_arquivo "src/app/page.tsx"
call :trazer_arquivo "src/app/sobre/page.tsx"
call :trazer_arquivo "src/app/contato/page.tsx"
call :trazer_arquivo "src/app/atendimento/page.tsx"
call :trazer_arquivo "src/app/livro/page.tsx"
call :trazer_arquivo "src/app/caixa-de-ferramentas/page.tsx"
call :trazer_arquivo "src/app/caixa-de-ferramentas/[slug]/page.tsx"
call :trazer_arquivo "src/app/saude-mental/page.tsx"
call :trazer_arquivo "src/app/saude-mental/[slug]/page.tsx"
call :trazer_arquivo "src/app/contextos/[slug]/page.tsx"

REM --- DADOS + LOGICA ---
call :trazer_arquivo "src/data/articles.json"
call :trazer_arquivo "src/lib/articles.ts"

REM --- COMPONENTES COMPARTILHADOS ---
call :trazer_arquivo "src/components/site-header.tsx"
call :trazer_arquivo "src/components/site-footer.tsx"
call :trazer_arquivo "src/components/article-card.tsx"
call :trazer_arquivo "src/components/page-hero.tsx"

REM --- IMAGENS (diretorios inteiros) ---
call :trazer_diretorio "public/contextos"
call :trazer_diretorio "public/artigos"

REM ---------- ARQUIVOS DE TEMA - NAO TOCAR ----------
echo.
echo [II] Arquivos de TEMA preservados (NAO foram alterados):
echo      - src/app/globals.css         -^> paleta de cor do %DESTINO%
echo      - public/hero-fundo.svg       -^> hero/ceu do %DESTINO%
echo      - public/hero-paginas.svg     -^> hero das paginas intermediarias
echo      - tailwind.config.ts          -^> config do %DESTINO%

REM ---------- conferir o que mudou ----------
echo.
echo [--] Conferindo mudancas (git status^):
git status -s

REM ---------- confirmar antes de commitar ----------
echo.
set /p "resp=> Confirmar e commitar as mudancas acima? [s/N]: "
if /i not "%resp%"=="s" (
  echo.
  echo [II] Abortado. As mudancas ficam no working tree.
  echo     Use "git status" para ver. Use "git checkout -- ." para descartar.
  goto :fim_ok
)

REM ---------- commit + push ----------
git add -A

REM Nao commitar os scripts de sync (senao somem ao trocar de branch)
git reset HEAD -- sync-conteudo.bat sync-conteudo.sh 2>nul

git commit -m "sync: conteudo atualizado de %FONTE% (home, sobre, contato, caixa-de-ferramentas, publicacoes, artigos, fotos) Tema (globals.css, hero-fundo.svg, hero-paginas.svg) preservado - so conteudo sincronizado."

if %errorlevel% neq 0 (
  echo [X] Erro ao commitar. Verifique o git status.
  goto :fim_erro
)

echo.
echo [--] Push para %REMOTE%/%DESTINO%...
git push %REMOTE% %DESTINO%
if %errorlevel% neq 0 (
  echo [X] Erro ao fazer push. Verifique autenticacao.
  goto :fim_erro
)

echo.
echo ============================================================
echo   [OK] Sincronizacao concluida: %DESTINO%
echo ============================================================
echo.
echo Vercel vai redeployar automaticamente (~2 min^). Verifique:
if "%DESTINO%"=="main" (
  echo   -^> https://celialima-psicoterapia-git-main-seuprojeto.vercel.app/contato  (terracota^)
) else if "%DESTINO%"=="v3-lilas-dourado" (
  echo   -^> https://www.celialima.com.br/contato  (lilas / producao^)
) else (
  echo   -^> confira o URL do deployment no dashboard Vercel ^> Active Branches
)
echo.
echo Confirme que apareceu:
echo   - Email: celialima.terapeuta@gmail.com
echo   - WhatsApp: +55 11 97408-0178
echo   - Botao: "Enviar para o e-mail"
goto :fim_ok

REM ============================================================================
REM FUNCOES AUXILIARES
REM ============================================================================

:trazer_arquivo
REM Traz um arquivo especifico da fonte (pula se nao existir)
git cat-file -e "origin/%FONTE%:%~1" 2>nul
if %errorlevel% equ 0 (
  git checkout "origin/%FONTE%" -- "%~1" 2>nul
  if %errorlevel% equ 0 (
    echo   [OK] %~1
  ) else (
    echo   [!!] %~1 (erro ao trazer^)
  )
) else (
  echo   [--] %~1 (nao existe na fonte - pulando^)
)
goto :eof

:trazer_diretorio
REM Traz um diretorio inteiro da fonte (pula se nao existir)
git ls-tree -r --name-only "origin/%FONTE%" -- "%~1" 2>nul | findstr . >nul
if %errorlevel% equ 0 (
  git checkout "origin/%FONTE%" -- "%~1" 2>nul
  if %errorlevel% equ 0 (
    for /f %%A in ('git ls-tree -r --name-only "origin/%FONTE%" -- "%~1" 2^>nul ^| find /c /v ""') do set count=%%A
    echo   [OK] %~1\ (!count! arquivos^)
  ) else (
    echo   [!!] %~1\ (erro ao trazer^)
  )
) else (
  echo   [--] %~1\ (nao existe na fonte - pulando^)
)
goto :eof

:uso
echo.
echo Uso: %0 ^<branch-fonte^> ^<branch-destino^>
echo Ex:  %0 v3-indigo-dourado main
echo Ex:  %0 v3-indigo-dourado v3-lilas-dourado
echo.
goto :fim_erro

:fim_erro
endlocal
exit /b 1

:fim_ok
endlocal
exit /b 0
