import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Sobre",
  description:
    "Conheça minha trajetória e método — psicoterapia de orientação junguiana e psicosíntese, com mais de 30 anos de prática clínica, escuta ativa e recursos de terapias integrativas.",
};

export default function SobrePage() {
  return (
    <div className="flex flex-col">
      {/* Hero com céu estrelado */}
      <PageHero>
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
            <div className="relative">
              <div className="relative w-full max-w-xs mx-auto">
                {/* Foto circular com fundo transparente — sem moldura extra, a própria foto já tem acabamento */}
                <div className="relative aspect-square w-full flex items-center justify-center">
                  <Image
                    src="/celia-sobre.png"
                    alt="Célia Lima"
                    width={400}
                    height={400}
                    className="object-contain"
                    sizes="(max-width: 768px) 80vw, 30vw"
                    priority
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">
                Sobre
              </p>
              <h1
                className="text-4xl md:text-5xl text-foreground leading-[1.1] mb-8"
                style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
              >
                Célia Lima
                <span className="block italic text-accent mt-1">Psicoterapeuta</span>
              </h1>
              <div className="space-y-5 text-base md:text-lg text-foreground/85 leading-relaxed">
                <p>
                  Sou psicoterapeuta com mais de 30 anos de prática clínica.
                  Acompanho pessoas em seus processos emocionais com uma escuta
                  atenta e direta, sem jargão técnico, e com profundo respeito
                  pelo ritmo próprio de cada um.
                </p>
                <p>
                  Trabalho com psicoterapia de orientação junguiana e psicosíntese,
                  terapias integrativas (imaginação ativa, respiração, florais
                  vibracionais) e uma escuta que integra razão e emoção. Quando eu
                  te escuto, você se escuta. São as perguntas certas que conduzem
                  você às suas respostas, a esse encontro com quem você
                  verdadeiramente é. E é nessa jornada que você vai ver sua vida
                  se transformar, ganhar leveza e segurança se assim você desejar.
                </p>
                <p>
                  Meus artigos condensam vários temas da vida e estão reunidos
                  também no livro{" "}
                  <em className="text-accent not-italic font-medium">Caminhos do Autoconhecimento</em>.
                  É uma leitura que pode ser um despertador para situações que
                  estejam adormecidas dentro de você, mas que exigem um olhar mais
                  atento e resolutivo. Falar de amor, sobre família, saúde,
                  trabalho, espiritualidade, luto... talvez em algum lugar desses
                  estejam suas angústias prontas para serem dissolvidas nesse
                  trabalho conjunto e acolhedor que podemos iniciar quando você
                  desejar.
                </p>
                <p>
                  Mas se você desejar apenas um canto de encontro para trocar
                  ideias, para aprender e ensinar, para reativar sua criatividade
                  e exercitar seu senso de humor, esta pode ser também uma
                  escolha valiosa.
                </p>
              </div>
            </div>
          </div>
      </PageHero>

      {/* Método */}
      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20 md:py-24">
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">
            Abordagem
          </p>
          <h2
            className="text-3xl md:text-4xl text-foreground mb-12"
            style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
          >
            Como atuo.
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl text-primary mb-3" style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 600 }}>
                Escuta
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Antes de qualquer técnica, a escuta. O espaço onde você pode
                falar sem medo de julgamento, e onde o silêncio também é
                palavra. Aquilo que ainda não consegue ser dito pode ser
                o mais significativo.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-primary mb-3" style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 600 }}>
                Símbolos e sonhos
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                O inconsciente fala por imagens, não por palavras. Um sonho,
                um sintoma do corpo, uma frase que escapa — tudo isso é
                linguagem. A terapia caminha também por essa linguagem.
              </p>
            </div>
            <div>
              <h3 className="text-xl text-primary mb-3" style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 600 }}>
                Integrativo
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Florais, respiração colorida, imaginação ativa: recursos
                que conversam com o corpo quando só a palavra não dá conta.
                São ferramentas complementares ao trabalho terapêutico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <h2
              className="text-3xl md:text-4xl mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-fraunces)', fontWeight: 500 }}
            >
              Quer conversar comigo?
            </h2>
            <p className="text-primary-foreground/90 leading-relaxed mb-7">
              A primeira conversa é sem custo e sem compromisso. É um
              momento para você sentir se faz sentido seguir, e para eu
              entender o que você está procurando.
            </p>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground text-primary rounded-full text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
            >
              <MessageCircle size={16} />
              Agendar conversa inicial
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

