"use client";

import { useState, useMemo, useCallback } from "react";
import PlateVisual from "@/components/PlateVisual";
import { getSequentialPlates } from "@/lib/plates";
import Link from "next/link";

const TOTAL_QUESTIONS = 10;

interface Question {
  plate: string;
  correctYear: number;
  options: number[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuestions(count: number): Question[] {
  const plates = getSequentialPlates();
  const selected = shuffleArray(plates).slice(0, count);

  return selected.map((entry) => {
    const correctYear = entry.date.getFullYear();
    const offsets = shuffleArray([-3, -2, -1, 1, 2, 3]);
    const wrongYears = new Set<number>();

    for (const offset of offsets) {
      const year = correctYear + offset;
      if (year >= 2001 && year <= 2026 && year !== correctYear) {
        wrongYears.add(year);
      }
      if (wrongYears.size >= 3) break;
    }

    // Ensure we have exactly 3 wrong answers
    let fallback = 1;
    while (wrongYears.size < 3) {
      const year = correctYear + fallback;
      if (year >= 2001 && year <= 2026 && year !== correctYear) {
        wrongYears.add(year);
      }
      fallback = fallback > 0 ? -fallback : -fallback + 1;
    }

    const options = shuffleArray([correctYear, ...Array.from(wrongYears).slice(0, 3)]);

    return {
      plate: entry.plate,
      correctYear,
      options,
    };
  });
}

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>(() =>
    generateQuestions(TOTAL_QUESTIONS)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];

  const handleSelect = useCallback(
    (year: number) => {
      if (showResult) return;
      setSelected(year);
      setShowResult(true);
      if (year === current.correctYear) {
        setScore((s) => s + 1);
      }
    },
    [showResult, current]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= TOTAL_QUESTIONS) {
      setFinished(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setQuestions(generateQuestions(TOTAL_QUESTIONS));
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
  }, []);

  if (finished) {
    const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
    let message = "Keep practicing!";
    if (percentage >= 90) message = "Amazing! You really know your plates!";
    else if (percentage >= 70) message = "Great job! You have a solid grasp.";
    else if (percentage >= 50) message = "Not bad! Room to improve though.";

    return (
      <div className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">Quiz Complete!</h1>
          <div className="bg-blue-50 rounded-2xl p-8 mb-8">
            <div className="text-6xl font-bold text-blue-700 mb-2">
              {score}/{TOTAL_QUESTIONS}
            </div>
            <div className="text-xl text-gray-600 mb-4">{percentage}% correct</div>
            <p className="text-lg text-blue-800 font-medium">{message}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/how-it-works"
              className="border-2 border-blue-700 text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Study the Guide
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-900">Plate Quiz</h1>
          <div className="text-sm font-medium text-gray-500">
            Score: <span className="text-blue-700 font-bold">{score}</span> /{" "}
            {currentIndex + (showResult ? 1 : 0)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-blue-100 rounded-full mb-8">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>

        <div className="text-center mb-2 text-sm text-gray-500">
          Question {currentIndex + 1} of {TOTAL_QUESTIONS}
        </div>

        <div className="text-center mb-6">
          <p className="text-lg text-gray-700 mb-6">
            What year was this plate registered?
          </p>
          <div className="flex justify-center mb-8">
            <PlateVisual plate={current.plate} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {current.options.map((year) => {
            let btnClass =
              "border-2 border-blue-200 bg-white text-blue-800 hover:border-blue-500 hover:bg-blue-50";

            if (showResult) {
              if (year === current.correctYear) {
                btnClass = "border-2 border-green-500 bg-green-50 text-green-800";
              } else if (year === selected) {
                btnClass = "border-2 border-red-400 bg-red-50 text-red-700";
              } else {
                btnClass = "border-2 border-gray-200 bg-gray-50 text-gray-400";
              }
            }

            return (
              <button
                key={year}
                onClick={() => handleSelect(year)}
                disabled={showResult}
                className={`py-4 rounded-xl font-bold text-xl transition-all ${btnClass}`}
              >
                {year}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="text-center">
            <p
              className={`text-lg font-medium mb-4 ${
                selected === current.correctYear
                  ? "text-green-700"
                  : "text-red-600"
              }`}
            >
              {selected === current.correctYear
                ? "Correct!"
                : `The answer was ${current.correctYear}`}
            </p>
            <button
              onClick={handleNext}
              className="bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              {currentIndex + 1 >= TOTAL_QUESTIONS ? "See Results" : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
