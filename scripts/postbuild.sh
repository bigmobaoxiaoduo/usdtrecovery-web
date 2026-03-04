#!/bin/bash
# 构建后脚本：复制中文页面到根目录
cp dist/zh.html dist/index.html

# 复制其他中文页面到根目录（去掉 /zh 前缀）
for file in dist/zh/*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    cp "$file" "dist/$filename"
  fi
done

# 复制中文子目录到根目录
for dir in dist/zh/*/; do
  if [ -d "$dir" ]; then
    dirname=$(basename "$dir")
    if [ ! -d "dist/$dirname" ]; then
      cp -r "$dir" "dist/$dirname"
    fi
  fi
done

# 修改 canonical 为根路径
sed -i '' 's|rel="canonical" href="https://www.usdtrecovery.xyz/zh"|rel="canonical" href="https://www.usdtrecovery.xyz/"|' dist/index.html
# 修改 og:url 为根路径
sed -i '' 's|property="og:url" content="https://www.usdtrecovery.xyz/zh"|property="og:url" content="https://www.usdtrecovery.xyz/"|' dist/index.html
# 修改 x-default hreflang 为根路径
sed -i '' 's|hrefLang="x-default" href="https://www.usdtrecovery.xyz/zh"|hrefLang="x-default" href="https://www.usdtrecovery.xyz/"|' dist/index.html

echo "✅ Root path pages created"
