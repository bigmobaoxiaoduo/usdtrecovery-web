const { chromium } = require('playwright');
const path = require('path');

const OUTPUT_DIR = '/Users/yixiao/.openclaw/workspace/web3-recovery-demo/public';
const HTML_PATH = 'file:///Users/yixiao/.openclaw/workspace/web3-recovery-demo/scripts/images.html';

async function captureImages() {
  console.log('🎨 启动浏览器...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 加载HTML文件
  await page.goto(HTML_PATH);
  await page.waitForLoadState('networkidle');
  
  console.log('📸 开始截图...\n');
  
  // 1. 截图 OG Image (1200x630)
  const ogElement = await page.$('#og-image');
  await ogElement.screenshot({
    path: path.join(OUTPUT_DIR, 'og-image.jpg'),
    type: 'jpeg',
    quality: 95
  });
  console.log('✅ OG社交分享图已保存: public/og-image.jpg (1200x630)');
  
  // 2. 截图 Hero Background (1920x1080)
  const heroElement = await page.$('#hero-bg');
  await heroElement.screenshot({
    path: path.join(OUTPUT_DIR, 'images/hero-bg.jpg'),
    type: 'jpeg',
    quality: 95
  });
  console.log('✅ Hero背景图已保存: public/images/hero-bg.jpg (1920x1080)');
  
  // 3. 截图 Logo (512x512) - 使用透明背景
  const logoElement = await page.$('#logo');
  await logoElement.screenshot({
    path: path.join(OUTPUT_DIR, 'logo.png'),
    type: 'png'
  });
  console.log('✅ Logo已保存: public/logo.png (512x512, 透明背景)');
  
  await browser.close();
  console.log('\n🎉 所有无水印图片生成完成！');
}

captureImages().catch(err => {
  console.error('❌ 错误:', err.message);
  process.exit(1);
});
