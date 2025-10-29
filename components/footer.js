class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: #0a0a0a;
          color: white;
          padding: 3rem 2rem;
          border-top: 1px solid #8d34c8;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .footer-section h3 {
          color: #8d34c8;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .footer-section p {
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .social-link {
          color: white;
          background: #222;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        .social-link:hover {
          background: #8d34c8;
          transform: translateY(-3px);
        }
        .copyright {
          text-align: center;
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #222;
          color: #666;
          font-size: 0.9rem;
        }
      </style>
      <div class="footer-content">
        <div class="footer-section">
          <h3 data-i18n="footerAboutTitle">About Us</h3>
          <p data-i18n="footerAbout">We're Schöner Schwanz. We play black metal poorly and wear too much purple. Our parents are disappointed.</p>
        </div>
        <div class="footer-section">
          <h3 data-i18n="footerLinksTitle">Quick Links</h3>
          <p><a href="#" style="color: #8d34c8; text-decoration: none;" data-i18n="footerHome">Home</a></p>
          <p><a href="#tour" style="color: #8d34c8; text-decoration: none;" data-i18n="footerTour">Tour Dates</a></p>
          <p><a href="#" style="color: #8d34c8; text-decoration: none;" data-i18n="footerMerch">Merch Store</a></p>
        </div>
        <div class="footer-section">
          <h3 data-i18n="footerSocialTitle">Follow Our Descent</h3>
          <div class="social-links">
            <a href="#" class="social-link"><i data-feather="facebook"></i></a>
            <a href="#" class="social-link"><i data-feather="instagram"></i></a>
            <a href="#" class="social-link"><i data-feather="youtube"></i></a>
            <a href="#" class="social-link"><i data-feather="music"></i></a>
          </div>
        </div>
      </div>
      <div class="copyright" data-i18n="footerCopyright">
        &copy; 2025 Schöner Schwanz | All Rights Reserved (Not Really)
      </div>
    `;

    // Listen for language changes
    document.addEventListener('languageChanged', () => {
      this.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = window.t(key);
      });
    });

    // Initial translation
    this.shadowRoot.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = window.t(key);
    });
  }
}

customElements.define("custom-footer", CustomFooter);
