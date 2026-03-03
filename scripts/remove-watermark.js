#!/usr/bin/env node
/**
 * 移除图片水印
 */

const { editImage } = require('../../image-tools/doubao-image.js');
const path = require('path');

const OUTPUT_DIR = '/Users/yixiao/.openclaw/workspace/web3-recovery-demo/public';

// 需要处理的图片
const IMAGES = [
  {
    name: 'OG社交分享图',
    input: path.join(OUTPUT_DIR, 'og-image.jpg'),
    output: path.join(OUTPUT_DIR, 'og-image-clean.jpg'),
    prompt: 'Remove the "AI生成" watermark in bottom right corner. Keep everything else exactly the same - the blue gradient background, the blockchain network globe, the white text "USDTRecovery 虚拟币追回服务" at top, and the gold text "357+成功案例" at bottom. Just remove the watermark text, no other changes.',
  },
  {
    name: 'Hero背景图',
    input: path.join(OUTPUT_DIR, 'images/hero-bg.jpg'),
    output: path.join(OUTPUT_DIR, 'images/hero-bg-clean.jpg'),
    prompt: 'Remove the "AI生成" watermark in bottom right corner. Keep the deep blue to purple gradient background, the blockchain nodes and connection lines, and the digital particle effects. Just remove the watermark text, no other changes.',
  },
];

async function main() {
  console.log('🧹 开始移除水印...\n');
  
  for (const img of IMAGES) {
    console.log(`\n🎨 处理: ${img.name}`);
    console.log(`   输入: ${img.input}`);
    console.log(`   输出: ${img.output}`);
    
    try {
      await editImage(img.input, img.prompt, img.output);
      console.log(`   ✅ 完成: ${img.name}`);
    } catch (err) {
      console.error(`   ❌ 失败: ${err.message}`);
    }
  }
  
  console.log('\n🎉 处理完成！');
}

main().catch(console.error);
