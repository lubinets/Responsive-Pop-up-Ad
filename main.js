let popupOverlay = document.querySelector(".popup-overlay");
let skipButton = document.querySelector(".popup-container .skip-button");
let visitButton = document.querySelector(".popup-container .visit-button");

let remainingTime = 5;
let allowedToSkip = false;
let popupTimer;

const createPopupCookie = () => {
  let expiresDays = 30;
  let date = new Date();
  date.setTime(date.getTime() + expiresDays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `popupCookie=true; ${expires}; path=/;`;
};

const showAd = () => {
  popupOverlay.classList.add("active");
  popupTimer = setInterval(() => {
    skipButton.innerHTML = `Skip in ${remainingTime}s`;
    remainingTime--;

    if (remainingTime < 0) {
      allowedToSkip = true;
      skipButton.innerHTML = "Skip";
      clearInterval(popupTimer);
    }
  }, 1000);
};

let skipAd = () => {
  popupOverlay.classList.remove("active");
  createPopupCookie();
};

skipButton.addEventListener("click", () => {
  if (allowedToSkip) {
    skipAd();
  }
});

const startTimer = () => {
  if (window.scrollY > 100) {
    showAd();
    window.removeEventListener("scroll", startTimer);
  }
};

if (!document.cookie.match(/^(.*;)?\s*popupCookie\s*=\s*[^;]+(.*)?$/))
  window.addEventListener("scroll", startTimer);
