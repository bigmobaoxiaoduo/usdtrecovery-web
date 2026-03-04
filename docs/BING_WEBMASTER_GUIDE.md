# Bing Webmaster 验证指南

## 📋 验证前准备

1. 确保网站已部署并可通过 `https://usdtrecovery.xyz` 访问
2. 准备好 Microsoft 账号
3. 确保已生成并上传 sitemap.xml

---

## 🔧 验证步骤

### 方法 1：XML 验证（推荐）

1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 点击 "添加网站"
3. 选择 "从 Google Search Console 导入" 或 "手动添加"
4. 输入：`https://usdtrecovery.xyz`
5. 选择验证方式："添加 Bing 站点验证码到您的网页"
6. 复制提供的验证代码
7. 编辑 `src/app/[locale]/layout.tsx`
8. 在 `<head>` 中添加：
   ```html
   <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
   ```
9. 重新部署网站
10. 点击 "验证"

### 方法 2：DNS 验证（适合根域名）

1. 在 Bing Webmaster 选择 DNS 验证
2. 复制提供的 TXT 记录
3. 在域名管理后台添加 TXT 记录
4. 等待 DNS 传播（可能需要 24-48 小时）
5. 点击 "验证"

---

## 📊 添加 Sitemap

验证成功后，提交 Sitemap：

1. 在 Bing Webmaster 左侧菜单选择 "Sitemaps"
2. 输入：`https://usdtrecovery.xyz/sitemap.xml`
3. 点击 "Submit"

---

## 🌐 额外配置

### 提交到 Bing News（可选）

如果网站有新闻内容：

1. 访问 [Bing Publisher Center](https://www.bing.com/pubhub)
2. 添加您的网站
3. 提交 RSS Feed 或 News Sitemap
4. 我们的 `sitemap-google-news.xml` 可同时用于 Bing News

---

## ✅ 验证后检查清单

- [ ] 网站所有权已验证
- [ ] Sitemap 已提交
- [ ] URL 提交功能可用
- [ ] 爬虫控制设置正确
- [ ] robots.txt 测试通过

---

## 📞 常见问题

**Q: Bing 和 Google 的收录有区别吗？**
- Bing 通常收录速度较慢，但对中文内容的理解可能更好

**Q: 需要单独为 Yahoo 提交吗？**
- 不需要，Yahoo 使用 Bing 的搜索结果

**Q: 如何加快 Bing 收录？**
- 使用 "URL 提交" 功能手动提交重要页面
- 确保网站质量高、内容原创
- 建立高质量外链

---

## 🔗 相关工具

- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Bing URL Submission API](https://www.bing.com/webmasters/url-submission-api)
- [Bing Site Scan](https://www.bing.com/webmasters/seo)
