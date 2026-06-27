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
    try {
      const { industry, scale, bottleneck, currentRevenue } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is not configured." });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

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
（用一到两句极度精准的话，切中他核心问题的要害，拒绝废话）

### 🎯 深度定制化增长解决方案
（挑出最适合他的 2-3 个 Sunshine 峰核心板块，提供极其具体、可落地的实操方案动作，而非泛泛的理论）

### 📊 预估增长指标 (ROI Prediction)
（给出具体的、合理的增长数值预测，例如：OTA流量权重提升、人效提升、客户流失率降低的具体百分比）

### 🚀 Sunshine 峰下一步进驻动作 (Next Steps)
（建议他第一步和主理人微信/QQ联系后，将如何进行实地或线上深入对接）

语言风格：客观、极具说服力、专业感拉满、温暖但直白。不要包含多余的自我介绍或无意义寒暄。
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Diagnosis failed:", error);
      res.status(500).json({ error: error.message || "Internal server error during diagnosis." });
    }
  });

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
