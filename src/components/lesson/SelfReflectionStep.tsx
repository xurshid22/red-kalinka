"use client";
import { useState, useEffect } from "react";
import { Save, CheckCircle } from "lucide-react";

interface Props {
  prompt: string;
  saved: string;
  onSave: (text: string) => void;
}

export default function SelfReflectionStep({ prompt, saved, onSave }: Props) {
  const [text, setText] = useState(saved);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setText(saved);
  }, [saved]);

  const handleSave = () => {
    onSave(text);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div>
      <h3 className="font-semibold text-slate-700 mb-2">📝 О себе — Write about yourself</h3>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
        <p className="text-sm text-amber-800 font-medium">💬 Prompt:</p>
        <p className="text-sm text-amber-900 mt-1">{prompt}</p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Напишите здесь... (Write here in Russian)"
        rows={8}
        className="w-full border-2 border-slate-200 focus:border-red-400 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none bg-white"
      />

      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-slate-400">{text.length} characters</p>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            justSaved
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-600 hover:bg-red-700 text-white disabled:bg-slate-300"
          }`}
        >
          {justSaved ? (
            <>
              <CheckCircle size={14} /> Saved!
            </>
          ) : (
            <>
              <Save size={14} /> Save
            </>
          )}
        </button>
      </div>

      {saved && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
          <p className="text-xs text-green-600 font-semibold mb-1">✅ Saved response:</p>
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{saved}</p>
        </div>
      )}
    </div>
  );
}
