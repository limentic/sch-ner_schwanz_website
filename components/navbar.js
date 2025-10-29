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
          align-items: center;
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
          display: flex;
          align-items: center;
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
          position: relative;
          display: inline-block;
        }
        .lang-dropdown-btn {
          background: rgba(141, 52, 200, 0.2);
          border: 1px solid #8d34c8;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .lang-dropdown-btn:hover {
          background: rgba(141, 52, 200, 0.4);
        }
        .lang-dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: rgba(0, 0, 0, 0.95);
          border: 1px solid #8d34c8;
          border-radius: 4px;
          min-width: 80px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
          z-index: 1000;
        }
        .lang-dropdown-content.show {
          display: block;
        }
        .lang-option {
          padding: 0.75rem 1rem;
          cursor: pointer;
          font-size: 1.3rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lang-option:hover {
          background: rgba(141, 52, 200, 0.3);
        }
        .lang-option.active {
          background: rgba(141, 52, 200, 0.5);
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
            <button class="lang-dropdown-btn">
              <span class="current-flag">🇩🇪</span>
              <span style="font-size: 0.8rem;">▼</span>
            </button>
            <div class="lang-dropdown-content">
              <div class="lang-option" data-lang="en" data-flag="🇬🇧">🇬🇧</div>
              <div class="lang-option" data-lang="de" data-flag="🇩🇪">🇩🇪</div>
              <div class="lang-option" data-lang="fr" data-flag="🇫🇷">🇫🇷</div>
              <div class="lang-option" data-lang="pt" data-flag="🇵🇹">🇵🇹</div>
              <div class="lang-option" data-lang="es" data-flag="🇪🇸">🇪🇸</div>
              <div class="lang-option" data-lang="it" data-flag="🇮🇹">🇮🇹</div>
              <div class="lang-option" data-lang="pl" data-flag="🇵🇱">🇵🇱</div>
              <div class="lang-option" data-lang="sv" data-flag="🇸🇪">🇸🇪</div>
            </div>
          </div>
        </div>
      </nav>
    `;

    const menuBtn = this.shadowRoot.querySelector(".mobile-menu-btn");
    const navLinks = this.shadowRoot.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Language dropdown
    const langDropdownBtn = this.shadowRoot.querySelector(".lang-dropdown-btn");
    const langDropdownContent = this.shadowRoot.querySelector(".lang-dropdown-content");
    const currentFlag = this.shadowRoot.querySelector(".current-flag");
    const langOptions = this.shadowRoot.querySelectorAll(".lang-option");

    langDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      langDropdownContent.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
      langDropdownContent.classList.remove("show");
    });

    const updateLangDropdown = () => {
      const currentLang = localStorage.getItem('lang') || 'de';
      langOptions.forEach(option => {
        if (option.dataset.lang === currentLang) {
          option.classList.add('active');
          currentFlag.textContent = option.dataset.flag;
        } else {
          option.classList.remove('active');
        }
      });
    };

    langOptions.forEach(option => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const lang = option.dataset.lang;
        localStorage.setItem('lang', lang);
        window.setLanguage(lang);
        updateLangDropdown();
        langDropdownContent.classList.remove("show");
      });
    });

    updateLangDropdown();

    // Listen for language changes
    document.addEventListener('languageChanged', () => {
      this.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = window.t(key);
      });
      updateLangDropdown();
    });

    // Initial translation
    this.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = window.t(key);
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
