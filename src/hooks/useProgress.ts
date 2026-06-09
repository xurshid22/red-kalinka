"use client";
import { useState, useEffect } from "react";
import { LessonProgress } from "@/types";

const STORAGE_KEY = "red-kalinka-progress";

export function useProgress() {
  const [progress, setProgress] = useState<Record<number, LessonProgress>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const saveProgress = (newProgress: Record<number, LessonProgress>) => {
    setProgress(newProgress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  };

  const completeStep = (lessonId: number, step: number) => {
    const current = progress[lessonId] || {
      lessonId,
      completedSteps: [],
      selfReflection: "",
      exerciseAnswers: {},
    };
    if (!current.completedSteps.includes(step)) {
      const updated = {
        ...progress,
        [lessonId]: { ...current, completedSteps: [...current.completedSteps, step] },
      };
      saveProgress(updated);
    }
  };

  const saveSelfReflection = (lessonId: number, text: string) => {
    const current = progress[lessonId] || {
      lessonId,
      completedSteps: [],
      selfReflection: "",
      exerciseAnswers: {},
    };
    const updated = { ...progress, [lessonId]: { ...current, selfReflection: text } };
    saveProgress(updated);
  };

  const saveExerciseAnswer = (lessonId: number, exerciseId: string, answer: string) => {
    const current = progress[lessonId] || {
      lessonId,
      completedSteps: [],
      selfReflection: "",
      exerciseAnswers: {},
    };
    const updated = {
      ...progress,
      [lessonId]: {
        ...current,
        exerciseAnswers: { ...current.exerciseAnswers, [exerciseId]: answer },
      },
    };
    saveProgress(updated);
  };

  const getLessonProgress = (lessonId: number): LessonProgress => {
    return (
      progress[lessonId] || {
        lessonId,
        completedSteps: [],
        selfReflection: "",
        exerciseAnswers: {},
      }
    );
  };

  const getOverallProgress = (totalLessons: number): number => {
    const totalSteps = totalLessons * 5;
    const completedSteps = Object.values(progress).reduce(
      (acc, p) => acc + p.completedSteps.length,
      0
    );
    return Math.round((completedSteps / totalSteps) * 100);
  };

  return {
    progress,
    completeStep,
    saveSelfReflection,
    saveExerciseAnswer,
    getLessonProgress,
    getOverallProgress,
  };
}
