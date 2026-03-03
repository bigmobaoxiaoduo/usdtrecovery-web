#!/usr/bin/env node
/**
 * 生成USDTRecovery网站图片
 */

const { generateImage } = require('../../image-tools/doubao-image.js');
const fs = require('fs').promises;
const path = require('path');

const OUTPUT_DIR = '/Users/yixiao/.openclaw/workspace/web3-recovery-demo/public';

// 图片生成配置
const IMAGES = [
  {
    name: 'OG社交分享图 (og-image.jpg)',
    path: path.join(OUTPUT_DIR, 'og-image.jpg'),
    size: '1792x1024', // 16:9 接近 1200x630 的比例
    prompt: `Professional fintech social media cover design. Deep blue tech gradient background with abstract blockchain network pattern in center. Clean white text at top: "USDTRecovery 虚拟币追回服务". Gold accent text at bottom showing "357+成功案例". Modern minimalist style, no extra elements, suitable for WeChat/Twitter sharing. Brand colors: deep blue #0a1628, gold #ffd700 accents. High quality, cinematic lighting. NO watermarks, NO "AI生成" text, NO template marks.`,
  },
  {
    name: 'Logo (logo.png)',
    path: path.join(OUTPUT_DIR, 'logo.png'),
    size: '1024x1024',
    prompt: `Minimalist USDTRecovery brand logo on transparent background. Deep blue circular shield outline with golden abstract shield icon inside. NO text, NO watermarks, NO "AI生成" marks. Clean modern style suitable for favicon and logo use. Isolated on pure transparent background. Vector-like crisp edges.`,
  },
  {
    name: 'Hero背景图 (hero-bg.jpg)',
    path: path.join(OUTPUT_DIR, 'images/hero-bg.jpg'),
    size: '1792x1024', // 16:9 接近 1920x1080
    prompt: `Premium fintech website background. Deep blue to deep purple gradient background with subtle digital particle effects scattered like stars. Semi-transparent blockchain node connection lines gently floating. Right side has visual blank space suitable for white text headlines. NO text, NO watermarks, NO icons, pure background only. Cinematic quality, soft lighting. NO "AI生成" marks, NO template elements.`,
  },
];

async function main() {
  console.log('🎨 开始生成USDTRecovery网站图片...\n');
  
  for (const img of IMAGES) {
    console.log(`\n📸 正在生成: ${img.name}`);
    console.log(`   输出路径: ${img.path}`);
    
    try {
      await generateImage(img.prompt, img.path, {
        size: img.size,
        model: 'doubao-seedream-4-0-250828', // 使用最新的4.0模型
      });
      console.log(`   ✅ 成功生成: ${img.name}`);
    } catch (err) {
      console.error(`   ❌ 生成失败: ${err.message}`);
    }
  }
  
  console.log('\n🎉 所有图片生成完成！');
}

main().catch(console.error);
