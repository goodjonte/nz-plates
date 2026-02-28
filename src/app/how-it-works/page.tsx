import Link from "next/link";
import PlateVisual from "@/components/PlateVisual";

export const metadata = {
  title: "How It Works - NZ Plate Guide",
};

export default function HowItWorksPage() {
  const usedLetters = "ABCDEFGHJKLMNPQRSTUVWXYZ";

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          How NZ Plates Work
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            The Sequential System
          </h2>
          <p className="text-gray-700 mb-4">
            New Zealand uses a sequential plate numbering system managed by Waka Kotahi
            (NZTA). Standard plates follow the format of three letters followed by three
            numbers, like <strong>ABC123</strong>.
          </p>
          <p className="text-gray-700 mb-4">
            Plates are issued in strict alphabetical order. The sequence started
            at AAA in April 2001 and has been working its way through to ZZZ ever since.
            As of February 2026, new plates are in the R range.
          </p>
          <div className="flex flex-wrap gap-4 justify-center my-8">
            <PlateVisual plate="AAA001" size="md" />
            <div className="flex items-center text-3xl text-blue-400">&#8594;</div>
            <PlateVisual plate="RMM111" size="md" />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Which Letters Are Used?
          </h2>
          <p className="text-gray-700 mb-4">
            The system uses 24 of the 26 alphabet letters. The letters <strong>I</strong> and{" "}
            <strong>O</strong> are skipped because they look too similar to the numbers 1 and 0.
            The letter <strong>Q</strong> is used, despite what some people assume.
          </p>
          <div className="bg-blue-50 rounded-xl p-6 my-6">
            <h3 className="font-semibold text-blue-900 mb-3">The 24 letters used:</h3>
            <div className="flex flex-wrap gap-2">
              {usedLetters.split("").map((letter) => (
                <span
                  key={letter}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded font-bold text-blue-800 border border-blue-200 text-lg"
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="text-red-600 font-semibold">Skipped: I, O</span>
              <span className="text-green-700 font-semibold">Q is included</span>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            How the Sequence Progresses
          </h2>
          <p className="text-gray-700 mb-4">
            The three-letter prefix cycles through all combinations of the 24 valid letters.
            That means there are 24 x 24 x 24 = 13,824 possible three-letter combinations,
            each with numbers 001 through 999.
          </p>
          <div className="bg-gray-50 rounded-xl p-6 my-6 font-mono text-sm">
            <div className="text-gray-500 mb-2">Sequence order:</div>
            <div>AAA001 ... AAA999</div>
            <div>AAB001 ... AAB999</div>
            <div>AAC001 ... AAC999</div>
            <div className="text-gray-400">... (skips AAI, AAO) ...</div>
            <div>AAZ001 ... AAZ999</div>
            <div>ABA001 ... ABA999</div>
            <div className="text-gray-400">... and so on through to ...</div>
            <div>ZZZ001 ... ZZZ999</div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Tips for Estimating the Year
          </h2>
          <div className="space-y-4">
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
              <h3 className="font-semibold text-blue-900">Focus on the first letter</h3>
              <p className="text-gray-600 mt-1">
                The first letter gives you the roughest estimate. Each letter spans
                roughly 1.5 to 2.5 years depending on registration volumes.
              </p>
            </div>
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
              <h3 className="font-semibold text-blue-900">Use the second letter to narrow down</h3>
              <p className="text-gray-600 mt-1">
                Within a first-letter group, the second letter helps you pinpoint the
                year more precisely. Earlier second letters mean earlier in that period.
              </p>
            </div>
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
              <h3 className="font-semibold text-blue-900">Key reference points to memorize</h3>
              <p className="text-gray-600 mt-1">
                A = 2001, D = 2006, F = 2010, G = 2012, H = 2014, J = 2015,
                K = 2016, L = 2017, M = 2019, N = 2020, P = 2022, Q = mid-2022, R = 2025.
              </p>
            </div>
            <div className="bg-white border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm">
              <h3 className="font-semibold text-blue-900">Registration vs. manufacture year</h3>
              <p className="text-gray-600 mt-1">
                The plate shows when a vehicle was first registered in NZ, not when it
                was manufactured. Imported used cars will have a plate from when they
                arrived, not when they were built.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center mt-12">
          <Link
            href="/quiz"
            className="bg-blue-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors text-lg"
          >
            Test Your Knowledge
          </Link>
        </div>
      </div>
    </div>
  );
}
