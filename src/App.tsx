/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BUSINESS_SECTIONS, MANIFESTO_ITEMS } from './data';
import { CopyButton } from './components/CopyButton';
import { InteractiveWorkbench } from './components/InteractiveWorkbench';
import { TechBackground } from './components/TechBackground';
import { GlowCard } from './components/GlowCard';
import { SakuraTrail } from './components/SakuraTrail';
import { Magnetic } from './components/Magnetic';
import { playMicroTick, playOrganicPop, playSuccessChime } from './utils/audioEffects';
import { 
  Globe, 
  Sun, 
  Bell, 
  Store, 
  BarChart3, 
  Users, 
  Laptop, 
  MessageCircle, 
  Check, 
  Menu, 
  X, 
  Send, 
  ShieldAlert, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false);
  const [copiedWechat, setCopiedWechat] = useState<boolean>(false);
  const [copiedQQ, setCopiedQQ] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    playMicroTick(1);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  // Section observer for scroll highlighting
  useEffect(() => {
    const sections = ['hero', 'diagnose', '01', '02', '03', '04', '05', 'manifesto'];
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0.05
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Quick Copy Handler for footer shortcuts
  const handleQuickCopy = async (value: string, type: 'wechat' | 'qq') => {
    try {
      playSuccessChime();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = value;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      
      if (type === 'wechat') {
        setCopiedWechat(true);
        setTimeout(() => setCopiedWechat(false), 2500);
      } else {
        setCopiedQQ(true);
        setTimeout(() => setCopiedQQ(false), 2500);
      }
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const navItems = [
    { id: 'diagnose', label: '增长智能 · AI', labelEn: 'Growth Intel · AI', icon: Sparkles },
    { id: '01', label: '酒店收益 · OTA', labelEn: 'Hotel Revenue · OTA', icon: Bell },
    { id: '02', label: '餐饮零售 · OMO', labelEn: 'F&B Retail · OMO', icon: Store },
    { id: '03', label: '组织效能 · OKR', labelEn: 'Org Efficiency · OKR', icon: BarChart3 },
    { id: '04', label: '客户成功 · CSM', labelEn: 'Customer Success · CSM', icon: Users },
    { id: '05', label: '网页定制 · WEB', labelEn: 'Bespoke Web · WEB', icon: Laptop }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EFF3F1] via-[#F4F7F5] to-[#F9FAF8] text-moss-800 font-sans tracking-wide selection:bg-sage-100 selection:text-moss-900 overflow-x-hidden antialiased">
      
      {/* Dynamic 100% Client-Side High-Tech Particle Network Backdrop */}
      <TechBackground />

      {/* Delicate organic Sakura (Cherry Blossom) Petal Mouse Trail */}
      <SakuraTrail />

      {/* Slick Dynamic Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-sage-100 z-[9999] pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-sage-400 via-moss-700 to-sage-400 origin-left"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Decorative Warm Ambient Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sage-400/20 via-cream-300 to-transparent pointer-events-none" />

      {/* MOBILE HEADER */}
      <header className="lg:hidden sticky top-0 z-50 bg-cream-50/95 backdrop-blur-md border-b border-cream-300 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className="w-8 h-8 rounded bg-moss-800 flex items-center justify-center">
            <Sun className="w-4 h-4 text-sage-400" />
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-sm tracking-tight text-moss-800 leading-none">Sunshine 峰</h1>
            <p className="text-[9px] font-mono text-sage-500 mt-0.5">解决方案 / Solutions</p>
          </div>
        </div>

        {/* Mobile Language and Hamburger */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
            className="text-[10px] font-mono font-bold tracking-wider uppercase border border-cream-300 px-2.5 py-1 rounded bg-white hover:bg-sage-50 text-moss-800 transition active:scale-95 cursor-pointer"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-moss-800 hover:bg-cream-100 rounded transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed inset-x-0 top-[61px] bg-cream-50 border-b border-cream-300 shadow-xl z-40 p-6 space-y-6"
          >
            <div className="space-y-3">
              <span className="text-[9px] font-mono text-sage-500 tracking-widest block uppercase">
                {lang === 'zh' ? '核心业务板块' : 'CORE SERVICES'}
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 text-left py-2.5 px-3 rounded text-xs font-semibold tracking-wider transition cursor-pointer ${
                        activeSection === item.id 
                          ? 'bg-moss-800 text-cream-50' 
                          : 'text-moss-800 hover:bg-sage-50'
                      }`}
                    >
                      <IconComponent className={`w-4 h-4 shrink-0 ${activeSection === item.id ? 'text-sage-400' : 'text-sage-400'}`} />
                      <span className="font-mono text-[9px] opacity-60">{item.id}</span>
                      <span>{lang === 'zh' ? item.label : item.labelEn}</span>
                    </button>
                  );
                })}
                <button
                  onClick={() => scrollToSection('manifesto')}
                  className={`flex items-center gap-3 text-left py-2.5 px-3 rounded text-xs font-semibold tracking-wider transition cursor-pointer ${
                    activeSection === 'manifesto' 
                      ? 'bg-moss-800 text-cream-50' 
                      : 'text-moss-800 hover:bg-sage-50'
                  }`}
                >
                  <Sun className="w-4 h-4 text-sage-400 shrink-0" />
                  <span className="font-mono text-[9px] opacity-60">06</span>
                  <span>{lang === 'zh' ? '我们的底层逻辑宣言' : 'THE MANIFESTO'}</span>
                </button>
              </div>
            </div>

            {/* Mobile Contact Panel */}
            <div className="bg-sage-50 p-4 rounded border border-sage-100 space-y-3">
              <div className="text-[9px] font-mono text-sage-500 tracking-widest uppercase">
                {lang === 'zh' ? '「与主理人对话」' : 'DIRECT LINE TO PRINCIPAL'}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleQuickCopy('X-921993', 'wechat')}
                  className="flex items-center justify-between bg-white px-3 py-2.5 rounded border border-cream-300 text-xs text-moss-800 hover:bg-cream-50 font-medium"
                >
                  <span className="flex items-center gap-1.5 text-moss-800 font-semibold">
                    <MessageCircle className="w-4 h-4 shrink-0 text-sage-400" />
                    {lang === 'zh' ? '微信 WeChat' : 'WeChat'}
                  </span>
                  <span className="font-mono font-bold flex items-center gap-1">
                    X-921993 
                    {copiedWechat ? <Check className="w-3.5 h-3.5 text-sage-500" /> : <span className="text-[9px] text-sage-500 bg-sage-50 px-1.5 py-0.5 rounded ml-1">复制</span>}
                  </span>
                </button>

                <button
                  onClick={() => handleQuickCopy('1160467550', 'qq')}
                  className="flex items-center justify-between bg-white px-3 py-2.5 rounded border border-cream-300 text-xs text-moss-800 hover:bg-cream-50 font-medium"
                >
                  <span className="flex items-center gap-1.5 text-moss-800 font-semibold">
                    <Send className="w-4 h-4 shrink-0 text-sage-400" />
                    {lang === 'zh' ? '企鹅 QQ' : 'QQ'}
                  </span>
                  <span className="font-mono font-bold flex items-center gap-1">
                    1160467550 
                    {copiedQQ ? <Check className="w-3.5 h-3.5 text-sage-500" /> : <span className="text-[9px] text-sage-500 bg-sage-50 px-1.5 py-0.5 rounded ml-1">复制</span>}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DESKTOP LAYOUT */}
      <div className="max-w-[1440px] mx-auto flex relative min-h-screen">
        
        {/* ==========================================================
            LEFT INTERACTIVE COLLAPSIBLE DRAWER (DESKTOP)
            - Collapsed: 60px wide, showing only sage-400 icons.
            - Expanded/Hover: 20% width (min 280px), showing full details.
            - Position: fixed left-0 top-0 h-screen, z-30 overlay.
            - Standard zero-jitter padding on content: pl-[60px].
            ========================================================== */}
        <aside 
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
          className="hidden lg:block fixed left-0 top-0 h-screen bg-cream-50 border-r border-cream-300 z-30 select-none overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ width: isSidebarExpanded ? '20%' : '60px', minWidth: isSidebarExpanded ? '280px' : '60px' }}
        >
          <div className="h-full flex flex-col justify-between py-12 px-4 transition-all duration-300" style={{ paddingLeft: isSidebarExpanded ? '24px' : '16px', paddingRight: isSidebarExpanded ? '24px' : '16px' }}>
            
            {/* Top Brand Block */}
            <div className="space-y-8 flex flex-col items-center lg:items-stretch">
              
              {/* Language switcher - icon 🌐 or toggle button */}
              <div className="flex items-center justify-center lg:justify-start w-full">
                {isSidebarExpanded ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLang('zh')}
                      className={`text-[10px] font-mono tracking-wider transition-all duration-300 px-2.5 py-1 rounded cursor-pointer ${
                        lang === 'zh' 
                          ? 'bg-moss-800 text-cream-50 font-semibold' 
                          : 'text-sage-500 hover:text-moss-800 hover:bg-sage-50'
                      }`}
                    >
                      简体中文
                    </button>
                    <span className="text-cream-300 text-xs font-mono">|</span>
                    <button
                      onClick={() => setLang('en')}
                      className={`text-[10px] font-mono tracking-wider transition-all duration-300 px-2.5 py-1 rounded cursor-pointer ${
                        lang === 'en' 
                          ? 'bg-moss-800 text-cream-50 font-semibold' 
                          : 'text-sage-500 hover:text-moss-800 hover:bg-sage-50'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full hover:bg-sage-50 flex items-center justify-center text-sage-400 cursor-pointer" onClick={() => setIsSidebarExpanded(true)}>
                    <Globe className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Logo / Brand identity */}
              <div 
                onClick={() => scrollToSection('hero')}
                className="cursor-pointer group flex flex-col items-center lg:items-stretch w-full"
              >
                {isSidebarExpanded ? (
                  <div className="whitespace-nowrap">
                    <h1 className="font-sans font-black text-xl text-moss-800 tracking-tighter leading-none transition duration-300 group-hover:text-sage-500 flex items-center gap-1.5">
                      <Sun className="w-5 h-5 text-sage-400 shrink-0" />
                      Sunshine 峰
                    </h1>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-sage-500 font-bold mt-1.5 block">
                      — 解决方案 / Solutions
                    </p>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded bg-moss-800 flex items-center justify-center transition-all duration-300 group-hover:bg-sage-400">
                    <Sun className="w-4 h-4 text-cream-50" />
                  </div>
                )}
              </div>

            </div>

            {/* Navigation Block */}
            <nav className="space-y-6 w-full">
              {isSidebarExpanded && (
                <span className="text-[9px] font-mono text-sage-500 tracking-widest block uppercase px-1">
                  {lang === 'zh' ? '/ 核心业务体系' : '/ CORE FRAMEWORK'}
                </span>
              )}
              <ul className="space-y-3 w-full">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <li key={item.id} className="w-full">
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`flex items-center gap-3 text-left w-full group relative py-2 px-2.5 rounded transition-all duration-300 cursor-pointer ${
                          activeSection === item.id 
                            ? 'bg-sage-50 text-moss-800 font-semibold' 
                            : 'text-sage-500 hover:text-moss-800 hover:bg-sage-50/50'
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                          activeSection === item.id ? 'text-sage-500' : 'text-sage-400 group-hover:text-sage-500'
                        }`} />
                        
                        {isSidebarExpanded && (
                          <span className="font-sans text-[11px] sm:text-xs tracking-wider font-medium flex items-center gap-2 flex-1 min-w-0">
                            <span className="font-mono text-[9px] opacity-60 shrink-0">{item.id}</span>
                            <span className="whitespace-normal break-words leading-tight flex-1">{lang === 'zh' ? item.label : item.labelEn}</span>
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}

                <li className="w-full">
                  <button
                    onClick={() => scrollToSection('manifesto')}
                    className={`flex items-center gap-3 text-left w-full group relative py-2 px-2.5 rounded transition-all duration-300 cursor-pointer ${
                      activeSection === 'manifesto' 
                        ? 'bg-sage-50 text-moss-800 font-semibold' 
                        : 'text-sage-500 hover:text-moss-800 hover:bg-sage-50/50'
                    }`}
                  >
                    <Sun className={`w-4 h-4 shrink-0 transition-colors duration-300 ${
                      activeSection === 'manifesto' ? 'text-sage-500' : 'text-sage-400 group-hover:text-sage-500'
                    }`} />
                    
                    {isSidebarExpanded && (
                      <span className="font-sans text-[11px] sm:text-xs tracking-wider font-medium flex items-center gap-2 flex-1 min-w-0">
                        <span className="font-mono text-[9px] opacity-60 shrink-0">06</span>
                        <span className="whitespace-normal break-words leading-tight flex-1">{lang === 'zh' ? '底层逻辑宣言' : 'THE MANIFESTO'}</span>
                      </span>
                    )}
                  </button>
                </li>
              </ul>
            </nav>

            {/* Bottom Contact Shortcut Panel */}
            <div className="space-y-4 w-full flex flex-col items-center lg:items-stretch">
              {isSidebarExpanded ? (
                <div className="space-y-3">
                  <div className="p-4 border border-cream-300 rounded bg-white/40 backdrop-blur-xs space-y-2.5">
                    <span className="text-[9px] font-mono text-sage-500 tracking-wider block uppercase">
                      {lang === 'zh' ? '主理人对话 / CONTACT' : 'DIRECT LINE'}
                    </span>
                    
                    <div className="space-y-1.5 text-xs text-moss-800 font-medium">
                      <button
                        onClick={() => handleQuickCopy('X-921993', 'wechat')}
                        className="w-full flex justify-between items-center hover:text-sage-500 transition group cursor-pointer"
                      >
                        <span className="opacity-70">{lang === 'zh' ? '微信 WECHAT:' : 'WECHAT:'}</span>
                        <span className="font-mono font-bold flex items-center gap-1">
                          X-921993
                          {copiedWechat ? (
                            <Check className="w-3 h-3 text-sage-500 animate-pulse" />
                          ) : (
                            <span className="text-[8px] font-normal opacity-40 group-hover:opacity-100 transition pl-1">复制</span>
                          )}
                        </span>
                      </button>

                      <button
                        onClick={() => handleQuickCopy('1160467550', 'qq')}
                        className="w-full flex justify-between items-center hover:text-sage-500 transition group cursor-pointer"
                      >
                        <span className="opacity-70">{lang === 'zh' ? '企鹅 QQ:' : 'QQ:'}</span>
                        <span className="font-mono font-bold flex items-center gap-1">
                          1160467550
                          {copiedQQ ? (
                            <Check className="w-3 h-3 text-sage-500 animate-pulse" />
                          ) : (
                            <span className="text-[8px] font-normal opacity-40 group-hover:opacity-100 transition pl-1">复制</span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToSection('manifesto')}
                    className="w-full bg-moss-800 text-cream-50 py-3 rounded text-[10px] font-semibold tracking-widest uppercase hover:bg-moss-900 transition-colors shadow-sm cursor-pointer text-center"
                  >
                    {lang === 'zh' ? '预约商业增长诊断' : 'APPOINT GROWTH AUDIT'}
                  </button>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full hover:bg-sage-50 flex items-center justify-center text-sage-400 cursor-pointer" onClick={() => setIsSidebarExpanded(true)}>
                  <MessageCircle className="w-4 h-4 animate-pulse" />
                </div>
              )}
            </div>

          </div>
        </aside>

        {/* ==========================================================
            RIGHT CONTENT AREA - SCROLL
            - Smooth spacing under `pl-[60px]` layout on desktop.
            - On Hover: left panel floats, zero visual jitter on the right!
            ========================================================== */}
        <main className="w-full lg:pl-[60px] px-6 md:px-16 xl:px-24 py-12 md:py-24 space-y-20 md:space-y-32">
          
          {/* ------------------------------------------
              00 / CONCEPT HERO SECTION (PURE TYPOGRAPHY)
              ------------------------------------------ */}
          <section id="hero" className="space-y-10 md:space-y-16 border-b border-cream-300 pb-16 md:pb-28">
            
            {/* Fine Section Label */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-sage-400 font-bold tracking-[0.2em] uppercase">00 / CONCEPT</span>
              <div className="h-px bg-cream-300 w-16" />
              <span className="text-[9px] font-mono text-sage-500 uppercase tracking-widest">ORGANIC RESPONSIVE EXPERIENCE</span>
            </div>

            {/* Giant Title Layout */}
            <div className="space-y-8 max-w-3xl">
              <h2 className="font-sans font-extrabold text-4xl md:text-5xl xl:text-6xl text-moss-800 leading-[1.2] tracking-tight">
                {lang === 'zh' ? (
                  <>
                    让商业如沐日光，
                    <span className="block text-sage-400 font-light italic mt-2">让管理轻盈落地。</span>
                  </>
                ) : (
                  <>
                    Illuminate Growth.
                    <span className="block text-sage-400 font-light italic mt-2">Simplify Management.</span>
                  </>
                )}
              </h2>
              
              <div className="h-px bg-cream-300 w-full my-6" />

              <p className="font-sans text-base md:text-lg text-moss-800 leading-relaxed font-light">
                {lang === 'zh' ? (
                  <>
                    <strong className="font-semibold text-moss-800">Sunshine 峰 — </strong>
                    数字化全链路服务商：提供专业的渠道代运营、软硬件一体化解决方案与组织效能伴跑落地。
                  </>
                ) : (
                  <>
                    <strong className="font-semibold text-moss-800">Sunshine Feng — </strong>
                    Full-link digital services: Refined channel operations, conflict-free tech integration, and organizational efficiency coaching.
                  </>
                )}
              </p>
            </div>

            {/* Subtle organic info panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <GlowCard className="p-6 bg-white/40 backdrop-blur-xs" glowColor="rgba(143, 161, 145, 0.2)">
                <span className="font-mono text-[9px] text-sage-500 tracking-wider block uppercase">/ CORE MISSION / 核心定位</span>
                <p className="text-xs text-moss-800 leading-relaxed font-light mt-2">
                  {lang === 'zh' ? '拒绝繁杂无用的汇报。专注通过对公域平台底层算法机制的透彻理解和中立设备选型，协助实体与酒店品牌获得确定性的流量与效能跨越。' : 'Ditch over-engineered visual theater. We focus purely on organic search weight, platform algorithm structures, and custom data sync setups to optimize profitability.'}
                </p>
              </GlowCard>
              <GlowCard className="p-6 bg-white/40 backdrop-blur-xs" glowColor="rgba(143, 161, 145, 0.2)">
                <span className="font-mono text-[9px] text-sage-500 tracking-wider block uppercase">/ OPERATIONAL FORCE / 落地伴跑</span>
                <p className="text-xs text-moss-800 leading-relaxed font-light mt-2">
                  {lang === 'zh' ? '不仅仅是一纸报告，而是进驻企业管理，直接打通 7x24h 智能调价收益、社客微信裂变留存、以及 OKR 和业务提成的绑定执行。' : 'Not just a PDF deliverable. We run 24/7 OTA weight ranks, build custom CRM databases, and manage daily OKR compliance audits side-by-side with your leadership.'}
                </p>
              </GlowCard>
            </div>

          </section>


          {/* ---------------------------------------------------------
              INTERACTIVE WORKSPACE (DIAGNOSIS & CALCULATOR)
              --------------------------------------------------------- */}
          <InteractiveWorkbench 
            lang={lang} 
            onCopyWechat={() => handleQuickCopy('X-921993', 'wechat')} 
          />


          {/* ---------------------------------------------------------
              01 - 05 BUSINESS SECTIONS (HARDLINE 3-PART FORMULA)
              - 1 Pain ⚡ -> 1 Solution 🎯 -> 3 Huge Success Indicators 📊
              --------------------------------------------------------- */}
          {BUSINESS_SECTIONS.map((section) => {
            return (
              <section 
                key={section.id} 
                id={section.id} 
                className="space-y-10 md:space-y-12 border-b border-cream-300 pb-16 md:pb-24 scroll-mt-24"
              >
                
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-cream-300/60 pb-4">
                  <div className="flex items-baseline gap-4">
                    {/* Sage Matte Number */}
                    <span className="font-mono font-bold text-5xl md:text-6xl text-sage-400/35 select-none leading-none">
                      {section.id}
                    </span>
                    <div>
                      <h3 className="font-sans font-extrabold text-xl md:text-2xl text-moss-800 tracking-tight">
                        {lang === 'zh' ? section.title : section.titleEn}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 mt-1 block">
                        {lang === 'zh' ? section.typeTag : section.typeTagEn}
                      </span>
                    </div>
                  </div>

                  {activeSection === section.id && (
                    <span className="text-[9px] font-mono tracking-widest text-sage-500 bg-sage-50 px-2.5 py-1 rounded border border-sage-100 self-start md:self-auto uppercase">
                      ✓ ACTIVE VIEW
                    </span>
                  )}
                </div>

                {/* Split Grid for Content and Bespoke Illustration */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-start">
                  
                  {/* Left: Core 3-Part Formula & Metrics */}
                  <div className={`space-y-8 ${section.imageUrl ? 'xl:col-span-7' : 'xl:col-span-12'}`}>
                    
                    {/* Part 1: Pain ⚡ */}
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2 text-rose-800/80 font-bold text-xs uppercase tracking-wider font-mono">
                        <ShieldAlert className="w-4.5 h-4.5 shrink-0 text-rose-500/80" />
                        <span>{lang === 'zh' ? '企业痛点 ⚡' : 'THE PAIN ⚡'}</span>
                      </div>
                      <p className="text-sm md:text-base text-moss-800 leading-relaxed font-light pl-6">
                        {lang === 'zh' ? section.pain : section.painEn}
                      </p>
                    </div>

                    {/* Part 2: Solution 🎯 */}
                    <div className="space-y-2 text-left">
                      <div className="flex items-center gap-2 text-sage-700 font-bold text-xs uppercase tracking-wider font-mono">
                        <Sparkles className="w-4.5 h-4.5 shrink-0 text-sage-400" />
                        <span>{lang === 'zh' ? '落地方案 🎯' : 'THE SOLUTION 🎯'}</span>
                      </div>
                      <p className="text-sm md:text-base text-moss-800 leading-relaxed font-semibold pl-6">
                        {lang === 'zh' ? section.solution : section.solutionEn}
                      </p>
                    </div>

                    {/* Part 3: Giant High-Contrast Indicators 📊 */}
                    <div className="pt-4 border-t border-cream-200">
                      <span className="font-mono text-[9px] tracking-widest text-sage-500 uppercase block mb-6">
                        {lang === 'zh' ? '/ 核心增长指标 HIGH-LIGHT METRICS' : '/ CORE METRICS'}
                      </span>
                      
                      {/* Elegant horizontal grid of indicators */}
                      <div className="grid grid-cols-3 gap-4 md:gap-6">
                        {section.metrics.map((metric, mIdx) => (
                          <div key={mIdx} className="space-y-1.5 select-none border-l-2 border-sage-100 pl-3 md:pl-4 py-1">
                            <div className="text-[10px] md:text-xs text-sage-500 font-mono tracking-wider min-h-[1.5rem] leading-tight">
                              {lang === 'zh' ? metric.label : metric.labelEn}
                            </div>
                            <div className="flex items-baseline flex-wrap gap-1">
                              <span className="font-sans font-black text-2xl md:text-3xl xl:text-4xl text-moss-800 tracking-tighter">
                                {metric.value || (metric.direction === 'up' ? '↑' : metric.direction === 'down' ? '↓' : '—')}
                              </span>
                              
                              <span className="text-[10px] font-mono text-sage-500 uppercase tracking-widest ml-1 shrink-0">
                                {metric.labelEn}
                                {metric.value && metric.direction === 'up' && ' ↑'}
                                {metric.value && metric.direction === 'down' && ' ↓'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Minimalist Action Call inside the column */}
                    <div className="pt-4">
                      <CopyButton 
                        value={section.actionValue} 
                        text={lang === 'zh' ? section.actionText : section.actionTextEn} 
                        subText={lang === 'zh' ? section.actionSub : section.actionSubEn}
                        type={section.actionType}
                      />
                    </div>

                  </div>

                  {/* Right: Bespoke Editorial Illustration */}
                  {section.imageUrl && (
                    <div className="space-y-3 xl:col-span-5 w-full xl:sticky xl:top-24">
                      <div className="relative group overflow-hidden rounded-lg border border-cream-300 bg-cream-100/30 aspect-[4/3] flex items-center justify-center shadow-xs">
                        <div className="absolute inset-0 bg-gradient-to-tr from-sage-400/5 via-transparent to-transparent pointer-events-none z-10" />
                        <img 
                          src={section.imageUrl} 
                          alt={lang === 'zh' ? section.title : section.titleEn} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-sage-500 tracking-wider px-1">
                        <span>[ FIG. {section.id}.A — SYSTEM STRUCTURE ]</span>
                        <span className="opacity-60">{lang === 'zh' ? 'Sunshine 专属设计' : 'Bespoke Concept Design'}</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Sub-details (collapsed as secondary info to strictly respect 'extreme clean' but preserve information richness) */}
                <div className="bg-white/30 rounded border border-cream-300 p-5 mt-8 space-y-4">
                  <span className="font-mono text-[9px] tracking-widest text-sage-500 uppercase block">
                    {lang === 'zh' ? '—— 深度执行动作 DEPLOYMENT PATH ——' : '—— DEPLOYMENT DETAILS ——'}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="space-y-1.5">
                        <h4 className="font-sans font-bold text-xs text-moss-800 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                          <span>{lang === 'zh' ? bullet.title : bullet.titleEn}</span>
                        </h4>
                        <p className="text-[11px] text-sage-700 leading-relaxed font-light">
                          {lang === 'zh' ? bullet.content : bullet.contentEn}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </section>
            );
          })}


          {/* ------------------------------------------
              06 / THE MANIFESTO (OUTCOME-DRIVEN)
              ------------------------------------------ */}
          <section id="manifesto" className="space-y-12 md:space-y-16 pb-8 scroll-mt-24">
            
            {/* Section Label */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-sage-400 font-bold tracking-[0.2em] uppercase">06 / PHILOSOPHY</span>
              <div className="h-px bg-cream-300 w-16" />
              <span className="text-[9px] font-mono text-sage-500 uppercase tracking-widest">OUTCOME GUARANTEE</span>
            </div>

            {/* Title */}
            <div className="space-y-4 max-w-2xl">
              <h3 className="font-sans font-extrabold text-3xl md:text-4xl text-moss-800 tracking-tight leading-none">
                {lang === 'zh' ? '我们的底层逻辑宣言' : 'THE PRINCIPLE MANIFESTO'}
              </h3>
              <p className="text-[10px] font-mono tracking-widest text-sage-500 uppercase">
                {lang === 'zh' ? '— 如何杜绝数字化浪费与形式空转' : '— ERADICATING DIGITAL WASTE & PROCEDURAL THEATER'}
              </p>
            </div>

            {/* 3-Column Minimalist White Box Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MANIFESTO_ITEMS.map((item, idx) => (
                <GlowCard 
                  key={idx} 
                  className="p-6 flex flex-col justify-between h-full bg-white/45 backdrop-blur-xs"
                  glowColor="rgba(143, 161, 145, 0.16)"
                >
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-sage-500 font-bold block">
                      06.{idx+1} /
                    </span>
                    
                    <div className="space-y-1.5">
                      <h4 className="font-sans font-extrabold text-base text-moss-800">
                        {lang === 'zh' ? item.title : item.titleEn}
                      </h4>
                      <p className="text-[11px] font-semibold text-sage-500 leading-normal">
                        {lang === 'zh' ? item.tagline : item.taglineEn}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-sage-700 leading-relaxed font-light pt-6 border-t border-cream-200 mt-6">
                    {lang === 'zh' ? item.description : item.descriptionEn}
                  </p>
                </GlowCard>
              ))}
            </div>

            {/* Bottom Dark callout */}
            <div className="bg-moss-800 text-cream-50 rounded p-8 md:p-12 space-y-8 border border-sage-700 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[30%] h-[300px] bg-gradient-to-bl from-sage-400/10 to-transparent pointer-events-none" />
              
              <div className="space-y-3 relative z-10 max-w-2xl">
                <span className="font-mono text-[9px] text-sage-200 tracking-widest uppercase block">
                  {lang === 'zh' ? '开启保姆式增长伴跑 / INSTANT AUDIT' : 'RECLAIM YOUR VALUE'}
                </span>
                <h4 className="font-sans font-extrabold text-xl md:text-3xl tracking-tight leading-tight text-white">
                  {lang === 'zh' ? '准备好摆脱数字化形式主义，获取免费渠道诊断吗？' : 'Ready to bypass procedure theatre and gain real algorithmic velocity?'}
                </h4>
                <p className="text-xs text-cream-100 font-light leading-relaxed">
                  {lang === 'zh' ? (
                    '直接联络 “Sunshine 峰” 主理人。不提供泛泛的 PPT 报告，我们携带落地的执行指标与底层算法规则，直接进驻现场看火候。'
                  ) : (
                    'Contact the principal of Sunshine Solutions. We do not write generic slide reports. We deploy hard metrics, operational compliance, and raw algorithmic knowledge.'
                  )}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2 relative z-10">
                <Magnetic>
                  <CopyButton 
                    value="X-921993" 
                    text={lang === 'zh' ? "即刻复制微信：X-921993" : "Copy WeChat: X-921993"} 
                    subText={lang === 'zh' ? "获取免费金牌算法诊断" : "Get Free Performance Audit"} 
                    type="wechat" 
                  />
                </Magnetic>
                <Magnetic>
                  <CopyButton 
                    value="1160467550" 
                    text={lang === 'zh' ? "即刻联系 QQ：1160467550" : "Copy QQ: 1160467550"} 
                    subText={lang === 'zh' ? "避坑系统软件及硬件采购" : "Avoid hardware & software trap"} 
                    type="qq" 
                  />
                </Magnetic>
              </div>

              {/* Decorative credit lines */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-[9px] font-mono text-sage-200 border-t border-sage-700 pt-6 mt-4 gap-2">
                <a href="mailto:sunshine933.993@gmail.com" className="hover:text-cream-50 hover:underline transition-colors">sunshine933.993@gmail.com</a>
                <span>Sunshine 峰-解决方案 ｜ Full-Link Digital Operations Co.</span>
              </div>
            </div>

          </section>

          {/* Core Footer */}
          <footer className="text-center font-mono text-[9px] text-sage-500 border-t border-cream-300 pt-8 pb-12 space-y-1">
            <p>© 2026 Sunshine 峰-解决方案 / Sunshine Solutions. All Rights Reserved.</p>
            <p>Designed under strict minimalist editorial guidelines. Built with high performance systems.</p>
          </footer>

        </main>
        
      </div>

    </div>
  );
}
