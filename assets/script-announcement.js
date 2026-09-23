/**
 * Pixelexon Vogue
 * Announcement Bar Controller
 */

class PixelexonAnnouncement {
  constructor(container) {
    this.container = container;

    this.type =
      container.dataset.announcementType;

    this.slider =
      container.querySelector(
        '[data-announcement-slider]'
      );

    this.slides = this.slider
      ? Array.from(
          this.slider.querySelectorAll(
            '[data-announcement-slide]'
          )
        )
      : [];

    this.nextButton =
      container.querySelector(
        '[data-announcement-next]'
      );

    this.prevButton =
      container.querySelector(
        '[data-announcement-prev]'
      );

    this.pauseButton =
      container.querySelector(
        '[data-announcement-pause]'
      );

    this.closeButton =
      container.querySelector(
        '[data-announcement-close]'
      );

    this.marquee =
      container.querySelector(
        '[data-announcement-marquee]'
      );

    this.currentIndex = 0;

    this.rotationTimer = null;

    this.isPaused = false;

    this.reducedMotion =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );

    this.handleReducedMotionChange =
      this.handleReducedMotionChange.bind(
        this
      );

    this.handleKeydown =
      this.handleKeydown.bind(this);

    this.init();
  }

  /* ==========================================================================
     INIT
     ========================================================================== */

  init() {
    if (this.type === 'slider') {
      this.initSlider();
    }

    if (this.type === 'marquee') {
      this.initMarquee();
    }

    this.initDismiss();

    this.initThemeEditor();

    this.reducedMotion.addEventListener(
      'change',
      this.handleReducedMotionChange
    );
  }

  /* ==========================================================================
     SLIDER
     ========================================================================== */

  initSlider() {
    if (!this.slides.length) {
      return;
    }

    this.showSlide(0);

    this.nextButton?.addEventListener(
      'click',
      () => {
        this.next();
      }
    );

    this.prevButton?.addEventListener(
      'click',
      () => {
        this.previous();
      }
    );

    this.pauseButton?.addEventListener(
      'click',
      () => {
        this.togglePause();
      }
    );

    this.container.addEventListener(
      'mouseenter',
      () => {
        if (
          this.container.dataset
            .pauseHover === 'true'
        ) {
          this.pauseRotation();
        }
      }
    );

    this.container.addEventListener(
      'mouseleave',
      () => {
        if (
          this.container.dataset
            .pauseHover === 'true' &&
          !this.isPaused
        ) {
          this.startRotation();
        }
      }
    );

    this.container.addEventListener(
      'focusin',
      () => {
        if (
          this.container.dataset
            .pauseFocus === 'true'
        ) {
          this.pauseRotation();
        }
      }
    );

    this.container.addEventListener(
      'focusout',
      (event) => {
        if (
          this.container.dataset
            .pauseFocus === 'true' &&
          !this.container.contains(
            event.relatedTarget
          ) &&
          !this.isPaused
        ) {
          this.startRotation();
        }
      }
    );

    this.container.addEventListener(
      'keydown',
      this.handleKeydown
    );

    if (!this.reducedMotion.matches) {
      this.startRotation();
    }
  }

  showSlide(index) {
    if (!this.slides.length) {
      return;
    }

    this.currentIndex =
      (index + this.slides.length) %
      this.slides.length;

    this.slides.forEach(
      (slide, slideIndex) => {
        const active =
          slideIndex ===
          this.currentIndex;

        slide.classList.toggle(
          'is-active',
          active
        );

        slide.setAttribute(
          'aria-hidden',
          active
            ? 'false'
            : 'true'
        );

        if (active) {
          slide.removeAttribute(
            'inert'
          );
        } else {
          slide.setAttribute(
            'inert',
            ''
          );
        }
      }
    );
  }

  next() {
    this.showSlide(
      this.currentIndex + 1
    );

    this.restartRotation();
  }

  previous() {
    this.showSlide(
      this.currentIndex - 1
    );

    this.restartRotation();
  }

  startRotation() {
    if (
      this.type !== 'slider' ||
      this.slides.length <= 1 ||
      this.isPaused ||
      this.reducedMotion.matches
    ) {
      return;
    }

    this.stopRotation();

    const delay =
      parseInt(
        this.container.dataset
          .rotationDelay,
        10
      ) || 5000;

    this.rotationTimer =
      window.setInterval(
        () => {
          this.showSlide(
            this.currentIndex + 1
          );
        },
        delay
      );
  }

  stopRotation() {
    if (this.rotationTimer) {
      window.clearInterval(
        this.rotationTimer
      );

      this.rotationTimer = null;
    }
  }

  pauseRotation() {
    this.stopRotation();
  }

  restartRotation() {
    this.stopRotation();

    if (
      !this.isPaused &&
      !this.reducedMotion.matches
    ) {
      this.startRotation();
    }
  }

  togglePause() {
    this.isPaused =
      !this.isPaused;

    this.container.classList.toggle(
      'is-paused',
      this.isPaused
    );

    if (this.isPaused) {
      this.stopRotation();
    } else {
      this.startRotation();
    }

    if (this.pauseButton) {
      this.pauseButton.setAttribute(
        'aria-pressed',
        this.isPaused
          ? 'true'
          : 'false'
      );

      this.pauseButton.setAttribute(
        'aria-label',
        this.isPaused
          ? 'Resume announcements'
          : 'Pause announcements'
      );
    }
  }

  /* ==========================================================================
     MARQUEE
     ========================================================================== */

  initMarquee() {
    if (!this.marquee) {
      return;
    }

    if (
      this.container.dataset
        .pauseHover === 'true'
    ) {
      this.marquee.addEventListener(
        'mouseenter',
        () => {
          this.marquee.classList.add(
            'is-paused'
          );
        }
      );

      this.marquee.addEventListener(
        'mouseleave',
        () => {
          this.marquee.classList.remove(
            'is-paused'
          );
        }
      );
    }

    if (
      this.container.dataset
        .pauseFocus === 'true'
    ) {
      this.marquee.addEventListener(
        'focusin',
        () => {
          this.marquee.classList.add(
            'is-paused'
          );
        }
      );

      this.marquee.addEventListener(
        'focusout',
        (event) => {
          if (
            !this.marquee.contains(
              event.relatedTarget
            )
          ) {
            this.marquee.classList.remove(
              'is-paused'
            );
          }
        }
      );
    }
  }

  /* ==========================================================================
     DISMISS
     ========================================================================== */

  initDismiss() {
    if (!this.closeButton) {
      return;
    }

    this.restoreDismissState();

    this.closeButton.addEventListener(
      'click',
      () => {
        this.dismiss();
      }
    );
  }

  dismiss() {
    this.container.classList.add(
      'is-dismissed'
    );

    this.stopRotation();

    try {
      sessionStorage.setItem(
        `px-announcement-dismissed-${this.container.dataset.announcementId}`,
        'true'
      );
    } catch (error) {
      // Storage unavailable.
    }
  }

  restoreDismissState() {
    if (
      this.container.dataset
        .dismissible !== 'true'
    ) {
      return;
    }

    try {
      const dismissed =
        sessionStorage.getItem(
          `px-announcement-dismissed-${this.container.dataset.announcementId}`
        );

      if (dismissed === 'true') {
        this.container.classList.add(
          'is-dismissed'
        );
      }
    } catch (error) {
      // Storage unavailable.
    }
  }

  /* ==========================================================================
     ACCESSIBILITY
     ========================================================================== */

  handleKeydown(event) {
    if (this.type !== 'slider') {
      return;
    }

    if (
      event.key === 'ArrowRight'
    ) {
      event.preventDefault();

      this.next();
    }

    if (
      event.key === 'ArrowLeft'
    ) {
      event.preventDefault();

      this.previous();
    }
  }

  handleReducedMotionChange(
    event
  ) {
    if (event.matches) {
      this.stopRotation();
    } else if (!this.isPaused) {
      this.startRotation();
    }
  }

  /* ==========================================================================
     SHOPIFY THEME EDITOR
     ========================================================================== */

  initThemeEditor() {
    this.container.addEventListener(
      'shopify:block:select',
      (event) => {
        const selectedSlide =
          event.target.closest(
            '[data-announcement-slide]'
          );

        if (
          selectedSlide &&
          this.type === 'slider'
        ) {
          const index =
            this.slides.indexOf(
              selectedSlide
            );

          if (index !== -1) {
            this.isPaused = true;

            this.stopRotation();

            this.showSlide(index);
          }
        }
      }
    );

    this.container.addEventListener(
      'shopify:block:deselect',
      () => {
        if (
          this.type === 'slider'
        ) {
          this.isPaused = false;

          this.startRotation();
        }
      }
    );
  }

  /* ==========================================================================
     DESTROY
     ========================================================================== */

  destroy() {
    this.stopRotation();

    this.reducedMotion.removeEventListener(
      'change',
      this.handleReducedMotionChange
    );

    this.container.removeEventListener(
      'keydown',
      this.handleKeydown
    );
  }
}

/* ==========================================================================
   INSTANCE MANAGEMENT
   ========================================================================== */

const announcementInstances =
  new WeakMap();

const initAnnouncementBars = (
  root = document
) => {
  const announcements =
    root.querySelectorAll(
      '[data-announcement]'
    );

  announcements.forEach(
    (announcement) => {
      if (
        announcementInstances.has(
          announcement
        )
      ) {
        return;
      }

      const instance =
        new PixelexonAnnouncement(
          announcement
        );

      announcementInstances.set(
        announcement,
        instance
      );
    }
  );
};

initAnnouncementBars();

/* ==========================================================================
   SHOPIFY THEME EDITOR EVENTS
   ========================================================================== */

document.addEventListener(
  'shopify:section:load',
  (event) => {
    initAnnouncementBars(
      event.target
    );
  }
);

document.addEventListener(
  'shopify:section:unload',
  (event) => {
    const announcement =
      event.target.querySelector?.(
        '[data-announcement]'
      );

    if (!announcement) {
      return;
    }

    const instance =
      announcementInstances.get(
        announcement
      );

    instance?.destroy();

    announcementInstances.delete(
      announcement
    );
  }
);