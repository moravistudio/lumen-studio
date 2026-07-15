const CHATBOT_CONFIG = {
  whatsapp: '51940284018',
  portfolioUrl: 'retratos.html',
};

const tree = {
  start: {
    message: '¡Hola! Soy el asistente de Lumen Studio 👋 ¿En qué puedo ayudarte?',
    options: [
      { label: '¿Cómo puedo reservar una sesión?', next: 'reserva' },
      { label: '¿Cuánto cuesta una sesión?', next: 'costos' },
      { label: '¿Dónde están ubicados?', next: 'ubicacion' },
      { label: 'Tengo más preguntas', next: 'mas' },
      { label: 'Quiero contactarlos', next: 'contacto' },
    ],
  },
  mas: {
    message: '',
    options: [
      { label: '¿Cuánto dura una sesión?', next: 'duracion' },
      { label: '¿Hacen sesiones de maternidad?', next: 'maternidad' },
      { label: '¿Trabajan con marcas de ropa?', next: 'marcas' },
      { label: '¿Incluye maquillaje y vestuario?', next: 'maquillaje' },
      { label: '¿Puedo ver trabajos antes de decidir?', next: 'portafolio' },
      { label: '← Volver', next: 'start' },
    ],
  },
  reserva: {
    message: 'Para reservar una sesión puedes escribirnos por WhatsApp o usar el formulario de contacto en nuestra página. Te respondemos a la brevedad para coordinar fecha, hora y tipo de sesión.',
    options: [{ label: '← Volver', next: 'start' }, { label: 'Contactar por WhatsApp', action: 'whatsapp' }],
  },
  costos: {
    message: 'Los precios varían según el tipo de sesión (retratos, books, maternidad, gastronomía o catálogos). Escríbenos y te enviamos una cotización personalizada sin compromiso.',
    options: [{ label: '← Volver', next: 'start' }, { label: 'Solicitar cotización', action: 'whatsapp' }],
  },
  ubicacion: {
    message: 'Estamos en Perú y trabajamos tanto en Lima como en provincias. También podemos coordinar sesiones en exteriores o en locaciones especiales según tu proyecto.',
    options: [{ label: '← Volver', next: 'start' }],
  },
  duracion: {
    message: 'Depende del tipo de sesión. Una sesión de retratos puede durar entre 1 y 2 horas. Un book completo puede tomar entre 3 y 5 horas. Te lo confirmamos al coordinar tu cita.',
    options: [{ label: '← Volver', next: 'mas' }],
  },
  maternidad: {
    message: 'Sí, las sesiones de maternidad son una de nuestras especialidades. Capturamos ese momento único con sensibilidad y emoción. Puedes realizarla entre la semana 28 y 36 de embarazo.',
    options: [{ label: '← Volver', next: 'mas' }, { label: 'Reservar sesión', action: 'whatsapp' }],
  },
  marcas: {
    message: 'Sí, trabajamos con marcas de ropa y calzado. Realizamos sesiones de catálogo con modelos, productos y ambientaciones según la identidad visual de tu marca.',
    options: [{ label: '← Volver', next: 'mas' }, { label: 'Consultar disponibilidad', action: 'whatsapp' }],
  },
  maquillaje: {
    message: 'Depende del paquete que elijas. Algunos paquetes incluyen servicio de maquillaje y peinado profesional. Consúltanos y te explicamos las opciones disponibles.',
    options: [{ label: '← Volver', next: 'mas' }, { label: 'Ver opciones', action: 'whatsapp' }],
  },
  portafolio: {
    message: 'Por supuesto. Puedes ver nuestro trabajo en el portafolio de la página. Tenemos galerías de retratos, books, catálogos, maternidad y gastronomía.',
    options: [{ label: '← Volver', next: 'mas' }, { label: 'Ver portafolio', action: 'portfolio' }],
  },
  contacto: {
    message: 'Puedes contactarnos directamente por WhatsApp. Estamos disponibles para responder tus preguntas y coordinar tu sesión.',
    options: [{ label: '← Volver', next: 'start' }, { label: 'Escribir por WhatsApp', action: 'whatsapp' }],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.chatbot__toggle');
  const window_ = document.querySelector('.chatbot__window');
  const close = document.querySelector('.chatbot__close');
  const body = document.querySelector('.chatbot__body');

  if (!toggle || !window_ || !close || !body) return;

  toggle.addEventListener('click', () => {
    const isOpen = window_.classList.toggle('chatbot__window--open');
    toggle.setAttribute('aria-expanded', isOpen);
    if (isOpen && body.children.length === 0) renderNode('start');
  });

  close.addEventListener('click', () => {
    window_.classList.remove('chatbot__window--open');
    toggle.setAttribute('aria-expanded', false);
  });

  function renderNode(key) {
    const node = tree[key];
    if (!node) return;

    body.innerHTML = '';

    if (node.message) {
      const msg = document.createElement('p');
      msg.className = 'chatbot__message';
      msg.textContent = node.message;
      body.appendChild(msg);
    }

    const opts = document.createElement('div');
    opts.className = 'chatbot__options';

    node.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'chatbot__option-btn';
      btn.textContent = opt.label;

      if (opt.action === 'whatsapp') {
        btn.classList.add('chatbot__option-btn--whatsapp');
        btn.addEventListener('click', () => {
          window.open(`https://wa.me/${CHATBOT_CONFIG.whatsapp}`, '_blank');
        });
      } else if (opt.action === 'portfolio') {
        btn.addEventListener('click', () => {
          window.location.href = CHATBOT_CONFIG.portfolioUrl;
        });
      } else {
        btn.addEventListener('click', () => {
          opts.remove();
          renderNode(opt.next);
          body.scrollTop = body.scrollHeight;
        });
      }

      opts.appendChild(btn);
    });

    body.appendChild(opts);
    body.scrollTop = body.scrollHeight;
  }
});
