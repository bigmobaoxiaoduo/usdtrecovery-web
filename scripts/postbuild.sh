#!/bin/bash
# 构建后脚本：复制中文页面到根目录并创建 index.html 结构

# 复制中文首页到根目录
cp dist/zh.html dist/index.html

# 为根目录的每个页面创建目录结构（about, blog, consult, privacy, terms）
for page in about blog consult privacy terms; do
  if [ -f "dist/zh/$page.html" ]; then
    mkdir -p "dist/$page"
    cp "dist/zh/$page.html" "dist/$page/index.html"
    echo "Created dist/$page/index.html"
  fi
done

# 复制中文子目录下的文章页面（保留在子目录中）
for dir in dist/zh/*/; do
  if [ -d "$dir" ]; then
    dirname=$(basename "$dir")
    # 如果目录已存在（由上面创建），只复制里面的内容
    if [ -d "dist/$dirname" ]; then
      # 复制子目录下的所有文件
      cp "$dir"*.html "$dir"*.txt "dist/$dirname/" 2>/dev/null || true
      echo "Copied files to dist/$dirname/"
    else
      # 目录不存在，直接复制整个目录
      cp -r "$dir" "dist/$dirname"
      echo "Copied dist/$dirname/"
    fi
  fi
done

# 修改根目录 index.html 的 canonical 为根路径
sed -i '' 's|rel="canonical" href="https://www.usdtrecovery.xyz/zh"|rel="canonical" href="https://www.usdtrecovery.xyz/"|' dist/index.html
# 修改 og:url 为根路径
sed -i '' 's|property="og:url" content="https://www.usdtrecovery.xyz/zh"|property="og:url" content="https://www.usdtrecovery.xyz/"|' dist/index.html
# 修改 x-default hreflang 为根路径
sed -i '' 's|hrefLang="x-default" href="https://www.usdtrecovery.xyz/zh"|hrefLang="x-default" href="https://www.usdtrecovery.xyz/"|' dist/index.html

echo "✅ Root path pages created with index.html structure"
