
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

export default function HomeClient() {
  const [formState, setFormState] = useState({ name: "", phone: "", question: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", phone: "", question: "" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      <Navbar />
      
      <main className="w-full">
        
        {/* 1️⃣ HERO */}
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
            <Image
              src="/1.jpg"
              alt="Inlaw Kazakhstan Background"
              fill
              className="object-cover object-top opacity-60 dark:opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent dark:from-slate-950/80 dark:via-slate-950/50 dark:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-slate-950" />
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative z-10 w-full max-w-7xl px-4 py-20 text-left sm:px-6 lg:px-8"
          >
            <motion.h1 variants={fadeInUp} className="mb-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-sm">
              Юридическое сопровождение <br className="hidden md:block" />
              <span className="text-[#2E447A] dark:text-blue-400">
                бизнеса в Казахстане
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="mb-10 max-w-2xl text-lg font-medium text-slate-700 dark:text-slate-200 sm:text-xl leading-relaxed">
              Юридическая компания INLAW оказывает профессиональные юридические услуги
для бизнеса в Республике Казахстан, включая корпоративное право,
договорную работу, МФЦА и взаимодействие с государственными органами.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col items-start justify-start gap-5 sm:flex-row">
              <Link
                href="#cta"
                className="group relative w-full sm:w-auto overflow-hidden bg-[#2E447A] px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-[#233560] hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Получить консультацию
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="#services"
                className="group w-full sm:w-auto bg-white/80 backdrop-blur-sm px-8 py-4 text-lg font-bold text-slate-800 shadow-lg ring-1 ring-slate-200 transition-all hover:bg-white hover:text-[#2E447A] hover:shadow-xl hover:-translate-y-1 dark:bg-slate-800/80 dark:text-white dark:ring-slate-700 dark:hover:bg-slate-800"
              >
                Наши услуги
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* 2️⃣ ABOUT / WHO WE ARE */}
        <section className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
               style={{ backgroundImage: 'radial-gradient(#2E447A 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="relative z-10 max-w-7xl px-4 text-center sm:px-6 lg:px-8"
          >
            <motion.h2 variants={fadeInUp} className="mb-6 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Юридическая компания INLAW
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto max-w-4xl text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              INLAW — юридическая компания, специализирующаяся на сопровождении бизнеса
              в Казахстане, включая корпоративное право, договорную работу, МФЦА,
              взаимодействие с банками и государственными органами.
            </motion.p>
            
            <motion.div variants={staggerContainer} className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { title: "Корпоративное право", desc: "Регистрация, реорганизация и сопровождение бизнеса", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                { title: "МФЦА (AIFC)", desc: "Лицензирование и работа в юрисдикции МФЦА", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                { title: "Судебная защита", desc: "Представительство в судах всех инстанций", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800 border-t-4 border-[#2E447A]"
                >
                  <div className="mb-6 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-slate-100 text-[#2E447A] dark:bg-slate-700 dark:text-blue-400">
                     <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                     </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* 3️⃣ WHO IS THIS FOR */}
        <section className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-slate-950 pt-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-7xl px-4 sm:px-6 lg:px-8"
           >
            <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-2">
              <div className="text-left">
                <motion.h2 variants={fadeInUp} className="mb-8 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl leading-tight">
                  Для кого подходят <br/>
                  <span className="text-[#2E447A] dark:text-blue-400">наши юридические услуги</span>
                </motion.h2>
                
                <ul className="space-y-6">
                  {[
                    "Собственники и директора компаний в Казахстане",
                    "Малый и средний бизнес (МСБ)",
                    "Международные компании, работающие в РК",
                    "Компании, зарегистрированные или планирующие работу в МФЦА",
                  ].map((item, idx) => (
                    <motion.li variants={fadeInUp} key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2E447A] text-white shadow-md">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-lg font-medium text-slate-700 dark:text-slate-200">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <motion.div variants={fadeInUp} className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-2xl dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <Image
                  src="/work.RAF"
                  alt="Для кого подходят наши юридические услуги"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* 4️⃣ SERVICES */}
        <section id="services" className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
           >
            <motion.h2 variants={fadeInUp} className="mb-12 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Юридические услуги INLAW
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Регистрация ТОО и АО в Казахстане",
                "Корпоративное сопровождение бизнеса",
                "Договорная и правовая экспертиза",
                "Налоговая регистрация и сопровождение",
                "Сопровождение компаний в МФЦА",
                "Получение лицензий и разрешений",
                "Открытие банковских счетов в РК",
                "Судебное и досудебное представительство"
              ].map((service, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="group flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-xl dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-[#2E447A] group-hover:bg-[#2E447A] group-hover:text-white transition-colors dark:bg-slate-700 dark:text-blue-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-center text-lg font-semibold text-slate-900 dark:text-white group-hover:text-[#2E447A] dark:group-hover:text-blue-400 transition-colors">
                    {service}
                  </h3>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-[#2E447A] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#233560] hover:shadow-xl hover:-translate-y-1"
              >
                Все услуги
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* 5️⃣ WHY INLAW */}
        <section className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-slate-950 pt-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
           >
            <motion.h2 variants={fadeInUp} className="mb-12 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Почему клиенты выбирают INLAW
            </motion.h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Практикующие юристы", desc: "Команда с реальным опытом работы в правовом поле Казахстана" },
                { title: "Корпоративное право", desc: "Глубокая экспертиза в финансовом и корпоративном секторе" },
                { title: "Работа с банками", desc: "Эффективное взаимодействие с банками и государственными регуляторами" },
                { title: "Знание законодательства", desc: "Полное понимание требований и нюансов законодательства РК" },
                { title: "Прозрачность", desc: "Четкие сроки, понятные этапы работы и фиксированная стоимость" },
                { title: "Ориентация на результат", desc: "Приоритет на защиту интересов и достижение целей клиента" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-start rounded-xl bg-slate-50 p-8 shadow-sm transition-all hover:shadow-md dark:bg-slate-900 border-l-4 border-[#2E447A] hover:border-l-8"
                >
                  <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-left text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5.5️⃣ CERTIFICATES */}
        <section className="relative flex min-h-screen w-full items-center justify-center bg-[#2E447A] text-white py-20 overflow-hidden">
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
             className="w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8 relative z-10"
           >
            <motion.h2 variants={fadeInUp} className="mb-8 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Сертификаты и аккредитации
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mb-16 max-w-3xl text-lg text-blue-100 leading-relaxed">
              Экспертиза INLAW подтверждена профессиональными сертификатами, 
              аккредитациями и соответствием требованиям регуляторов 
              Республики Казахстан и международных юрисдикций.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center">
              {[
                { src: "/certificate-1.jpg", alt: "Сертификат INLAW 1" },
                { src: "/certificate-2.png", alt: "Сертификат INLAW 2" }
              ].map((cert, idx) => (
                <motion.div 
                  key={idx}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative w-full flex justify-center group"
                >
                  <div className="relative w-full max-w-[500px] aspect-[297/210] rounded-xl p-2 bg-white/5 border border-white/20 shadow-2xl backdrop-blur-md">
                      <div className="relative w-full h-full overflow-hidden rounded-lg">
                        <Image
                            src={cert.src}
                            alt={cert.alt}
                            fill
                            className="object-fill transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 6️⃣ TEAM */}
        <section className="relative flex min-h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900 pt-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
           >
            <motion.h2 variants={fadeInUp} className="mb-12 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Команда INLAW
            </motion.h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { 
                  name: "Берик Рахимжанов", 
                  role: "Основатель и Управляющий партнер", 
                  spec: "Эксперт по МФЦА и международным финансовым структурам. Более 10 лет практики, десятки лицензированных проектов и сотни зарегистрированных компаний.", 
                  image: "/Berik.jpeg"
                },
                { 
                  name: "Марат Киялов", 
                  role: "Старший Юрист", 
                  spec: "Специализируется на корпоративном праве и структурировании сделок. Обеспечивает правовую поддержку бизнеса и комплаенс-контроль.", 
    
                  image: "/Marat.jpeg"
                },
                { 
                  name: "Саламат Кундебаев", 
                  role: "Юрист", 
                  spec: "Эксперт в области трудового и миграционного права. Сопровождение получения рабочих виз и разрешений, консультации по вопросам кадрового делопроизводства.", 

                  image: "/Salamat_new.jpeg"
                },
              ].map((member, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col items-center overflow-hidden rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:bg-slate-800 border border-slate-100 dark:border-slate-800"
                >
                  <div className="mb-6 h-32 w-32 relative overflow-hidden rounded-full border-4 border-slate-100 dark:border-slate-700 shadow-md">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mb-4 font-semibold text-[#2E447A] dark:text-blue-400">
                    {member.role}
                  </p>
                  
                  <div className="w-full border-t border-slate-200 py-4 dark:border-slate-800">
                    <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-slate-200">Специализация:</span> <br/>
                      {member.spec}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7️⃣ GEOGRAPHY — REDESIGNED */}
        <section className="relative w-full bg-slate-50 dark:bg-slate-900 py-20 overflow-hidden">
           {/* Abstract Background Pattern */}
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <svg className="h-full w-full" width="100%" height="100%">
               <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                 <circle cx="2" cy="2" r="1" className="text-slate-900 dark:text-white" fill="currentColor" />
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid-pattern)" />
             </svg>
           </div>

           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="relative z-10 w-full max-w-7xl px-4 mx-auto sm:px-6 lg:px-8"
           >
            <div className="text-center mb-16">
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl mb-6">
                География присутствия
              </motion.h2>
              <motion.p variants={fadeInUp} className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
                Мы обеспечиваем правовую поддержку бизнеса в ключевых деловых центрах Казахстана и международной юрисдикции
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Astana Card */}
              <motion.div variants={fadeInUp} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 transition-all hover:shadow-2xl hover:-translate-y-1">
                 <div className="h-1.5 bg-[#2E447A]"></div>
                 <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Астана</h3>
                       <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg text-[#2E447A] dark:text-blue-400">
                         {/* Icon for Building/Capital */}
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                       </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[3rem]">
                      Головной офис. Взаимодействие с государственными органами и министерствами.
                    </p>
                    <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                       <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#2E447A] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="text-slate-700 dark:text-slate-300 text-sm">ул. Гейдара Алиева 1</span>
                       </div>
                       <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-[#2E447A] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          <div className="flex flex-col text-sm">
                             <a href="tel:+77001466646" className="text-slate-700 dark:text-slate-300 hover:text-[#2E447A] transition-colors">+7 700 146 66 46</a>
                             <a href="tel:+77001466601" className="text-slate-700 dark:text-slate-300 hover:text-[#2E447A] transition-colors">+7 700 146 66 01</a>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>

              {/* Almaty Card */}
              <motion.div variants={fadeInUp} className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 transition-all hover:shadow-2xl hover:-translate-y-1">
                 <div className="h-1.5 bg-blue-600"></div>
                 <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Алматы</h3>
                       <div className="p-3 bg-blue-50 dark:bg-slate-700 rounded-lg text-blue-600 dark:text-blue-400">
                         {/* Icon for Finance/Business */}
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                       </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 min-h-[3rem]">
                      Финансовый центр. Работа с банками, инвестиционными фондами и крупным бизнесом.
                    </p>
                    <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                       <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-600 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          <span className="text-slate-700 dark:text-slate-300 text-sm">ул. Байзакова 303</span>
                       </div>
                       <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-blue-600 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                          <div className="flex flex-col text-sm">
                             <a href="tel:+77780008872" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors">+7 778 000 88 72</a>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>

              {/* AIFC Card - Premium Style */}
              <motion.div variants={fadeInUp} className="group relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-700 transition-all hover:shadow-2xl hover:-translate-y-1">
                 {/* Golden Accent for AIFC */}
                 <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-500 to-amber-600"></div>
                 
                 <div className="p-8 relative z-10">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-2xl font-bold text-white">МФЦА (AIFC)</h3>
                       <div className="p-3 bg-slate-800 rounded-lg text-yellow-500">
                         <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                       </div>
                    </div>
                    <p className="text-slate-300 mb-6 min-h-[3rem]">
                      Особая юрисдикция с английским правом. Регистрация компаний, лицензирование и структурирование сделок.
                    </p>
                    <div className="space-y-4 pt-6 border-t border-slate-700">
                       <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          <span className="text-slate-300 text-sm">Международный арбитраж</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          <span className="text-slate-300 text-sm">Налоговые льготы</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          <span className="text-slate-300 text-sm">Защита активов</span>
                       </div>
                    </div>
                 </div>
              </motion.div>
            </div>
           </motion.div>
        </section>

        {/* 8️⃣ HOW WE WORK */}
        <section className="relative flex w-full items-center justify-center bg-slate-50 dark:bg-slate-900 py-16 sm:py-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
           >
            <motion.h2 variants={fadeInUp} className="mb-16 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Процесс работы
            </motion.h2>

            <div className="relative flex flex-col justify-between gap-8 md:flex-row">
              {/* Connecting Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-0 right-0 top-12 hidden h-1 bg-[#2E447A]/20 md:block origin-left"
              ></motion.div>

              {[
                { step: "01", title: "Первичная консультация", desc: "Обсуждение вашей задачи и целей" },
                { step: "02", title: "Анализ и стратегия", desc: "Изучение документов и выработка правовой позиции" },
                { step: "03", title: "Реализация", desc: "Подготовка документов и юридические действия" },
                { step: "04", title: "Поддержка", desc: "Сопровождение и дальнейшее сотрудничество" },
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="group relative z-10 flex flex-1 flex-col items-center">
                  <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg transition-all group-hover:scale-110 group-hover:bg-[#2E447A] group-hover:text-white dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-900 z-20">
                    <span className="text-2xl font-bold text-[#2E447A] group-hover:text-white dark:text-blue-400">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="max-w-xs text-sm text-slate-600 dark:text-slate-300">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 9️⃣ FAQ */}
        <section className="relative flex min-h-screen w-full items-center justify-center bg-white dark:bg-slate-950 pt-20">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={staggerContainer}
             className="w-full max-w-4xl px-4 sm:px-6 lg:px-8"
           >
            <motion.h2 variants={fadeInUp} className="mb-12 text-center text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
              Часто задаваемые вопросы
            </motion.h2>

            <div className="space-y-4">
              {[
                {
                  q: "Чем занимается юридическая компания INLAW?",
                  a: "INLAW оказывает юридическое сопровождение бизнеса в Казахстане, включая корпоративное право, договорную работу, МФЦА, взаимодействие с банками и государственными органами."
                },
                {
                  q: "Работаете ли вы с МФЦА?",
                  a: "Да, мы сопровождаем регистрацию и деятельность компаний в МФЦА, помогаем с получением лицензий и соблюдением регуляторных требований Международного финансового центра «Астана»."
                }
              ].map((item, idx) => (
                <motion.details 
                  key={idx} 
                  variants={fadeInUp}
                  className="group rounded-xl bg-slate-50 shadow-sm dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-medium text-slate-900 dark:text-white">
                    <span className="text-lg font-semibold">{item.q}</span>
                    <span className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-[#2E447A] transition-transform group-open:rotate-180 dark:bg-slate-800 dark:text-blue-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="border-t border-slate-200 px-6 pb-6 pt-4 text-slate-600 dark:border-slate-700 dark:text-slate-300">
                    <p>{item.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 🔟 CTA + FOOTER WRAPPER */}
        <div className="flex flex-col w-full">
            {/* CTA */}
            <section id="cta" className="relative flex-grow flex items-center justify-center bg-[#2E447A] text-white py-24 overflow-hidden">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                 <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                 <div className="absolute top-0 -right-4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                 <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
              </div>

              <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Left Column: Text */}
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="text-left"
                  >
                    <motion.span variants={fadeInUp} className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-200 text-sm font-semibold mb-6 border border-blue-400/30">
                      Бесплатная консультация
                    </motion.span>
                    <motion.h2 variants={fadeInUp} className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl leading-tight">
                      Решим ваши <br/>
                      <span className="text-blue-200">юридические вопросы</span>
                    </motion.h2>
                    
                    <motion.p variants={fadeInUp} className="mb-10 text-xl text-blue-100 leading-relaxed max-w-lg">
                      Оставьте заявку прямо сейчас. Наши эксперты проанализируют вашу ситуацию и предложат оптимальное правовое решение в течение 24 часов.
                    </motion.p>

                    <motion.div variants={fadeInUp} className="flex flex-col gap-4">
                       {/* Trust Indicators */}
                       <div className="flex items-center gap-3 text-blue-50">
                         <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                           <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                         </div>
                         <span className="font-medium">Полная конфиденциальность</span>
                       </div>
                       <div className="flex items-center gap-3 text-blue-50">
                         <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                           <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                         </div>
                         <span className="font-medium">Персональный подход</span>
                       </div>
                    </motion.div>
                  </motion.div>

                  {/* Right Column: Form */}
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-white/10"
                  >
                    {!isSuccess ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Заполните форму</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Мы свяжемся с вами в ближайшее время</p>
                        
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Ваше имя</label>
                          <input 
                            type="text" 
                            id="name"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:border-[#2E447A] focus:bg-white dark:focus:bg-slate-900 focus:ring-0 text-slate-900 dark:text-white transition-all"
                            placeholder="Иван Иванов"
                            value={formState.name}
                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Номер телефона</label>
                          <input 
                            type="tel" 
                            id="phone"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-transparent focus:border-[#2E447A] focus:bg-white dark:focus:bg-slate-900 focus:ring-0 text-slate-900 dark:text-white transition-all"
                            placeholder="+7 (700) 000-00-00"
                            value={formState.phone}
                            onChange={(e) => setFormState({...formState, phone: e.target.value})}
                          />
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full bg-[#2E447A] text-white font-bold py-4 rounded-xl hover:bg-[#233560] transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Отправка...
                            </>
                          ) : (
                            "Отправить заявку"
                          )}
                        </button>
                        <p className="text-xs text-center text-slate-400 mt-4">
                          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                        </p>
                      </form>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Заявка принята!</h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-8">
                          Спасибо за обращение. Мы свяжемся с вами в ближайшее время по указанному номеру.
                        </p>
                        <button 
                          onClick={() => setIsSuccess(false)}
                          className="text-[#2E447A] font-semibold hover:underline"
                        >
                          Отправить еще одну заявку
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>
            
            {/* FOOTER */}
            <Footer />
        </div>
        
      </main>
    </div>
  );
}
