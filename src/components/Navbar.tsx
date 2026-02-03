import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Company Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="INLAW Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider leading-none mb-1">
              Company Service Provider
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none group-hover:text-[#2E447A] dark:group-hover:text-blue-400 transition-colors">
              INLAW inc LTD.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-[#2E447A] dark:text-slate-300 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E447A] after:transition-all hover:after:w-full"
          >
            Главная
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-700 hover:text-[#2E447A] dark:text-slate-300 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E447A] after:transition-all hover:after:w-full"
          >
            О компании
          </Link>
          <Link
            href="/services"
            className="text-sm font-medium text-slate-700 hover:text-[#2E447A] dark:text-slate-300 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E447A] after:transition-all hover:after:w-full"
          >
            Услуги
          </Link>
          <Link
            href="/contacts"
            className="text-sm font-medium text-slate-700 hover:text-[#2E447A] dark:text-slate-300 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E447A] after:transition-all hover:after:w-full"
          >
            Контакты
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/77001466601?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%8E%D1%80%D0%B8%D0%B4%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D1%83%D1%8E%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#2E447A] px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#233560] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E447A] transition-all transform hover:-translate-y-0.5"
          >
            Связаться с нами
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
