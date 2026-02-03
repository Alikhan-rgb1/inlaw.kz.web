
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-300 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 1. Logo & About */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="INLAW Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider leading-none mb-1">
                  {t.navbar.subtitle}
                </span>
                <span className="text-lg font-bold tracking-tight text-white leading-none">
                  INLAW.KZ
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              {t.footer.subtitle}
            </p>
            <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} INLAW.KZ. {t.footer.rights}
              </p>
            </div>
          </div>

          {/* 2. Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.footer.services}</h3>
            <ul className="space-y-2 text-sm">
              {t.footer.serviceLinks.map((service, index) => (
                <li key={index}>
                  <Link href="/services" className="hover:text-blue-400 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Navigation */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.footer.company}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#about" className="hover:text-blue-400 transition-colors">{t.footer.links.about}</Link></li>
              <li><Link href="/services" className="hover:text-blue-400 transition-colors">{t.footer.services}</Link></li>
              <li><Link href="/#cta" className="hover:text-blue-400 transition-colors">{t.footer.contacts}</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">{t.footer.links.privacy}</Link></li>
            </ul>
          </div>

          {/* 4. Contacts */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{t.footer.contacts}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#2E447A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#2E447A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+77001466646" className="hover:text-blue-400 transition-colors">+7 (700) 146-66-46</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[#2E447A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@inlaw.kz" className="hover:text-blue-400 transition-colors">info@inlaw.kz</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
