const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureHeroBg() {
  const outputPath = '/Users/yixiao/.openclaw/workspace/web3-recovery-demo/public/images/hero-bg-new.jpg';
  
  console.log('Starting browser...');
  const browser = await chromium.launch({
    headless: true
  });
  
  const page = await browser.newPage({
    viewport: {
      width: 1920,
      height: 1080
    },
    deviceScaleFactor: 1
  });
  
  // 加载HTML文件
  const htmlPath = 'file:///tmp/hero-bg.html';
  console.log('Loading HTML:', htmlPath);
  await page.goto(htmlPath, {
    waitUntil: 'networkidle'
  });
  
  // 等待动画稳定
  console.log('Waiting for animations to stabilize...');
  await page.waitForTimeout(2000);
  
  // 确保输出目录存在
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 截图并保存为JPEG
  console.log('Capturing screenshot...');
  await page.screenshot({
    path: outputPath,
    type: 'jpeg',
    quality: 85,
    fullPage: true
  });
  
  console.log('Screenshot saved to:', outputPath);
  
  // 检查文件大小
  const stats = fs.statSync(outputPath);
  const sizeKB = Math.round(stats.size / 1024);
  console.log(`File size: ${sizeKB}KB`);
  
  if (sizeKB > 100) {
    console.log('Warning: File size exceeds 100KB. Re-compressing...');
    
    // 重新压缩
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 60,
      fullPage: true
    });
    
    const newStats = fs.statSync(outputPath);
    console.log(`New file size: ${Math.round(newStats.size / 1024)}KB`);
  }
  
  await browser.close();
  console.log('Done!');
}

captureHeroBg().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});