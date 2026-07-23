const SHEET_ID = "1tPlQdAmsjLOlD61afZiLemJ0JL00bwwKI5XMGLEDudk";
const cache = {};

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

async function getSheetData(gid) {
  if (cache[gid]) return cache[gid];
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const res = await fetch(url);
  const csvText = await res.text();
  const rows = csvText.split(/\r\n|\n/).filter(Boolean).map(parseCsvLine);
  cache[gid] = rows;
  return rows;
}

function buscarProducto(rows, nombre) {
  return rows.find(
    row => row[1] && row[1].toLowerCase().includes(nombre.toLowerCase())
  );
}

document.querySelectorAll(".ver-precio").forEach(btn => {
  btn.addEventListener("click", async () => {
    const gid = btn.dataset.gid;
    const producto = btn.dataset.producto;
    const resultado = btn.nextElementSibling;

    btn.textContent = "Cargando...";
    try {
      const rows = await getSheetData(gid);
      const fila = buscarProducto(rows, producto);
      resultado.textContent = fila
        ? fila.slice(2).filter(Boolean).join(" | ")
        : "Consultar disponibilidad";
    } catch (e) {
      resultado.textContent = "No se pudo cargar el precio";
    }
    btn.textContent = "VER PRECIO";
  });
});
