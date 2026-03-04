#!/bin/bash
# 构建后脚本：复制中文页面到根目录
cp dist/zh.html dist/index.html
# 修改 canonical 为根路径
sed -i '' 's|href="https://www.usdtrecovery.xyz/zh"|href="https://www.usdtrecovery.xyz/"|g' dist/index.html
sed -i '' 's|content="https://www.usdtrecovery.xyz/zh"|content="https://www.usdtrecovery.xyz/"|g' dist/index.html
echo "✅ Root path set to Chinese content"
