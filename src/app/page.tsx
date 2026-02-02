import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-slate-950 px-4 sm:px-6 lg:px-8">
      {/* 1️⃣ HERO — ОПРЕДЕЛЕНИЕ СУЩНОСТИ (ENTITY) */}
      <section className="w-full max-w-4xl py-20 text-center">
        {/* H1 (ОДИН, ЖЁСТКИЙ) */}
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
          Юридическое сопровождение бизнеса в Казахстане
        </h1>

        {/* Подзаголовок (AI‑definition) */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 dark:text-slate-300 sm:text-xl leading-relaxed">
          Юридическая компания INLAW оказывает услуги в области корпоративного,
          финансового и регуляторного права в Республике Казахстан и МФЦА.
        </p>

        {/* CTA (семантический) */}
        <div className="flex justify-center">
          <Link
            href="/consultation"
            className="rounded-md bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
          >
            Получить юридическую консультацию
          </Link>
        </div>
      </section>
    </main>
  );
}
