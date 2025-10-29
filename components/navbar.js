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
          <a href="#" class="nav-link">Home</a>
          <a href="#tour" class="nav-link">Tour</a>
          <a href="#" class="nav-link">Music</a>
          <a href="#" class="nav-link">Merch</a>
          <a href="#" class="nav-link">Contact</a>
        </div>
      </nav>
    `;

    const menuBtn = this.shadowRoot.querySelector(".mobile-menu-btn");
    const navLinks = this.shadowRoot.querySelector(".nav-links");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);
