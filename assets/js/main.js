// ==========================================
// BELTAGY PORTFOLIO - MAIN JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    /* ─── AOS (Animate on Scroll) Init ─── */
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }

    /* ─── Lucide Icons Init ─── */
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ─── Ink Buttons Hover Effect ─── */
    document.querySelectorAll('.btn-ink, .btn-ink-violet, .btn-ink-teal').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            btn.style.setProperty('--cx', (e.clientX - rect.left) + 'px');
            btn.style.setProperty('--cy', (e.clientY - rect.top) + 'px');
        });
    });

    /* ─── Theme Toggle ─── */
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    /* ─── Mobile Menu ─── */
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-menu-icon');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            if (hamIcon) {
                hamIcon.classList.toggle('opacity-0');
                hamIcon.classList.toggle('rotate-90');
            }
            if (closeIcon) {
                closeIcon.classList.toggle('opacity-0');
                closeIcon.classList.toggle('rotate-90');
            }
        });
    }

    /* ─── Dynamic Island Scroll Logic ─── */
    const navbarWrapper = document.getElementById('floating-nav');
    const navbar = document.getElementById('main-nav');
    const hasHero = document.querySelector('.hero-bg-animate') !== null || document.querySelector('.hero-bg-video') !== null;
    
    if (navbarWrapper && navbar) {
        let lastScrollY = window.scrollY;
        let scrollDirection = 'up';

        if (hasHero) {
            navbar.classList.remove('nav-scrolled');
        } else {
            navbar.classList.add('nav-scrolled');
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 40) {
                navbar.classList.add('nav-scrolled');
            } else {
                if (hasHero) navbar.classList.remove('nav-scrolled');
            }
            
            if (currentScrollY > lastScrollY + 5) {
                scrollDirection = 'down';
            } else if (currentScrollY < lastScrollY - 5) {
                scrollDirection = 'up';
            }
            
            if (currentScrollY > 100 && scrollDirection === 'down') {
                if (!navbarWrapper.classList.contains('menu-open')) {
                    navbarWrapper.classList.add('nav-hidden');
                }
            } else if (scrollDirection === 'up' || currentScrollY <= 100) {
                navbarWrapper.classList.remove('nav-hidden');
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    /* ─── Search Modal ─── */
    const searchToggle = document.getElementById('search-toggle');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.getElementById('close-search');
    
    if (searchToggle && searchModal && closeSearch) {
        searchToggle.addEventListener('click', () => {
            searchModal.classList.remove('hidden');
            searchModal.classList.add('flex');
            const searchInput = document.getElementById('search-input');
            if(searchInput) searchInput.focus();
        });
        closeSearch.addEventListener('click', () => {
            searchModal.classList.add('hidden');
            searchModal.classList.remove('flex');
        });
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.add('hidden');
                searchModal.classList.remove('flex');
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchModal.classList.add('hidden');
                searchModal.classList.remove('flex');
            }
        });
    }

    /* ─── Newsletter ─── */
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const msg = document.getElementById('newsletter-msg');
            const btn = newsletterForm.querySelector('button[type=submit]');
            btn.disabled = true;
            btn.textContent = 'جارٍ الإرسال...';
            try {
                const data = new FormData(newsletterForm);
                const res = await fetch(newsletterForm.action, {
                    method: 'POST',
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    msg.textContent = '🙏 شكراً! ستصلك أحدث الأعمال قريباً.';
                    msg.className = 'mt-4 text-sm font-medium text-emerald-500';
                    newsletterForm.reset();
                } else {
                    msg.textContent = '⚠️ حدث خطأ، حاول مرةً أخرى.';
                    msg.className = 'mt-4 text-sm font-medium text-red-400';
                }
            } catch {
                msg.textContent = '⚠️ تعذّر الاتصال بالشبكة.';
                msg.className = 'mt-4 text-sm font-medium text-red-400';
            }
            btn.disabled = false;
            btn.textContent = 'اشترك الآن';
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 5000);
        });
    }

    /* ─── Typewriter Effect ─── */
    const typewriterEl = document.getElementById('typewriter-text');
    if (typewriterEl) {
        const cursor = document.getElementById('typewriter-cursor');
        const fullText = 'هنا أضعُ بين يديك قُطوفاً جُنيت من بطون الكتب، وعِبراً صهرتها الأيام. ستجدُ بين أروقة هذا الموقع شِعراً نبطياً (بدوياً) يحاولٌ حَمل عِزةَ التُراثِ، صِيغَ بصدقٍ، أعتبِره محاولةٌ مخلصة لإيصال فكرةٍ تروم الضياء لأمةٍ ما اعتادت إلا الشموخ، وبحثٌ دائمٌ عن ضالةِ الوعي في عقولٍ تعي قيمة الكلمة وأصالة الهوية.';
        let i = 0;
        const speed = 45;
        function type() {
            if (i < fullText.length) {
                cursor.insertAdjacentText('beforebegin', fullText.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        setTimeout(type, 800);
    }

    /* ─── Smart Filter (Masonry Grids) ─── */
    const filterBar = document.getElementById('filter-bar');
    if (filterBar) {
        const items = document.querySelectorAll('.masonry-item');
        const noRes = document.getElementById('no-results');
        
        filterBar.addEventListener('click', function (e) {
            const btn = e.target.closest('button[data-filter]');
            if (!btn) return;
            
            filterBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = (btn.dataset.filter || '').trim();
            let visible = 0;
            
            items.forEach(item => {
                const cat = (item.dataset.category || 'all').trim();
                const show = (filter === 'all' || cat === filter);
                if (show) {
                    item.style.display = '';
                    item.classList.remove('hidden');
                    setTimeout(() => { item.style.opacity = '1'; }, 50);
                    visible++;
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
            
            if(noRes) noRes.classList.toggle('hidden', visible > 0);
        });
    }
});

/* ─── Global Functions (Cards) ─── */

function toggleWelcomeLike(btn) {
    const heart = btn.querySelector('.welcome-heart-icon');
    const countEl = document.getElementById('welcome-like-count');
    const liked = heart.classList.toggle('liked');
    const toEn = s => s.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    const toAr = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    let count = parseInt(toEn(countEl.textContent), 10);
    countEl.textContent = toAr(liked ? count + 1 : count - 1);
}

function copyWelcomeText() {
    const text = 'هنا أضعُ بين يديك قُطوفاً جُنيت من بطون الكتب، وعِبراً صهرتها الأيام. ستجدُ بين أروقة هذا الموقع شِعراً نبطياً (بدوياً) يحاولٌ حَمل عِزةَ التُراثِ، صِيغَ بصدقٍ، أعتبِره محاولةٌ مخلصة لإيصال فكرةٍ تروم الضياء لأمةٍ ما اعتادت إلا الشموخ، وبحثٌ دائمٌ عن ضالةِ الوعي في عقولٍ تعي قيمة الكلمة وأصالة الهوية.\n\n— بلتاجي الرمحي (سفير البادية)';
    navigator.clipboard.writeText(text).then(function() {
        var label = document.getElementById('copy-label');
        if(label) {
            label.textContent = 'تم النسخ ✓';
            setTimeout(() => { label.textContent = 'نسخ'; }, 2000);
        }
    });
}

function likeCard(e, btn) {
    e.preventDefault(); e.stopPropagation();
    const liked = btn.dataset.liked;
    const countEl = btn.querySelector('.like-count');
    let count = parseInt(countEl ? countEl.textContent : '0');
    const icon = btn.querySelector('i');
    
    if (liked) {
        btn.dataset.liked = '';
        btn.style.background = '';
        btn.style.borderColor = '';
        if(icon) icon.classList.remove('fill-current');
        if (countEl) { count = Math.max(0, count - 1); countEl.textContent = count; }
    } else {
        btn.dataset.liked = '1';
        btn.style.background = 'rgba(197,160,89,0.2)';
        btn.style.borderColor = 'var(--gold-antique)';
        if(icon) icon.classList.add('fill-current');
        if (countEl) { count++; countEl.textContent = count; }
    }
}

function copyQuote(e, btn) {
    e.preventDefault(); e.stopPropagation();
    const text = btn.dataset.text;
    navigator.clipboard.writeText(text).then(function () {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check" class="w-3 h-3"></i> تم!';
        if (typeof lucide !== 'undefined') lucide.createIcons();
        setTimeout(() => { 
            btn.innerHTML = orig; 
            if (typeof lucide !== 'undefined') lucide.createIcons(); 
        }, 2000);
    });
}

function shareQuote(e, btn) {
    e.preventDefault(); e.stopPropagation();
    const url = btn.dataset.url || location.href;
    if (navigator.share) {
        navigator.share({ title: document.title, url: url });
    } else {
        navigator.clipboard.writeText(url).then(function () {
            const orig = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check" class="w-3 h-3"></i> تم!';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            setTimeout(() => { 
                btn.innerHTML = orig; 
                if (typeof lucide !== 'undefined') lucide.createIcons(); 
            }, 2000);
        });
    }
}

// Map Thought functions to Quote functions since they do exactly the same thing
window.copyThought = copyQuote;
window.shareThought = shareQuote;

/* ─── Single Page Handlers (Poetry/Thoughts) ─── */
window.handleSingleLike = function(btn) {
    const countEl = document.getElementById('single-like-count');
    if (!countEl) return;
    let count = parseInt(countEl.textContent || '0');
    const icon = btn.querySelector('i');
    if (btn.dataset.liked) {
        btn.dataset.liked = '';
        count = Math.max(0, count - 1);
        btn.querySelector('div').style.background = 'rgba(197,160,89,0.12)';
        if (icon) icon.classList.remove('fill-current');
    } else {
        btn.dataset.liked = '1';
        count += 1;
        btn.querySelector('div').style.background = 'rgba(197,160,89,0.3)';
        if (icon) icon.classList.add('fill-current');
    }
    countEl.textContent = count;
};

window.handleSingleShare = function() {
    if (navigator.share) { 
        navigator.share({ title: document.title, url: location.href }); 
    } else { 
        navigator.clipboard.writeText(location.href).then(() => { alert('تم نسخ الرابط!'); }); 
    }
};

window.handleSingleCopy = function() {
    const proseEl = document.querySelector('.prose');
    const text = proseEl ? proseEl.innerText : document.title;
    navigator.clipboard.writeText(text).then(function () {
        const btn = document.querySelector('[onclick="handleSingleCopy()"] div');
        if (btn) { 
            btn.innerHTML = '<i data-lucide="check" class="w-5 h-5" style="color:var(--gold-antique); width:20px; height:20px;"></i>'; 
            if (typeof lucide !== 'undefined') lucide.createIcons(); 
            setTimeout(function () { 
                btn.innerHTML = '<i data-lucide="copy" class="w-5 h-5" style="color:var(--gold-antique); width:20px; height:20px;"></i>'; 
                if (typeof lucide !== 'undefined') lucide.createIcons(); 
            }, 2000); 
        }
    });
};

/* ─── Page Transition Loader ─── */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const pt = document.getElementById('page-transition');
        if (pt) pt.style.opacity = '0';
    }, 300);
});
