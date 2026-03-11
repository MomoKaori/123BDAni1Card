// Biến toàn cầu
let wishMade = false;

// Hàm Make a wish - tắt nến
function makeWish() {
  if (wishMade) return;
  
  const candles = document.querySelectorAll('.candle');
  const wishBtn = document.getElementById('wishBtn');
  
  // Ẩn dòng hướng dẫn khi bấm button
  const wishInstruction = document.querySelector('.wish-instruction');
  if (wishInstruction) {
    wishInstruction.style.display = 'none';
  }
  
  // Thay đổi text button
  wishBtn.textContent = '🎉 Chờ chút nhé...';
  wishBtn.disabled = true;
  wishBtn.style.opacity = '0.7';
  
  // Tắt nến lần lượt
  candles.forEach((candle, index) => {
    setTimeout(() => {
      // Thêm class extinguished để tắt lửa
      candle.classList.add('extinguished');
      
      // Hiệu ứng khói
      createSmoke(candle);
      
      // Nếu là nến cuối cùng, sau khi tắt nến cuối cùng
      if (index === candles.length - 1) {
        setTimeout(() => {
          // Ẩn button cũ hoàn toàn
          const wishBtn = document.getElementById('wishBtn');
          wishBtn.style.display = 'none';
          
          // Tạo loading container đơn giản
          const loadingContainer = document.createElement('div');
          loadingContainer.className = 'loading-container';
          loadingContainer.innerHTML = `
            <div class="loading-text">Điều ước đang được gửi đi...</div>
            <div class="loading-bar">
              <div class="loading-progress"></div>
            </div>
          `;
          
          // Thêm vào container
          const wishButtonContainer = document.getElementById('wishButtonContainer');
          wishButtonContainer.appendChild(loadingContainer);
          
          // Animation loading progress
          const progressBar = loadingContainer.querySelector('.loading-progress');
          let progress = 0;
          const loadingInterval = setInterval(() => {
            progress += 2; // Tăng 2% mỗi 50ms
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
              clearInterval(loadingInterval);
              
              // Xóa loading và hiện thẳng text chúc
              setTimeout(() => {
                loadingContainer.remove();
                showBirthdayMessage(); // Hiện thẳng text chúc
              }, 500);
            }
          }, 50); // Cập nhật mỗi 50ms
        }, 1000);
      }
    }, index * 300); // Tắt từng nến cách nhau 300ms
  });
}

