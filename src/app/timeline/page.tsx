"use client";

import { useState, useMemo } from "react";
import PlateVisual from "@/components/PlateVisual";
import { getAllPlates, getSequentialPlates, formatDate } from "@/lib/plates";

export default function TimelinePage() {
  const allPlates = useMemo(() => getSequentialPlates(), []);
  const [filter, setFilter] = useState<string>("all");

  const firstLetters = useMemo(() => {
    const letters = new Set<string>();
    allPlates.forEach((p) => letters.add(p.plate[0]));
    return Array.from(letters).sort();
  }, [allPlates]);

  const filtered = useMemo(() => {
    if (filter === "all") return allPlates;
    return allPlates.filter((p) => p.plate[0] === filter);
  }, [allPlates, filter]);

  // Group by year for visual separation
  const groupedByYear = useMemo(() => {
    const groups: Record<number, typeof filtered> = {};
    filtered.forEach((entry) => {
      const year = entry.date.getFullYear();
      if (!groups[year]) groups[year] = [];
      groups[year].push(entry);
    });
    return groups;
  }, [filtered]);

  const years = Object.keys(groupedByYear)
    .map(Number)
    .sort((a, b) => a - b);

  // Calculate the total time range for positioning
  const minTime = allPlates[0]?.date.getTime() ?? 0;
  const maxTime = allPlates[allPlates.length - 1]?.date.getTime() ?? 1;
  const totalRange = maxTime - minTime;

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          Plate Timeline
        </h1>
        <p className="text-gray-600 mb-8">
          Tracking {allPlates.length} known plate-to-date mappings from AAA (April 2001) to RMM (February 2026).
        </p>

        {/* Visual progress bar */}
        <div className="mb-10">
          <div className="relative h-12 bg-blue-50 rounded-lg overflow-hidden border border-blue-200">
            {firstLetters.map((letter, idx) => {
              const letterPlates = allPlates.filter((p) => p.plate[0] === letter);
              const start = ((letterPlates[0].date.getTime() - minTime) / totalRange) * 100;
              const end = ((letterPlates[letterPlates.length - 1].date.getTime() - minTime) / totalRange) * 100;
              const width = Math.max(end - start, 1.5);
              const colors = [
                "bg-blue-300", "bg-blue-400", "bg-blue-500", "bg-blue-600",
                "bg-blue-700", "bg-blue-800", "bg-blue-300", "bg-blue-400",
                "bg-blue-500", "bg-blue-600", "bg-blue-700", "bg-blue-800",
                "bg-blue-300", "bg-blue-400", "bg-blue-500", "bg-blue-600",
                "bg-blue-700", "bg-blue-800",
              ];
              return (
                <button
                  key={letter}
                  onClick={() => setFilter(filter === letter ? "all" : letter)}
                  className={`absolute top-0 h-full flex items-center justify-center text-xs font-bold text-white hover:opacity-80 transition-opacity ${
                    colors[idx % colors.length]
                  } ${filter === letter ? "ring-2 ring-white ring-offset-1 z-10" : ""}`}
                  style={{ left: `${start}%`, width: `${width}%` }}
                  title={`${letter}: ${formatDate(letterPlates[0].date)} - ${formatDate(letterPlates[letterPlates.length - 1].date)}`}
                >
                  {width > 3 ? letter : ""}
                </button>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2001</span>
            <span>2026</span>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-700 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            All ({allPlates.length})
          </button>
          {firstLetters.map((letter) => {
            const count = allPlates.filter((p) => p.plate[0] === letter).length;
            return (
              <button
                key={letter}
                onClick={() => setFilter(filter === letter ? "all" : letter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filter === letter
                    ? "bg-blue-700 text-white"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                {letter} ({count})
              </button>
            );
          })}
        </div>

        {/* Timeline entries */}
        <div className="space-y-10">
          {years.map((year) => (
            <div key={year}>
              <h2 className="text-2xl font-bold text-blue-800 mb-4 sticky top-0 bg-white py-2 z-10 border-b border-blue-100">
                {year}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {groupedByYear[year].map((entry) => (
                  <div
                    key={entry.plate}
                    className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <PlateVisual plate={entry.plate} size="sm" />
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        {entry.date.toLocaleDateString("en-NZ", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
