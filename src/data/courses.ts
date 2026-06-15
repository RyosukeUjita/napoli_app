import { CourseItem } from "../types";
import { getDynamicScenario } from "./scenarios";

export const courses: CourseItem[] = [
  {
    id: "phone-1",
    category: "電話接客",
    index: 1,
    title: "受付〜住所確認",
    description: "挨拶・電話番号・名前・住所の聞き取りまでの基本フロー（全8ステップ）",
    status: "available",
    scenarioFn: getDynamicScenario,
  },
  {
    id: "phone-2",
    category: "電話接客",
    index: 2,
    title: "",
    description: "",
    status: "coming_soon",
    scenarioFn: null,
  },
  {
    id: "delivery-1",
    category: "デリバリー接客",
    index: 1,
    title: "",
    description: "",
    status: "coming_soon",
    scenarioFn: null,
  },
  {
    id: "delivery-2",
    category: "デリバリー接客",
    index: 2,
    title: "",
    description: "",
    status: "coming_soon",
    scenarioFn: null,
  },
];

export const courseCategories = [...new Set(courses.map((c) => c.category))];
