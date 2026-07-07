const button = document.getElementById("contactButton");

if (button) {
  const title = button.querySelector(".button-title");
  const subtitle = button.querySelector(".button-subtitle");

  if (title && subtitle) {
    const email = "aarav.manoly@gmail.com";

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(email);

        title.classList.add("text-hidden");
        subtitle.classList.add("text-hidden");

        setTimeout(() => {
          title.textContent = "✓Copied!";
          subtitle.textContent = "Email address copied";

          title.classList.remove("text-hidden");
          subtitle.classList.remove("text-hidden");
        }, 250);

        setTimeout(() => {
          title.classList.add("text-hidden");
          subtitle.classList.add("text-hidden");

          setTimeout(() => {
            title.textContent = "Contact Me";
            subtitle.textContent = "Click to copy email";

            title.classList.remove("text-hidden");
            subtitle.classList.remove("text-hidden");
          }, 250);
        }, 2000);
      } catch (err) {
        console.error(err);
      }
    });
  }
}

let currentSlide = 0;
let slides = [];

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

window.addEventListener("DOMContentLoaded", () => {
  slides = Array.from(document.querySelectorAll(".carousel-item"));
  const lightbox = document.getElementById("carouselLightbox");
  const pageHeader = document.querySelector('.photo-edit-header');

  let lightboxImage = null;
  let lightboxCaption = null;
  let closeButton = null;
  let prevButton = null;
  let nextButton = null;

  if (lightbox) {
    lightboxImage = lightbox.querySelector(".lightbox-image");
    lightboxCaption = lightbox.querySelector(".lightbox-caption");
    closeButton = lightbox.querySelector(".lightbox-close");
    prevButton = lightbox.querySelector(".lightbox-prev");
    nextButton = lightbox.querySelector(".lightbox-next");
  }

  function updateLightboxImage(index) {
    const img = slides[index];
    if (!img || !lightboxImage || !lightboxCaption) return;

    currentSlide = index;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = img.alt || "Full screen view of the selected project image.";
  }

  function openLightbox(index) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;

    updateLightboxImage(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add('lightbox-open');
    if (pageHeader) {
      pageHeader.classList.add('hidden-during-lightbox');
    }
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove('lightbox-open');
    if (lightboxImage) {
      lightboxImage.src = "";
    }
    if (pageHeader) {
      pageHeader.classList.remove('hidden-during-lightbox');
    }
  }

  slides.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }
  if (prevButton) {
    prevButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openLightbox((currentSlide - 1 + slides.length) % slides.length);
    });
  }
  if (nextButton) {
    nextButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openLightbox((currentSlide + 1) % slides.length);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    window.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("active")) return;

      if (event.key === "Escape") {
        closeLightbox();
      }
      if (event.key === "ArrowLeft") {
        openLightbox((currentSlide - 1 + slides.length) % slides.length);
      }
      if (event.key === "ArrowRight") {
        openLightbox((currentSlide + 1) % slides.length);
      }
    });
  }

  showSlide(currentSlide);

  if (pageHeader) {
    const updateHeaderState = () => {
      pageHeader.classList.toggle('scrolled', window.scrollY > 24);
    };

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();
  }
});