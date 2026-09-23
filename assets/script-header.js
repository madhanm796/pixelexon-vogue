/**
 * -----------------------------------------------------------------------------
 * Pixelexon Vogue
 * Header
 * -----------------------------------------------------------------------------
 */

(() => {
  'use strict';

  const SELECTORS = {
    header: '[data-header]',
    menuToggle: '[data-header-menu-toggle]',
    menuClose: '[data-header-menu-close]',
    mobileMenu: '[data-header-mobile]',
    cartCount: '[data-cart-count]'
  };

  class PixelexonHeader {
    constructor(header) {
      this.header = header;
      this.menuToggle = header.querySelector(SELECTORS.menuToggle);
      this.menuClose = header.querySelector(SELECTORS.menuClose);
      this.mobileMenu = header.querySelector(SELECTORS.mobileMenu);

      if (!this.menuToggle || !this.mobileMenu) return;

      this.handleToggle = this.handleToggle.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleKeydown = this.handleKeydown.bind(this);
      this.handleBackdropClick = this.handleBackdropClick.bind(this);

      this.init();
    }

    init() {
      this.menuToggle.addEventListener('click', this.handleToggle);

      if (this.menuClose) {
        this.menuClose.addEventListener('click', this.handleClose);
      }

      this.mobileMenu.addEventListener(
        'click',
        this.handleBackdropClick
      );

      document.addEventListener(
        'keydown',
        this.handleKeydown
      );
    }

    handleToggle() {
      const isOpen =
        this.mobileMenu.classList.contains('is-open');

      if (isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.mobileMenu.classList.add('is-open');

      this.mobileMenu.setAttribute(
        'aria-hidden',
        'false'
      );

      this.menuToggle.setAttribute(
        'aria-expanded',
        'true'
      );

      this.menuToggle.setAttribute(
        'aria-label',
        'Close menu'
      );

      document.documentElement.classList.add(
        'header-menu-open'
      );

      if (this.menuClose) {
        requestAnimationFrame(() => {
          this.menuClose.focus();
        });
      }
    }

    close() {
      this.mobileMenu.classList.remove('is-open');

      this.mobileMenu.setAttribute(
        'aria-hidden',
        'true'
      );

      this.menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

      this.menuToggle.setAttribute(
        'aria-label',
        'Open menu'
      );

      document.documentElement.classList.remove(
        'header-menu-open'
      );

      this.menuToggle.focus();
    }

    handleClose() {
      this.close();
    }

    handleBackdropClick(event) {
      if (event.target === this.mobileMenu) {
        this.close();
      }
    }

    handleKeydown(event) {
      if (
        event.key === 'Escape' &&
        this.mobileMenu.classList.contains('is-open')
      ) {
        this.close();
      }
    }
  }

  const initHeaders = (root = document) => {
    root
      .querySelectorAll(SELECTORS.header)
      .forEach((header) => {
        if (header.dataset.headerInitialized === 'true') {
          return;
        }

        header.dataset.headerInitialized = 'true';

        new PixelexonHeader(header);
      });
  };

  initHeaders();

  document.addEventListener(
    'shopify:section:load',
    (event) => {
      initHeaders(event.target);
    }
  );

  document.addEventListener(
    'shopify:section:unload',
    (event) => {
      const header = event.target.querySelector(
        SELECTORS.header
      );

      if (!header) return;

      document.documentElement.classList.remove(
        'header-menu-open'
      );
    }
  );
})();