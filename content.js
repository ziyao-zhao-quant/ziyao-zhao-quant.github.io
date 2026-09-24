// 个人资料集中在这里更新。未提供的项目保持为空，不会生成虚构成果。
window.SITE_CONTENT = {
  profile: {
    name: "赵子尧",
    role: "量化研究员",
    intro: "中国科学技术大学量化金融硕士在读，复旦大学数学与应用数学本科。研究兴趣涵盖机器学习、金融文本因子与衍生品量化策略，关注从信号构建到回测验证的完整研究过程。",
    email: "zy_zhao_quanter@163.com",
    github: "https://github.com/ziyao-zhao-quant",
    scholar: "",
    linkedin: "",
    cv: "", // 如：files/cv.pdf
    contactNote: "",
    education: [
      { school: "中国科学技术大学", degree: "量化金融 · 硕士在读", period: "2025.09 — 2028.06（预计）" },
      { school: "复旦大学", degree: "数学与应用数学 · 本科", period: "2019.09 — 2024.06" },
    ],
  },
  // { title, authors, venue, year, description, tags: [], links: [{ label, url }] }
  publications: [
    {
      title: "Evidence Diet: Toward Consumption-Aware Collaborative Augmentation for LLM Ranking",
      authors: "共同第一作者",
      venue: "WSDM 2027 · Under review（审稿中）",
      year: "2026",
      description: "面向 LLM 排序提出 Evidence Diet 视角与 Hybrid 条件路由框架，整合 PageRank/SVD 图记忆、Tier 与 ReST 自蒸馏。在多数据集、多随机种子的实验中评估排序质量、运行时间与 token 消耗。",
      tags: ["LLM Ranking", "Graph Memory", "Collaborative Augmentation"],
      links: [],
    },
  ],
  // { title, period, description, tags: [], links: [{ label, url }] }
  projects: [
    {
      title: "Kaggle Hull Tactical — Market Prediction",
      period: "2025.09 — 2026.06 · 银牌 / 119 of 3,677",
      description: "使用宏观、利率、市场情绪、动量与波动率因子，构建 LightGBM + XGBoost 集成模型，预测标普 500 次日超额收益。结合近期样本窗口、Rank IC 筛选与时间顺序验证，将信号映射为 0–200% 动态仓位，并通过仓位平滑和风险约束优化调整后 Sharpe Ratio。Private Board Score：2.328。",
      tags: ["LightGBM", "XGBoost", "Time-series Validation", "Asset Allocation"], links: [],
    },
    {
      title: "2026 量化交易研究大赛",
      period: "2026.07 — 至今 · 队长",
      description: "基于 1,322 万条多资产高维数据，研究因果时序特征、残差建模、择时与稳健融合。采用嵌套时序验证、purge 与一次性长区间 holdout 控制过拟合。Public R² 为 0.0030，较 baseline 提高 0.0019；CPU 部署耗时 7.63 ms。",
      tags: ["Residual Modeling", "Ensemble Learning", "Purged Validation"], links: [],
    },
    {
      title: "机器学习与大语言模型科研项目",
      period: "2022.09 — 至今 · 项目参与人",
      description: "承担数据预处理与分析、机器学习模型调优和 LLM Prompt Engineering 工作。参与国家自然科学基金重点项目子课题 1 项、面上项目 1 项，以及省部级哲学社会科学项目 4 项。",
      tags: ["Machine Learning", "Data Analysis", "Prompt Engineering"], links: [],
    },
  ],
  // { organization, role, period, description, highlights: [] }
  experience: [
    {
      organization: "上海洛书投资管理有限公司", role: "股票组实习生", period: "2026.09 — 至今",
      description: "新闻文本数据因子挖掘",
      highlights: ["研究新闻情绪、信息增量、信息熵变动，以及新闻发布前后的股价关联效应与股票收益率的关系。"],
    },
    {
      organization: "国元证券自营部", role: "衍生品量化策略实习生", period: "2026.06 — 至今",
      description: "国债收益率曲线 PCA 因子与国债期货相对价值策略",
      highlights: ["从中债收益率曲线提取水平、斜率与曲率因子，并滚动映射至 TS / TF / T / TL 合约。", "构建 PC2 / PC3 相对价值组合，将非目标曲线风险、换手与保证金纳入优化，实现无前视主力选择、t+1 执行与显式换月。"],
    },
    {
      organization: "东方财富证券", role: "金融工程实习生", period: "2026.01 — 2026.04",
      description: "独立研究：基于 LLM 的新闻情绪事件驱动因子",
      highlights: ["独立实现事件驱动因子 MVP，从单日约 1 万条金融新闻中筛选高影响事件。", "基于 RAG 与 Embedding 完成事件—个股映射及相关性校验，输出日频股票池与可回测信号。"],
    },
  ],
  // { title, description, period, benchmark, costs, methodology,
  //   metrics: [{ label, value }], links: [{ label, url }],
  //   equity: [{ date: "2025-01-01", strategy: 1, benchmark: 1 }, ...] }
  // equity 是同一日期对齐的净值；benchmark 可整列省略。仅填写可公开的真实结果。
  strategies: [
    {
      title: "国债期货曲线相对价值策略",
      description: "以国债收益率曲线的 PC2 / PC3 为目标暴露，约束 PC1 与非目标曲线风险，结合正则化、换手和保证金约束构建相对价值组合。",
      period: "待补充精确回测起止日；曲线数据范围为 2021.06 — 2026.07",
      benchmark: "待补充",
      costs: "回测包含交易成本；具体费率与滑点待补充",
      methodology: "日频曲线、滚动因子映射、无前视主力选择、t+1 执行、显式换月",
      metrics: [
        { label: "全段滚动回测 · 年化收益", value: "16.99%" },
        { label: "Sharpe Ratio", value: "1.31" },
        { label: "换手降低", value: "61%" },
        { label: "成本降低", value: "53%" },
      ],
      note: "指标摘自个人简历。换手与成本降幅对应优化前后比较；详细比较口径与净值序列待补充。",
      equity: [], links: [],
    },
    {
      title: "LLM 新闻情绪事件驱动因子",
      description: "利用 LLM 识别高影响金融事件，通过 RAG 与 Embedding 建立事件—个股映射，形成日频股票池与交易信号，并与 FinBERT 基线进行比较。",
      period: "4 年历史回测；具体起止日期待补充",
      benchmark: "FinBERT 情绪模型基线",
      costs: "待补充",
      methodology: "金融新闻情绪提取、事件相关性校验、日频信号评估",
      metrics: [], equity: [], links: [],
      note: "收益对比口径与净值序列整理中。",
    },
  ],
};
