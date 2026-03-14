document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
  }

  // Student Slider
  var slider = document.querySelector(".student-slider");
  var track = document.querySelector(".student-slider-track");
  var prevBtn = document.querySelector(".slider-prev");
  var nextBtn = document.querySelector(".slider-next");
  var cards = document.querySelectorAll(".student-card");

  if (slider && track && prevBtn && nextBtn && cards.length > 0) {
    var currentIndex = 0;
    var cardsPerView = 3;
    var totalCards = cards.length;
    var gap = 24; // 1.5rem in pixels

    // Update cards per view based on screen size
    function updateCardsPerView() {
      if (window.innerWidth <= 720) {
        cardsPerView = 1;
      } else if (window.innerWidth <= 1024) {
        cardsPerView = 2;
      } else {
        cardsPerView = 3;
      }
      updateSliderPosition();
      updateButtons();
    }

    // Calculate and update slider position
    function updateSliderPosition() {
      var cardWidth = cards[0].offsetWidth;
      var translateX = -(currentIndex * (cardWidth + gap));
      track.style.transform = "translateX(" + translateX + "px)";
    }

    // Update button states
    function updateButtons() {
      var maxIndex = Math.max(0, totalCards - cardsPerView);
      
      if (currentIndex <= 0) {
        prevBtn.disabled = true;
      } else {
        prevBtn.disabled = false;
      }

      if (currentIndex >= maxIndex) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    }

    // Navigate to previous slide
    prevBtn.addEventListener("click", function () {
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
        updateButtons();
      }
    });

    // Navigate to next slide
    nextBtn.addEventListener("click", function () {
      var maxIndex = Math.max(0, totalCards - cardsPerView);
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSliderPosition();
        updateButtons();
      }
    });

    // Handle window resize
    var resizeTimeout;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        updateCardsPerView();
      }, 250);
    });

    // Initialize
    updateCardsPerView();

    // Add touch/swipe support for mobile
    var touchStartX = 0;
    var touchEndX = 0;

    slider.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      var swipeThreshold = 50;
      var diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next
          nextBtn.click();
        } else {
          // Swipe right - prev
          prevBtn.click();
        }
      }
    }

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        prevBtn.click();
      } else if (e.key === "ArrowRight") {
        nextBtn.click();
      }
    });
  }
});