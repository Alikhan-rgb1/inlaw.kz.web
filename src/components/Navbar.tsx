"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for transparency/blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  // Close menu when clicking a link
  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { name: "Главная", href: "/" },
    { name: "О компании", href: "/#about" },
    { name: "Услуги", href: "/services" },
    { name: "Контакты", href: "/#cta" },
  ];

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 dark:bg-slate-950/90 dark:border-slate-800" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo & Company Name */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
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
              Юридическая фирма
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none group-hover:text-[#2E447A] dark:group-hover:text-blue-400 transition-colors">
              INLAW.KZ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-[#2E447A] dark:text-slate-300 dark:hover:text-blue-400 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E447A] after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button & Language Switcher */}
        <div className="hidden md:flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
            <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex items-center gap-1">
              <span className="cursor-pointer text-[#2E447A] font-bold">RU</span>
              <span className="text-slate-300">/</span>
              <span className="cursor-pointer hover:text-[#2E447A] transition-colors">EN</span>
              <span className="text-slate-300">/</span>
              <span className="cursor-pointer hover:text-[#2E447A] transition-colors">CHI</span>
            </div>
          </div>

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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 shadow-xl overflow-hidden"
          >
            <div className="space-y-1 px-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800"
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://wa.me/77001466601"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-lg bg-[#2E447A] px-3 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#233560]"
                >
                  Связаться в WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
