export interface CustomerData {
  name: string;
  phone: string;
  address1: string;
  address2: string;
}

export interface QuizStep {
  id: number;
  stepName: string;
  type: "quiz" | "read";
  customerSpeech: string;
  correctAnswer: string;
  wrongPool: string[];
  penalty: number;
}

export interface RenderedStep extends QuizStep {
  options: string[];
  correctIndex: number;
}

export interface CourseItem {
  id: string;
  category: string;
  index: number;
  title: string;
  description: string;
  status: "available" | "coming_soon";
  scenarioFn: ((customer: CustomerData) => QuizStep[]) | null;
}
