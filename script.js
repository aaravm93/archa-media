const button = document.getElementById("contactButton");
const title = button.querySelector(".button-title");
const subtitle = button.querySelector(".button-subtitle");

const email = "aarav.manoly@gmail.com";

button.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(email);

        // Animate out
        title.classList.add("text-hidden");
        subtitle.classList.add("text-hidden");

        // Swap text after fade out
        setTimeout(() => {
            title.textContent = "✓Copied!";
            subtitle.textContent = "Email address copied";

            title.classList.remove("text-hidden");
            subtitle.classList.remove("text-hidden");
        }, 250);

        // Return to original after 2 seconds
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
let currentSlide = 0;
let slides = [];

function showSlide(index) {
  slides.forEach((img, i) => {
    img.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

window.addEventListener("DOMContentLoaded", () => {
  slides = document.querySelectorAll(".carousel-item");
  const lightbox = document.getElementById("carouselLightbox");
  if (!lightbox) return;

  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");
  const closeButton = lightbox.querySelector(".lightbox-close");
  const prevButton = lightbox.querySelector(".lightbox-prev");
  const nextButton = lightbox.querySelector(".lightbox-next");

  function updateLightboxImage(index) {
    const img = slides[index];
    if (!img) return;
    currentSlide = index;
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = img.alt || "Full screen view of the selected project image.";
  }

  const pageHeader = document.querySelector('.photo-edit-header');

  function openLightbox(index) {
    updateLightboxImage(index);
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add('lightbox-open');
    if (pageHeader) {
      pageHeader.classList.add('hidden-during-lightbox');
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove('lightbox-open');
    lightboxImage.src = "";
    if (pageHeader) {
      pageHeader.classList.remove('hidden-during-lightbox');
    }
  }

  slides.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  closeButton.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openLightbox((currentSlide - 1 + slides.length) % slides.length);
  });
  nextButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openLightbox((currentSlide + 1) % slides.length);
  });

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

  showSlide(currentSlide);

  if (pageHeader) {
    const updateHeaderState = () => {
      pageHeader.classList.toggle('scrolled', window.scrollY > 24);
    };

    window.addEventListener('scroll', updateHeaderState, { passive: true });
    updateHeaderState();
  }
});