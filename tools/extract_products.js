'use strict';

const fs = require('fs');
const path = require('path');

const CATALOGO_PATH = path.join(__dirname, '..', 'catalogo.html');

const CATEGORY_RE = /<section class="catalog-category" id="([^"]+)">([\s\S]*?)<\/section>/g;
const CATEGORY_TITLE_RE = /<h2[^>]*>([^<]+)<\/h2>/;
const PRODUCT_ROW_RE = /<div class="product-row">\s*<span class="product-name">([^<]+)<\/span>\s*<div class="product-tooltip">\s*<img[^>]*>\s*<p>([\s\S]*?)<\/p>\s*<\/div>\s*<a href="[^"]*" target="_blank" rel="noopener" class="btn-price-row">VER PRECIOS<\/a>\s*<\/div>/g;

function cleanText(str) {
  return str.replace(/\s+/g, ' ').trim();
}

function extractProducts(html) {
  const products = [];
  let categoryMatch;
  CATEGORY_RE.lastIndex = 0;
  while ((categoryMatch = CATEGORY_RE.exec(html)) !== null) {
    const [, categoryId, sectionBody] = categoryMatch;
    const titleMatch = CATEGORY_TITLE_RE.exec(sectionBody);
    const categoryName = titleMatch ? cleanText(titleMatch[1]) : categoryId;

    let productMatch;
    PRODUCT_ROW_RE.lastIndex = 0;
    while ((productMatch = PRODUCT_ROW_RE.exec(sectionBody)) !== null) {
      const [, name, detail] = productMatch;
      products.push({
        category: categoryName,
        categoryId,
        product: cleanText(name),
        detail: cleanText(detail),
      });
    }
  }
  return products;
}

function main() {
  const html = fs.readFileSync(CATALOGO_PATH, 'utf8');
  const products = extractProducts(html);
  console.log(`Extracted ${products.length} products across categories.`);
  const outDir = path.join(__dirname, '..', '.tmp');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'products.json'), JSON.stringify(products, null, 2), 'utf8');
  console.log('Saved to .tmp/products.json');
}

if (require.main === module) {
  main();
}

module.exports = { extractProducts, CATALOGO_PATH };
