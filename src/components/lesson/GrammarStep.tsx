"use client";
import { GrammarTable } from "@/types";

interface Props {
  grammar: GrammarTable[];
}

const headerColors = [
  "bg-red-600 text-white",
  "bg-slate-700 text-white",
  "bg-emerald-600 text-white",
  "bg-indigo-600 text-white",
  "bg-amber-600 text-white",
];

export default function GrammarStep({ grammar }: Props) {
  return (
    <div className="space-y-6">
      {grammar.map((table, ti) => (
        <div key={ti} className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-3">
            <h3 className="font-semibold text-white text-sm">{table.title}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {table.headers.map((h, hi) => (
                    <th
                      key={hi}
                      className="text-left py-2 px-3 font-semibold text-slate-600 text-xs whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, ri) => (
                  <tr key={ri} className={`border-b border-slate-100 ${ri % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`py-2 px-3 ${
                          ci === 0
                            ? "font-bold text-red-700"
                            : ci === 1
                            ? "font-semibold text-slate-800"
                            : "text-slate-500"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {table.note && (
            <div className="bg-amber-50 border-t border-amber-100 px-4 py-2">
              <p className="text-xs text-amber-800">
                <span className="font-semibold">📌 Note:</span> {table.note}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
