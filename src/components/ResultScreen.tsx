import { meterBarColor, meterTextColor } from "../utils";

interface Props {
  satisfaction: number;
  allClear: boolean;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultScreen({ satisfaction, allClear, onRetry, onHome }: Props) {
  return (
    <div className="min-h-dvh bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
            Pizza Academy
          </p>
          <h1 className="text-3xl font-bold text-white">研修修了</h1>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 space-y-6 text-center">
          <p className="text-slate-400 text-sm">最終スコア — お客様満足度</p>
          <p className={`text-7xl font-bold tabular-nums ${meterTextColor(satisfaction)}`}>
            {satisfaction}
            <span className="text-4xl ml-1">%</span>
          </p>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`${meterBarColor(satisfaction)} h-2 rounded-full transition-all duration-700`}
              style={{ width: `${satisfaction}%` }}
            />
          </div>
          <p className="text-slate-400 text-sm">
            {allClear
              ? "お疲れ様でした。全ステップを完了しました。"
              : "お客様満足度が 0% になりました。もう一度挑戦してみましょう。"}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRetry}
            className="w-full bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white font-semibold py-3.5 px-6 rounded-lg transition-colors duration-150"
          >
            もう一度受講する
          </button>
          <button
            onClick={onHome}
            className="w-full bg-transparent hover:bg-slate-800 active:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 font-medium py-3.5 px-6 rounded-lg transition-colors duration-150"
          >
            ホームへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}
