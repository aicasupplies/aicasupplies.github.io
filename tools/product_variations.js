'use strict';

// Variation data sourced from catalago.pdf (Lista de Precios, Mayo 2026).
// Keyed by "<categoryId>::<product name as it appears in catalogo.html>".
// Each entry is a list of { detail, price } rows. `price` is left '' when
// the PDF did not give an explicit price for that specific variation.

module.exports = {
  'pigmentos::Dynamic': [
    { detail: 'Pigmento 1oz', price: 18000 },
    { detail: 'Pigmento 8oz', price: 63000 },
  ],
  'pigmentos::Inkplay': [
    { detail: 'Negro línea 1oz', price: 15200 },
    { detail: 'Negro línea 8oz', price: 35500 },
    { detail: 'Negro triple black 1oz', price: 16100 },
    { detail: 'Negro triple black 8oz', price: 44200 },
  ],
  'pigmentos::Extreme': [
    { detail: 'Pigmentos 1oz', price: 5000 },
    { detail: 'Pigmentos 2oz', price: 6000 },
    { detail: 'Set grises', price: 30000 },
    { detail: 'Set pastel', price: 30000 },
    { detail: 'Set piel', price: 30000 },
  ],
  'pigmentos::Drakkar': [
    { detail: 'Negro 4oz', price: 26000 },
    { detail: 'Negro 8oz', price: 46000 },
    { detail: 'Pigmentos color 1oz', price: 8500 },
    { detail: 'Negro versátil 1oz', price: 10500 },
    { detail: 'Set pastel', price: 50000 },
    { detail: 'Set grises', price: 50000 },
    { detail: 'Set pieles', price: 50000 },
    { detail: 'Diluyente para color', price: '' },
  ],
  'pigmentos::Klug': [
    { detail: 'Versátil Black Ink 1oz', price: 11000 },
    { detail: 'Versátil Black Ink 4oz', price: 21000 },
    { detail: 'Versátil Black Ink 8oz', price: 30000 },
    { detail: 'Triple Black 4oz', price: 23000 },
    { detail: 'Triple Black 8oz', price: 33000 },
  ],

  'cartuchos::Yellow Dragonfly': [
    { detail: 'RL 1201-1203 (caja x20)', price: 17500 },
    { detail: 'RL 1205-1207-1209 (caja x20)', price: 18500 },
    { detail: 'RL 1211-1214 (caja x20)', price: 19500 },
    { detail: 'RS 1205-1207-1209 (caja x20)', price: 18500 },
    { detail: 'RS 1211-1214 (caja x20)', price: 19500 },
    { detail: 'MG y RM 1207-1209 (caja x20)', price: 18500 },
    { detail: 'MG y RM 1211+ (caja x20)', price: 19500 },
    { detail: 'Unidad', price: 1700 },
    { detail: 'Caja surtida', price: 24000 },
  ],
  'cartuchos::Spark': [
    { detail: 'RL 1203 (caja x20)', price: 18000 },
    { detail: 'RL 1205-1207 (caja x20)', price: 19000 },
    { detail: 'RS 1207-1209 (caja x20)', price: 19000 },
    { detail: 'MG y RM 1207-1209 (caja x20)', price: 19000 },
    { detail: 'MG y RM 1211-1215 (caja x20)', price: 20000 },
    { detail: 'Unidad', price: 1700 },
    { detail: 'Caja surtida', price: 23000 },
  ],
  'cartuchos::Cartuchos EZ': [
    { detail: 'RL 1203 unidad', price: 2000 },
    { detail: 'RL 1203 caja x20', price: 21000 },
    { detail: 'RL 1205 unidad', price: 2000 },
    { detail: 'RL 1205 caja x20', price: 23500 },
    { detail: 'RL 1207 unidad', price: 2000 },
    { detail: 'RL 1207 caja x20', price: 25500 },
    { detail: 'RL 1209 unidad', price: 2000 },
    { detail: 'RL 1209 caja x20', price: 27500 },
  ],

  'agujas::Caja Blanca': [
    { detail: 'RL 1201-1203', price: 8000 },
    { detail: 'RL 1205', price: 10000 },
    { detail: 'RL 1207-1209', price: 11000 },
    { detail: 'RL 1211-1213-1214-1215-1218', price: 14500 },
    { detail: 'RS 1205', price: 8000 },
    { detail: 'RS 1207-1209', price: 11000 },
    { detail: 'RS 1211-1213-1215', price: '' },
    { detail: 'MG y RM 1207-1209', price: 11000 },
    { detail: 'MG y RM 1211-1213-1215', price: 14500 },
    { detail: 'Blister', price: 1700 },
    { detail: 'Unidad', price: 500 },
    { detail: 'Caja surtida', price: 16000 },
  ],
  'agujas::Hurricane': [
    { detail: 'RL 1205-1207-1209', price: 15500 },
    { detail: 'Blister', price: 1900 },
  ],

  'punteras::Tips descartables': [
    { detail: 'RL 1203-1205-1207-1209-1211-1213-1215-1218 (caja x50)', price: 3700 },
    { detail: 'MG 1207-1209-1211-1213-1215 (caja x50)', price: '' },
    { detail: 'Blister', price: 500 },
    { detail: 'Unidad', price: 200 },
    { detail: 'Caja surtida', price: 4000 },
  ],
  'punteras::Tips de acero': [{ detail: 'Tips de acero', price: 3000 }],
  'punteras::Punteras descartables N&N': [
    { detail: 'Unidad', price: 1000 },
    { detail: 'Bolsa cerrada x25', price: 23000 },
    { detail: 'Bolsa surtida x25', price: 25000 },
  ],
  'punteras::Punteras descartables Inkplay': [
    { detail: 'Unidad', price: 1000 },
    { detail: 'Caja x15', price: 15000 },
  ],
  'punteras::Punteras de acero': [
    { detail: '19mm', price: 9000 },
    { detail: '25mm', price: 10000 },
    { detail: '32mm', price: 11000 },
    { detail: 'Cepillo para limpieza', price: 3500 },
  ],
  'punteras::Adaptador de cartuchos': [{ detail: 'Adaptador de cartuchos', price: 15000 }],

  'descartables::Campos de protección': [
    { detail: 'Caja x100', price: 4800 },
    { detail: 'Negros x50', price: 4000 },
    { detail: 'Color x50', price: 3000 },
    { detail: 'Pack x5', price: 900 },
  ],
  'descartables::Film adherente / protector': [{ detail: 'Rollo x300mts', price: 6500 }],
  'descartables::Descartador de agujas (biohazard)': [
    { detail: '1L', price: 3500 },
    { detail: '2L', price: 4500 },
  ],
  'descartables::Baja lengua de madera': [
    { detail: 'Pack x100', price: 2500 },
    { detail: 'Pack x20', price: 900 },
  ],
  'descartables::Guantes de látex': [
    { detail: 'Caja', price: 6000 },
    { detail: '2 cajas', price: 10000 },
    { detail: 'Pack x5 pares', price: 1600 },
  ],
  'descartables::Guantes de nitrilo': [
    { detail: 'Caja', price: 7500 },
    { detail: '2 cajas', price: 13500 },
    { detail: 'Pack x5 pares', price: 1700 },
  ],
  'descartables::Cinta hipoalergénica': [
    { detail: 'Caja', price: 7500 },
    { detail: 'Unidad', price: 900 },
  ],
  'descartables::Cubre clipcord': [{ detail: 'Pack x10', price: 900 }],
  'descartables::Cubre cable / cubre máquina': [{ detail: 'Pack x10', price: 900 }],
  'descartables::Cinta flex autoadherente': [{ detail: 'Cinta flex', price: 1800 }],
  'descartables::Afeitadoras descartables (Xmart)': [
    { detail: 'Unidad', price: 500 },
    { detail: 'Pack x6', price: 3000 },
    { detail: 'Pack x24', price: 10500 },
  ],
  'descartables::Film dérmico': [
    { detail: '1/2 metro', price: 4500 },
    { detail: '1 metro', price: 6000 },
  ],

  'aftercare::Inkplay': [
    { detail: 'Stencil chico', price: 4800 },
    { detail: 'Stencil grande', price: 6800 },
    { detail: 'Espuma chica', price: 4500 },
    { detail: 'Espuma grande', price: 6100 },
    { detail: 'Butter', price: 12000 },
    { detail: 'Witch Hazell', price: 3150 },
    { detail: 'Loción piercing', price: 3500 },
    { detail: 'Reviver', price: 5700 },
    { detail: 'Spray Tattoo Care', price: 4000 },
    { detail: 'Cleaner 450ml', price: 7500 },
  ],
  'aftercare::Elephant': [
    { detail: 'Stencil 70cc', price: 4000 },
    { detail: 'Witch Hazel 60cc', price: 4500 },
    { detail: 'Witch Hazel 200cc', price: 8000 },
    { detail: 'Cleaner 300cc', price: 16000 },
    { detail: 'Skin Care', price: 4000 },
    { detail: 'Butter', price: 12000 },
  ],
  'aftercare::Vaselina': [
    { detail: '1kg', price: 14000 },
    { detail: 'Mediana', price: 7000 },
    { detail: 'Chica', price: 3000 },
  ],
  'aftercare::Jabón antibacterial Laclorhex': [{ detail: 'x500ml', price: 5000 }],
  'aftercare::Parche dérmico': [
    { detail: '10x12', price: 1000 },
    { detail: '10x25', price: 2000 },
  ],
  'aftercare::TKTX': [
    { detail: '99,9%', price: 7700 },
    { detail: 'Spray', price: 7500 },
  ],
  'aftercare::Pain Control': [{ detail: 'Gel crema 30g', price: 19000 }],
  'aftercare::Antídoto Drakkar': [{ detail: 'Antídoto Drakkar', price: 5500 }],
  'aftercare::Papel de transferencia': [
    { detail: 'Papel hectográfico', price: 1000 },
    { detail: 'Papel para termocopiadora', price: 1000 },
  ],
  'aftercare::Tetinas (ink caps)': [
    { detail: 'Chicas x100', price: 1500 },
    { detail: 'Chicas x1000', price: 13000 },
    { detail: 'Medianas x100', price: 2000 },
    { detail: 'Medianas x1000', price: 15000 },
    { detail: 'Niples x10', price: 1000 },
  ],
  'aftercare::Piel sintética': [
    { detail: 'Chica', price: 3000 },
    { detail: 'Grande', price: 5000 },
  ],
  'aftercare::Butter Extreme': [{ detail: 'Butter Extreme', price: 5500 }],

  'maquinas::Pen 86 Irons': [{ detail: 'Pen 86 Irons', price: 70000 }],
  'maquinas::Pen mini RCA': [{ detail: 'Pen mini RCA', price: 40000 }],
  'maquinas::Pen Spark': [{ detail: 'Pen Spark inalámbrica', price: 300000 }],
  'maquinas::Pen Diablo': [{ detail: 'Pen Diablo', price: 160000 }],
  'maquinas::Pen Alienhead': [{ detail: 'Pen inalámbrica Alienhead (Argentina)', price: 95000 }],
  'maquinas::Máquinas de bobina y rotativas': [
    { detail: 'Modelo 1', price: 37500 },
    { detail: 'Modelo 2', price: 34000 },
    { detail: 'Modelo 3', price: 47000 },
    { detail: 'Modelo 4', price: 36000 },
    { detail: 'Modelo 5', price: 34000 },
    { detail: 'Modelo 6', price: 25000 },
    { detail: 'Modelo 7', price: 29000 },
    { detail: 'Modelo 8', price: 42000 },
    { detail: 'Modelo 9', price: 42000 },
  ],
  'maquinas::Fuentes 2AM y 3AM': [
    { detail: '2AM 15V común', price: 36000 },
    { detail: '2AM 15V con voltímetro', price: 43000 },
    { detail: '3AM 15V mini', price: 51000 },
    { detail: '2AM 15V con chapa', price: 55000 },
  ],
  'maquinas::Termocopiadora': [{ detail: 'Termocopiadora', price: 250000 }],

  'componentes::Clip cord': [
    { detail: 'Económico', price: 9000 },
    { detail: 'Siliconado', price: 11500 },
    { detail: 'Reforzado', price: 13000 },
    { detail: 'DC para máquina Pen', price: 11000 },
  ],
  'componentes::Pedal': [
    { detail: 'Económico', price: 9000 },
    { detail: 'Cuadrado', price: 13500 },
    { detail: 'Redondo', price: 14500 },
    { detail: 'Reforzado', price: 15500 },
  ],
  'componentes::Cable RCA': [
    { detail: 'Común', price: 9000 },
    { detail: 'Reforzado', price: 15000 },
  ],

  'piercing::Catéteres': [
    { detail: '16g unidad', price: 500 },
    { detail: '16g caja', price: 21000 },
    { detail: '18g unidad', price: 500 },
    { detail: '18g caja', price: 21000 },
    { detail: '20g unidad', price: 500 },
  ],
  'piercing::Pinza oval abierta': [{ detail: 'Pinza oval abierta', price: 15000 }],
  'piercing::Pinza triangular abierta': [{ detail: 'Pinza triangular abierta', price: 15000 }],
  'piercing::Pinza mosquito': [{ detail: 'Pinza mosquito', price: 15000 }],
};
