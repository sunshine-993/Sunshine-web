import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Business Diagnosis
  app.post("/api/diagnose", async (req, res) => {
    const { industry, scale, bottleneck, currentRevenue } = req.body;
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      const prompt = `
你是一位极其专业、冷静、说话接地气、一针见血的资深商业增长与数字化解决方案专家（Sunshine 峰首席顾问）。
现有一位潜在客户提供了他的商业基本信息：
- 行业领域：${industry}
- 经营规模/团队状况：${scale}
- 当前月度营收/GMV：${currentRevenue || "未透露"}
- 核心痛点与瓶颈：${bottleneck}

请针对该客户的行业和痛点，结合我们的【Sunshine 峰 5大核心业务版块】提供定制化的深度诊断和落地解决方案：
1. 【01 酒店收益 · OTA】：渠道代运营、动态定价、流量权重机制等
2. 【02 餐饮零售 · OMO】：软硬件一体化系统、点单营销私域闭环
3. 【03 组织效能 · OKR】：绩效、执行力、工具打通
4. 【04 客户成功 · CSM】：高留存、客户全生命周期管理
5. 【05 网页定制 · WEB】：高转化率、定制化数字官网/宣传阵地

要求输出的诊断报告格式极其精美（使用清晰易读的 Markdown 格式），结构如下：
### ⚡ Sunshine 峰 · 商业现状痛点诊断
（用一到两句极度精准的话，切中他核心问题的要害，拒绝废话，态度一针见血、客观直白且痛点刺穿）

### 🎯 深度定制化增长解决方案
（挑出最适合他的 2-3 个 Sunshine 峰核心板块，提供极其具体、可落地的实操方案动作，而非泛泛的理论）

### 📊 预估增长指标 (ROI Prediction)
（给出具体的、合理的增长数值预测，例如：OTA流量权重提升、人效提升、客户流失率降低的具体百分比）

### 🚀 Sunshine 峰下一步进驻动作 (Next Steps)
（建议他第一步和主理人微信/QQ联系后，将如何进行实地或线上深入对接）

语言风格：客观、极具说服力、专业感拉满、温暖但直白。不要包含多余的自我介绍或无意义寒暄。
      `;

      if (apiKey && apiKey.trim() !== "" && apiKey !== "undefined") {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
        });

        if (response && response.text) {
          return res.json({ result: response.text });
        }
      }
      
      // Fallback if apiKey is missing or falsy
      console.info("Gemini API key is not configured or invalid. Falling back to built-in Business Diagnostic Engine.");
      const fallbackResult = generateExpertDiagnosisFallback(industry, scale, currentRevenue, bottleneck);
      return res.json({ result: fallbackResult });

    } catch (error: any) {
      console.warn("Diagnosis failed with Gemini API, falling back to built-in Business Diagnostic Engine:", error);
      const fallbackResult = generateExpertDiagnosisFallback(industry, scale, currentRevenue, bottleneck);
      return res.json({ result: fallbackResult });
    }
  });

  // Helper Function for Zero-Dependency Smart Diagnosis Fallback
  function generateExpertDiagnosisFallback(industryId: string, scaleId: string, revenue: string, bottleneck: string): string {
    const industries: Record<string, string> = {
      hotel: '酒店民宿 / 精品住宿托管',
      fnb: '餐饮商超 / OMO 零售',
      saas: '企业组织 / SaaS 效率体系',
      other: '线下连锁与实体服务'
    };
    const scales: Record<string, string> = {
      small: '初创规模 (<10人)',
      mid: '成长型团队 (10-50人)',
      large: '中大型企业 (>50人)'
    };

    const industryName = industries[industryId] || industryId;
    const scaleName = scales[scaleId] || scaleId;
    const cleanRevenue = revenue ? `${revenue}` : "未透露";

    let tailoredPainPoint = "";
    let solutionSection = "";
    let roiMetrics = "";
    let actionSteps = "";

    const textToAnalyze = bottleneck.toLowerCase();
    
    // Keyword matching
    const hasOta = textToAnalyze.includes("ota") || textToAnalyze.includes("酒店") || textToAnalyze.includes("民宿") || textToAnalyze.includes("房") || textToAnalyze.includes("曝光") || textToAnalyze.includes("排名") || textToAnalyze.includes("携程") || textToAnalyze.includes("美团");
    const hasFnb = textToAnalyze.includes("餐饮") || textToAnalyze.includes("外卖") || textToAnalyze.includes("扣点") || textToAnalyze.includes("佣金") || textToAnalyze.includes("收银") || textToAnalyze.includes("私域") || textToAnalyze.includes("菜") || textToAnalyze.includes("店");
    const hasOrg = textToAnalyze.includes("管理") || textToAnalyze.includes("审批") || textToAnalyze.includes("执行力") || textToAnalyze.includes("crm") || textToAnalyze.includes("kpi") || textToAnalyze.includes("效能") || textToAnalyze.includes("流程") || textToAnalyze.includes("制度") || textToAnalyze.includes("协同") || textToAnalyze.includes("效率");
    const hasCsm = textToAnalyze.includes("流失") || textToAnalyze.includes("留存") || textToAnalyze.includes("续约") || textToAnalyze.includes("客服") || textToAnalyze.includes("复购") || textToAnalyze.includes("老客") || textToAnalyze.includes("生命周期");
    const hasWeb = textToAnalyze.includes("网页") || textToAnalyze.includes("官网") || textToAnalyze.includes("模板") || textToAnalyze.includes("手机") || textToAnalyze.includes("自适应") || textToAnalyze.includes("改错字") || textToAnalyze.includes("开发") || textToAnalyze.includes("视觉");

    let primaryFocus = "general";
    if (hasOta || industryId === 'hotel') primaryFocus = "hotel";
    else if (hasFnb || industryId === 'fnb') primaryFocus = "fnb";
    else if (hasOrg || industryId === 'saas') primaryFocus = "saas";
    else if (hasCsm) primaryFocus = "csm";
    else if (hasWeb) primaryFocus = "web";

    if (primaryFocus === "hotel") {
      tailoredPainPoint = `当前门店核心症结在于**「OTA 渠道平台算法黑盒与自杀式低价内卷」**的恶性死循环。您所指出的痛点“${bottleneck}”直击痛处：由于对携程、美团算法规则处于盲区，自然流量见底，只能依赖简单粗暴地降价来保客，利润被平台佣金和低房价双重榨干，越忙越亏，面临随时被低价内卷出局的危机。`;
      
      solutionSection = `#### 📍 Sunshine 峰 · 解决方案 1: 酒店收益 · OTA 全渠道代运营托管
- **全渠道算法积分与自然曝光跃升**：系统重塑门店的主图视觉动线、特色标签和评价互动权重，打通美团、携程内部算法模型，将房源极速推至区域自然曝光前 10%。
- **7x24h 智能动态收益定价系统**：引入多维度竞争对手价格监控，结合商圈流量、实时天气和当日余量自动微调客房价格，榨干每一间客房的 RevPAR 极限。
- **直销私域会员预订网络**：架设独立专享的微信直销小程序与高转化品牌官网，沉淀并锁定高单价老客，彻底摆脱平台佣金的绝对绑架。`;

      roiMetrics = `- **平台自然曝光量 (PV)**: 预计实现 **+185%** 的爆发式反弹
- **平均实住率 (OCC)**: 稳定保持在 **92.4% - 96.5%** 的黄金满房区间
- **可售客房收益 (RevPAR)**: 综合净提升 **+38.6%** 以上`;

      actionSteps = `1. **渠道漏洞扫描**：Sunshine 峰分析师直接登录平台后台，全面扫描近 30 天核心流失指标和展示漏洞。
2. **价格公式重构**：量身配置未来半年的动态定价算法，并融入节假日溢价联动公式。
3. **伴跑落地实施**：专属收益经理入驻提供深度伴跑运营，确保首月即迎来数据大幅拐点。`;
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

      actionSteps = `1. **账单成本流失核算**：Sunshine 峰团队进入店面及线上，详细梳理所有代金券、推广费、扣点与昂贵软件。
2. **私域“漏斗式”转化设计**：定制极高打开率的实体外卖卡文案及社群返利触达计划。
3. **低成本打通迁移**：协助淘汰不合理套件，实现极低成本的全新多端系统无损迁移。`;
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

      actionSteps = `1. **工作流全景白描**：Sunshine 峰团队进驻企业，白描 80% 日常发生的工作交接与低效审批点。
2. **极简协同系统重装**：一对一指导培训员工使用新工作台，消除系统迁移期产生的抵触心态。
3. **按季度实效审计伴跑**：持续进行管理制度的颗粒化复盘，确保工具和制度融入日常习惯。`;
    }
    else if (primaryFocus === "csm") {
      tailoredPainPoint = `当前业务核心症结在于**「老客户流失无预警漏洞与客服部门被动空转」**。痛点“${bottleneck}”表明：新客获取成本急剧攀升，而高价值老客户却犹如沙漏流水般不知不觉流失，客服人员每天仅仅机械性打字回复问题，完全不具备发掘老客生命周期二次增购和主动关怀的意识。`;
      
      solutionSection = `#### 📍 Sunshine 峰 · 解决方案 4: 客户成功 · CSM 留存与客户全生命周期价值跃升
- **老客户静默流失自动化预警体系**：设立涵盖使用频率、满意度多重指标的客户健康评分卡，在客户产生退订/流失意向的早期阶段自动触发预警。
- **客服团队“打字机”到“利润中心”的职业重组**：彻底改写客服岗位 KPI，引入客户续约率、满意度与增购 (Upsell) 的阶梯式利润提成，变被动回复为主动价值传递。
- **客推客裂变自来水机制设计**：建立低感知、高诱惑的老带新及口碑分享网络，让存量高质量老客户化身品牌开拓新市场的最大引擎。`;

      roiMetrics = `- **SaaS / B2B 订阅客户净续约率 (NRR)**: 预计拉跃至 **114%** 强劲上行区间
- **生命周期内增购与再次转化额 (Upsell)**: 综合实现 **+40%** 的大幅递增
- **核心优质常客流失率**: 有效压榨降低 **-75%**，锁死业绩底仓`;

      actionSteps = `1. **历史流失归因诊断**：详细追查过去 3 个月流失的大单，锁定老客户离职/降级的真实导火索。
2. **薪酬机制与主动话术重构**：为客服部量身定制一整套提成丰厚、主动出击的增购话术模板。
3. **老带新运营链路调试**：迅速上线高转推荐后台工具，将口碑红利无阻碍裂变落地。`;
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

      actionSteps = `1. **审美格调高级定制**：主理人与您直接对接，量身出具独立且非对称布局的高端视觉设计方案。
2. **纯净高性能代码编写**：极高规范手写自适应代码，确保没有任何无效脚本。
3. **录像级 1对1 视频交付指导**：不仅交付完好成果，更会详细为您和团队培训后台，确保以后随时掌控自己官方阵地的每一处文案与图片。`;
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
  }

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
