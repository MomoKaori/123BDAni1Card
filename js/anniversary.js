// Khởi tạo nhạc tiếp tục từ gifts
let anniversaryMusicStarted = false;

function continueMusic() {
  if (anniversaryMusicStarted) return;
  
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.volume = 0.3;
    
    // Kiểm tra xem có tiếp tục từ gifts không
    if (sessionStorage.getItem('continueMusic') === 'true') {
      const savedTime = parseFloat(sessionStorage.getItem('musicCurrentTime') || 0);
      bgMusic.currentTime = savedTime;
      sessionStorage.removeItem('continueMusic');
      sessionStorage.removeItem('musicCurrentTime');
      console.log('Continuing music from:', savedTime);
    } else {
      bgMusic.currentTime = 0;
    }
    
    bgMusic.play().then(() => {
      anniversaryMusicStarted = true;
      console.log('Anniversary music started successfully');
    }).catch(e => console.log('Anniversary autoplay blocked:', e));
  }
}

function goBackToIndex() {
  sessionStorage.setItem('playIndexMusicOnLoad', 'true');
}

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

// Khởi động khi load trang
window.addEventListener('load', function() {
  continueMusic();
  updateCountdown();
});

// Cập nhật countdown mỗi giây
const countdownInterval = setInterval(updateCountdown, 1000);
