import { useState, useCallback } from "react";
import { CourseItem, RenderedStep } from "./types";
import { customerCandidates } from "./data/customers";
import { courses, courseCategories } from "./data/courses";
import { pickRandom, buildRenderedStep } from "./utils";
import StartScreen from "./components/StartScreen";
import TrainingScreen from "./components/TrainingScreen";
import ResultScreen from "./components/ResultScreen";

type Phase = "start" | "training" | "result";

export default function App() {
  const [phase, setPhase]                       = useState<Phase>("start");
  const [currentCourse, setCurrentCourse]       = useState<CourseItem | null>(null);
  const [steps, setSteps]                       = useState<RenderedStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [satisfaction, setSatisfaction]         = useState(100);
  const [isWrong, setIsWrong]                   = useState(false);

  const initTraining = useCallback((course: CourseItem) => {
    if (!course.scenarioFn) return;
    const picked = pickRandom(customerCandidates);
    setCurrentCourse(course);
    setSteps(course.scenarioFn(picked).map(buildRenderedStep));
    setCurrentStepIndex(0);
    setSatisfaction(100);
    setIsWrong(false);
    setPhase("training");
  }, []);

  const handleAnswer = (index: number) => {
    const step = steps[currentStepIndex];
    if (index === step.correctIndex) {
      setIsWrong(false);
      if (currentStepIndex === steps.length - 1) {
        setPhase("result");
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    } else {
      const next = Math.max(0, satisfaction - step.penalty);
      setSatisfaction(next);
      setIsWrong(true);
      if (next === 0) setPhase("result");
    }
  };

  const handleRead = () => {
    setIsWrong(false);
    if (currentStepIndex === steps.length - 1) {
      setPhase("result");
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  if (phase === "start") {
    return (
      <StartScreen
        courseCategories={courseCategories}
        courses={courses}
        onStart={initTraining}
      />
    );
  }

  if (phase === "result") {
    return (
      <ResultScreen
        satisfaction={satisfaction}
        allClear={currentStepIndex === steps.length - 1}
        onRetry={() => currentCourse && initTraining(currentCourse)}
        onHome={() => setPhase("start")}
      />
    );
  }

  return (
    <TrainingScreen
      step={steps[currentStepIndex]}
      totalSteps={steps.length}
      satisfaction={satisfaction}
      isWrong={isWrong}
      onAnswer={handleAnswer}
      onRead={handleRead}
    />
  );
}
