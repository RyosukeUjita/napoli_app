import { CourseItem } from "../types";

interface Props {
  courseCategories: string[];
  courses: CourseItem[];
  onStart: (course: CourseItem) => void;
}

export default function StartScreen({ courseCategories, courses, onStart }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-10">

        <div className="text-center space-y-2">
          <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
            Pizza Academy
          </p>
          <h1 className="text-3xl font-bold text-white">スタッフ研修システム</h1>
          <p className="text-slate-400 text-sm">
            コンテンツを選択して研修を開始してください
          </p>
        </div>

        {courseCategories.map((category) => (
          <div key={category} className="space-y-3">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase px-1">
              {category}
            </p>
            <div className="space-y-2">
              {courses
                .filter((c) => c.category === category)
                .map((course) =>
                  course.status === "available" ? (
                    <button
                      key={course.id}
                      onClick={() => onStart(course)}
                      className="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg px-5 py-4 transition-colors duration-150 text-left group"
                    >
                      <div className="space-y-0.5">
                        <p className="text-white font-medium text-sm">
                          <span className="text-slate-500 mr-2 font-mono">{course.index}.</span>
                          {course.title}
                        </p>
                        {course.description && (
                          <p className="text-slate-400 text-xs pl-5">{course.description}</p>
                        )}
                      </div>
                      <span className="text-blue-400 text-sm font-medium flex-shrink-0 ml-4 group-hover:translate-x-0.5 transition-transform duration-150">
                        開始 →
                      </span>
                    </button>
                  ) : (
                    <div
                      key={course.id}
                      className="w-full flex items-center justify-between bg-slate-800/40 border border-slate-700/40 rounded-lg px-5 py-4 cursor-not-allowed"
                    >
                      <p className="text-slate-600 font-medium text-sm">
                        <span className="font-mono mr-2">{course.index}.</span>
                        開発中
                      </p>
                      <span className="text-slate-600 text-xs font-medium flex-shrink-0 ml-4">
                        近日公開
                      </span>
                    </div>
                  )
                )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
