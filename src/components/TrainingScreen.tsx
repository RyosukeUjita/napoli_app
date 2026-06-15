import { RenderedStep } from "../types";
import { meterBarColor, meterTextColor } from "../utils";

interface Props {
  step: RenderedStep;
  totalSteps: number;
  satisfaction: number;
  isWrong: boolean;
  onAnswer: (index: number) => void;
  onRead: () => void;
}

export default function TrainingScreen({ step, totalSteps, satisfaction, isWrong, onAnswer, onRead }: Props) {
  return (
    <div className="h-dvh bg-slate-900 flex flex-col">

      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex-shrink-0">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Pizza Academy
              </p>
              <p className="text-white font-semibold text-sm mt-0.5">
                Step {step.id} / {totalSteps}：{step.stepName}
              </p>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                step.type === "quiz"
                  ? "bg-blue-950 text-blue-300 border border-blue-800"
                  : "bg-slate-700 text-slate-300 border border-slate-600"
              }`}
            >
              {step.type === "quiz" ? "クイズ" : "復唱"}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-400">お客様満足度</p>
              <p className={`text-xs font-bold tabular-nums ${meterTextColor(satisfaction)}`}>
                {satisfaction}%
              </p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div
                className={`${meterBarColor(satisfaction)} h-1.5 rounded-full transition-all duration-500`}
                style={{ width: `${satisfaction}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="min-h-full flex flex-col">
        <main className="flex-1 px-6 py-8 flex items-center">
          <div className="max-w-2xl w-full mx-auto">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 text-xs font-bold select-none">
                  客
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 mb-2 font-medium">
                    お客様 / マニュアル指示
                  </p>
                  <p className="text-slate-100 text-sm leading-relaxed whitespace-pre-line">
                    {step.customerSpeech}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-slate-800 border-t border-slate-700 px-6 py-5">
        <div className="max-w-2xl mx-auto space-y-3">

          {step.type === "quiz" ? (
            <>
              <p className="text-xs text-slate-400 font-medium">
                適切な応対を選択してください
              </p>

              {isWrong && (
                <div className="bg-red-950/60 border border-red-800/70 rounded-lg px-4 py-2.5">
                  <p className="text-red-400 text-sm font-medium">
                    不適切な応対です。もう一度選択してください。
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-2">
                {step.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => onAnswer(i)}
                    className="text-left bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border border-slate-600 hover:border-slate-500 text-slate-200 text-sm px-4 py-3 rounded-lg transition-colors duration-150"
                  >
                    <span className="text-slate-500 mr-2.5 font-mono text-xs font-semibold">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-slate-400 text-sm">
                マニュアル通りに口頭で復唱・対応できたら「次へ」を押してください。
              </p>
              <button
                onClick={onRead}
                className="w-full bg-slate-700 hover:bg-slate-600 active:bg-slate-500 border border-slate-600 hover:border-slate-500 text-slate-200 font-medium py-3 px-6 rounded-lg transition-colors duration-150"
              >
                復唱しました（次へ）
              </button>
            </>
          )}

        </div>
        </footer>
        </div>
      </div>
    </div>
  );
}
