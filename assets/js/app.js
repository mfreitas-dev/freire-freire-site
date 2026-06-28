const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = document.getElementById("formSubmitBtn");
    button.disabled = true;
    button.textContent = "Enviando...";

    const nome = form.nome.value;
    const email = form.email.value;
    form.subject.value =
    `Novo contato via site - ${nome} - ${email}`;
    form.replyto.value = email;

    const formData = new FormData(form);

    try{
        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
        };
        const data = await response.json();
        if(data.success){
            message.textContent = "Sua mensagem foi enviada com sucesso!"
            setTimeout(() => {
                button.textContent = "Enviado!";
            }, 1000);
            form.reset();
        } else {
            console.error(data.message);
            message.textContent = "Não foi possível enviar sua mensagem. Verifique sua conexão e tente novamente.";
        };
    } catch(error) {
        console.error(error);
        message.textContent = "Não foi possível enviar sua mensagem. Verifique sua conexão e tente novamente.";
    } finally {
        setTimeout(() => {
            message.textContent = "";
        }, 3000);
        setTimeout(() => {
            button.disabled = false;
            button.textContent = "Enviar Mensagem";
        }, 5000);
    }
});

// Float contact — toggle no clique (mobile) e hover (desktop)
const floatContact = document.getElementById('floatContact');
const floatMainBtn = document.getElementById('floatMainBtn');

floatMainBtn.addEventListener('click', () => {
floatContact.classList.toggle('open');
});

// Fechar ao clicar em uma opção
document.querySelectorAll('.float-option').forEach(opt => {
opt.addEventListener('click', () => floatContact.classList.remove('open'));
});

// Fechar ao clicar fora
document.addEventListener('click', (e) => {
if (!floatContact.contains(e.target)) floatContact.classList.remove('open');
});

// Navbar scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
if (window.scrollY > 60) nav.classList.add('scrolled');
else nav.classList.remove('scrolled');
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
hamburger.classList.remove('open');
mobileMenu.classList.remove('open');
document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
const isOpen = mobileMenu.classList.toggle('open');
hamburger.classList.toggle('open', isOpen);
document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Fechar ao clicar no overlay (fora do menu)
mobileMenu.addEventListener('click', (e) => {
if (e.target === mobileMenu) closeMobileMenu();
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') closeMobileMenu();
});

// Carrossel de fotos
(function() {
const track    = document.getElementById('carouselTrack');
const viewport = document.getElementById('carousel');
const btnPrev  = document.getElementById('carouselPrev');
const btnNext  = document.getElementById('carouselNext');
const dotsWrap = document.getElementById('carouselDots');

if (!track) return;

const cards      = track.querySelectorAll('.carousel-card');
const cardW      = () => cards[0].offsetWidth + 12; // width + gap
const visibleN   = () => Math.floor(viewport.offsetWidth / cardW());
const totalPages = () => Math.max(1, cards.length - visibleN() + 1);

let current = 0;

// build dots
function buildDots() {
    dotsWrap.innerHTML = '';
    const n = totalPages();
    for (let i = 0; i < n; i++) {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === current ? ' active' : '');
    d.setAttribute('aria-label', 'Página ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    }
}

function goTo(index) {
    const n = totalPages();
    current = Math.max(0, Math.min(index, n - 1));
    track.style.transform = `translateX(-${current * cardW()}px)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
    });
    btnPrev.disabled = current === 0;
    btnNext.disabled = current >= n - 1;
}

btnPrev.addEventListener('click', () => goTo(current - 1));
btnNext.addEventListener('click', () => goTo(current + 1));

// touch / swipe
let startX = 0;
track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
});

buildDots();
goTo(0);
let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    buildDots();
    goTo(0);
    }
});
})();

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
question.addEventListener('click', () => {
    const item = question.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
});
});

// Checkbox LGPD — habilita o botão de envio somente quando marcado
const lgpdCheckbox = document.getElementById('checklgpd');
const submitBtn = document.getElementById('formSubmitBtn');
if (lgpdCheckbox && submitBtn) {
lgpdCheckbox.addEventListener('change', () => {
    submitBtn.disabled = !lgpdCheckbox.checked;
});
}