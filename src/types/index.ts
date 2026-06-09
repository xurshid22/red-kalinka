export interface VocabWord {
  russian: string;
  uzbek: string;
  english: string;
  example?: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

export interface GrammarTable {
  title: string;
  headers: string[];
  rows: string[][];
  note?: string;
}

export interface Exercise {
  id: string;
  type: "fill" | "choice" | "match" | "translate";
  question: string;
  options?: string[];
  answer: string | string[];
  hint?: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
  vocab: VocabWord[];
  dialogues: { title: string; lines: DialogueLine[] }[];
  grammar: GrammarTable[];
  exercises: Exercise[];
  selfReflectionPrompt: string;
}

export interface LessonProgress {
  lessonId: number;
  completedSteps: number[];
  selfReflection: string;
  exerciseAnswers: Record<string, string>;
}
