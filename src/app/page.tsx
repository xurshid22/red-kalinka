"use client";
import { useState } from "react";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import LessonView from "@/components/lesson/LessonView";
import ProgressBar from "@/components/ui/ProgressBar";
import { BookOpen, CheckCircle, Trophy, Star, Menu, X } from "lucide-react";

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {
    completeStep,
    saveSelfReflection,
    saveExerciseAnswer,
    getLessonProgress,
    getOverallProgress,
  } = useProgress();

  const overallPct = getOverallProgress(lessons.length);
  const currentLesson = selectedLesson !== null ? lessons.find((l) => l.id === selectedLesson) : null;

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } transition-all duration-300 overflow-hidden flex-shrink-0 bg-white border-r border-slate-200 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🌺</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-800 text-sm">Red Kalinka</h1>
              <p className="text-xs text-slate-400">Russian A1</p>
            </div>
          </div>

          {/* Overall progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Overall Progress</span>
              <span className="font-bold text-red-600">{overallPct}%</span>
            </div>
            <ProgressBar value={overallPct} showLabel={false} />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 p-3 border-b border-slate-100">
          <div className="bg-red-50 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-red-600">{lessons.length}</p>
            <p className="text-xs text-slate-500">Lessons</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-green-600">
              {lessons.filter((l) => getLessonProgress(l.id).completedSteps.length === 5).length}
            </p>
            <p className="text-xs text-slate-500">Done</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-2 text-center">
            <p className="text-lg font-bold text-amber-600">{overallPct}%</p>
            <p className="text-xs text-slate-500">Progress</p>
          </div>
        </div>

        {/* Lesson list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {lessons.map((lesson) => {
            const lp = getLessonProgress(lesson.id);
            const isComplete = lp.completedSteps.length === 5;
            const isActive = selectedLesson === lesson.id;
            const pct = Math.round((lp.completedSteps.length / 5) * 100);

            return (
              <button
                key={lesson.id}
                onClick={() => setSelectedLesson(lesson.id)}
                className={`w-full text-left rounded-xl p-3 transition-all group ${
                  isActive
                    ? "bg-red-600 text-white shadow-md"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
                      isActive ? "bg-red-500" : isComplete ? "bg-green-100" : "bg-slate-100"
                    }`}
                  >
                    {isComplete ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      lesson.emoji
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-xs font-semibold ${
                        isActive ? "text-red-100" : "text-slate-400"
                      }`}
                    >
                      {lesson.title}
                    </p>
                    <p
                      className={`text-sm font-medium truncate ${
                        isActive ? "text-white" : "text-slate-700"
                      }`}
                    >
                      {lesson.subtitle}
                    </p>
                    <div className="mt-1">
                      <div
                        className={`w-full h-1 rounded-full ${
                          isActive ? "bg-red-400" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`h-1 rounded-full transition-all ${
                            isActive ? "bg-white" : isComplete ? "bg-green-500" : "bg-red-400"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Trophy size={14} className="text-amber-500" />
            <span>{overallPct}% complete</span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          {currentLesson ? (
            <div className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <LessonView
                lesson={currentLesson}
                progress={getLessonProgress(currentLesson.id)}
                onCompleteStep={(step) => completeStep(currentLesson.id, step)}
                onSaveReflection={(text) => saveSelfReflection(currentLesson.id, text)}
                onSaveAnswer={(id, answer) => saveExerciseAnswer(currentLesson.id, id, answer)}
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-4xl">🌺</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome to Red Kalinka</h2>
              <p className="text-slate-500 mb-2 max-w-sm">
                An interactive Russian A1 course based on the Red Kalinka textbook.
              </p>
              <p className="text-slate-400 text-sm mb-8 max-w-sm">
                10 lessons • Vocabulary flashcards • Grammar tables • Interactive exercises
              </p>

              {/* Bento grid preview */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg w-full mb-8">
                {[
                  { icon: "📚", label: "Vocabulary", color: "bg-blue-50 text-blue-700" },
                  { icon: "💬", label: "Dialogues", color: "bg-pink-50 text-pink-700" },
                  { icon: "📖", label: "Grammar", color: "bg-purple-50 text-purple-700" },
                  { icon: "✏️", label: "Practice", color: "bg-green-50 text-green-700" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`${item.color} rounded-xl p-3 text-center`}
                  >
                    <div className="text-2xl mb-1">{item.icon}</div>
                    <p className="text-xs font-semibold">{item.label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedLesson(1)}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition-all"
              >
                Start with Lesson 1 →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
