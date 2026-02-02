import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-grow">
        {/* 1️⃣ HERO — ОПРЕДЕЛЕНИЕ СУЩНОСТИ (ENTITY) */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/1.jpg"
              alt="Inlaw Kazakhstan Background"
              fill
              className="object-cover opacity-50 dark:opacity-40"
              priority
            />
            {/* Elegant Gradient Overlay - More subtle to show image better */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/40 dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-950" />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            {/* Badge / Tag - Glassmorphism effect */}
            <div className="mb-10 flex justify-center">
              <span className="inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-blue-800 ring-1 ring-inset ring-blue-200 shadow-sm dark:bg-slate-900/80 dark:text-blue-300 dark:ring-blue-800 transition-transform hover:scale-105 cursor-default">
                <span className="mr-2 flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Лидеры юридического консалтинга
              </span>
            </div>

            {/* H1 (ОДИН, ЖЁСТКИЙ) */}
            <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-sm">
              Юридическое сопровождение <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-200">
                бизнеса в Казахстане
              </span>
            </h1>

            {/* Подзаголовок (AI‑definition) */}
            <p className="mx-auto mb-12 max-w-3xl text-xl font-medium text-slate-700 dark:text-slate-200 sm:text-2xl leading-relaxed drop-shadow-sm">
              Юридическая компания <strong>INLAW</strong> оказывает услуги в области корпоративного,
              финансового и регуляторного права в Республике Казахстан и МФЦА.
            </p>

            {/* CTA (семантический) */}
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link
                href="/consultation"
                className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-blue-700 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Получить консультацию
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/services"
                className="group w-full sm:w-auto rounded-full bg-white/80 backdrop-blur-sm px-8 py-4 text-lg font-bold text-slate-800 shadow-lg ring-1 ring-slate-200 transition-all hover:bg-white hover:text-blue-700 hover:shadow-xl hover:-translate-y-1 dark:bg-slate-800/80 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-800"
              >
                Наши услуги
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
