# Newsletter 系统配置

## 技术方案选型

推荐使用 **Resend** (https://resend.com)

### 选择理由
1. **免费额度充足** - 3,000封/月，足够初创阶段
2. **React Email 支持** - 使用 React 组件编写邮件模板
3. **送达率高** - 基于 AWS SES，送达率有保障
4. **简单易用** - API 简洁，文档完善
5. **域名验证** - 支持自定义发件域名

### 备选方案
- **Mailchimp** - 功能全面但复杂
- **SendGrid** - 老牌服务，免费100封/天
- **AWS SES** - 最便宜但需要自行搭建

---

## 实施步骤

### 1. 注册 Resend 账号
1. 访问 https://resend.com
2. 使用邮箱注册
3. 验证域名（usdtrecovery.xyz）
4. 获取 API Key

### 2. 安装依赖
```bash
npm install resend react-email @react-email/components
```

### 3. 配置环境变量
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@usdtrecovery.xyz
```

### 4. 创建邮件模板

---

## 邮件模板设计

### 模板1: 欢迎邮件 (Welcome Email)

**发送时机**: 用户订阅后立即发送

**内容结构**:
- 欢迎语
- 品牌介绍
- 服务说明
- 联系方式
- 退订链接

### 模板2: 月度简报 (Monthly Newsletter)

**发送时机**: 每月1日

**内容结构**:
- 本月追回成果统计
- 重点案件进展
- 最新诈骗手法警示
- 安全知识分享
- 博客文章推荐

### 模板3: 案件进展通知

**发送时机**: 用户关注的案件有重要更新

**内容结构**:
- 案件编号和标题
- 最新进展说明
- 下一步计划
- 联系咨询

### 模板4: 安全警报

**发送时机**: 发现新型诈骗手法时

**内容结构**:
- 警报标题
- 诈骗手法描述
- 如何识别
- 防范建议
- 举报方式

---

## API 实现

### 订阅接口
```typescript
// app/api/subscribe/route.ts
import { Resend } from 'resend';
import { WelcomeEmail } from '@/emails/welcome';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();
  
  try {
    // 1. 保存到数据库
    await saveSubscriber(email);
    
    // 2. 发送欢迎邮件
    await resend.emails.send({
      from: 'USDTRecovery <noreply@usdtrecovery.xyz>',
      to: email,
      subject: '欢迎订阅 USDTRecovery 安全资讯',
      react: WelcomeEmail({ email }),
    });
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: '订阅失败' }, { status: 500 });
  }
}
```

### 退订接口
```typescript
// app/api/unsubscribe/route.ts
export async function POST(req: Request) {
  const { email, token } = await req.json();
  
  try {
    await removeSubscriber(email, token);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: '退订失败' }, { status: 500 });
  }
}
```

---

## 数据库设计

### Subscribers 表
```sql
CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- active, unsubscribed, bounced
  source VARCHAR(50), -- website, popup, footer
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP,
  token VARCHAR(255) UNIQUE, -- 用于退订验证
  metadata JSONB -- 额外信息
);

CREATE INDEX idx_subscribers_status ON subscribers(status);
CREATE INDEX idx_subscribers_email ON subscribers(email);
```

### EmailLogs 表
```sql
CREATE TABLE email_logs (
  id SERIAL PRIMARY KEY,
  subscriber_id INTEGER REFERENCES subscribers(id),
  email_type VARCHAR(50), -- welcome, newsletter, alert
  subject VARCHAR(255),
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  status VARCHAR(20) -- sent, delivered, opened, bounced
);
```

---

## 前端组件

### 订阅表单
```typescript
// components/NewsletterForm.tsx
'use client';

import { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="输入您的邮箱"
          required
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          {status === 'loading' ? '订阅中...' : '订阅'}
        </button>
      </div>
      
      {status === 'success' && (
        <p className="text-green-600 text-sm">✅ 订阅成功！请查收确认邮件。</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 text-sm">❌ 订阅失败，请稍后重试。</p>
      )}
      
      <p className="text-xs text-gray-500">
        我们尊重您的隐私，不会向第三方分享您的邮箱。
      </p>
    </form>
  );
}
```

---

## 发送策略

### 发送时间优化
- **Newsletter**: 周二/周四上午 10:00 (时区自适应)
- **案件进展**: 实时发送（重要更新）或每日汇总
- **安全警报**: 发现威胁后立即发送

### 频率控制
- Newsletter: 每月1-2次
- 案件进展: 每周最多1次（除非紧急情况）
- 安全警报: 按需发送

### 避免垃圾邮件
1. 使用已验证的域名发送
2. 包含清晰的退订链接
3. 避免垃圾邮件关键词
4. 监控退订率和投诉率
5. 使用双重确认（可选）

---

## 监控指标

### 核心指标
| 指标 | 目标值 |
|------|--------|
| 订阅转化率 | > 2% |
| 邮件打开率 | > 25% |
| 点击率 | > 5% |
| 退订率 | < 0.5% |
| 退回率 | < 2% |

### 追踪方式
- Resend 内置分析
- UTM 参数追踪链接点击
- 自定义事件追踪

---

## 合规要求

### CAN-SPAM 合规
1. 真实的发件人信息
2. 真实的主题行
3. 包含退订链接
4. 包含物理地址（可选）
5. 及时处理退订请求

### GDPR 合规
1. 获得明确同意
2. 提供隐私政策链接
3. 允许用户删除数据
4. 记录同意时间

---

## 部署检查清单

- [ ] Resend 账号注册完成
- [ ] 域名验证完成
- [ ] API Key 配置到环境变量
- [ ] 订阅表单部署到网站
- [ ] 欢迎邮件模板测试
- [ ] 退订功能测试
- [ ] 隐私政策更新（添加邮件相关条款）
- [ ] 数据库表创建
- [ ] 监控告警配置

---

**创建时间**: 2026-04-01  
**状态**: ✅ 配置完成，等待部署
