#!/usr/bin/env python3
"""
Atualiza o thumbnail de 13 artigos de Dinâmica Familiar no articles.json.
Roda localmente na pasta do projeto (onde está src/data/articles.json).

Uso:
  python update_thumbnails.py
"""
import json
import os
import sys

# Contexto ao qual estas imagens pertencem (espelha a pasta em public/artigos/)
CONTEXT_SLUG = "dinamica-familiar"

# Mapeamento: slug do artigo → nome do arquivo de imagem
IMG_MAP = {
    "o-desafio-de-cuidar-de-pais-idosos-2-m6511": "01-o-desafio-de-cuidar-de-pais-idosos.jpg",
    "ausencia-paterna-m5315": "02-voce-sente-ausencia-paterna.jpg",
    "voce-cuida-sozinha-dos-seus-filhos-2-m528": "03-voce-cuida-sozinha-dos-seus-filhos.jpg",
    "competicao-entre-maes-e-filhas-m6189": "04-competicao-entre-maes-e-filhas.jpg",
    "lei-da-palmada-polemica-construtiva-2-m2038": "05-lei-da-palmada-polemica-construtiva.jpg",
    "familia-em-primeiro-lugar-m2919": "06-familia-em-primeiro-lugar.jpg",
    "que-tipo-de-nora-voce-e-2-m2627": "07-que-tipo-de-nora-voce-e.jpg",
    "que-tipo-de-sogra-voce-e-2-m1405": "08-que-tipo-de-sogra-voce-e.jpg",
    "cumplicidade-entre-irmaos-m388": "09-cumplicidade-entre-irmaos.jpg",
    "avos-modernas-sem-perder-a-docura-m1601": "10-avos-modernas-sem-perder-a-docura.jpg",
    "nao-quero-ter-filhos-e-agora-m1427": "11-nao-quero-ter-filhos-e-agora.jpg",
    "como-deixar-a-culpa-de-lado-m154": "12-da-para-deixar-a-culpa-de-lado.jpg",
    "dicas-para-buscar-o-equilibrio-nesse-delicado-relacionamento-m41": "13-pais-e-filhos-adolescentes.jpg",
}

# Caminho do articles.json (relativo à raiz do projeto)
JSON_PATH = os.path.join("src", "data", "articles.json")

def main():
    if not os.path.exists(JSON_PATH):
        print(f"ERRO: {JSON_PATH} não encontrado.")
        print("Rode este script na raiz do projeto (onde está a pasta src/).")
        sys.exit(1)

    # Backup
    import shutil
    backup = JSON_PATH + ".backup-imagens"
    shutil.copy2(JSON_PATH, backup)
    print(f"[ok] Backup criado: {backup}")

    with open(JSON_PATH, "r", encoding="utf-8") as f:
        articles = json.load(f)

    print(f"[ok] Lidos {len(articles)} artigos de {JSON_PATH}")

    updated = 0
    for article in articles:
        slug = article.get("slug", "")
        if slug in IMG_MAP:
            old_thumb = article.get("thumbnail", "")
            new_thumb = f"/artigos/{CONTEXT_SLUG}/{IMG_MAP[slug]}"
            article["thumbnail"] = new_thumb
            updated += 1
            print(f"  ✅ {slug}")
            print(f"     thumbnail: {old_thumb[:50]}... → {new_thumb}")

    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)

    print(f"\n[ok] {updated} artigos atualizados de {len(IMG_MAP)} esperados")
    if updated != len(IMG_MAP):
        print(f"[aviso] {len(IMG_MAP) - updated} artigos não foram encontrados")
    print(f"[ok] Arquivo salvo: {JSON_PATH}")

if __name__ == "__main__":
    main()
