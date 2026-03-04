const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 检查 vercel 是否已安装
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ vercel 已安装');
} catch {
  console.log('📦 安装 vercel...');
  execSync('npm install -g vercel@latest', { stdio: 'inherit' });
}

// 部署
console.log('🚀 开始部署...');
try {
  execSync('vercel deploy --prod --yes', { stdio: 'inherit', cwd: __dirname });
  console.log('✅ 部署完成');
} catch (err) {
  console.error('❌ 部署失败:', err.message);
  process.exit(1);
}
