// Case Tracking Data Model and Types

export interface CaseUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'status_change' | 'progress' | 'milestone' | 'note';
}

export interface Case {
  id: string;
  title: string;
  type: 'phishing' | 'rug_pull' | 'exchange_hack' | 'wallet_theft' | 'scam' | 'other';
  amount: number;
  currency: string;
  status: 'investigating' | 'tracing' | 'litigation' | 'recovered' | 'closed' | 'pending';
  date: string;
  description: string;
  progress: number; // 0-100
  victimLocation: string;
  chain: string;
  updates: CaseUpdate[];
  featured?: boolean;
}

export interface CaseStats {
  totalCases: number;
  totalAmount: number;
  recoveredAmount: number;
  recoveryRate: number;
  activeCases: number;
  resolvedCases: number;
}

// Initial sample data
export const initialCases: Case[] = [
  {
    id: "CASE-2026-001",
    title: "USDT钓鱼网站诈骗案",
    type: "phishing",
    amount: 125000,
    currency: "USDT",
    status: "recovered",
    date: "2026-03-15",
    description: "受害者通过伪造的交易所网站登录，导致钱包授权被盗，损失125,000 USDT。",
    progress: 100,
    victimLocation: "中国",
    chain: "TRON",
    featured: true,
    updates: [
      { id: "UPD-001", date: "2026-03-15", title: "案件受理", description: "接到受害者报案，开始初步分析", type: "status_change" },
      { id: "UPD-002", date: "2026-03-16", title: "链上追踪", description: "锁定资金流向，追踪至某中心化交易所", type: "progress" },
      { id: "UPD-003", date: "2026-03-20", title: "交易所配合", description: "联系交易所冻结相关账户", type: "milestone" },
      { id: "UPD-004", date: "2026-03-28", title: "资金追回", description: "成功追回全部损失125,000 USDT", type: "status_change" }
    ]
  },
  {
    id: "CASE-2026-002",
    title: "假DeFi项目Rug Pull",
    type: "rug_pull",
    amount: 450000,
    currency: "USDT",
    status: "litigation",
    date: "2026-03-10",
    description: "投资假DeFi项目，项目方突然撤池跑路，多名受害者共计损失450,000 USDT。",
    progress: 65,
    victimLocation: "新加坡",
    chain: "BSC",
    updates: [
      { id: "UPD-001", date: "2026-03-10", title: "案件受理", description: "多名受害者联合报案", type: "status_change" },
      { id: "UPD-002", date: "2026-03-12", title: "项目分析", description: "分析智能合约，发现后门代码", type: "progress" },
      { id: "UPD-003", date: "2026-03-18", title: "身份调查", description: "追踪项目方身份信息", type: "progress" },
      { id: "UPD-004", date: "2026-03-25", title: "法律诉讼", description: "委托律师发起跨境诉讼", type: "milestone" }
    ]
  },
  {
    id: "CASE-2026-003",
    title: "交易所账户被盗",
    type: "exchange_hack",
    amount: 89000,
    currency: "USDT",
    status: "recovered",
    date: "2026-03-05",
    description: "交易所账户API密钥泄露，黑客通过API提现89,000 USDT。",
    progress: 100,
    victimLocation: "美国",
    chain: "Ethereum",
    updates: [
      { id: "UPD-001", date: "2026-03-05", title: "案件受理", description: "API异常提现发现后立即报案", type: "status_change" },
      { id: "UPD-002", date: "2026-03-06", title: "API分析", description: "分析API调用日志，定位泄露源头", type: "progress" },
      { id: "UPD-003", date: "2026-03-10", title: "交易所介入", description: "交易所安全团队介入调查", type: "milestone" },
      { id: "UPD-004", date: "2026-03-18", title: "资金追回", description: "交易所协助追回部分资金", type: "status_change" }
    ]
  },
  {
    id: "CASE-2026-004",
    title: "Telegram投资群诈骗",
    type: "scam",
    amount: 230000,
    currency: "USDT",
    status: "tracing",
    date: "2026-03-20",
    description: "在Telegram投资群中被诱导投资虚假项目，损失230,000 USDT。",
    progress: 35,
    victimLocation: "英国",
    chain: "TRON",
    updates: [
      { id: "UPD-001", date: "2026-03-20", title: "案件受理", description: "受害者意识到被骗后报案", type: "status_change" },
      { id: "UPD-002", date: "2026-03-22", title: "群组分析", description: "分析Telegram群组参与者", type: "progress" },
      { id: "UPD-003", date: "2026-03-26", title: "资金追踪", description: "追踪资金流向多个地址", type: "progress" }
    ]
  },
  {
    id: "CASE-2026-005",
    title: "Permit2签名钓鱼",
    type: "phishing",
    amount: 56000,
    currency: "USDT",
    status: "recovered",
    date: "2026-03-08",
    description: "签署恶意Permit2授权，导致钱包内56,000 USDT被转走。",
    progress: 100,
    victimLocation: "加拿大",
    chain: "Ethereum",
    updates: [
      { id: "UPD-001", date: "2026-03-08", title: "案件受理", description: "签名后发现资金被转走", type: "status_change" },
      { id: "UPD-002", date: "2026-03-09", title: "紧急响应", description: "立即撤销授权，防止进一步损失", type: "progress" },
      { id: "UPD-003", date: "2026-03-12", title: "地址监控", description: "监控黑客地址活动", type: "progress" },
      { id: "UPD-004", date: "2026-03-22", title: "资金追回", description: "在黑客转入交易所时成功拦截", type: "status_change" }
    ]
  },
  {
    id: "CASE-2026-006",
    title: "钱包助记词泄露",
    type: "wallet_theft",
    amount: 178000,
    currency: "USDT",
    status: "closed",
    date: "2026-02-28",
    description: "助记词保存在云端被黑客获取，钱包内178,000 USDT被盗。",
    progress: 100,
    victimLocation: "澳大利亚",
    chain: "Ethereum",
    updates: [
      { id: "UPD-001", date: "2026-02-28", title: "案件受理", description: "发现钱包资产被盗", type: "status_change" },
      { id: "UPD-002", date: "2026-03-01", title: "链上分析", description: "追踪资金流向，发现已进入混币器", type: "progress" },
      { id: "UPD-003", date: "2026-03-10", title: "案件评估", description: "评估追回可能性较低", type: "note" },
      { id: "UPD-004", date: "2026-03-15", title: "案件关闭", description: "因资金已进入混币器，暂时关闭案件", type: "status_change" }
    ]
  },
  {
    id: "CASE-2026-007",
    title: "假客服诈骗",
    type: "scam",
    amount: 34000,
    currency: "USDT",
    status: "recovered",
    date: "2026-03-25",
    description: "接到假冒交易所客服电话，诱导下载恶意软件，损失34,000 USDT。",
    progress: 100,
    victimLocation: "德国",
    chain: "BSC",
    updates: [
      { id: "UPD-001", date: "2026-03-25", title: "案件受理", description: "受害者意识到被骗后报案", type: "status_change" },
      { id: "UPD-002", date: "2026-03-26", title: "软件分析", description: "分析恶意软件行为", type: "progress" },
      { id: "UPD-003", date: "2026-03-28", title: "资金追踪", description: "追踪至某小型交易所", type: "progress" },
      { id: "UPD-004", date: "2026-04-01", title: "资金追回", description: "成功追回全部资金", type: "status_change" }
    ]
  },
  {
    id: "CASE-2026-008",
    title: "AI深度伪造诈骗",
    type: "scam",
    amount: 156000,
    currency: "USDT",
    status: "investigating",
    date: "2026-03-30",
    description: "通过AI深度伪造视频冒充知名投资人，诱导投资，损失156,000 USDT。",
    progress: 15,
    victimLocation: "日本",
    chain: "TRON",
    featured: true,
    updates: [
      { id: "UPD-001", date: "2026-03-30", title: "案件受理", description: "新型AI诈骗案件", type: "status_change" },
      { id: "UPD-002", date: "2026-04-01", title: "视频分析", description: "分析伪造视频的技术特征", type: "progress" }
    ]
  }
];

