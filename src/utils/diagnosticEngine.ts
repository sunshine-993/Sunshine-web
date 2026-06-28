/**
 * Client-Side Smart Business Diagnosis Fallback Engine
 * Generates tailored, premium consulting reports based on customer profiles
 * and keyword matching, ensuring 100% service uptime even in static environments.
 */

export function generateExpertDiagnosisFallback(
  industryId: string,
  scaleId: string,
  revenue: string,
  bottleneck: string,
  lang: 'zh' | 'en' = 'zh'
): string {
  const industries: Record<string, { zh: string; en: string }> = {
    hotel: { zh: '酒店民宿 / 精品住宿托管', en: 'Hotel OTA &精品 Boutique Stay' },
    fnb: { zh: '餐饮商超 / OMO 零售', en: 'F&B OMO & Retail' },
    saas: { zh: '企业组织 / SaaS 效率体系', en: 'SaaS & Enterprise Org' },
    other: { zh: '线下连锁与实体服务', en: 'Offline Retail & Services' }
  };

  const scales: Record<string, { zh: string; en: string }> = {
    small: { zh: '初创规模 (<10人)', en: 'Startup (< 10 members)' },
    mid: { zh: '成长型团队 (10-50人)', en: 'Growth-stage (10-50 members)' },
    large: { zh: '中大型企业 (>50人)', en: 'Enterprise (> 50 members)' }
  };

  const industryName = industries[industryId]?.[lang] || industryId;
  const scaleName = scales[scaleId]?.[lang] || scaleId;
  const cleanRevenue = revenue ? `${revenue}` : (lang === 'zh' ? '未透露' : 'Not Disclosed');

  const textToAnalyze = bottleneck.toLowerCase();
  
  // Keyword Matching
  const hasOta = textToAnalyze.includes("ota") || textToAnalyze.includes("酒店") || textToAnalyze.includes("民宿") || textToAnalyze.includes("房") || textToAnalyze.includes("曝光") || textToAnalyze.includes("排名") || textToAnalyze.includes("携程") || textToAnalyze.includes("美团") || textToAnalyze.includes("trip") || textToAnalyze.includes("booking") || textToAnalyze.includes("hotel");
  const hasFnb = textToAnalyze.includes("餐饮") || textToAnalyze.includes("外卖") || textToAnalyze.includes("扣点") || textToAnalyze.includes("佣金") || textToAnalyze.includes("收银") || textToAnalyze.includes("私域") || textToAnalyze.includes("菜") || textToAnalyze.includes("店") || textToAnalyze.includes("food") || textToAnalyze.includes("restaurant") || textToAnalyze.includes("retail");
  const hasOrg = textToAnalyze.includes("管理") || textToAnalyze.includes("审批") || textToAnalyze.includes("执行力") || textToAnalyze.includes("crm") || textToAnalyze.includes("kpi") || textToAnalyze.includes("效能") || textToAnalyze.includes("流程") || textToAnalyze.includes("制度") || textToAnalyze.includes("协同") || textToAnalyze.includes("效率") || textToAnalyze.includes("manage") || textToAnalyze.includes("efficiency") || textToAnalyze.includes("workflow");
  const hasCsm = textToAnalyze.includes("流失") || textToAnalyze.includes("留存") || textToAnalyze.includes("续约") || textToAnalyze.includes("客服") || textToAnalyze.includes("复购") || textToAnalyze.includes("老客") || textToAnalyze.includes("生命周期") || textToAnalyze.includes("churn") || textToAnalyze.includes("retention") || textToAnalyze.includes("customer");
  const hasWeb = textToAnalyze.includes("网页") || textToAnalyze.includes("官网") || textToAnalyze.includes("模板") || textToAnalyze.includes("手机") || textToAnalyze.includes("自适应") || textToAnalyze.includes("改错字") || textToAnalyze.includes("开发") || textToAnalyze.includes("视觉") || textToAnalyze.includes("website") || textToAnalyze.includes("web") || textToAnalyze.includes("template");

  let primaryFocus = "general";
  if (hasOta || industryId === 'hotel') primaryFocus = "hotel";
  else if (hasFnb || industryId === 'fnb') primaryFocus = "fnb";
  else if (hasOrg || industryId === 'saas') primaryFocus = "saas";
  else if (hasCsm) primaryFocus = "csm";
  else if (hasWeb) primaryFocus = "web";

  if (lang === 'zh') {
    let tailoredPainPoint = "";
    let solutionSection = "";
    let roiMetrics = "";

    if (primaryFocus === "hotel") {
      tailoredPainPoint = `当前门店核心症结在于**「OTA 渠道平台算法黑盒与自杀式低价内卷」**的恶性死循环。您所指出的痛点“${bottleneck}”直击痛处：由于对携程、美团算法规则处于盲区，自然流量见底，只能依赖简单粗暴地降价来保客，利润被平台佣金和低房价双重榨干，越忙越亏，面临随时被低价内卷出局的危机。`;
      
      solutionSection = `#### 📍 Sunshine 峰 · 解决方案 1: 酒店收益 · OTA 全渠道代运营托管
- **全渠道算法积分与自然曝光跃升**：系统重塑门店的主图视觉动线、特色标签和评价互动权重，打通美团、携程内部算法模型，将房源极速推至区域自然曝光前 10%。
- **7x24h 智能动态收益定价系统**：引入多维度竞争对手价格监控，结合商圈流量、实时天气和当日余量自动微调客房价格，榨干每一间客房的 RevPAR 极限。
- **直销私域会员预订网络**：架设独立专享的微信直销小程序与高转化品牌官网，沉淀并锁定高单价老客，彻底摆脱平台佣金的绝对绑架。`;

      roiMetrics = `- **平台自然曝光量 (PV)**: 预计实现 **+185%** 的爆发式反弹
- **平均实住率 (OCC)**: 稳定保持在 **92.4% - 96.5%** 的黄金满房区间
- **可售客房收益 (RevPAR)**: 综合净提升 **+38.6%** 以上`;
    }
    else if (primaryFocus === "fnb") {
      tailoredPainPoint = `当前门店核心症结在于**「外卖平台扣点佣金压榨与软硬件信息孤岛」**。面临“${bottleneck}”，外卖高达 20-25% 的佣金极度榨干利润，同时私域社群由于缺乏合理的引流链路设计，彻底沦为死群无复购，外加采购了多套杂乱的收银/进销存软件互不兼容，白白投入了昂贵的冤枉钱。`;
      
      solutionSection = `#### 📍 Sunshine 峰 · 解决方案 2: 餐饮零售 · OMO 线上线下一体化解决方案
- **双平台高收益代运营与主推菜单优化**：优化餐品阶梯定价与起送机制，精细化配置外卖权重，避开平台自杀式折扣陷阱，提升高利润餐品点单占比。
- **实体店微信私域“活水”裂变链路**：设计低阻碍的外卖包裹返现卡、一物一码以及企业微信社群运营体系，低成本将公域客流无缝转化为私域强复购老客。
- **独立客观的软件硬件避坑打通指南**：作为第三方不带偏见地帮您诊断并重组进销存、会员卡及收银软件，砍掉 50% 以上不必要的系统采购费与多余维护开支。`;

      roiMetrics = `- **外卖推广投产比 (ROI)**: 稳定保持在 **4.8x** 以上
- **软硬件采购与长期维护成本**: 降低 **-45%** 以上，资金用在刀刃上
- **会员二次及以上高频复购率**: 综合拉升 **+28%**，构建稳定的高复利基本盘`;
    }
    else if (primaryFocus === "saas") {
      tailoredPainPoint = `当前组织核心症结在于**「高价数字化工具沦为形象面子工程与考核机制脱节」**。您所描述的痛点“${bottleneck}”非常普遍：企业高成本引入了复杂的 CRM、审批或项目管理系统，但实际上员工感到抵触而敷衍打卡，销售甚至私下撞单，一个简单审批拖延数天，KPI 形同虚设，执行力极差。`;
      
      solutionSection = `#### 📍 Sunshine 峰 · 解决方案 3: 企业效能 · 数字化管理与工具保姆式落地
- **最适性轻量化协作工作台重塑**：彻底微调最适合您目前人手规模的协同/CRM 工具，将员工操作摩擦力降到最低。
- **扁平化高效审批链路与会议瘦身**：合并或剔除 60% 无实效的汇报和审批环节，推行 10 分钟快速表决制，让信息高频自由流转。
- **销售公海机制与执行指标重构**：规范线索流转时间，超时系统自动释放，消除内部灰色利益链，核心线索转化路径全部大盘可视化。`;

      roiMetrics = `- **组织战略与目标执行力 (KPI)**: 平均指标达成率拉高至 **98.2%**
- **冗余审批与管理耗时**: 降低 **-60%**，大幅解除中高管决策枷锁
- **综合能效与人均人效转化率**: 综合产出拉升 **+32%**`;
    }
    else if (primaryFocus === "csm") {
      tailoredPainPoint = `当前业务核心症结在于**「老客户流失无预警漏洞与客服部门被动空转」**。痛点“${bottleneck}”表明：新客获取成本急剧攀升，而高价值老客户却犹如沙漏流水般不知不觉流失，客服人员每天仅仅机械性打字回复问题，完全不具备发掘老客生命周期二次增购和主动关怀的意识。`;
      
      solutionSection = `#### 📍 Sunshine 峰 · 解决方案 4: 客户成功 · CSM 留存与客户全生命周期价值跃升
- **老客户静默流失自动化预警体系**：设立涵盖使用频率、满意度多重指标 of 客户健康评分卡，在客户产生退订/流失意向的早期阶段自动触发预警。
- **客服团队“打字机”到“利润中心”的职业重组**：彻底改写客服岗位 KPI，引入客户续约率、满意度与增购 (Upsell) 的阶梯式利润提成，变被动回复为主动价值传递。
- **客推客裂变自来水机制设计**：建立低感知、高诱惑的老带新及口碑分享网络，让存量高质量老客户化身品牌开拓新市场的最大引擎。`;

      roiMetrics = `- **SaaS / B2B 订阅客户净续约率 (NRR)**: 预计拉跃至 **114%** 强劲上行区间
- **生命周期内增购与再次转化额 (Upsell)**: 综合实现 **+40%** 的大幅递增
- **核心优质常客流失率**: 有效压榨降低 **-75%**，锁死业绩底仓`;
    }
    else {
      tailoredPainPoint = `当前数字门面核心症结在于**「过时廉价模板堆砌与移动端排版体验破损」**。痛点“${bottleneck}”是千篇一律模板网站的通病：套用几百块的模板网站不仅拉低了整个品牌档次，手机自适应时经常布局散乱错位，搜索引擎搜不到，最折磨人的是改一个错字都要受控于第三方外包公司，时效极慢，成本高昂。`;
      
      solutionSection = `#### 📍 Sunshine 峰 · 解决方案 5: 网页定制 · 高端自适应数字宣传官网阵地
- **100% 纯手写原生极高性能自适应代码**：绝不套用任何臃肿的臃肿工具，采用原生态轻量级架构，做到无死角完美适配移动端/平板端，打开页面秒级响应，高级视觉格调满格。
- **深度底层搜索引擎 SEO 规范与蜘蛛索引优化**：从标签层级、代码加载顺序彻底重塑，契合各大搜索引擎索引推荐算法，让品牌自然排名一飞冲冲。
- **傻瓜式一键内容管理后台与永久交付**：交付完全属于您自己的极简独立文案/图片修改面板，修改错字、更换产品只需 5 秒钟，彻底斩断外包绑架，零技术基础员工即可轻松上手。`;

      roiMetrics = `- **首屏渲染与响应秒开速度**: 稳定控制在全球顶级标准 **0.8 秒** 内
- **官网高意向客户直接留资转化率 (CVR)**: 预计实现 **+240%** 的大幅跃进
- **后期系统安全代维费用**: 永久保持 **¥0** 元，完全自主掌控网站所有产权`;
    }

    return `### ⚡ Sunshine 峰 · 商业现状痛点诊断

${tailoredPainPoint}

---

### 🎯 深度定制化增长解决方案

针对**「${scaleName}」**的规模，在月度 GMV 约 **${cleanRevenue}** 的基础之上，Sunshine 峰专家团推荐以下执行动作：

${solutionSection}

---

### 📊 预估增长指标 (ROI Prediction)

经过 Sunshine 峰一整套精准方法论加持后，预计可达成以下商业效益跃升：

${roiMetrics}

---

### 🚀 Sunshine 峰下一步进驻动作 (Next Steps)

1. **加急免费咨询**：直接点击下方按钮一键复制主理人微信 (**X-921993**) 或 QQ (**1160467550**)，添加好友并备注「**诊断：${industryName}**」。
2. **1对1业务复盘**：主理人团队将与您约定时间，进行 30 分钟免费线上深度业务拆解。
3. **交付专属方案**：基于复盘细节，为您免费提供一份轻量级「3页式实体落地避坑实操路线图」，确认无误后再讨论后续合作事宜。`;
  } else {
    // English Output for global compliance
    let tailoredPainPoint = "";
    let solutionSection = "";
    let roiMetrics = "";

    if (primaryFocus === "hotel") {
      tailoredPainPoint = `The core bottleneck of your property lies in **"The OTA Platform Algorithmic Black Box & Destructive Price Under-cutting Trap."** Your reported pain point "${bottleneck}" highlights the strategic blindspot: without precise visibility into Ctrip/Meituan/Booking.com ranking algorithms, your natural traffic collapses, leaving you completely vulnerable to platform commissions and aggressive competitor price wars.`;
      
      solutionSection = `#### 📍 Sunshine Peak · Solution 1: Hospitality Yielding & OTA Full-Service Operations
- **全渠道 Full-Channel Algorithmic Ranking Recovery**: Re-architect listing photos, feature metadata, and guest review loops to trigger positive algorithmic scores, boosting organic traffic by 10x.
- **7x24h Intelligent Dynamic RevPAR Management**: Deploy automated rate monitors checking local competitor trends, weather, and remaining inventory in real-time, extracting peak revenue from every single room.
- **Direct-to-Consumer (DTC) Mini-Program Booking**: Build premium, high-converting direct booking Web/WeChat portals to capture high-value repeat guests and eliminate OTA commissions entirely.`;

      roiMetrics = `- **Organic Impressions / Page Views (PV)**: Projected to rebound by **+185%**
- **Average Occupancy Rate (OCC)**: Maintained consistently in the **92.4% - 96.5%** golden sweet spot
- **Revenue Per Available Room (RevPAR)**: Absolute increase of **+38.6%** minimum`;
    }
    else if (primaryFocus === "fnb") {
      tailoredPainPoint = `The primary bottleneck in your business is **"Food-delivery Platform Commission Squeeze & Siloed Business Software Systems."** Facing "${bottleneck}", your margins are eroded by 20-25% platform commission fees, while customer retention remains non-existent without optimized private-domain funnel mapping.`;
      
      solutionSection = `#### 📍 Sunshine Peak · Solution 2: OMO Omnichannel Integration for Retail & F&B
- **Dual-Platform Optimization & High-Margin Menu Architecture**: Optimize package bundles, delivery pricing thresholds, and marketing tools to bypass predatory discount campaigns.
- **DTC Private-Domain Flow Trigger**: Establish elegant conversion cards inside packaging, enterprise WeChat QR codes, and smart automated chat loyalty schemes to turn transient delivery buyers into permanent regulars.
- **Vendor-Agnostic Software Audit & Migration**: Clean up multiple expensive, incompatible POS, inventory, and CRM software, slashing software licensing overhead by up to 50%.`;

      roiMetrics = `- **Delivery Promotion ROI**: Kept steadily at **4.8x** or higher
- **Software & Maintenance Cost**: Reduced by **-45%** through efficient platform consolidation
- **Secondary Repeat Customer Purchase Rate**: Net increase of **+28%** for organic compounding`;
    }
    else if (primaryFocus === "saas") {
      tailoredPainPoint = `The core systemic issue is **"Over-Engineered Digital Tools Operating as Empty Vanity Projects."** Facing "${bottleneck}", expensive systems (such as CRMs or ERPs) have triggered massive internal friction, causing staff to treat logging as a chore while actual accountability and conversion pipelines remain opaque.`;
      
      solutionSection = `#### 📍 Sunshine Peak · Solution 3: Organization Efficiency & Tool-Level Adoption Playbooks
- **Frictionless Workspace Modernization**: Tailor and simplify your CRM or Project Management platforms to match your precise team scale, removing 90% of data entry overhead.
- **Lean Management & 10-Minute Decision Protocols**: Remove 60% of low-value approval pipelines, replacing them with collaborative workspaces that empower real-time decision-making.
- **Public Line-of-Sight Sales Pipeline Rules**: Establish automatic lead recycling rules to eliminate internal friction and ensure high-value pipelines are visual and dynamic.`;

      roiMetrics = `- **Strategic KPI Alignment Rate**: Accelerated to **98.2%** average
- **Decision & Administrative Pipeline Lag**: Cut down by **-60%**
- **Human Resources Productivity Score**: Boosted by **+32%**`;
    }
    else if (primaryFocus === "csm") {
      tailoredPainPoint = `The fundamental bottleneck is **"Silent Customer Attrition & Reactive Support Frameworks."** Facing "${bottleneck}", customer acquisition costs are soaring, while high-value current accounts are slipping away silently due to a lack of proactive customer success health metrics.`;
      
      solutionSection = `#### 📍 Sunshine Peak · Solution 4: Customer Success Management & Lifetime Value Optimization
- **Automated Silent Churn Risk Scoring**: Implement health cards evaluating usage frequency and satisfaction levels to catch attrition indicators weeks before active contract renewals.
- **Upsell-Driven Incentive Adjustments**: Realign customer service roles to include tiered commission bonuses for NRR and upsells, turning a cost center into a core revenue engine.
- **Referral Loop Engineering**: Install seamless peer-to-peer referral mechanisms, empowering your best clients to organically drive new high-intent sales pipelines.`;

      roiMetrics = `- **Net Revenue Retention (NRR)**: Elevated to the **114%** compound zone
- **Account Expansion & Upsell Revenue**: Net expansion of **+40%**
- **Premium Account Attrition Rate**: Successfully reduced by **-75%**`;
    }
    else {
      tailoredPainPoint = `Your current bottleneck lies in **"Outdated, Low-Performance Landing Web Pages & Fragmented Mobile Responsiveness."** Facing "${bottleneck}", cookie-cutter templates are downgrading your brand prestige, failing search rankings, and creating absolute vendor dependency just for fixing a single typo.`;
      
      solutionSection = `#### 📍 Sunshine Peak · Solution 5: Bespoke High-Performance Mobile-Responsive Web Systems
- **100% Pure Lightweight Native Source Code**: Built without heavy pre-compiled template noise, guaranteeing flawlessly smooth mobile viewing and lightning-fast loading speeds.
- **Search Engine Optimization (SEO) Crawler Structuring**: Optimize schema tags, image loading pipelines, and script configurations to achieve stellar organic search ranking indexes.
- **Empowered Admin Dashboards**: Deliver an incredibly intuitive editor panel, allowing anyone in your company to modify marketing text and assets in 5 seconds flat with zero coding experience.`;

      roiMetrics = `- **First Contentful Paint (FCP) Loading Time**: Kept under a world-class **0.8 seconds**
- **Organic Inbound Customer Conversion Rate (CVR)**: Boosted by **+240%**
- **Subsequent System Maintenance Cost**: Permanently kept at **$0** (you own 100% of the IP)`;
    }

    return `### ⚡ Sunshine Peak · Strategic Pain-Point Diagnosis

${tailoredPainPoint}

---

### 🎯 Custom Strategic Solutions

Designed for **「${scaleName}」** with a monthly GMV around **${cleanRevenue}**, Sunshine Peak recommends the following initiatives:

${solutionSection}

---

### 📊 Projected Business Metrics (ROI Prediction)

Through Sunshine Peak's structured growth methodologies, we expect to unlock these targets:

${roiMetrics}

---

### 🚀 Sunshine Peak Direct Onboarding Next Steps

1. **Instant Consultation**: Tap the copy button below to copy WeChat (**X-921993**) or QQ (**1160467550**). Add our lead consultant with the note: "Audit: ${industryName}".
2. **Complimentary 1-on-1 Growth Review**: Book a free 30-minute online strategic workshop with our principal team.
3. **Delivery of Action Plan**: Receive a complimentary, highly granular "3-Page Tactical Roadmap" to map your growth, with no obligations.`;
  }
}
