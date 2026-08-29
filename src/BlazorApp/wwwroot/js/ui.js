(function () {
    'use strict';

    document.body.classList.add('js-enabled');

    // ── Reveal on scroll ──
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.08 });

    // ── Taglist stagger ──
    const staggerObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('stagger-visible');
                staggerObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });

    // ── Scroll-spy (re-initialized when sections appear via Blazor render) ──
    let scrollSpyObserver = null;

    function tryInitScrollSpy() {
        if (scrollSpyObserver) return;
        const sections = document.querySelectorAll('section[id], footer[id]');
        const navLinks = document.querySelectorAll('#header a[href^="#"]');
        if (!sections.length || !navLinks.length) return;

        scrollSpyObserver = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const id = e.target.id;
                    navLinks.forEach(a =>
                        a.classList.toggle('active', a.getAttribute('href') === `#${id}`)
                    );
                }
            });
        }, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });

        sections.forEach(s => scrollSpyObserver.observe(s));
    }

    // ── Parallax on hero image ──
    let parallaxActive = false;
    function tryInitParallax() {
        if (parallaxActive) return;
        const hero = document.querySelector('section.dark img.hero-image');
        if (!hero) return;
        parallaxActive = true;
        hero.style.willChange = 'transform';
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY < window.innerHeight * 1.2) {
                        hero.style.transform = `translateY(${window.scrollY * 0.18}px)`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ── Animated number counters ──
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const el = e.target;
            const target = parseInt(el.dataset.count, 10);
            if (isNaN(target)) return;
            const duration = 1000;
            const startTime = performance.now();
            const tick = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(tick);
                else el.textContent = target;
            };
            requestAnimationFrame(tick);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.6 });

    // ── Hash-target scroll correction ──
    // Sections like Gallery fetch their data asynchronously and render only a
    // placeholder until it arrives, so the browser's native scroll-to-#hash on
    // load/navigation can fire before that content has expanded the page,
    // leaving the target scrolled past. Re-correct for a short window after
    // load whenever the DOM mutates (i.e. whenever a section's data finishes
    // loading and renders), so a link to e.g. #contact actually lands there
    // even if it sits below still-loading content. Bounded to 2s so it never
    // fights a user who has since scrolled away on purpose.
    let hashCorrectionDeadline = null;
    function tryCorrectHashScroll() {
        if (!location.hash) return;
        if (hashCorrectionDeadline === null) hashCorrectionDeadline = Date.now() + 2000;
        if (Date.now() > hashCorrectionDeadline) return;
        const target = document.querySelector(location.hash);
        if (target) target.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    // ── Observe new elements (called at init and after each Blazor DOM mutation) ──
    function observeElements() {
        document.querySelectorAll('.reveal:not([data-rv])').forEach(el => {
            el.setAttribute('data-rv', '1');
            revealObs.observe(el);
        });
        document.querySelectorAll('.taglist:not([data-sg])').forEach(el => {
            el.setAttribute('data-sg', '1');
            staggerObs.observe(el);
        });
        document.querySelectorAll('[data-count]:not([data-cv])').forEach(el => {
            el.setAttribute('data-cv', '1');
            counterObs.observe(el);
        });
        tryInitScrollSpy();
        tryInitParallax();
        tryCorrectHashScroll();
    }

    // ── Scroll progress bar ──
    function initScrollProgress() {
        const bar = document.getElementById('scroll-progress');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
        }, { passive: true });
    }

    // ── Back to top ──
    function initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function init() {
        observeElements();
        initScrollProgress();
        initBackToTop();
        new MutationObserver(observeElements).observe(document.body, { childList: true, subtree: true });
        // Re-arm the hash-correction window on every real navigation (e.g. clicking
        // a nav link to a different section) — a click to the *same* hash the URL
        // already has doesn't fire hashchange, but there's nothing to correct then anyway.
        window.addEventListener('hashchange', () => {
            hashCorrectionDeadline = null;
            tryCorrectHashScroll();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
    } else {
        setTimeout(init, 300);
    }
})();