// Tạo hiệu ứng khói khi nến tắt
function createSmoke(candle) {
  const smoke = document.createElement('div');
  smoke.style.position = 'absolute';
  smoke.style.top = '-15px';
  smoke.style.left = '50%';
  smoke.style.transform = 'translateX(-50%)';
  smoke.style.width = '20px';
  smoke.style.height = '20px';
  smoke.style.background = 'rgba(200, 200, 200, 0.6)';
  smoke.style.borderRadius = '50%';
  smoke.style.animation = 'smokeRise 2s ease-out forwards';
  smoke.style.pointerEvents = 'none';
  
  // Thêm CSS animation cho khói
  if (!document.querySelector('#smokeAnimation')) {
    const style = document.createElement('style');
    style.id = 'smokeAnimation';
    style.textContent = `
      @keyframes smokeRise {
        0% {
          opacity: 0.6;
          transform: translateX(-50%) translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateX(-50%) translateY(-30px) scale(2);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  candle.appendChild(smoke);
  
  // Xóa khói sau animation
  setTimeout(() => {
    smoke.remove();
  }, 2000);
}

// HIỂN THỊ THÔNG ĐIỆP CHÚC MỪNG
function showBirthdayMessage() {
  const messageContainer = document.getElementById('birthdayMessage');
  messageContainer.style.display = 'block';
  
  // Thêm sự kiện click cho từng dòng chữ
  const messageTexts = document.querySelectorAll('.message-text');
  let currentLine = 0;
  
  // Hiện dòng đầu tiên ngay lập tức
  if (messageTexts[0]) {
    messageTexts[0].classList.add('visible');
    currentLine = 1;
  }
  
  // Thêm sự kiện click vào container
  messageContainer.addEventListener('click', function() {
    if (currentLine < messageTexts.length) {
      messageTexts[currentLine].classList.add('visible');
      currentLine++;
      
      // Nếu đã hiện hết dòng, hiển thị nút điều hướng sau 1 giây
      if (currentLine === messageTexts.length) {
        setTimeout(() => {
          const birthdayButtons = document.getElementById('birthdayButtons');
          birthdayButtons.style.display = 'flex';
          birthdayButtons.style.animation = 'fadeInUp 1s ease forwards';
        }, 1000);
      }
    }
  });
}

// Hiệu ứng ăn mừng sau khi ước xong
function celebrateWish() {
  wishMade = true;
  
  // Tạo confetti
  createConfetti();
  
  // HIỂN THỊ THÔNG ĐIỆP CHÚC MỪNG
  showBirthdayMessage();
  
  // ẨN BUTTON - không cần nữa vì có chữ ở trên
  const wishButtonContainer = document.getElementById('wishButtonContainer');
  wishButtonContainer.style.animation = 'fadeOutDown 1s ease forwards';
  setTimeout(() => {
    wishButtonContainer.style.display = 'none';
  }, 1000);
  
  // Hiệu ứng đặc biệt cho bánh
  const cake = document.querySelector('.cake');
  cake.style.animation = 'cakeCelebration 1s ease';
  
  // Thêm CSS animation cho bánh ăn mừng và fadeOut
  if (!document.querySelector('#cakeCelebrationAnimation')) {
    const style = document.createElement('style');
    style.id = 'cakeCelebrationAnimation';
    style.textContent = `
      @keyframes cakeCelebration {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1.1) rotate(5deg); }
        50% { transform: scale(1.2) rotate(-5deg); }
        75% { transform: scale(1.1) rotate(3deg); }
      }
      
      @keyframes fadeOutDown {
        from {
          opacity: 1;
          transform: translateY(0);
        }
        to {
          opacity: 0;
          transform: translateY(20px);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Tạo confetti rơi
function createConfetti() {
  const confettiContainer = document.getElementById('confettiContainer');
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#ff9a76', '#ff7979', '#ffc371', '#ffa500']; // Gradient từ tím sang cam
  
  // Xóa confetti cũ nếu có
  confettiContainer.innerHTML = '';
  
  // Tạo 100 mảnh confetti
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    
    // Thêm các hình dạng khác nhau
    const shapes = ['square', 'circle', 'triangle'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (shape === 'circle') {
      confetti.style.borderRadius = '50%';
    } else if (shape === 'triangle') {
      confetti.style.width = '0';
      confetti.style.height = '0';
      confetti.style.borderLeft = '5px solid transparent';
      confetti.style.borderRight = '5px solid transparent';
      confetti.style.borderBottom = '10px solid ' + confetti.style.background;
      confetti.style.background = 'transparent';
    }
    
    confettiContainer.appendChild(confetti);
  }
  
  // Không xóa confetti - để nó rơi tự nhiên không giới hạn
}

// Thêm CSS animation cho fadeInUp
if (!document.querySelector('#fadeInUpAnimation')) {
  const style = document.createElement('style');
  style.id = 'fadeInUpAnimation';
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

let birthdayMusicStarted = false;

function startBirthdayMusic() {
  if (birthdayMusicStarted) return;

  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    bgMusic.volume = 0.3;
    bgMusic.currentTime = 0;
    bgMusic.play().then(() => {
      birthdayMusicStarted = true;
      console.log('Birthday music started successfully');
    }).catch(e => console.log('Birthday autoplay blocked:', e));
  }
}

function goToGifts() {
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic && !bgMusic.paused) {
    sessionStorage.setItem('musicCurrentTime', bgMusic.currentTime);
    sessionStorage.setItem('continueMusic', 'true');
  }
}

function goBackToLetter() {
  sessionStorage.setItem('playLetterMusicOnLoad', 'true');
}

window.onload = function() {
  if (sessionStorage.getItem('playBirthdayMusicOnLoad') === 'true') {
    sessionStorage.removeItem('playBirthdayMusicOnLoad');
    startBirthdayMusic();
  }
};
