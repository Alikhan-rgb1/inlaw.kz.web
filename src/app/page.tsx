import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <Navbar />
      
      <main className="flex-grow">
        {/* 1️⃣ HERO — ОПРЕДЕЛЕНИЕ СУЩНОСТИ (ENTITY) */}
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden pt-16">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/1.jpg"
              alt="Inlaw Kazakhstan Background"
              fill
              className="object-cover opacity-20 dark:opacity-10"
              priority
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/50 to-white dark:from-slate-950/90 dark:via-slate-950/80 dark:to-slate-950" />
          </div>

          <div className="relative z-10 w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            {/* Badge / Tag */}
            <div className="mb-8 flex justify-center">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30">
                Лидеры юридического консалтинга
              </span>
            </div>

            {/* H1 (ОДИН, ЖЁСТКИЙ) */}
            <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Юридическое сопровождение <br className="hidden md:block" />
              <span className="text-blue-700 dark:text-blue-500">бизнеса в Казахстане</span>
            </h1>

            {/* Подзаголовок (AI‑definition) */}
            <p className="mx-auto mb-12 max-w-3xl text-xl text-slate-600 dark:text-slate-300 sm:text-2xl leading-relaxed">
              Юридическая компания <strong>INLAW</strong> оказывает услуги в области корпоративного,
              финансового и регуляторного права в Республике Казахстан и МФЦА.
            </p>

            {/* CTA (семантический) */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/consultation"
                className="w-full sm:w-auto rounded-full bg-blue-700 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-600 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 transition-all transform hover:-translate-y-1"
              >
                Получить консультацию
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-lg font-semibold text-slate-900 shadow-md ring-1 ring-slate-900/10 hover:bg-slate-50 hover:ring-slate-900/20 dark:bg-slate-800 dark:text-white dark:ring-white/10 dark:hover:bg-slate-700 transition-all"
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
