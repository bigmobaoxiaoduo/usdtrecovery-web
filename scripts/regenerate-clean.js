#!/usr/bin/env node
/**
 * 重新生成无水印图片 - 使用严格prompt
 */

const { generateImage } = require('../../image-tools/doubao-image.js');
const path = require('path');

const OUTPUT_DIR = '/Users/yixiao/.openclaw/workspace/web3-recovery-demo/public';

// 严格无水印prompt
const IMAGES = [
  {
    name: 'OG社交分享图 (og-image.jpg)',
    path: path.join(OUTPUT_DIR, 'og-image.jpg'),
    size: '1792x1024',
    prompt: `Professional fintech company social media banner. Deep blue #0a1628 tech gradient background transitioning from dark to lighter blue. Center features an abstract glowing blue blockchain network globe made of connected nodes and lines. At top: clean white bold text "USDTRecovery 虚拟币追回服务". At bottom: golden #ffd700 text "357+成功案例". Modern minimalist corporate style, no decorative borders, no frames. Clean professional design suitable for business social media sharing. IMPORTANT: Absolutely NO watermarks, NO "AI生成" text, NO platform logos, NO decorative template elements. Pure clean design only.`,
  },
  {
    name: 'Logo (logo.png)',
    path: path.join(OUTPUT_DIR, 'logo.png'),
    size: '1024x1024',
    prompt: `Minimalist USDTRecovery brand logo. Deep navy blue #0a1628 circular shield outline with double thin golden #ffd700 border rings inside. Center contains abstract golden shield icon with geometric angular design. No text, no letters, no words. Clean vector-style with crisp edges. Transparent background (checkerboard pattern). Modern professional fintech style. IMPORTANT: Absolutely NO watermarks, NO "AI生成" text, NO background texture, NO decorative elements. Pure clean logo only.`,
  },
  {
    name: 'Hero背景图 (hero-bg.jpg)',
    path: path.join(OUTPUT_DIR, 'images/hero-bg.jpg'),
    size: '1792x1024',
    prompt: `Premium fintech website hero background. Smooth gradient from deep navy blue #0a1628 on left to deep purple on right. Subtle digital particles scattered like distant stars across the entire image. Semi-transparent glowing blockchain node connection lines floating gently in left and center areas. Right side has clean empty space with softer gradient, suitable for white text overlay. Cinematic quality, soft ambient lighting, depth of field effect. No text, no icons, no UI elements. IMPORTANT: Absolutely NO watermarks, NO "AI生成" text, NO corner badges, NO template marks. Pure clean abstract background only.`,
  },
];

async function main() {
  console.log('🎨 开始重新生成无水印图片...\n');
  
  for (const img of IMAGES) {
    console.log(`\n📸 正在生成: ${img.name}`);
    console.log(`   输出路径: ${img.path}`);
    
    try {
      await generateImage(img.prompt, img.path, {
        size: img.size,
        model: 'doubao-seedream-4-0-250828',
      });
      console.log(`   ✅ 成功生成: ${img.name}`);
    } catch (err) {
      console.error(`   ❌ 生成失败: ${err.message}`);
    }
    
    // 等待2秒，避免API限流
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log('\n🎉 所有图片生成完成！');
  console.log('\n📁 生成的文件:');
  for (const img of IMAGES) {
    console.log(`   - ${img.path}`);
  }
}

main().catch(console.error);
