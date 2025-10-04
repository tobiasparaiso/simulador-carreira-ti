"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const questions = [
  {
    question: "Você prefere trabalhar com interfaces visuais ou lógica de sistemas?",
    options: [
      "Interfaces visuais e design",
      "Lógica, regras de negócio e estruturas de código",
      "Nenhum dos dois me atrai muito",
    ],
  },
  {
    question: "Você gosta mais de criar soluções novas ou melhorar sistemas existentes?",
    options: [
      "Criar novas soluções e funcionalidades",
      "Melhorar estabilidade, segurança e performance",
      "Gosto dos dois igualmente",
    ],
  },
  {
    question: "Você se sente mais confortável com qual dessas atividades?",
    options: [
      "Organizar fluxos, automatizar tarefas e integrar sistemas",
      "Analisar dados, gerar relatórios e tomar decisões baseadas em evidência",
      "Testar sistemas, identificar erros e garantir qualidade",
      "Liderar equipes, organizar prazos e lidar com pessoas",
    ],
  },
  {
    question: "Como você lida com ambientes dinâmicos e pressão?",
    options: [
      "Me adapto bem e gosto de desafios constantes",
      "Prefiro ambientes mais estruturados e previsíveis",
      "Consigo me adaptar, mas prefiro equilíbrio",
    ],
  },
  {
    question: "Com qual dessas afirmações você mais se identifica?",
    options: [
      "Quero ver o resultado do meu trabalho funcionando visualmente",
      "Gosto de entender como tudo funciona por trás",
      "Quero entregar estabilidade, segurança e automação",
      "Prefiro trabalhar com dados e inteligência",
      "Gosto de organizar times e processos",
    ],
  },
];

const resultsMap: Record<string, string[]> = {
  frontend: [
    "Interfaces visuais e design",
    "Quero ver o resultado do meu trabalho funcionando visualmente",
  ],
  backend: [
    "Lógica, regras de negócio e estruturas de código",
    "Gosto de entender como tudo funciona por trás",
  ],
  devops: [
    "Organizar fluxos, automatizar tarefas e integrar sistemas",
    "Quero entregar estabilidade, segurança e automação",
  ],
  dados: [
    "Analisar dados, gerar relatórios e tomar decisões baseadas em evidência",
    "Prefiro trabalhar com dados e inteligência",
  ],
  qa: [
    "Testar sistemas, identificar erros e garantir qualidade",
  ],
  cyber: [
    "Melhorar estabilidade, segurança e performance",
    "Proteger sistemas",
  ],
  project: [
    "Liderar equipes, organizar prazos e lidar com pessoas",
    "Gosto de organizar times e processos",
  ],
};

export default function SimuladorCarreiraTI() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleAnswer = (answer: string) => {
    const updated = [...answers, answer];
    setAnswers(updated);
    if (step + 1 === questions.length) {
      setShowForm(false);
    } else {
      setStep(step + 1);
    }
  };

  const calculateResult = () => {
    const scores: Record<string, number> = {};
    for (const area in resultsMap) {
      scores[area] = 0;
      for (const keyword of resultsMap[area]) {
        scores[area] += answers.filter((a) => a.includes(keyword)).length;
      }
    }

    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const [topResult, topScore] = sorted[0];

    // Se todos os scores forem 0, mostrar uma área mais genérica
    const fallback = "backend";
    const final = topScore > 0 ? topResult : fallback;

    setResult(final);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-4xl">
        {showForm && (
          <Card className="border border-gray-200 shadow-sm rounded-xl">
            <CardContent className="py-16 px-16 space-y-14">
              <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
                {questions[step].question}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {questions[step].options.map((opt, i) => (
                  <Button
                    key={i}
                    onClick={() => handleAnswer(opt)}
                    variant="outline"
                    className="w-full py-5 text-lg font-medium text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 rounded-lg transition"
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!showForm && !result && (
          <Card className="border border-gray-200 shadow-sm rounded-xl">
            <CardContent className="py-16 px-16 space-y-10">
              <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
                Quase lá! Informe seu e-mail para ver o resultado:
              </h2>
              <Input
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              />
              <Button
                onClick={calculateResult}
                disabled={!email}
                className="w-full py-5 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Ver meu resultado
              </Button>
            </CardContent>
          </Card>
        )}

        {result && (
          <Card className="border border-gray-200 shadow-md rounded-xl">
            <CardContent className="py-16 px-16 space-y-12">
              <div>
                <span className="inline-block bg-indigo-100 text-indigo-700 font-semibold uppercase text-sm tracking-widest px-4 py-1 rounded-full select-none">
                  Resultado sugerido
                </span>
                <h2 className="mt-6 text-5xl font-extrabold text-gray-900 leading-tight select-text">
                  {result.toUpperCase()}
                </h2>
              </div>
              <p className="text-gray-700 text-lg max-w-xl leading-relaxed">
                Com base nas suas respostas, essa área pode ser ideal para você.
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-600 font-medium text-lg max-w-md">
                <li>Estude os fundamentos da área</li>
                <li>Monte um portfólio com projetos simples</li>
                <li>Trabalhe seu LinkedIn e posicionamento</li>
              </ul>
              <div>
                <Button className="w-full py-5 text-lg font-semibold text-indigo-700 bg-indigo-100 rounded-lg shadow hover:bg-indigo-200 transition">
                  <a
                    href="https://link-da-sua-mentoria.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    Quero ajuda com um plano completo 🚀
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}