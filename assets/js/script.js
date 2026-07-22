// ============================================================
// AICA SUPPLIES — Landing Page JS
// Menú mobile + selector de sucursal para WhatsApp + año dinámico
// ============================================================

// Sucursales disponibles para el botón de WhatsApp del Hero.
// Editar/agregar acá — el botón NO asume una sucursal fija.
const BRANCHES = [
  {
    name: 'Sucursal Quilmes',
    phone: '5491138127898',
    message: 'Hola Aica Supplies! Quiero consultar por insumos.',
  },
  {
    name: 'Sucursal Lomas de Zamora',
    phone: '5491137793710',
    message: 'Hola Aica Supplies! Quiero consultar por insumos.',
  },
];

function buildWhatsAppUrl(branch) {
  return `https://wa.me/${branch.phone}?text=${encodeURIComponent(branch.message)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  // --- Menú de navegación mobile ---
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar el menú al hacer click en un link (mobile)
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Botón de WhatsApp del Hero: elige sucursal en vez de asumir Quilmes ---
  const whatsappCta = document.getElementById('whatsapp-cta');
  const whatsappBtn = document.getElementById('whatsapp-hero-btn');
  const whatsappOptions = document.getElementById('whatsapp-options');

  if (whatsappCta && whatsappBtn && whatsappOptions) {
    // Genera los links a partir de BRANCHES (una sola fuente de verdad)
    whatsappOptions.innerHTML = BRANCHES.map((branch) => (
      `<a href="${buildWhatsAppUrl(branch)}" target="_blank" rel="noopener">${branch.name}</a>`
    )).join('');

    const closeOptions = () => {
      whatsappOptions.hidden = true;
      whatsappBtn.setAttribute('aria-expanded', 'false');
    };

    whatsappBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = !whatsappOptions.hidden;
      whatsappOptions.hidden = isOpen;
      whatsappBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Cerrar al clickear afuera del widget
    document.addEventListener('click', (event) => {
      if (!whatsappCta.contains(event.target)) {
        closeOptions();
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeOptions();
      }
    });
  }

  // --- Año dinámico en el footer ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
