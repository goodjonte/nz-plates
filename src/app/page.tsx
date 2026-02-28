import Link from "next/link";
import PlateVisual from "@/components/PlateVisual";
import { getMilestones, formatDate } from "@/lib/plates";

export default function HomePage() {
  const milestones = getMilestones();

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-800 to-blue-950 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Guess a Car's Age From Its Plate
          </h1>
          <p className="text-xl text-blue-100 mb-4 max-w-2xl mx-auto">
            New Zealand plates are issued in alphabetical sequence from AAA to ZZZ.
            Once you know the pattern, you can estimate when any car was registered
            just by reading the first few letters.
          </p>
          <p className="text-lg text-blue-200 mb-10">
            A started in 2001, we are up to R in 2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-white text-blue-800 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors text-lg"
            >
              Take the Quiz
            </Link>
            <Link
              href="/timeline"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors text-lg"
            >
              View Timeline
            </Link>
          </div>
        </div>
      </section>

      {/* How it works summary */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">
            How Does It Work?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-3">ABC</div>
              <h3 className="font-semibold text-lg mb-2">Sequential Letters</h3>
              <p className="text-gray-600">
                NZTA issues plates in order: AAA, AAB, AAC... all the way through to ZZZ.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-3">2001</div>
              <h3 className="font-semibold text-lg mb-2">Started With A</h3>
              <p className="text-gray-600">
                The current AAA-ZZZ sequence began in April 2001 with plates starting at A.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="text-4xl font-bold text-blue-600 mb-3">24</div>
              <h3 className="font-semibold text-lg mb-2">Letters Used</h3>
              <p className="text-gray-600">
                The alphabet skips I and O (to avoid confusion with 1 and 0) but Q is used.
              </p>
            </div>
          </div>
          <Link
            href="/how-it-works"
            className="inline-block mt-8 text-blue-700 font-semibold hover:text-blue-900 underline"
          >
            Learn the full details
          </Link>
        </div>
      </section>

      {/* Milestone preview */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Key Milestones
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {milestones.map((m) => (
              <div
                key={m.plate}
                className="bg-white border border-blue-100 rounded-lg p-4 text-center shadow-sm"
              >
                <PlateVisual plate={m.plate} size="sm" />
                <div className="mt-2 text-sm text-gray-500">
                  {formatDate(m.date)}
                </div>
                <div className="text-xs text-blue-600 font-semibold mt-1">
                  {m.plate[0]} series began
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/timeline"
              className="bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Explore Full Timeline
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
