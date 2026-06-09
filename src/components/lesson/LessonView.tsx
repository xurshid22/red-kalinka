"use client";
import { useState } from "react";
import { Lesson, LessonProgress } from "@/types";
import VocabStep from "./VocabStep";
import DialogueStep from "./DialogueStep";
import GrammarStep from "./GrammarStep";
import ExerciseStep from "./ExerciseStep";
import SelfReflectionStep from "./SelfReflectionStep";
import ProgressBar from "../ui/ProgressBar";
import { ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";

interface Props {
  lesson: Lesson;
  progress: LessonProgress;
  onCompleteStep: (step: number) => void;
  onSaveReflection: (text: string) => void;
  onSaveAnswer: (exerciseId: string, answer: string) => void;
}

const STEPS = [
  { id: 0, label: "Vocabulary", icon: "📚" },
  { id: 1, label: "Dialogues", icon: "💬" },
  { id: 2, label: "Grammar", icon: "📖" },
  { id: 3, label: "Practice", icon: "✏️" },
  { id: 4, label: "О себе", icon: "📝" },
];

export default function LessonView({
  lesson,
  progress,
  onCompleteStep,
  onSaveReflection,
  onSaveAnswer,
}: Props) {
  const [activeStep, setActiveStep] = useState(0);

  const goNext = () => {
    onCompleteStep(activeStep);
    if (activeStep < STEPS.length - 1) setActiveStep((s) => s + 1);
  };
  const goPrev = () => {
    if (activeStep > 0) setActiveStep((s) => s - 1);
  };

  const lessonProgress = (progress.completedSteps.length / STEPS.length) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Lesson header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-200 text-xs font-medium">{lesson.title}</p>
            <h2 className="text-xl font-bold">
              {lesson.emoji} {lesson.subtitle}
            </h2>
          </div>
          <div className="text-right">
            <p className="text-red-200 text-xs">Lesson progress</p>
            <p className="text-2xl font-bold">{Math.round(lessonProgress)}%</p>
          </div>
        </div>
        <ProgressBar
          value={progress.completedSteps.length}
          max={STEPS.length}
          showLabel={false}
          color="bg-white"
          className="mt-2"
        />
      </div>

      {/* Step tabs */}
      <div className="flex bg-white border-b border-slate-200 overflow-x-auto scrollbar-hide">
        {STEPS.map((step) => {
          const isCompleted = progress.completedSteps.includes(step.id);
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? "border-red-500 text-red-600 bg-red-50"
                  : isCompleted
                  ? "border-green-400 text-green-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {isCompleted && !isActive ? (
                <CheckCircle size={12} className="text-green-500" />
              ) : (
                <span>{step.icon}</span>
              )}
              {step.label}
            </button>
          );
        })}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeStep === 0 && <VocabStep vocab={lesson.vocab} />}
        {activeStep === 1 && <DialogueStep dialogues={lesson.dialogues} />}
        {activeStep === 2 && <GrammarStep grammar={lesson.grammar} />}
        {activeStep === 3 && (
          <ExerciseStep
            exercises={lesson.exercises}
            savedAnswers={progress.exerciseAnswers}
            onAnswer={(id, answer) => onSaveAnswer(id, answer)}
          />
        )}
        {activeStep === 4 && (
          <SelfReflectionStep
            prompt={lesson.selfReflectionPrompt}
            saved={progress.selfReflection}
            onSave={onSaveReflection}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-slate-200 rounded-b-2xl">
        <button
          onClick={goPrev}
          disabled={activeStep === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
        >
          <ChevronLeft size={16} /> Previous
        </button>
        <span className="text-xs text-slate-400">
          Step {activeStep + 1} of {STEPS.length}
        </span>
        <button
          onClick={goNext}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all"
        >
          {activeStep === STEPS.length - 1 ? "Complete ✓" : "Next"}
          {activeStep < STEPS.length - 1 && <ChevronRight size={16} />}
        </button>
      </div>
    </div>
  );
}
