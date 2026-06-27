import { BusinessSection, ManifestoItem } from './types';
import hotelOtaImage from './assets/images/hotel_ota_operations_new_1782592478739.jpg';
import fBImage from './assets/images/fnb_omo_integration_new_1782592495425.jpg';
import orgImage from './assets/images/org_efficiency_new_1782592508535.jpg';
import csmImage from './assets/images/csm_retention_new_1782592523198.jpg';
import webImage from './assets/images/bespoke_web_new_1782592537574.jpg';

export const BUSINESS_SECTIONS: BusinessSection[] = [
  {
    id: "01",
    title: "酒店 OTA 平台全渠道托管",
    titleEn: "Hotel OTA Omni-Channel Operations & Management",
    typeTag: "全生命周期收益管理托管",
    typeTagEn: "Full-Lifecycle Revenue Management",
    pain: "不懂渠道平台算法推荐规则、店铺流量低排名垫底、被动陷入自杀式恶性价格战，看着空白的每日订单和昂贵的公域流失，只能眼睁睁被低价内卷死。",
    painEn: "Totally blind to Meituan/Ctrip algorithm rules, bottom-tier search rankings, trapped in suicidal pricing races, watching daily empty bookings while being squeezed dry by low-price competition.",
    solution: "精细化全渠道权重优化与动态收益管理，提供 7x24h 智能动态调价与房态控制，实现 RevPAR 最大化。",
    solutionEn: "Refined omni-channel weight optimization and dynamic revenue management for 24/7 smart pricing and room status control to maximize your RevPAR.",
    bullets: [
      {
        title: "全渠道算法权重优化",
        titleEn: "Omni-Channel Algorithm Weight Optimization",
        content: "深度解析美团、携程、飞猪、同程及抖音本地生活排名算法，通过金牌/钻级商户指标拆解、视觉VI翻新、房型差异化定价，全面拉升平台曝光量（PV）与点击转化率。",
        contentEn: "In-depth analysis of Meituan, Ctrip, Fliggy, Tongcheng, and Douyin algorithm mechanics. Boost platform pageviews (PV) and click-through rates via gold/diamond merchant metrics, visual VI upgrades, and differential room pricing."
      },
      {
        title: "动态收益管理 (Revenue Management)",
        titleEn: "Dynamic Revenue Management",
        content: "基于大数据进行供需预测，建立动态调价机制与房态控制模型。优化长尾流量，平衡 OCC（实住率）与 ADR（平均房价），实现 RevPAR 增长最大化。",
        contentEn: "Utilize historical data and predictive analytics to deploy agile pricing and vacancy control. Optimize long-tail traffic to balance OCC (occupancy) and ADR (average daily rate) for maximum RevPAR output."
      },
      {
        title: "全托管客服与声誉管理",
        titleEn: "Full-Managed Support & Reputation Control",
        content: "专业团队 7x24 小时进行即时订单确认、差评危机干预与全网客评分（Score）精细化提升，打造极高溢价的优质口碑。",
        contentEn: "Dedicated team for 24/7 instant order confirmation, negative review mitigation, and metric score enhancement. Build a highly premium online brand identity."
      }
    ],
    metrics: [
      { label: "平台曝光量", labelEn: "PV", direction: "up", value: "+185%" },
      { label: "平均实住率", labelEn: "OCC", direction: "up", value: "92.4%" },
      { label: "可售客房收益", labelEn: "RevPAR", direction: "up", value: "+38.6%" }
    ],
    actionText: "微信 / WECHAT: X-921993",
    actionTextEn: "Copy WeChat: X-921993",
    actionValue: "X-921993",
    actionType: "wechat",
    actionSub: "免费获取渠道诊断报告",
    actionSubEn: "Get a free omni-channel performance audit",
    imageUrl: hotelOtaImage
  },
  {
    id: "02",
    title: "餐饮与生鲜板块数字化一体化",
    titleEn: "Food & Beverage OMO Digital Integration",
    typeTag: "OMO线上线下一体化解决方案",
    typeTagEn: "Online-Merge-Offline Solutions",
    pain: "外卖平台扣点佣金高达 20-25% 榨干绝大部分微薄利润、自建社群空转毫无复购转化、多套收银进销存软件信息孤岛无法互通、买了一堆没用的垃圾硬件重复投资白花冤枉钱。",
    painEn: "Delivery platforms eat up 20-25% of thin margins, self-built community groups are dead without any conversion, POS and ERP software are siloed, and countless hardware procurement traps waste hundreds of thousands.",
    solution: "双平台外卖代运营 + 微信生态私域裂变留存，提供完全客观、中立的避坑软硬件系统打通架构指南。",
    solutionEn: "Dual-platform delivery operation + WeChat private domain referral optimization. Neutral, conflict-free advice on cost-effective hardware & software integration.",
    bullets: [
      {
        title: "外卖代运营与本地生活",
        titleEn: "Delivery Operations & Local Life Operations",
        content: "美团、饿了么双平台全品类代运营。涵盖菜单结构重组、爆款打造、推广投产比（ROI）精准把控，并配合抖音本地生活团购组货，激活公域引流。",
        contentEn: "Full-suite Meituan & Ele.me management. Re-engineer menu structure, build hero items, control ROI of ad spend, and coordinate with Douyin local group buying to channel massive traffic."
      },
      {
        title: "私域裂变与高频留存",
        titleEn: "Private Domain Referral & High-Frequency Retention",
        content: "打通基于微信生态的小程序微商城与社群SCRM工具。沉淀忠诚会员资产，构建高复购、低成本自营销售网络。",
        contentEn: "Implement custom-fit WeChat Mini-Programs and SCRM solutions. Turn random buyers into permanent loyal fans, driving continuous organic repeat sales."
      },
      {
        title: "软硬件中立避坑指南",
        titleEn: "Neutral Hardware & Software Procurement Guide",
        content: "不拿软硬件设备厂商的一分钱回扣，基于门店实际业态推荐最适配的智能前台POS、全渠道进销存ERP、称重秤等，帮企业砍掉50%的无用系统开支。",
        contentEn: "Zero kickbacks. Deliver fully objective guidance on POS, cloud ERP, and weight-scaling systems tailored purely to your operational size, slicing software costs in half."
      }
    ],
    metrics: [
      { label: "外卖推广投产比", labelEn: "ROI", direction: "up", value: "4.8x" },
      { label: "软硬件采购成本", labelEn: "COST", direction: "down", value: "-45%" },
      { label: "会员二次复购率", labelEn: "RETENTION", direction: "up", value: "+28%" }
    ],
    actionText: "企鹅 / QQ: 1160467550",
    actionTextEn: "Copy QQ: 1160467550",
    actionValue: "1160467550",
    actionType: "qq",
    actionSub: "规避软硬件采购陷阱",
    actionSubEn: "Evade software and hardware purchasing traps",
    imageUrl: fBImage
  },
  {
    id: "03",
    title: "管理软件选型与制度硬落地",
    titleEn: "Software Evaluation & Institutional Enforcement",
    typeTag: "企业效能与数字化管理陪跑",
    typeTagEn: "Organizational Efficiency Consulting & Mentoring",
    pain: "花几十万买的复杂 CRM 沦为员工打卡、应付老板的“面子工程”，销售暗地抢单撞单，一个审批拖延数天，KPI 沦为走过场，团队根本毫无执行力可言。",
    painEn: "Six-figure CRM systems turn into 'face-saving' punch-card checkers. Salespeople steal leads secretly, a simple approval takes days, and KPIs are purely theatrical with near-zero organizational execution.",
    solution: "评估推荐最适性、轻量化的 CRM / OKR / 协作系统，拒绝形式化汇报，深度保姆式进驻伴跑落地。",
    solutionEn: "Recommend lightweight, highly aligned CRM/OKR/collaboration tools. Eradicate visual theater with deep,保姆-style mentoring for real executive flow.",
    bullets: [
      {
        title: "中立系统评估与架构诊断",
        titleEn: "Conflict-Free Tool Evaluation & System Diagnostics",
        content: "精准诊断痛点，绝不推荐重型或高价不契合系统。精选最适低代码或钉钉/飞书等原生生态，以极小资金投入盘活核心流程。",
        contentEn: "We diagnose real operational bottlenecks. No over-engineered solutions. Select the exact lightweight CRM or OKR suite to reactivate workflow speed at minimum expense."
      },
      {
        title: "效能硬落地 (OKR / KPI 绑定)",
        titleEn: "Enforced OKR & KPI Compensation Alignment",
        content: "将 OKR 目标体系与具体薪酬、晋升、行政处罚机制锁死。从高层战略拆解、高频周报例会复盘到全员技能培训，进行全程全天候督导落地。",
        contentEn: "Embed OKR frameworks into compensation, bonus scales, and performance reviews. Guide team reviews, weekly standups, and direct user training until it becomes a permanent habit."
      },
      {
        title: "企业审批流与销售漏斗重构",
        titleEn: "Approval Flow & Sales Pipeline Restructuring",
        content: "全面梳理销售线索流、合规审批链和公海客户流转时效。清除冗长多余审批，确保任何业务动作有迹可循、违规即罚。",
        contentEn: "Overhaul customer lead assignment, compliance checks, and sales cycle stages. Purge duplicate hierarchies to construct a frictionless, fully auditable workflow."
      }
    ],
    metrics: [
      { label: "组织战略执行力", labelEn: "EXECUTION", direction: "up", value: "98.2%" },
      { label: "冗余汇报审批链", labelEn: "WORKFLOW", direction: "down", value: "-60%" },
      { label: "管理效能转化率", labelEn: "KPI", direction: "up", value: "+32%" }
    ],
    actionText: "微信 / WECHAT: X-921993",
    actionTextEn: "Copy WeChat: X-921993",
    actionValue: "X-921993",
    actionType: "wechat",
    actionSub: "诊断团队管理瓶颈",
    actionSubEn: "Uncover organizational and tool bottlenecks",
    imageUrl: orgImage
  },
  {
    id: "04",
    title: "CSM 客户成功体系构建",
    titleEn: "CSM & Account Growth Architecture",
    typeTag: "B2B/SaaS企业用户留存与价值跃升服务",
    typeTagEn: "B2B/SaaS Retention & Value Escalation",
    pain: "新客获取成本贵了 10 倍、核心老客户毫无预警无情流失犹如沙漏、客户转推荐率几乎为零、高薪养着的客服部门每天沦为被动敲键盘应付的“打字机”，完全没有挖掘任何增购的商业嗅觉。",
    painEn: "Customer acquisition costs spike 10x, core clients silently churn without any warning, client referrals are practically zero, and your customer support team acts as passive typists with zero business awareness or upsell capabilities.",
    solution: "从零量身制定 CSM 岗位权责、考核标准与全生命周期管理，建立流失预警干预体系，将客服转变为高复利利润中心。",
    solutionEn: "Build custom CSM roles, KPI structures, and client lifecycle management models from scratch. Build risk-warning loops to turn support into a profit engine.",
    bullets: [
      {
        title: "标准 CSM 体系从零搭建",
        titleEn: "CSM Team Structure Design from Scratch",
        content: "根据产品形态和客单价，构建标准的客户成功团队岗位、日常拜访频次规范、续约指标（NRR）以及转推荐激励模型。",
        contentEn: "Establish core CSM roles, meeting frequencies, net retention targets (NRR), and reference bonus structures aligned specifically to your average contract value."
      },
      {
        title: "全生命周期生命体征管理 (LCM)",
        titleEn: "Client Lifecycle Management & Health Analytics",
        content: "精细绘制从“初期接入、功能激活、价值感知、深度成熟到增购转推荐”的全流程节点。引入客户健康度评级与红线流失干预预警。",
        contentEn: "Map out the complete buyer path from onboarding and activation to renewal and referral. Implement health scores and customer attrition triggers."
      },
      {
        title: "激活增购 (Upsell) 与复利利润",
        titleEn: "Trigger Upsells & Referral Growth Multipliers",
        content: "将客服工作从被动响应升级为主动商业价值发掘。通过高契合度场景增购推荐、老客户带新客户机制，源源不断产生极低成本的可扩展营收。",
        contentEn: "Pivot client interactions from reactive responses to active account mining. Maximize client lifetime value via upsells, cross-sells, and strategic referral programs."
      }
    ],
    metrics: [
      { label: "SaaS订阅净续约率", labelEn: "NRR", direction: "up", value: "114%" },
      { label: "全生命周期增购额", labelEn: "UPSELL", direction: "up", value: "+40%" },
      { label: "核心客户流失率", labelEn: "CHURN", direction: "down", value: "-75%" }
    ],
    actionText: "企鹅 / QQ: 1160467550",
    actionTextEn: "Copy QQ: 1160467550",
    actionValue: "1160467550",
    actionType: "qq",
    actionSub: "搭建高留存价值体系",
    actionSubEn: "Construct customer success retention models",
    imageUrl: csmImage
  },
  {
    id: "05",
    title: "企业高转化官网极致定制",
    titleEn: "Premium Conversion-Oriented Custom Web",
    typeTag: "响应式体验设计与数字艺术",
    typeTagEn: "Responsive Experience Design & Digital Arts",
    pain: "同行都在套几百块的模板网站导致廉价感扑面而来、手机端排版错位乱成一团、搜索引擎完全搜不到、甚至连改个错别字都要被代维外包公司索要几百块拖延好几周。",
    painEn: "Competitors use $50 template websites that project zero brand trust, mobile displays are a complete alignment disaster, search engines cannot index you at all, and minor typo changes take weeks and cost hundreds of dollars under hostage agency contracts.",
    solution: "纯手写极致精简原生高性能自适应代码，融入高端非对称视觉，交付傻瓜式零技术要求后台与一对一视频交付培训。",
    solutionEn: "Handcrafted, lightweight, ultra-high performance responsive codebase featuring bespoke aesthetic layouts. Shipped with easy editor dashboards.",
    bullets: [
      {
        title: "像素级响应式艺术设计",
        titleEn: "Pixel-Perfect Responsive Layout Design",
        content: "弃用沉闷卡片与常规框架。运用流视差动效、高奢极简布局与极富张力的留白，在手机、平板与桌面宽屏皆投射高溢价的领袖气质。",
        contentEn: "Ditch generic templates. Use asymmetric whitespace, subtle layout physics, and bold typography to project authority across every viewport and device screen size."
      },
      {
        title: "自主内容面板与原生 SEO 架构",
        titleEn: "Intuitive Back-Office Panels & Born-to-Rank SEO",
        content: "代码无冗余、加载速度极快、搜索爬虫识别良好。配套研发极其简易的文章与业务自主修改面板，提供完整交接录像，永久斩断多余维保支出。",
        contentEn: "Clean code structure ensuring outstanding page load speeds and organic search indexing. We design simple editor panels with full video hand-off, meaning zero recurring maintenance fees."
      }
    ],
    metrics: [
      { label: "资源载入响应速度", labelEn: "SPEED", direction: "up", value: "0.8s" },
      { label: "官网线索转化率", labelEn: "CVR", direction: "up", value: "+240%" },
      { label: "后期系统代维费", labelEn: "MAINTENANCE", direction: "none", value: "¥0" }
    ],
    actionText: "微信 / WECHAT: X-921993",
    actionTextEn: "Copy WeChat: X-921993",
    actionValue: "X-921993",
    actionType: "wechat",
    actionSub: "定制高转化专属数字官网",
    actionSubEn: "Design bespoke hyper-conversion official websites",
    imageUrl: webImage
  }
];

