import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Calculator, 
  TrendingUp, 
  Clock, 
  Coins, 
  ArrowRight, 
  Terminal, 
  Check, 
  Copy, 
  RotateCcw,
  MessageCircle,
  HelpCircle,
  Building,
  Target
} from 'lucide-react';

interface InteractiveWorkbenchProps {
  lang: 'zh' | 'en';
  onCopyWechat: () => void;
}

export const InteractiveWorkbench: React.FC<InteractiveWorkbenchProps> = ({ lang, onCopyWechat }) => {
  const [activeTab, setActiveTab] = useState<'diagnose' | 'calculator'>('diagnose');
  
  // AI Diagnosis Form States
  const [industry, setIndustry] = useState<string>('hotel');
  const [scale, setScale] = useState<string>('mid');
  const [currentRevenue, setCurrentRevenue] = useState<string>('10-50万');
  const [bottleneck, setBottleneck] = useState<string>('');
  
  // AI Loading & Result States
  const [loading, setLoading] = useState<boolean>(false);
  const [logIndex, setLogIndex] = useState<number>(0);
  const [diagResult, setDiagResult] = useState<string>('');
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // ROI Calculator States
  const [calcTrack, setCalcTrack] = useState<string>('hotel');
  const [monthlyRev, setMonthlyRev] = useState<number>(150000);
  const [ticketValue, setTicketValue] = useState<number>(150);

  const logs = [
    lang === 'zh' ? '[SYS] 正在连接 Sunshine 峰商业模型库与数据库...' : '[SYS] Connecting to Sunshine commercial database...',
    lang === 'zh' ? '[ALGO] 分析行业公域算法及曝光权重曲线...' : '[ALGO] Analyzing OTA search weight algorithms...',
    lang === 'zh' ? '[GROWTH] 适配 Sunshine 餐饮 OMO 私域裂变模型...' : '[GROWTH] Mapping custom F&B OMO retention paths...',
    lang === 'zh' ? '[EFFICIENCY] 评估组织 OKR 与业务工具集成空间...' : '[EFFICIENCY] Auditing tool-level business flow bottlenecks...',
    lang === 'zh' ? '[AI] 正在生成深度落地的实操改进报告...' : '[AI] Formatting customized commercial growth audit...'
  ];

  // Log simulation sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading && logIndex < logs.length) {
      timer = setTimeout(() => {
        setLogIndex(prev => prev + 1);
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [loading, logIndex]);

  // Submit AI Diagnosis
  const handleStartDiagnose = async () => {
    if (!bottleneck.trim()) {
      setErrorMsg(lang === 'zh' ? '⚠️ 请输入您的核心痛点或商业瓶颈现状' : '⚠️ Please input your primary bottlenecks or pain points.');
      setTimeout(() => setErrorMsg(''), 4000);
      return;
    }

    setLoading(true);
    setLogIndex(0);
    setDiagResult('');
    
    try {
      const payload = {
        industry: getIndustryName(industry),
        scale: getScaleName(scale),
        currentRevenue,
        bottleneck
      };

      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
      
      // Delay setting the result slightly so the log animation finishes beautifully
      setTimeout(() => {
        setDiagResult(data.result);
        setLoading(false);
      }, 1000);

    } catch (err: any) {
      console.error(err);
      setDiagResult(
        lang === 'zh' 
          ? '### ❌ 诊断请求发生错误\n\n请检查您的网络连接，或直接点击页面下方的「联系主理人微信」获取一对一真人诊断服务。' 
          : '### ❌ Diagnosis request failed\n\nPlease check your connection, or contact our principal consultant via WeChat directly at the bottom.'
      );
      setLoading(false);
    }
  };

  const getIndustryName = (val: string) => {
    const mapping: Record<string, string> = {
      hotel: '酒店民宿 / 精品住宿托管',
      fnb: '餐饮商超 / OMO 零售',
      saas: '企业组织 / SaaS 效率体系',
      other: '其他线下连锁 / 实体服务'
    };
    return mapping[val] || val;
  };

  const getScaleName = (val: string) => {
    const mapping: Record<string, string> = {
      small: '初创规模 (< 10人)',
      mid: '成长型团队 (10-50人)',
      large: '中大型企业 (> 50人)'
    };
    return mapping[val] || val;
  };

  const handleCopyReport = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(diagResult);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = diagResult;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  // Preset bottleneck helper
  const handleApplyPreset = (text: string) => {
    setBottleneck(text);
  };

  // Custom Inline Markdown Renderer for rich layouts without external dependency mismatches
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // H3 Title
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-sans font-extrabold text-base text-moss-800 mt-6 mb-3 border-l-4 border-sage-400 pl-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse" />
            {line.replace('### ', '')}
          </h4>
        );
      }
      // H2 Title
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-sans font-black text-lg text-moss-800 mt-8 mb-4 border-b border-cream-200 pb-2">
            {line.replace('## ', '')}
          </h3>
        );
      }
      // Bullet lists
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const cleanText = line.replace(/^[-*]\s+/, '');
        return (
          <li key={idx} className="text-xs md:text-sm text-sage-800 leading-relaxed font-light ml-4 list-disc mb-1.5 pl-1">
            {renderInlineFormatting(cleanText)}
          </li>
        );
      }
      // Empty spaces
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }
      // Normal Paragraphs
      return (
        <p key={idx} className="text-xs md:text-sm text-sage-800 leading-relaxed font-light mb-3">
          {renderInlineFormatting(line)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-moss-800 bg-sage-50 px-1 py-0.5 rounded border border-sage-100/50">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Dynamic ROI Calculations
  const getROIMetrics = () => {
    let boostPercent = 0;
    let savedHours = 0;
    let advice = '';
    let adviceEn = '';
    
    switch (calcTrack) {
      case 'hotel':
        boostPercent = 22; // 22% room yield increase on average
        savedHours = 52;   // 52h operational work saved
        advice = '通过OTA动态竞价及多渠道托管，我们将直接重塑您的权重层级，抢回同价位公域流量。';
        adviceEn = 'Via dynamic OTA bidding and cross-channel optimization, we instantly rebuild your page weight layers to secure public traffic.';
        break;
      case 'fnb':
        boostPercent = 18; // 18% GMV increase
        savedHours = 40;   // 40h marketing setup saved
        advice = '采用OMO软硬件闭环点单，构建小程序裂变体系，打通高复购会员社群路径。';
        adviceEn = 'Deploy OMO loop ordering, setup micro-program referrals, and construct highly repetitive community loyalty networks.';
        break;
      case 'saas':
        boostPercent = 30; // 30% execution rate increase
        savedHours = 80;   // 80h cross-team sync saved
        advice = '将核心绩效与 OKR 直观工具流挂钩，破除跨部门沟通壁垒，落实敏捷看板追踪。';
        adviceEn = 'Align key business rewards with transparent OKR tools, breaking cross-dept walls via agile scrum visual boards.';
        break;
      case 'csm':
        boostPercent = 25; // 25% customer lifetime value increase
        savedHours = 60;   // 60h manual client care saved
        advice = '搭建健康度巡检与全自动触发流，防止核心客户流失，盘活存量资产。';
        adviceEn = 'Construct health-index checks and auto-triggered sequences to reduce churn and double down on lifetime LTV.';
        break;
      case 'web':
        boostPercent = 35; // 35% conversion boost
        savedHours = 45;   // 45h graphic design revision saved
        advice = '定制极致流畅的高转化交互式数字官方阵地，摆脱模板化千篇一律，建立绝对专业度。';
        adviceEn = 'Build bespoke hyper-fluent performance landing stages to evade generic boilerplate templates and elevate brand power.';
        break;
    }

    const newRev = Math.round(monthlyRev * (1 + boostPercent / 100));
    const deltaRev = newRev - monthlyRev;
    const extraCust = Math.round(deltaRev / ticketValue);

    return {
      boostPercent,
      savedHours,
      newRev,
      deltaRev,
      extraCust,
      advice: lang === 'zh' ? advice : adviceEn
    };
  };

  const roi = getROIMetrics();

  return (
    <section id="diagnose" className="space-y-10 md:space-y-12 border-b border-cream-300 pb-16 md:pb-24 scroll-mt-24">
      
      {/* Tab Switcher & Headline */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 border-b border-cream-300/60 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] text-sage-400 font-bold tracking-[0.15em] uppercase">01 / INTERACTIVE WORKBENCH</span>
            <div className="h-px bg-cream-300 w-8" />
            <span className="text-[9px] font-mono text-sage-500 uppercase tracking-widest">{lang === 'zh' ? '数字化效能工具箱' : 'GROWTH SANDBOX'}</span>
          </div>
          <h3 className="font-sans font-black text-2xl md:text-3xl text-moss-800 tracking-tight">
            {lang === 'zh' ? 'Sunshine 峰 · 数字化增长工作台' : 'Sunshine Digital Workbench'}
          </h3>
        </div>

        {/* Custom Pill Selector */}
        <div className="flex bg-cream-200/50 p-1 rounded-xl border border-cream-300 self-start md:self-auto select-none">
          <button
            onClick={() => { setActiveTab('diagnose'); setDiagResult(''); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'diagnose' 
                ? 'bg-moss-800 text-cream-50 shadow-sm' 
                : 'text-sage-600 hover:text-moss-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {lang === 'zh' ? '智能商业诊断' : 'AI Growth Audit'}
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === 'calculator' 
                ? 'bg-moss-800 text-cream-50 shadow-sm' 
                : 'text-sage-600 hover:text-moss-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            {lang === 'zh' ? '数字化 ROI 计算器' : 'Growth & ROI Calculator'}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'diagnose' ? (
          <motion.div
            key="diagnose"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-start"
          >
            
            {/* Left Column: Form Details */}
            <div className="xl:col-span-6 space-y-6 bg-white/40 border border-cream-300/80 p-6 rounded-2xl backdrop-blur-xs">
              
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-sage-500 uppercase block">
                  {lang === 'zh' ? '// 1. 输入企业现状' : '// 1. SPECIFY BUSINESS STATUS'}
                </span>

                {/* Industry Selection */}
                <div className="space-y-2">
                  <label className="text-xs text-moss-800 font-bold block">{lang === 'zh' ? '行业赛道 / Industry Category' : 'Industry Category'}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'hotel', label: '精品酒店/民宿', labelEn: 'Hotel & Lodging' },
                      { id: 'fnb', label: '餐饮/商超零售', labelEn: 'F&B & Retail' },
                      { id: 'saas', label: '企业服务/软件', labelEn: 'SaaS & Agency' },
                      { id: 'other', label: '其他连锁实体', labelEn: 'Other Chain Stores' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setIndustry(item.id)}
                        className={`px-3 py-2.5 rounded-xl border text-xs text-left font-medium transition cursor-pointer flex items-center gap-2 ${
                          industry === item.id 
                            ? 'bg-sage-100/80 text-moss-900 border-sage-400 font-semibold' 
                            : 'bg-white/60 text-sage-600 border-cream-200 hover:border-sage-200'
                        }`}
                      >
                        <Building className="w-3.5 h-3.5 text-sage-400 shrink-0" />
                        <span className="whitespace-normal break-words leading-tight flex-1">{lang === 'zh' ? item.label : item.labelEn}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scale Selection */}
                <div className="space-y-2">
                  <label className="text-xs text-moss-800 font-bold block">{lang === 'zh' ? '团队规模 / Organization Scale' : 'Organization Scale'}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'small', label: '初创 (<10人)', labelEn: '< 10 members' },
                      { id: 'mid', label: '成长 (10-50人)', labelEn: '10-50 members' },
                      { id: 'large', label: '中大 (>50人)', labelEn: '> 50 members' }
                    ].map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setScale(item.id)}
                        className={`px-2 py-3 rounded-xl border text-[11px] sm:text-xs text-center font-medium transition cursor-pointer flex items-center justify-center ${
                          scale === item.id 
                            ? 'bg-sage-100/80 text-moss-900 border-sage-400 font-semibold' 
                            : 'bg-white/60 text-sage-600 border-cream-200 hover:border-sage-200'
                        }`}
                      >
                        <span className="whitespace-normal break-words leading-tight">{lang === 'zh' ? item.label : item.labelEn}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Monthly Revenue Selection */}
                <div className="space-y-2">
                  <label className="text-xs text-moss-800 font-bold block">{lang === 'zh' ? '当前月度GMV规模 / Monthly GMV' : 'Monthly GMV'}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['<10万', '10-50万', '50-200万', '200万+'].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setCurrentRevenue(val)}
                        className={`px-1.5 py-3 rounded-xl border text-[11px] sm:text-xs text-center font-medium transition cursor-pointer flex items-center justify-center ${
                          currentRevenue === val 
                            ? 'bg-sage-100/80 text-moss-900 border-sage-400 font-semibold' 
                            : 'bg-white/60 text-sage-600 border-cream-200 hover:border-sage-200'
                        }`}
                      >
                        <span className="whitespace-normal break-words leading-tight">{val}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Bottleneck */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-moss-800 font-bold block">{lang === 'zh' ? '最急需解决的核心痛点 / Core Bottleneck' : 'Core Bottleneck'}</label>
                    <span className="text-[10px] text-sage-400 font-mono tracking-wider select-none">[ 20-200 字 ]</span>
                  </div>
                  <textarea
                    rows={4}
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    placeholder={
                      lang === 'zh' 
                        ? '例如：精品民宿美团排名做不上来，OTA佣金越来越贵；或者线下点单效率太低，服务员经常手忙脚乱，想做私域复购却无从下手。' 
                        : 'e.g., Hotel OTA listing rank remains stagnant, commissions are high. Or, restaurant ordering flow is inefficient, and repeated customer retention rate is very poor.'
                    }
                    className="w-full bg-white/70 border border-cream-300 rounded-xl px-4 py-3 text-xs text-moss-800 focus:outline-none focus:border-sage-400 placeholder:text-sage-400/70 resize-none font-light leading-relaxed"
                  />
                  
                  {/* Preset helpers */}
                  <div className="pt-1.5 space-y-1">
                    <span className="text-[10px] font-mono text-sage-400 block">{lang === 'zh' ? '快速置入模拟痛点场景：' : 'Quick Presets:'}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { 
                          text: '精品酒店OTA曝光暴跌，想做调价算法抢占商圈头部流量。',
                          label: '🏨 酒店客流量低'
                        },
                        { 
                          text: '餐饮门店虽然顾客多但外卖扣点高，不知道怎么引流微信群实现私域留存。',
                          label: '🍲 餐饮复购差'
                        },
                        { 
                          text: '多店异地连锁管理混乱，OKR推行不下去，缺少趁手的工具打通。',
                          label: '📊 组织效率低下'
                        }
                      ].map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleApplyPreset(preset.text)}
                          className="text-[10px] font-sans px-2.5 py-1 rounded bg-cream-100 hover:bg-cream-200 border border-cream-300 text-moss-800 transition active:scale-95 cursor-pointer font-light"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Submit button */}
                <div className="pt-3 space-y-2">
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-50 text-red-800 border border-red-150 px-3.5 py-2.5 rounded-xl text-[11px] font-medium flex items-center gap-2 shadow-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                        <span>{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <button
                    onClick={handleStartDiagnose}
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-semibold tracking-widest text-xs uppercase flex items-center justify-center gap-2 transition duration-300 ${
                      loading 
                        ? 'bg-moss-800/65 text-cream-50 cursor-not-allowed' 
                        : 'bg-moss-800 text-cream-50 hover:bg-moss-900 shadow-sm cursor-pointer'
                    }`}
                  >
                    <Sparkles className={`w-4 h-4 text-sage-400 ${loading ? 'animate-spin' : ''}`} />
                    {loading ? (lang === 'zh' ? 'Sunshine AI 分析引擎诊断中...' : 'ANALYZING DIAGNOSIS...') : (lang === 'zh' ? '获取 Sunshine 定制商业报告' : 'GET BESPOKE AI REPORT')}
                  </button>
                </div>

              </div>

            </div>

            {/* Right Column: Dynamic Terminal Logs / Markdown Result View */}
            <div className="xl:col-span-6 h-full flex flex-col justify-stretch">
              <div className="bg-moss-900 border border-moss-950 rounded-2xl overflow-hidden shadow-lg flex flex-col flex-grow min-h-[460px]">
                
                {/* Terminal Header */}
                <div className="bg-moss-950/80 px-4 py-3 flex items-center justify-between border-b border-moss-950 select-none">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-sage-400" />
                    <span className="font-mono text-[10px] text-sage-400 font-bold tracking-wider">SUNSHINE_DIAGNOSTIC_LOGGER_v3.5</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                </div>

                {/* Content Panel */}
                <div className="p-6 font-mono text-[11px] text-sage-300 leading-relaxed overflow-y-auto flex-grow flex flex-col max-h-[480px]">
                  
                  {/* Idle State */}
                  {!loading && !diagResult && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 py-12 select-none">
                      <div className="w-12 h-12 rounded-full border border-sage-500/20 bg-moss-950 flex items-center justify-center text-sage-400 animate-pulse">
                        <Target className="w-6 h-6 text-sage-400" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-cream-50 font-sans font-bold text-xs">{lang === 'zh' ? '等待输入诊断现状' : 'Awaiting Business Input'}</p>
                        <p className="text-[10px] text-sage-400 max-w-xs leading-relaxed font-light font-sans">
                          {lang === 'zh' ? '在左侧指定您的赛道和痛点，Sunshine AI 专家库将为您梳理收益与效能阻力，定制核心板块执行动作。' : 'Fill in your parameters. Sunshine algorithm library will compute direct leverage vectors and tactical plans.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Active Simulation Logger State */}
                  {loading && (
                    <div className="space-y-4 py-4 flex-grow">
                      <div className="flex items-center gap-2 text-sage-400 font-bold animate-pulse text-xs">
                        <span className="w-2 h-2 rounded-full bg-sage-400 animate-ping" />
                        <span>{lang === 'zh' ? '正在进行深度计算诊断...' : 'Executing high-dimensional optimization checks...'}</span>
                      </div>
                      
                      <div className="h-px bg-sage-500/20 w-full" />

                      <div className="space-y-2.5">
                        {logs.slice(0, logIndex + 1).map((log, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-2 text-sage-300">
                            <span className="text-sage-500 shrink-0">⚡</span>
                            <span className="font-mono text-[10px] break-all">{log}</span>
                          </div>
                        ))}
                      </div>

                      {logIndex === logs.length && (
                        <div className="text-[10px] text-cream-100 font-bold animate-bounce pt-4">
                          [OK] {lang === 'zh' ? '报告打包中，即刻呈现...' : 'Assembling full-scale digital audit...'}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Diagnosed Result Output */}
                  {!loading && diagResult && (
                    <div className="bg-cream-50/98 text-moss-800 p-5 rounded-xl border border-cream-200 overflow-y-auto max-h-[420px] font-sans scrollbar-thin">
                      
                      {/* Control Panel inside results */}
                      <div className="flex items-center justify-between border-b border-cream-200 pb-3 mb-4 select-none">
                        <span className="text-[10px] font-mono tracking-widest text-sage-500 font-bold">
                          {lang === 'zh' ? '✓ SUNSHINE 峰定制报告' : '✓ GROWTH DIAGNOSTIC'}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={handleCopyReport}
                            className="flex items-center gap-1 text-[10px] font-mono border border-cream-300 px-2 py-1 rounded bg-white hover:bg-sage-50 text-moss-800 font-semibold cursor-pointer active:scale-95 transition"
                          >
                            {copiedReport ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-sage-500" />}
                            {copiedReport ? (lang === 'zh' ? '已复制' : 'COPIED') : (lang === 'zh' ? '复制报告' : 'COPY REPORT')}
                          </button>
                          
                          <button
                            onClick={() => { setDiagResult(''); setBottleneck(''); }}
                            className="flex items-center gap-1 text-[10px] font-mono border border-cream-300 px-2 py-1 rounded bg-white hover:bg-sage-50 text-moss-800 font-semibold cursor-pointer active:scale-95 transition"
                          >
                            <RotateCcw className="w-3 h-3 text-sage-500" />
                            {lang === 'zh' ? '重新诊断' : 'RESET'}
                          </button>
                        </div>
                      </div>

                      {/* Rendered Markdown report */}
                      <div className="space-y-4">
                        {renderMarkdown(diagResult)}
                      </div>

                      {/* Sticky WeChat Prompt inside Report */}
                      <div className="mt-6 border-t border-cream-200 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-sage-50/40 p-3 rounded-lg">
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono font-bold text-sage-500 block">NEXT STEP / 真人入驻</span>
                          <span className="text-xs text-moss-800 leading-tight block font-semibold">
                            {lang === 'zh' ? '联系 Sunshine 峰主理人微信开始深度托管。' : 'Talk with principal directly on WeChat.'}
                          </span>
                        </div>
                        <button
                          onClick={onCopyWechat}
                          className="bg-moss-800 text-cream-50 text-[10px] font-bold py-2 px-3 rounded uppercase tracking-wider hover:bg-moss-900 transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-sage-400" />
                          {lang === 'zh' ? '加主理人微信 X-921993' : 'WeChat X-921993'}
                        </button>
                      </div>

                    </div>
                  )}

                </div>

              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-12 items-start"
          >
            
            {/* Left Column: Sliders */}
            <div className="xl:col-span-6 space-y-6 bg-white/40 border border-cream-300/80 p-6 rounded-2xl backdrop-blur-xs">
              
              <div className="space-y-5">
                <span className="text-[10px] font-mono tracking-widest text-sage-500 uppercase block">
                  {lang === 'zh' ? '// 1. 选择增长服务板块' : '// 1. SELECT TARGET ENGINE'}
                </span>

                {/* Track Selector */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {[
                    { id: 'hotel', label: '酒店 OTA', labelEn: 'Hotel OTA' },
                    { id: 'fnb', label: '餐饮 OMO', labelEn: 'F&B OMO' },
                    { id: 'saas', label: '组织 OKR', labelEn: 'Org OKR' },
                    { id: 'csm', label: '客户 CSM', labelEn: 'LTV CSM' },
                    { id: 'web', label: '数字 WEB', labelEn: 'Bespoke WEB' }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setCalcTrack(item.id)}
                      className={`px-2 py-3 rounded-xl border text-[10px] sm:text-[11px] md:text-xs text-center font-bold transition duration-300 cursor-pointer flex items-center justify-center ${
                        calcTrack === item.id 
                          ? 'bg-sage-100 text-moss-900 border-sage-400' 
                          : 'bg-white text-sage-500 border-cream-200 hover:border-cream-300 hover:text-moss-800'
                      }`}
                    >
                      <span className="whitespace-normal break-words leading-tight">{lang === 'zh' ? item.label : item.labelEn}</span>
                    </button>
                  ))}
                </div>

                <div className="h-px bg-cream-200" />

                {/* Slider 1: Revenue */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs text-moss-800 font-bold">{lang === 'zh' ? '当前月度总营业额 / Monthly Revenue' : 'Monthly Revenue'}</label>
                    <span className="font-mono text-sm font-extrabold text-sage-500">
                      ¥ {monthlyRev.toLocaleString()}
                    </span>
                  </div>
                  <input 
                    type="range"
                    min={10000}
                    max={1000000}
                    step={10000}
                    value={monthlyRev}
                    onChange={(e) => setMonthlyRev(Number(e.target.value))}
                    className="w-full accent-sage-500 h-1 bg-cream-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-sage-400 font-mono select-none">
                    <span>¥ 10,000</span>
                    <span>¥ 500,000</span>
                    <span>¥ 1,000,000</span>
                  </div>
                </div>

                {/* Slider 2: Average Ticket Value */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <label className="text-xs text-moss-800 font-bold">{lang === 'zh' ? '客单价 / Average Order Value' : 'Average Order Value'}</label>
                    <span className="font-mono text-sm font-extrabold text-sage-500">
                      ¥ {ticketValue}
                    </span>
                  </div>
                  <input 
                    type="range"
                    min={10}
                    max={1000}
                    step={10}
                    value={ticketValue}
                    onChange={(e) => setTicketValue(Number(e.target.value))}
                    className="w-full accent-sage-500 h-1 bg-cream-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-sage-400 font-mono select-none">
                    <span>¥ 10</span>
                    <span>¥ 500</span>
                    <span>¥ 1,000</span>
                  </div>
                </div>

                {/* Track dynamic info panel */}
                <div className="border border-cream-300 p-4 rounded-xl bg-sage-50/20 mt-4">
                  <span className="text-[9px] font-mono tracking-widest text-sage-500 uppercase block mb-1">
                    {lang === 'zh' ? 'SUNSHINE 战略动作点' : 'TACTICAL ADVICE'}
                  </span>
                  <p className="text-xs text-moss-800 leading-relaxed font-light">
                    {roi.advice}
                  </p>
                </div>

              </div>

            </div>

            {/* Right Column: Calculations Outputs */}
            <div className="xl:col-span-6 space-y-6">
              
              <div className="bg-moss-800 border border-sage-700/30 text-cream-50 p-6 rounded-2xl shadow-md space-y-6 select-none relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-sage-400/5 via-transparent to-transparent pointer-events-none" />

                <span className="text-[10px] font-mono tracking-widest text-sage-400 uppercase block">
                  {lang === 'zh' ? '// 2. 数字化转型预估产出' : '// 2. ESTIMATED ROI PREDICTION'}
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Dynamic Indicators */}
                  <div className="p-4 border border-sage-700 rounded-xl bg-moss-900/60 space-y-1">
                    <span className="text-[10px] text-sage-400 font-mono tracking-wider block uppercase">{lang === 'zh' ? '预估平均营收提升' : 'REVENUE BOOST RATIO'}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-sans font-black text-3xl text-sage-300">+{roi.boostPercent}%</span>
                      <span className="text-[9px] font-mono text-sage-500 uppercase">/ {lang === 'zh' ? '行业基准' : 'benchmark'}</span>
                    </div>
                  </div>

                  <div className="p-4 border border-sage-700 rounded-xl bg-moss-900/60 space-y-1">
                    <span className="text-[10px] text-sage-400 font-mono tracking-wider block uppercase">{lang === 'zh' ? '每月释放繁琐工时' : 'RELEASED WORK-HOURS'}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-sans font-black text-3xl text-sage-300">~{roi.savedHours}h</span>
                      <span className="text-[9px] font-mono text-sage-500 uppercase">/ {lang === 'zh' ? '每月人效' : 'monthly'}</span>
                    </div>
                  </div>

                </div>

                <div className="h-px bg-sage-700/60 w-full" />

                <div className="space-y-4">
                  
                  {/* Detailed Metric List */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-sage-300 font-light">{lang === 'zh' ? '优化后预估月营业额 / Optimized Monthly Revenue' : 'Optimized Revenue'}</span>
                    <span className="font-mono font-extrabold text-sm text-sage-300">¥ {roi.newRev.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-sage-300 font-light">{lang === 'zh' ? '净增长月营收空间 / Monthly Incremental GMV' : 'Monthly Growth Space'}</span>
                    <span className="font-mono font-black text-base text-emerald-400">
                      +¥ {roi.deltaRev.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-sage-300 font-light">{lang === 'zh' ? '每月预估新增服务客群数 / Monthly Extra Customers' : 'Additional Monthly Customers'}</span>
                    <span className="font-mono font-extrabold text-sm text-sage-300">{roi.extraCust} {lang === 'zh' ? '位客户' : 'customers'}</span>
                  </div>

                </div>

                <div className="h-px bg-sage-700/60 w-full" />

                {/* Call to action direct line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-moss-900 p-4 rounded-xl border border-sage-700/50">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono font-bold text-sage-400 block uppercase">ROI VERIFICATION / 实地测算</span>
                    <span className="text-xs text-cream-100 font-semibold block">
                      {lang === 'zh' ? '需要结合实地报表的定制商业账目诊断？' : 'Request dynamic audits based on actual receipts?'}
                    </span>
                  </div>
                  <button
                    onClick={onCopyWechat}
                    className="bg-cream-50 hover:bg-cream-150 text-moss-800 text-[10px] font-bold py-2.5 px-4 rounded-lg uppercase tracking-wider transition duration-300 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-sage-500" />
                    {lang === 'zh' ? '联系主理人微信' : 'Contact Principal'}
                  </button>
                </div>

              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
