'use strict';

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const { authorize } = require('./google_auth');
const { extractProducts, CATALOGO_PATH } = require('./extract_products');
const VARIATIONS = require('./product_variations');

const SHEET_TITLE = 'Lista de Precios - Aica Supplies (Borrador)';
const TAB_TITLE = 'Lista de Precios';
const HEADER = ['CATEGORÍA', 'INSUMO / PRODUCTO', 'DETALLE / MARCA', 'PRECIO (ARS)'];

// Matches only the "Ver Precios" button anchors emitted per product row.
// Captures the text before/after the href so only the URL itself is replaced.
const PRODUCT_ROW_GLOBAL_RE = /(<div class="product-row">\s*<span class="product-name">[^<]+<\/span>\s*<div class="product-tooltip">\s*<img[^>]*>\s*<p>[\s\S]*?<\/p>\s*<\/div>\s*<a )href="[^"]*"( target="_blank" rel="noopener" class="btn-price-row">VER PRECIOS<\/a>\s*<\/div>)/g;

function buildRowsForProducts(products) {
  const rows = [HEADER];
  const productRanges = [];

  for (const p of products) {
    const key = `${p.categoryId}::${p.product}`;
    const variations = VARIATIONS[key];
    if (!variations || variations.length === 0) {
      throw new Error(`No variation data found for "${key}". Add it to tools/product_variations.js.`);
    }

    const startRow = rows.length + 1; // rows.length currently counts header + prior rows
    for (const v of variations) {
      rows.push([p.category, p.product, v.detail, v.price === '' ? '' : v.price]);
    }
    const endRow = rows.length;
    productRanges.push({ startRow, endRow });
  }

  return { rows, productRanges };
}

async function createSpreadsheet(sheets, rows) {
  const createRes = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: SHEET_TITLE },
      sheets: [{ properties: { title: TAB_TITLE, gridProperties: { frozenRowCount: 1 } } }],
    },
  });

  const spreadsheetId = createRes.data.spreadsheetId;
  const gid = createRes.data.sheets[0].properties.sheetId;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${TAB_TITLE}!A1`,
    valueInputOption: 'RAW',
    requestBody: { values: rows },
  });

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          repeatCell: {
            range: { sheetId: gid, startRowIndex: 0, endRowIndex: 1 },
            cell: { userEnteredFormat: { textFormat: { bold: true } } },
            fields: 'userEnteredFormat.textFormat.bold',
          },
        },
        {
          autoResizeDimensions: {
            dimensions: { sheetId: gid, dimension: 'COLUMNS', startIndex: 0, endIndex: 4 },
          },
        },
      ],
    },
  });

  return { spreadsheetId, gid };
}

function buildRowRangeUrl(spreadsheetId, gid, startRow, endRow) {
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit#gid=${gid}&range=A${startRow}:D${endRow}`;
}

function updateCatalogoHtml(products, productRanges, spreadsheetId, gid) {
  const original = fs.readFileSync(CATALOGO_PATH, 'utf8');

  let productIndex = 0;
  const updated = original.replace(PRODUCT_ROW_GLOBAL_RE, (match, before, after) => {
    const { startRow, endRow } = productRanges[productIndex];
    productIndex += 1;
    const url = buildRowRangeUrl(spreadsheetId, gid, startRow, endRow);
    return `${before}href="${url}"${after}`;
  });

  if (productIndex !== products.length) {
    throw new Error(
      `Mismatch: extracted ${products.length} products but replaced ${productIndex} "Ver Precios" hrefs in catalogo.html.`
    );
  }

  const backupPath = path.join(__dirname, '..', '.tmp', 'catalogo.html.bak');
  fs.mkdirSync(path.dirname(backupPath), { recursive: true });
  fs.writeFileSync(backupPath, original, 'utf8');
  fs.writeFileSync(CATALOGO_PATH, updated, 'utf8');

  return { backupPath };
}

async function main() {
  const html = fs.readFileSync(CATALOGO_PATH, 'utf8');
  const products = extractProducts(html);
  console.log(`Extracted ${products.length} products.`);

  const { rows, productRanges } = buildRowsForProducts(products);
  console.log(`Built ${rows.length - 1} variation rows.`);

  const authClient = await authorize();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  console.log('Creating spreadsheet...');
  const { spreadsheetId, gid } = await createSpreadsheet(sheets, rows);
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  console.log(`Spreadsheet created: ${spreadsheetUrl}`);

  console.log('Updating "Ver Precios" button hrefs in catalogo.html...');
  const { backupPath } = updateCatalogoHtml(products, productRanges, spreadsheetId, gid);

  console.log('Done.');
  console.log(`- Products: ${products.length}`);
  console.log(`- Variation rows: ${rows.length - 1}`);
  console.log(`- Backup of original catalogo.html saved at: ${backupPath}`);
}

main().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
