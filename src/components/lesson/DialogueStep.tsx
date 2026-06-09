"use client";

interface DialogueLine {
  speaker: string;
  text: string;
}

interface Props {
  dialogues: { title: string; lines: DialogueLine[] }[];
}

const speakerColors: Record<string, string> = {
  Антон: "bg-blue-100 text-blue-800",
  Наташа: "bg-pink-100 text-pink-800",
  Виктор: "bg-purple-100 text-purple-800",
  Мария: "bg-rose-100 text-rose-800",
  Иван: "bg-indigo-100 text-indigo-800",
  Профессор: "bg-amber-100 text-amber-800",
  Студент: "bg-green-100 text-green-800",
  Официант: "bg-orange-100 text-orange-800",
  Покупатель: "bg-teal-100 text-teal-800",
  Продавец: "bg-cyan-100 text-cyan-800",
  Турист: "bg-lime-100 text-lime-800",
  Прохожий: "bg-slate-100 text-slate-800",
};

function getColor(speaker: string) {
  return speakerColors[speaker] || "bg-slate-100 text-slate-700";
}

function getAvatar(speaker: string) {
  return speaker.charAt(0).toUpperCase();
}

export default function DialogueStep({ dialogues }: Props) {
  return (
    <div className="space-y-6">
      {dialogues.map((dialogue, di) => (
        <div key={di}>
          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <span className="text-lg">💬</span> {dialogue.title}
          </h3>
          <div className="space-y-2 bg-white rounded-xl border border-slate-200 p-4">
            {dialogue.lines.map((line, li) => {
              const colorClass = getColor(line.speaker);
              return (
                <div key={li} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colorClass}`}
                  >
                    {getAvatar(line.speaker)}
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
                      {line.speaker}
                    </span>
                    <p className="text-slate-800 mt-1 text-sm leading-relaxed">{line.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
