@echo off
setlocal enabledelayedexpansion

REM ============================================================
REM sync-conteudo.bat  -  versao Windows (roda no cmd.exe)
REM Sincroniza CONTEUDO entre branches, PRESERVANDO o tema (cor).
REM
REM USO:  sync-conteudo.bat ^<branch-fonte^> ^<branch-destino^>
REM EX:   sync-conteudo.bat v3-indigo-dourado main
REM       sync-conteudo.bat v3-indigo-dourado v3-lilas-dourado
REM
REM Coloque este .bat DENTRO da pasta do repo (ao lado de .git)
REM ============================================================

if "%~2"=="" (
  echo.
  echo USO: %0 ^<branch-fonte^> ^<branch-destino^>
  echo.
  echo EXEMPLOS:
  echo   %0 v3-indigo-dourado main              ^(terracota^)
  echo   %0 v3-indigo-dourado v3-lilas-dourado  ^(lilas^)
  echo.
  echo Fonte confirmada: v3-indigo-dourado
  exit /b 1
)

set "FONTE=%~1"
set "DESTINO=%~2"

REM --- checar que estamos num repo git ---
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [X] Nao estamos dentro de um repo git.
  echo     Coloque este .bat na pasta do repo ^(ao lado de .git^) e rode de la.
  exit /b 1
)

REM --- checar que nao ha mudancas nao commitadas ---
git diff --quiet
if not errorlevel 1 (
  git diff --cached --quiet
)
if errorlevel 1 (
  echo [X] Existem mudancas nao commitadas no repo.
  echo     Faca commit ou descarte antes ^(git stash^) pra nao misturar.
  exit /b 1
)

echo.
echo ============================================================
echo   Sincronizar conteudo:  %FONTE%   -^>   %DESTINO%
echo ============================================================
echo.

REM --- 1. verificar branches ---
call :check_branch "%FONTE%"
if errorlevel 1 exit /b 1
call :check_branch "%DESTINO%"
if errorlevel 1 exit /b 1

REM --- 2. trocar pro destino e atualizar ---
echo [1/5] Trocando para %DESTINO% ...
git checkout "%DESTINO%"
if errorlevel 1 goto :fail
git pull origin "%DESTINO%" --ff-only
if errorlevel 1 goto :fail

REM --- 2b. atualizar o branch FONTE remoto (origin/FONTE deve estar atual) ---
echo      Atualizando origin/%FONTE% ...
git fetch origin "%FONTE%"
if errorlevel 1 goto :fail

REM --- 3. trazer arquivos de CONTEUDO da fonte (uma linha so) ---
echo [2/5] Trazendo paginas e dados de %FONTE% ...
git checkout "origin/%FONTE%" -- "src/app/page.tsx" "src/app/sobre/page.tsx" "src/app/contato/page.tsx" "src/app/atendimento/page.tsx" "src/app/caixa-de-ferramentas/page.tsx" "src/app/caixa-de-ferramentas/[slug]/page.tsx" "src/app/saude-mental/page.tsx" "src/app/saude-mental/[slug]/page.tsx" "src/app/contextos/[slug]/page.tsx" "src/data/articles.json" "src/lib/articles.ts" "src/components/site-header.tsx" "src/components/site-footer.tsx"
if errorlevel 1 goto :fail

echo [3/5] Trazendo imagens ^(contextos + artigos^) ...
git checkout "origin/%FONTE%" -- "public/contextos" "public/artigos"
if errorlevel 1 goto :fail

REM --- 4. mostrar o que mudou ---
echo.
echo [4/5] Arquivos modificados:
git status --short
echo.
echo     TEMA preservado ^(globals.css / hero NAO devem aparecer acima^):
git diff --name-only HEAD -- "src/app/globals.css" "public/hero-fundo.svg" "tailwind.config.ts"
echo     ^(lista vazia = tema intacto^)
echo.

REM --- 5. confirmar e commitar ---
set "CONFIRM="
set /p CONFIRM=[5/5] Confirmar e commitar as mudancas acima? [s/N]:
if /i not "!CONFIRM!"=="s" (
  echo.
  echo Abortado. Os arquivos continuam modificados na working tree.
  echo Para descartar:       git checkout -- .
  echo Para commitar depois: git add -A ^&^& git commit -m "sync"
  exit /b 0
)

git add -A
git commit -m "sync: conteudo atualizado de %FONTE% (home, sobre, contato, caixa, publicacoes) - tema preservado"
if errorlevel 1 goto :fail

echo.
echo -^> Enviando para origin/%DESTINO% ...
git push origin "%DESTINO%"
if errorlevel 1 goto :fail

echo.
echo ============================================================
echo   OK! %DESTINO% sincronizado com sucesso.
echo ============================================================
echo Vercel redeploya em ~2 min. Verifique:
if "%DESTINO%"=="main" (
  echo   -^> https://celialima-psicoterapia-git-main-seuprojeto.vercel.app/contato
) else if "%DESTINO%"=="v3-lilas-dourado" (
  echo   -^> https://www.celialima.com.br/contato
) else (
  echo   -^> dashboard Vercel ^> Active Branches
)
echo.
echo Confirme na pagina Contato:
echo     email    celialima.terapeuta@gmail.com
echo     WhatsApp +55 11 97408-0178
echo.
pause
exit /b 0


REM ============================================================
REM  Sub-rotinas
REM ============================================================
:check_branch
git rev-parse --verify "origin/%~1" >nul 2>&1
if not errorlevel 1 exit /b 0
git rev-parse --verify "%~1" >nul 2>&1
if not errorlevel 1 exit /b 0
echo [X] Branch nao encontrado: %~1
echo     Branches disponiveis:
git branch -a
exit /b 1

:fail
echo.
echo [X] Ocorreu um erro. Processo interrompido.
echo     Leia a mensagem acima. Se ficou com mudancas pela metade:
echo       git checkout -- .     ^(descarta tudo nao commitado^)
exit /b 1
