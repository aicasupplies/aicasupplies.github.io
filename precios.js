const SHEET_ID = "1tPlQdAmsjLOlD61afZiLemJ0JL00bwwKI5XMGLEDudk";

function parseCsvLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      result.push(cur);
      cur = "";
    } else {
      cur += char;
    }
  }
  result.push(cur);
  return result.map(c => c.trim());
}

async function getSheetRows(gid) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar la hoja (${res.status})`);
  const csvText = await res.text();
  return csvText.split(/\r\n|\n/).filter(Boolean).map(parseCsvLine);
}

// Un "VER PRECIO" apunta a algo como:
// https://docs.google.com/.../edit?gid=480528025#gid=480528025&range=30:31
function parseGidAndRangeFromHref(href) {
  const hashPart = (href.split("#")[1] || "");
  const params = new URLSearchParams(hashPart);
  return { gid: params.get("gid"), range: params.get("range") };
}

function parseRowBounds(range) {
  const match = range.match(/^[A-Z]*(\d+):[A-Z]*(\d+)$/);
  if (!match) return null;
  return { start: parseInt(match[1], 10), end: parseInt(match[2], 10) };
}

function formatPrice(raw) {
  return raw && raw.trim() ? raw.trim() : "Consultar disponibilidad";
}

// ---------- Modal ----------

function ensureModal() {
  let modal = document.getElementById("price-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "price-modal";
  modal.innerHTML = `
    <div class="price-modal-backdrop"></div>
    <div class="price-modal-panel" role="dialog" aria-modal="true" aria-labelledby="price-modal-title">
      <button type="button" class="price-modal-close" aria-label="Cerrar">&times;</button>
      <h3 id="price-modal-title" class="price-modal-title"></h3>
      <div class="price-modal-body"></div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".price-modal-backdrop").addEventListener("click", closePriceModal);
  modal.querySelector(".price-modal-close").addEventListener("click", closePriceModal);

  injectModalStyles();
  return modal;
}

function closePriceModal() {
  const modal = document.getElementById("price-modal");
  if (modal) modal.classList.remove("is-open");
}

function openPriceModal(title) {
  const modal = ensureModal();
  modal.querySelector(".price-modal-title").textContent = title;
  const body = modal.querySelector(".price-modal-body");
  body.innerHTML = '<p class="price-modal-status">Cargando precios...</p>';
  modal.classList.add("is-open");
  return body;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

function renderVariantRows(body, variantRows) {
  if (!variantRows.length) {
    body.innerHTML = '<p class="price-modal-status">No encontramos precios cargados para este producto. Consultanos directamente.</p>';
    return;
  }
  const rowsHtml = variantRows
    .map(v => `<tr><td>${escapeHtml(v.detail || "-")}</td><td>${escapeHtml(formatPrice(v.price))}</td></tr>`)
    .join("");
  body.innerHTML = `
    <table class="price-modal-table">
      <thead><tr><th>Detalle</th><th>Precio</th></tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
  `;
}

function injectModalStyles() {
  if (document.getElementById("price-modal-styles")) return;
  const style = document.createElement("style");
  style.id = "price-modal-styles";
  style.textContent = `
    #price-modal { position: fixed; inset: 0; z-index: 10000; display: none; }
    #price-modal.is-open { display: block; }
    #price-modal .price-modal-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,0.6); }
    #price-modal .price-modal-panel {
      position: relative; z-index: 1; max-width: min(480px, 92vw); max-height: 80vh; overflow-y: auto;
      margin: 8vh auto 0; background: #ffffff; color: #000000; border: 3px solid #000000; border-radius: 18px;
      box-shadow: 8px 8px 0px #000000; padding: 1.75rem 1.5rem 1.5rem; font-family: 'Inter', sans-serif;
    }
    #price-modal .price-modal-close {
      position: absolute; top: 0.75rem; right: 0.9rem; background: none; border: none; font-size: 1.8rem;
      line-height: 1; cursor: pointer; color: #000000; font-family: inherit;
    }
    #price-modal .price-modal-title {
      margin: 0 1.8rem 1rem 0; font-size: 1.3rem; font-weight: 800; text-transform: uppercase;
    }
    #price-modal .price-modal-status { margin: 0; font-size: 0.95rem; line-height: 1.5; }
    #price-modal .price-modal-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    #price-modal .price-modal-table th {
      text-align: left; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.04em;
      padding: 0 0 0.5rem; border-bottom: 2px solid #000000;
    }
    #price-modal .price-modal-table td { padding: 0.6rem 0; border-bottom: 1px solid #e0dcd0; vertical-align: top; }
    #price-modal .price-modal-table td:last-child { text-align: right; font-weight: 700; white-space: nowrap; padding-left: 1rem; }
    #price-modal .price-modal-table tr:last-child td { border-bottom: none; }
  `;
  document.head.appendChild(style);
}

// ---------- Wiring ----------

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a.btn-price-row").forEach(link => {
    link.addEventListener("click", async event => {
      const { gid, range } = parseGidAndRangeFromHref(link.getAttribute("href") || "");
      const bounds = range ? parseRowBounds(range) : null;

      // Links sin range (p. ej. "Ver lista de precios completa") navegan como siempre.
      if (!gid || !bounds) return;

      event.preventDefault();

      const row = link.closest(".product-row");
      const productName = row ? (row.querySelector(".product-name")?.textContent || "").trim() : "";
      const body = openPriceModal(productName || "Precio");

      try {
        const rows = await getSheetRows(gid);
        const variantRows = [];
        for (let r = bounds.start; r <= bounds.end && r <= rows.length; r++) {
          const csvRow = rows[r - 1];
          if (!csvRow) continue;
          variantRows.push({ detail: csvRow[2], price: csvRow[3] });
        }
        renderVariantRows(body, variantRows);
      } catch (e) {
        body.innerHTML = '<p class="price-modal-status">No se pudo cargar el precio. Probá de nuevo o escribinos.</p>';
      }
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closePriceModal();
  });
});
