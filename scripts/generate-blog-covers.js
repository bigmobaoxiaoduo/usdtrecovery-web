/**
 * 生成博客封面图脚本
 * 使用豆包API生成6张专业博客封面
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

const API_KEY = '55b201be-9881-46f0-8364-55372279fe1b';
const API_BASE = 'https://ark.cn-beijing.volces.com/api/v3';
const IMAGE_MODEL = 'doubao-seedream-3-0-t2i-250415';

const OUTPUT_DIR = path.join(__dirname, '../public/images/blog');

// 6张封面配置
const COVERS = [
  {
    filename: 'usdt-recovery-cover.jpg',
    prompt: `Professional blog cover image for cryptocurrency recovery service.
Dark blue gradient background (#0a1628 to #1a3a5c).
Golden shield with glowing effect protecting a USDT (Tether) coin symbol in the center.
Blockchain transaction traces and network nodes floating around.
Digital chain links and security locks.
Modern tech style, clean and professional design.
Corporate blue and gold color scheme.
High contrast, suitable for web header.
Minimalist composition with strong visual hierarchy.`,
  },
  {
    filename: 'police-guide-cover.jpg',
    prompt: `Professional blog cover for crypto police reporting guide.
Dark navy blue background (#0d1f33 to #1e3a5f).
Police badge integrated with blockchain elements and digital circuits.
Scales of justice with glowing cryptocurrency symbols.
Handcuffs and security icons merging with binary code.
Law enforcement meets blockchain technology theme.
Professional authority color palette: navy, silver, gold accents.
Clean corporate design, suitable for legal/compliance blog.
Modern flat design with subtle gradients.`,
  },
  {
    filename: 'wallet-security-cover.jpg',
    prompt: `Professional blog cover for cryptocurrency wallet security.
Deep blue gradient background (#0a1a2e to #1a3a5c).
Hardware wallet device with glowing shield protection.
Chain links wrapping around forming a secure barrier.
Lock icons and encryption symbols floating in space.
Digital fingerprint and biometric security elements.
Circuit board patterns subtly integrated.
Tech security color scheme: electric blue, cyan, silver.
Modern minimalist style, high-end corporate feel.
Strong visual impact for cybersecurity blog header.`,
  },
  {
    filename: 'fake-exchange-cover.jpg',
    prompt: `Professional blog cover for identifying fake crypto exchanges.
Dark blue background (#0d1f33 to #1a3d5c).
Large magnifying glass examining suspicious website interface.
Warning signs and caution symbols (yellow/orange).
Phishing hook and trap imagery.
Browser window with fake exchange UI being analyzed.
Shield with X mark indicating danger.
Security alert theme with professional color scheme.
Blue, orange warning accents, white highlights.
Clean informative design for scam awareness blog.
Modern flat illustration style.`,
  },
  {
    filename: 'defi-rugpull-cover.jpg',
    prompt: `Professional blog cover for DeFi rug pull warning.
Dark blue gradient background (#0a1628 to #1e3a5c).
Dramatic chart showing sharp price crash/drop.
Hands pulling a rug from under crypto coins.
Warning triangle symbols and alert icons.
DeFi protocol logos with danger indicators.
Broken contracts and scattered tokens.
Risk management and warning theme.
Dark mood with red warning accents on blue base.
Professional financial blog illustration style.
Clean vector-like design suitable for educational content.`,
  },
  {
    filename: 'blockchain-forensics-cover.jpg',
    prompt: `Professional blog cover for blockchain forensics investigation.
Deep blue background (#0a1a2e to #1a3a5c).
Complex transaction flow diagram with glowing nodes.
Magnifying glass analyzing blockchain data.
Digital paper trail connecting wallet addresses.
Investigation board with transaction maps.
Forensic analysis tools and cryptographic elements.
Network graph showing fund movements.
Professional investigator/detective theme.
Tech noir color palette: deep blue, cyan, gold highlights.
Sophisticated analytical design for professional services blog.
Clean modern infographic style.`,
  },
];

function generateImage(prompt, outputPath) {
  return new Promise((resolve, reject) => {
    const requestBody = {
      model: IMAGE_MODEL,
      prompt: prompt,
      n: 1,
    };

    const req = https.request(
      `${API_BASE}/images/generations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', async () => {
          try {
            const response = JSON.parse(data);
            
            if (response.error) {
              reject(new Error(`API Error: ${response.error.message}`));
              return;
            }

            const imageUrl = response.data?.[0]?.url;
            const imageData = response.data?.[0]?.b64_json;
            
            if (imageUrl) {
              // 下载图片
              await downloadImage(imageUrl, outputPath);
              resolve(outputPath);
            } else if (imageData) {
              await fs.writeFile(outputPath, Buffer.from(imageData, 'base64'));
              resolve(outputPath);
            } else {
              reject(new Error('No image data returned'));
            }
          } catch (err) {
            reject(new Error(`Parse error: ${err.message}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(JSON.stringify(requestBody));
    req.end();
  });
}

function downloadImage(url, outputPath) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(outputPath);
      });
    }).on('error', reject);
  });
}

async function generateCovers() {
  console.log('🎨 开始生成博客封面图...\n');
  
  // 确保输出目录存在
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  const results = [];
  
  for (let i = 0; i < COVERS.length; i++) {
    const cover = COVERS[i];
    const outputPath = path.join(OUTPUT_DIR, cover.filename);
    
    try {
      console.log(`[${i + 1}/6] 📄 生成: ${cover.filename}`);
      console.log(`   提示词: ${cover.prompt.slice(0, 80)}...`);
      
      await generateImage(cover.prompt, outputPath);
      
      // 获取文件大小
      const stats = await fs.stat(outputPath);
      const sizeKB = Math.round(stats.size / 1024);
      
      results.push({
        filename: cover.filename,
        status: '✅ 成功',
        size: `${sizeKB}KB`,
      });
      
      console.log(`   ✅ 完成 (${sizeKB}KB)\n`);
      
      // 添加延迟避免API限制
      if (i < COVERS.length - 1) {
        await new Promise(r => setTimeout(r, 1500));
      }
      
    } catch (error) {
      console.error(`   ❌ 失败: ${error.message}\n`);
      results.push({
        filename: cover.filename,
        status: '❌ 失败',
        error: error.message,
      });
    }
  }
  
  // 打印结果汇总
  console.log('\n' + '='.repeat(60));
  console.log('📊 生成结果汇总');
  console.log('='.repeat(60));
  results.forEach(r => {
    console.log(`${r.status} ${r.filename.padEnd(35)} ${r.size || r.error || ''}`);
  });
  console.log('='.repeat(60));
  
  const successCount = results.filter(r => r.status === '✅ 成功').length;
  console.log(`\n✅ 成功: ${successCount}/${COVERS.length}`);
  
  if (successCount === COVERS.length) {
    console.log('🎉 所有封面图生成成功！');
  }
  
  return results;
}

// 执行
generateCovers().catch(console.error);
