class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(141, 52, 200, 0.3);
        }
        nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .logo {
          font-family: 'Black Ops One', cursive;
          font-size: 1.8rem;
          font-weight: bold;
          color: #8d34c8;
          text-decoration: none;
          letter-spacing: 2px;
        }
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.9rem;
          position: relative;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: #8d34c8;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #8d34c8;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
        }
        .lang-switcher {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .lang-btn {
          background: none;
          border: 1px solid #8d34c8;
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        .lang-btn:hover {
          background: #8d34c8;
          color: black;
        }
        .lang-btn.active {
          background: #8d34c8;
          color: black;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            padding: 1rem 0;
            border-bottom: 2px solid #8d34c8;
          }
          .nav-links.active {
            display: flex;
          }
          .nav-link {
            padding: 0.5rem 2rem;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="#" class="logo">SCHWANZ</a>
        <button class="mobile-menu-btn">
          <i data-feather="menu"></i>
        </button>
        <div class="nav-links">
          <a href="#" class="nav-link" data-i18n="navHome">Home</a>
          <a href="#about" class="nav-link" data-i18n="navAbout">About</a>
          <a href="#music" class="nav-link" data-i18n="navMusic">Music</a>
          <a href="#tour" class="nav-link" data-i18n="navTour">Tour</a>
          <a href="#merch" class="nav-link" data-i18n="navMerch">Merch</a>
          <div class="lang-switcher">
            <button class="lang-btn" data-lang="de">DE</button>
            <button class="lang-btn" data-lang="fr">FR</button>
          </div>
        </div>
      </nav>
    `;

    const menuBtn = this.shadowRoot.querySelector(".mobile-menu-btn");
    const navLinks = this.shadowRoot.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Language switcher
    const langBtns = this.shadowRoot.querySelectorAll(".lang-btn");
    const updateLangButtons = () => {
      const currentLang = localStorage.getItem('lang') || 'de';
      langBtns.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    };

    langBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        localStorage.setItem('lang', lang);
        window.setLanguage(lang);
        updateLangButtons();
      });
    });

    updateLangButtons();

    // Listen for language changes
    document.addEventListener('languageChanged', () => {
      this.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = window.t(key);
      });
      updateLangButtons();
    });

    // Initial translation
    this.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = window.t(key);
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