export const MANIFESTO_ITEMS: ManifestoItem[] = [
  {
    title: "结果导向主义",
    titleEn: "Outcome-Driven Principle",
    tagline: "不讲虚无缥缈的互联网PPT概念。",
    taglineEn: "Zero fluff. Zero buzzword-filled slide decks.",
    description: "每一套解决方案、每一次收益托管，均以企业最终营收净利润增长、流程硬结晶落地为最终坐标，真刀真枪拿数据说话。",
    descriptionEn: "Every framework and operations assignment is measured strictly by net-margin improvement, active employee compliance, and actual ledger growth."
  },
  {
    title: "降本避坑利刃",
    titleEn: "Conflict-Free Evaluation",
    tagline: "不接受任何第三方软硬件供应商的回扣分成。",
    taglineEn: "No vendor lock-in. Zero supplier commissions.",
    description: "始终站在企业主的立场挑选最轻量化、最具性价比的数字化方案，彻底免除盲目试错、系统无法互通的巨大隐性损失。",
    descriptionEn: "We maintain absolute independence. Our recommendation is driven solely by cost-efficiency and technical modularity to stop resource drain."
  },
  {
    title: "保姆式至深陪跑",
    titleEn: "Deep Immersive Mentorship",
    tagline: "我们不提供看完即扔的理论报告。",
    taglineEn: "We never deliver generic PDF slide reports.",
    description: "主理人团队直接进驻企业管理日常，深度跟踪审批频次、复盘会、线上渠道评分控制，协助老板稳稳拿捏数字化和团队转型的每一个毛细血管。",
    descriptionEn: "Our team embeds directly into your operations. We watch over live booking ranks, run SCRM triggers, and run tool evaluations with your staff."
  }
];
