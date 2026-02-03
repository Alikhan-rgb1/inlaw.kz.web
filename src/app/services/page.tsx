"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function ServicesPage() {
  const { t } = useLanguage();

  const services = [
    {
      title: t.servicesPage.grid.items.corporate.title,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      items: t.servicesPage.grid.items.corporate.items,
      slug: "corporate"
    },
    {
      title: t.servicesPage.grid.items.contracts.title,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      items: t.servicesPage.grid.items.contracts.items,
      slug: "contracts"
    },
    {
      title: t.servicesPage.grid.items.tax.title,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      items: t.servicesPage.grid.items.tax.items,
      slug: "tax"
    },
    {
      title: t.servicesPage.grid.items.aifc.title,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: t.servicesPage.grid.items.aifc.items,
      slug: "aifc"
    },
    {
      title: t.servicesPage.grid.items.licensing.title,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      items: t.servicesPage.grid.items.licensing.items,
      slug: "licensing"
    },
    {
      title: t.servicesPage.grid.items.banking.title,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      items: t.servicesPage.grid.items.banking.items,
      slug: "banking"
    },
    {
      title: t.servicesPage.grid.items.disputes.title,
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      items: t.servicesPage.grid.items.disputes.items,
      slug: "disputes"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      <Navbar />
      
      <main className="w-full">
        
        {/* 1️⃣ HERO */}
        <section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden bg-[#2E447A] text-white pt-20">
           {/* Decorative Background Elements from CTA */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
           </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative z-10 w-full max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8"
          >
            <motion.h1 variants={fadeInUp} className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              {t.servicesPage.hero.titleStart} <br className="hidden md:block" />
              {t.servicesPage.hero.titleEnd}
            </motion.h1>

            <motion.p variants={fadeInUp} className="mx-auto max-w-3xl text-lg text-blue-100 sm:text-xl leading-relaxed">
              {t.servicesPage.hero.subtitle}
            </motion.p>
          </motion.div>
        </section>

        {/* 3️⃣ SERVICES GRID */}
        <section className="relative w-full bg-white dark:bg-slate-950 py-24" id="services">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="relative z-10 w-full max-w-7xl px-4 mx-auto sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-4xl text-center mb-16">
              <motion.h2 variants={fadeInUp} className="mb-6 text-3xl font-bold text-[#2E447A] dark:text-white sm:text-4xl">
                {t.servicesPage.grid.title}
              </motion.h2>
              
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto">
                {t.servicesPage.grid.subtitle}
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col rounded-lg bg-slate-50 p-8 border border-slate-200 hover:border-[#2E447A] hover:shadow-lg transition-all duration-300 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-500 relative"
                >
                  <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10" />
                  
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded bg-[#2E447A] text-white">
                    {service.icon}
                  </div>

                  <h3 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-[#2E447A] transition-colors dark:text-white">
                    {service.title}
                  </h3>
                  
                  <ul className="space-y-3 flex-grow">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2E447A]"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>



        {/* 5️⃣ WHY INLAW */}
        <section className="relative w-full bg-slate-50 dark:bg-slate-900 py-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 text-center"
           >
            <motion.h2 variants={fadeInUp} className="mb-12 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {t.servicesPage.whyUs.title}
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.servicesPage.whyUs.items.map((item, idx) => {
                const icons = [
                  (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-8a2 2 0 012-2h14a2 2 0 012 2v8M9 10a2 2 0 012-2h2a2 2 0 012 2v8m-6 4a2 2 0 012-2h2a2 2 0 012 2v8" />
                    </svg>
                  ),
                  (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  ),
                  (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  )
                ];

                return (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp}
                    className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50 text-[#2E447A] dark:bg-slate-700 dark:text-blue-400">
                      {icons[idx]}
                    </div>
                    <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* 6️⃣ HOW WE WORK */}
        <section className="relative w-full bg-slate-50 dark:bg-slate-900 py-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 text-center"
           >
            <motion.h2 variants={fadeInUp} className="mb-16 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {t.servicesPage.process.title}
            </motion.h2>

            <div className="relative flex flex-col justify-between gap-8 md:flex-row">
              {/* Connecting Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-0 right-0 top-12 hidden h-1 bg-[#2E447A]/20 md:block origin-left"
              ></motion.div>

              {t.servicesPage.process.steps.map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="group relative z-10 flex flex-1 flex-col items-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg transition-all group-hover:scale-110 group-hover:bg-[#2E447A] group-hover:text-white dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 z-20">
                    <span className="text-2xl font-bold text-[#2E447A] group-hover:text-white dark:text-blue-400">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="max-w-xs text-sm text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7️⃣ FAQ */}
        <section className="relative w-full bg-slate-50 dark:bg-slate-900 py-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-4xl px-4 mx-auto sm:px-6 lg:px-8"
           >
            <motion.h2 variants={fadeInUp} className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              {t.servicesPage.faq.title}
            </motion.h2>

            <div className="space-y-4">
              {t.servicesPage.faq.items.map((item, idx) => (
                <motion.details 
                  key={idx} 
                  variants={fadeInUp}
                  className="group rounded-xl bg-white shadow-sm dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-slate-900 dark:text-white">
                    <span className="text-lg font-semibold">{item.q}</span>
                    <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[#2E447A] transition-transform group-open:rotate-180 dark:bg-slate-700 dark:text-blue-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-slate-100 px-6 pb-6 pt-4 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    <p>{item.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 8️⃣ CTA */}
        <section className="relative w-full bg-[#2E447A] text-white py-24 overflow-hidden">
           {/* Decorative Background Elements */}
           <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
           </div>

           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="relative z-10 w-full max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8"
           >
            <motion.h2 variants={fadeInUp} className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
              {t.servicesPage.cta.title}
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="mb-10 text-xl text-blue-100 leading-relaxed">
              {t.servicesPage.cta.desc}
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link
                href="/#cta"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2E447A] px-8 py-4 text-lg font-bold rounded-xl shadow-xl transition-all hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-1"
              >
                {t.servicesPage.cta.button}
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <Footer />
        
      </main>
    </div>
  );
}
