"use client";
import { useState } from "react";
import { Exercise } from "@/types";
import { CheckCircle, XCircle, Lightbulb, RefreshCw } from "lucide-react";

interface Props {
  exercises: Exercise[];
  savedAnswers: Record<string, string>;
  onAnswer: (id: string, answer: string) => void;
}

export default function ExerciseStep({ exercises, savedAnswers, onAnswer }: Props) {
  const [checked, setChecked] = useState(false);
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  const handleCheck = () => setChecked(true);
  const handleReset = () => {
    setChecked(false);
    exercises.forEach((e) => onAnswer(e.id, ""));
  };

  const isCorrect = (ex: Exercise) => {
    const userAnswer = (savedAnswers[ex.id] || "").trim().toLowerCase();
    const correct = Array.isArray(ex.answer)
      ? ex.answer.map((a) => a.toLowerCase())
      : [ex.answer.toLowerCase()];
    return correct.includes(userAnswer);
  };

  const score = exercises.filter((e) => isCorrect(e)).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-700">✏️ Упражнения — {exercises.length} exercises</h3>
        {checked && (
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${
                score === exercises.length
                  ? "bg-green-100 text-green-700"
                  : score >= exercises.length / 2
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {score}/{exercises.length} correct
            </span>
            <button
              onClick={handleReset}
              className="text-slate-500 hover:text-slate-700 flex items-center gap-1 text-xs"
            >
              <RefreshCw size={12} /> Reset
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {exercises.map((ex, i) => {
          const userAnswer = savedAnswers[ex.id] || "";
          const correct = isCorrect(ex);

          return (
            <div
              key={ex.id}
              className={`rounded-xl border-2 p-4 transition-all ${
                checked
                  ? correct
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                  : "border-slate-200 bg-white hover:border-red-200"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium text-slate-800">{ex.question}</p>
                  </div>

                  {ex.type === "fill" || ex.type === "translate" ? (
                    ex.options ? (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ex.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => !checked && onAnswer(ex.id, opt)}
                            disabled={checked}
                            className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all font-medium ${
                              userAnswer === opt
                                ? checked
                                  ? correct
                                    ? "bg-green-500 text-white border-green-500"
                                    : "bg-red-500 text-white border-red-500"
                                  : "bg-red-500 text-white border-red-500"
                                : "bg-white text-slate-700 border-slate-200 hover:border-red-300"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => !checked && onAnswer(ex.id, e.target.value)}
                        disabled={checked}
                        placeholder="Type your answer..."
                        className={`w-full mt-2 px-3 py-2 rounded-lg border-2 text-sm outline-none transition-all ${
                          checked
                            ? correct
                              ? "border-green-400 bg-green-50 text-green-800"
                              : "border-red-400 bg-red-50 text-red-800"
                            : "border-slate-200 focus:border-red-400 bg-white"
                        }`}
                      />
                    )
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {ex.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => !checked && onAnswer(ex.id, opt)}
                          disabled={checked}
                          className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all font-medium ${
                            userAnswer === opt
                              ? checked
                                ? correct
                                  ? "bg-green-500 text-white border-green-500"
                                  : "bg-red-500 text-white border-red-500"
                                : "bg-red-500 text-white border-red-500"
                              : "bg-white text-slate-700 border-slate-200 hover:border-red-300"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0">
                  {checked ? (
                    correct ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : (
                      <XCircle className="text-red-500" size={20} />
                    )
                  ) : (
                    ex.hint && (
                      <button
                        onClick={() => setShowHints((p) => ({ ...p, [ex.id]: !p[ex.id] }))}
                        className="text-amber-500 hover:text-amber-600"
                        title="Show hint"
                      >
                        <Lightbulb size={18} />
                      </button>
                    )
                  )}
                </div>
              </div>

              {showHints[ex.id] && ex.hint && !checked && (
                <p className="mt-2 text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  💡 {ex.hint}
                </p>
              )}

              {checked && !correct && (
                <p className="mt-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                  ✅ Correct answer:{" "}
                  <strong>{Array.isArray(ex.answer) ? ex.answer.join(", ") : ex.answer}</strong>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!checked && (
        <button
          onClick={handleCheck}
          disabled={exercises.some((e) => !savedAnswers[e.id])}
          className="mt-6 w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-all text-sm"
        >
          Check Answers
        </button>
      )}

      {checked && score === exercises.length && (
        <div className="mt-4 text-center p-4 bg-green-50 rounded-xl border border-green-200">
          <p className="text-2xl">🎉</p>
          <p className="font-semibold text-green-700 mt-1">Perfect score! Отлично!</p>
        </div>
      )}
    </div>
  );
}
