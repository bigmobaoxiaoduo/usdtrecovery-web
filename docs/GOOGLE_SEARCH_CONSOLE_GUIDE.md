# Google Search Console 验证指南

## 📋 验证前准备

1. 确保网站已部署并可通过 `https://usdtrecovery.xyz` 访问
2. 准备好 Google 账号
3. 确保已生成并上传 sitemap.xml

---

## 🔧 验证步骤

### 方法 1：HTML 文件验证（推荐）

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 选择 "网域" 或 "网址前缀" 添加属性
3. 选择 "网址前缀" 并输入：`https://usdtrecovery.xyz`
4. 选择验证方式："HTML 文件"
5. 下载 Google 提供的 HTML 验证文件（例如：`google123456789.html`）
6. 将文件上传到 `public/` 目录
7. 点击 "验证"

### 方法 2：HTML 元标记验证（备选）

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加属性：`https://usdtrecovery.xyz`
3. 选择验证方式："HTML 标记"
4. 复制 meta 标记，例如：
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
5. 编辑 `src/app/[locale]/layout.tsx`
6. 在 `<head>` 内的 `verification` 对象中添加：
   ```typescript
   verification: {
     google: 'YOUR_VERIFICATION_CODE',
   },
   ```
7. 或者直接在 `<head>` 中添加 meta 标签
8. 重新部署网站
9. 点击 "验证"

---

## 📊 添加 Sitemap

验证成功后，请务必提交 Sitemap：

1. 在 Search Console 左侧菜单选择 "站点地图"
2. 输入：`sitemap.xml`
3. 点击 "提交"

---

## ✅ 验证后检查清单

- [ ] 网站所有权已验证
- [ ] Sitemap 已提交
- [ ]  robots.txt 可访问
- [ ] 首页已被索引
- [ ] 移动设备适用性检查通过

---

## 📞 常见问题

**Q: 验证失败怎么办？**
- 确保文件已上传到正确位置
- 清除 CDN 缓存
- 等待 5-10 分钟后重试

**Q: 需要多久才能看到数据？**
- 通常需要 1-3 天数据才会显示

**Q: 多语言网站需要分别验证吗？**
- 不需要，只需验证主域名即可