// Calculate stats from cases
export function calculateStats(cases: Case[]): CaseStats {
  const totalCases = cases.length;
  const totalAmount = cases.reduce((sum, c) => sum + c.amount, 0);
  const recoveredAmount = cases
    .filter(c => c.status === 'recovered')
    .reduce((sum, c) => sum + c.amount, 0);
  const resolvedCases = cases.filter(c => c.status === 'recovered' || c.status === 'closed').length;
  const activeCases = cases.filter(c => ['investigating', 'tracing', 'litigation'].includes(c.status)).length;
  
  return {
    totalCases,
    totalAmount,
    recoveredAmount,
    recoveryRate: totalCases > 0 ? Math.round((resolvedCases / totalCases) * 100) : 0,
    activeCases,
    resolvedCases
  };
}

// Status display config
export const statusConfig = {
  investigating: { label: '调查中', color: 'yellow', icon: '🔍' },
  tracing: { label: '追踪中', color: 'blue', icon: '🔎' },
  litigation: { label: '诉讼中', color: 'purple', icon: '⚖️' },
  recovered: { label: '已追回', color: 'green', icon: '✅' },
  closed: { label: '已关闭', color: 'gray', icon: '📁' },
  pending: { label: '待处理', color: 'orange', icon: '⏳' }
};

// Type display config
export const typeConfig = {
  phishing: { label: '钓鱼诈骗', color: 'red' },
  rug_pull: { label: 'Rug Pull', color: 'pink' },
  exchange_hack: { label: '交易所被盗', color: 'orange' },
  wallet_theft: { label: '钱包被盗', color: 'yellow' },
  scam: { label: '诈骗', color: 'purple' },
  other: { label: '其他', color: 'gray' }
};
