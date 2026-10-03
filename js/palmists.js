/**
 * AuraPalm Master Palmists Directory & Booking Controller
 * Handles reader search, filtering, and 1-on-1 Sanctuary Chamber reservation modal.
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-palmist-input');
  const specialtySelect = document.getElementById('filter-specialty-select');
  const chipTags = document.querySelectorAll('.chip-tag');
  const readerCards = document.querySelectorAll('.reader-card');
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingModal = document.getElementById('close-booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookBtns = document.querySelectorAll('.btn-book-session');
  const slotPills = document.querySelectorAll('.slot-pill');
  const modalReaderName = document.getElementById('modal-reader-name');
  const modalReaderFee = document.getElementById('modal-reader-fee');

  let activeFilterTag = 'all';
  let selectedSlot = 'Today 4:30 PM';

  // Slot pill selection
  slotPills.forEach(pill => {
    pill.addEventListener('click', () => {
      slotPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedSlot = pill.innerText;
      SoundFX.scanPulse();
    });
  });

  // Open booking modal
  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const readerName = btn.dataset.reader || 'Master Sophia Thorne';
      const fee = btn.dataset.fee || '₹499 / 30 Min';

      if (modalReaderName) modalReaderName.innerText = readerName;
      if (modalReaderFee) modalReaderFee.innerText = fee;

      if (bookingModal) {
        bookingModal.classList.add('open');
        SoundFX.chime();
      }
    });
  });

  // Close modal
  if (closeBookingModal && bookingModal) {
    closeBookingModal.addEventListener('click', () => {
      bookingModal.classList.remove('open');
    });
  }

  // Submit booking
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('booking-client-name').value;
      const clientEmail = document.getElementById('booking-client-email').value;

      if (clientName && clientEmail) {
        bookingModal.classList.remove('open');
        SoundFX.complete();
        showToast(`✨ ₹499 Vedic consultation slot confirmed for ${clientName}! Credentials sent to ${clientEmail}.`);
      }
    });
  }

  // Filter chips
  chipTags.forEach(chip => {
    chip.addEventListener('click', () => {
      chipTags.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilterTag = chip.dataset.tag || 'all';
      filterReaders();
      SoundFX.scanPulse();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterReaders();
    });
  }

  // Specialty select
  if (specialtySelect) {
    specialtySelect.addEventListener('change', () => {
      filterReaders();
    });
  }

  function filterReaders() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectVal = specialtySelect ? specialtySelect.value.toLowerCase() : 'all';

    readerCards.forEach(card => {
      const name = card.querySelector('.reader-name')?.innerText.toLowerCase() || '';
      const bio = card.querySelector('.reader-bio')?.innerText.toLowerCase() || '';
      const title = card.querySelector('.reader-title')?.innerText.toLowerCase() || '';
      const tags = card.dataset.tags ? card.dataset.tags.toLowerCase() : '';

      const matchesQuery = !query || name.includes(query) || bio.includes(query) || title.includes(query);
      const matchesSpecialty = selectVal === 'all' || tags.includes(selectVal) || bio.includes(selectVal);
      const matchesChip = activeFilterTag === 'all' || tags.includes(activeFilterTag);

      if (matchesQuery && matchesSpecialty && matchesChip) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }
});
