import { QuizStep, RenderedStep } from "./types";

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildRenderedStep(step: QuizStep): RenderedStep {
  if (step.type !== "quiz") {
    return { ...step, options: [], correctIndex: 0 };
  }
  const wrong = shuffleArray(step.wrongPool).slice(0, 3);
  const options = shuffleArray([...wrong, step.correctAnswer]);
  return { ...step, options, correctIndex: options.indexOf(step.correctAnswer) };
}

export function meterBarColor(pct: number): string {
  if (pct >= 50) return "bg-blue-500";
  if (pct >= 20) return "bg-amber-500";
  return "bg-red-500";
}

export function meterTextColor(pct: number): string {
  if (pct >= 50) return "text-blue-400";
  if (pct >= 20) return "text-amber-400";
  return "text-red-400";
}
