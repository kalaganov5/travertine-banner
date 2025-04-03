import '../scss/app.scss';

/* Your JS Code goes here */
class BannerControl {
  #closeButton;
  #bannerBody;
  #showDelay = 500;
  #buttonDelay = 1000;
  #hideDuration = 500;
  #storageKey = 'bannerHiddenUntil';
  #hideDurationMs = 24 * 60 * 60 * 1000; // 24 часа

  constructor() {
    this.#closeButton = document.querySelector('.tbanner__button');
    this.#bannerBody = document.querySelector('.tbanner');

    if (!this.#closeButton || !this.#bannerBody) return;

    const hiddenUntil = localStorage.getItem(this.#storageKey);
    if (hiddenUntil && Date.now() < Number(hiddenUntil)) {
      this.#bannerBody.style.display = 'none';
      return;
    }

    this.#init();
  }

  #init() {
    this.#showBanner();
    this.#showCloseButton();
    this.#closeButton.addEventListener('click', this.#hideBanner);
  }

  #showBanner = () => {
    setTimeout(() => {
      this.#bannerBody.classList.remove('tbanner--hidden');
    }, this.#showDelay);
  }

  #hideBanner = (evt) => {
    evt.preventDefault();

    this.#bannerBody.classList.add('tbanner--hidden');
    localStorage.setItem(this.#storageKey, String(Date.now() + this.#hideDurationMs));

    setTimeout(() => {
      this.#bannerBody.style.display = 'none';
    }, this.#hideDuration);
  }

  #showCloseButton = () => {
    setTimeout(() => {
      this.#closeButton.classList.remove('tbanner__button--hidden');
    }, this.#buttonDelay);
  }
}

new BannerControl();
