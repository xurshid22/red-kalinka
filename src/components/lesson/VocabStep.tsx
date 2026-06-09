"use client";
import { useState } from "react";
import { VocabWord } from "@/types";
import { RotateCcw, Eye, EyeOff } from "lucide-react";

interface Props {
  vocab: VocabWord[];
}

export default function VocabStep({ vocab }: Props) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const toggleFlip = (i: number) => setFlipped((p) => ({ ...p, [i]: !p[i] }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-700">
          📚 Новые слова — {vocab.length} words
        </h3>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
        >
          {showAll ? <EyeOff size={14} /> : <Eye size={14} />}
          {showAll ? "Flashcard mode" : "Table mode"}
        </button>
      </div>

      {showAll ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-red-50 border-b border-red-100">
                <th className="text-left py-2 px-4 font-semibold text-red-700">Русский</th>
                <th className="text-left py-2 px-4 font-semibold text-slate-600">O'zbek</th>
                <th className="text-left py-2 px-4 font-semibold text-slate-500">English</th>
              </tr>
            </thead>
            <tbody>
              {vocab.map((w, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-4 font-semibold text-slate-800">{w.russian}</td>
                  <td className="py-2 px-4 text-emerald-700">{w.uzbek}</td>
                  <td className="py-2 px-4 text-slate-500">{w.english}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {vocab.map((w, i) => (
            <div
              key={i}
              onClick={() => toggleFlip(i)}
              className="relative h-24 cursor-pointer rounded-xl border-2 border-slate-200 hover:border-red-300 transition-all duration-300 select-none"
            >
              <div
                className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                  flipped[i] ? "opacity-0 scale-95" : "opacity-100 scale-100"
                } bg-white`}
              >
                <span className="text-lg font-bold text-slate-800 text-center">{w.russian}</span>
                <RotateCcw size={12} className="text-slate-400 mt-1" />
              </div>
              <div
                className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                  flipped[i] ? "opacity-100 scale-100" : "opacity-0 scale-95"
                } bg-red-50`}
              >
                <span className="text-sm font-semibold text-emerald-700 text-center">{w.uzbek}</span>
                <span className="text-xs text-slate-500 text-center mt-1">{w.english}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-slate-400 mt-3 text-center">
        {showAll ? "Click table mode to use flashcards" : "Click a card to flip it"}
      </p>
    </div>
  );
}
