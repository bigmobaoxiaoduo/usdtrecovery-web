#!/bin/bash
# 构建后脚本：复制中文页面到根目录
cp dist/zh.html dist/index.html
# 修改 canonical 为根路径
sed -i '' 's|rel="canonical" href="https://www.usdtrecovery.xyz/zh"|rel="canonical" href="https://www.usdtrecovery.xyz/"|' dist/index.html
# 修改 og:url 为根路径
sed -i '' 's|property="og:url" content="https://www.usdtrecovery.xyz/zh"|property="og:url" content="https://www.usdtrecovery.xyz/"|' dist/index.html
# 修改 x-default hreflang 为根路径
sed -i '' 's|hrefLang="x-default" href="https://www.usdtrecovery.xyz/zh"|hrefLang="x-default" href="https://www.usdtrecovery.xyz/"|' dist/index.html
echo "✅ Root path set to Chinese content"
