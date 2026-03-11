// Countdown đến 17/3/2026
const unlockDate = new Date('2026-03-17T00:00:00').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = unlockDate - now;

  // Tính toán thời gian
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Hiển thị
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  // Nếu đã đến ngày mở khóa
  if (distance < 0) {
    clearInterval(countdownInterval);
    // Chuyển hướng đến trang anniversary thật
    window.location.href = 'anniversary-unlocked.html';
  }
}

// Cập nhật mỗi giây
const countdownInterval = setInterval(updateCountdown, 1000);

// Chạy ngay lần đầu
updateCountdown();
