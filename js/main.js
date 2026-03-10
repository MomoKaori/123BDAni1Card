// ===== typing control =====

let skipTyping = false;

const lines = [
  "Bé có chuẩn bị một bí mật nhỏ cho anh.",

  "Không phải là món quà gì lớn... nhưng bé đã dành nhiều tâm huyết để làm nó.",

  "Nếu anh đang đọc những dòng này, thì chắc là món quà này đã đến đúng người rồi :33",
];

const passwordLines = [
  "Nhưng trước khi mở ra...",

  "Anh bé phải nhập đúng mật mã trước đã nè~",

  "Mật mã là ngày thiên thần của bé đến với thế giới này đóo °ʚ(*`꒳`*)ɞ°",
];

let pLineIndex = 0;

let pCharIndex = 0;

let lineIndex = 0;

let charIndex = 0;

// ===== typing password =====

function typePassword() {
  if (pLineIndex >= passwordLines.length) {
    document.getElementById("inputArea").style.display = "block";

    return;
  }

  let element = document.getElementById("q" + (pLineIndex + 1));

  let text = passwordLines[pLineIndex];

  if (skipTyping) {
    element.innerHTML = text;

    skipTyping = false;

    pLineIndex++;

    pCharIndex = 0;

    setTimeout(typePassword, 300);
  } else if (pCharIndex < text.length) {
    element.innerHTML += text.charAt(pCharIndex);

    pCharIndex++;

    setTimeout(typePassword, 35);
  } else {
    pLineIndex++;

    pCharIndex = 0;

    setTimeout(typePassword, pLineIndex === 2 ? 700 : 400);
  }
}

// ===== typing intro =====

function typeLine() {
  if (lineIndex >= lines.length) {
    document.getElementById("startBtn").style.display = "inline-block";
    return;
  }

  let element = document.getElementById("line" + (lineIndex + 1));

  let text = lines[lineIndex];

  if (skipTyping) {
    element.innerHTML = text;

    skipTyping = false;

    lineIndex++;

    charIndex = 0;

    setTimeout(typeLine, 300);

    return;
  }

  if (charIndex < text.length) {
    element.innerHTML += text.charAt(charIndex);

    charIndex++;

    setTimeout(typeLine, 35);
  } else {
    lineIndex++;

    charIndex = 0;

    setTimeout(typeLine, 500);
  }
}

// ===== chuyển sang màn password =====

function showPassword() {
  document.getElementById("intro").style.display = "none";

  document.getElementById("passwordScreen").style.display = "block";

  document.getElementById("q1").innerHTML = "";

  document.getElementById("q2").innerHTML = "";

  document.getElementById("q3").innerHTML = "";

  pLineIndex = 0;

  pCharIndex = 0;

  typePassword();
}

// ===== kiểm tra password =====

function checkPassword() {
  let input = document.getElementById("birthdayInput");

  let message = document.getElementById("message");

  let openBtn = document.getElementById("openBtn"); // nút mở thiệp

  message.classList.remove("correct");

  let value = input.value;

  // chưa chọn

  if (!value) {
    message.innerText = "Ơ kìa, anh chưa chọn ngày sinh mà :<<<";

    input.classList.add("shake");

    setTimeout(function () {
      input.classList.remove("shake");
    }, 300);

    return;
  }

  // tách yyyy-mm-dd

  let parts = value.split("-");

  let year = parseInt(parts[0]);

  let month = parseInt(parts[1]);

  let day = parseInt(parts[2]);

  // đúng sinh nhật 12/03/2003

  if (day === 12 && month === 3 && year === 2003) {
    message.innerText = "Tất nhiên là anh phải biết câu trả lời này rồi ❤️";

    message.classList.add("correct");

    // khóa input và nút

    input.disabled = true;

    if (openBtn) openBtn.disabled = true;

    // chờ click để hiện bước tiếp

    let clickCount = 0;

    function showNextMessage() {
      clickCount++;

      if (clickCount === 1) {
        message.innerHTML =
          "Tất nhiên là anh phải biết câu trả lời này rồi ❤️<br><br>Vậy thì... bắt đầu thôiii~";

        document.getElementById("nextBtn").style.display = "inline-block";

        document.removeEventListener("click", showNextMessage);
      }
    }

    document.addEventListener("click", showNextMessage);
  } else {
    // sai

    message.innerText = "Sai rồi, thử lại xem nào :>";

    input.classList.add("shake");

    setTimeout(function () {
      input.classList.remove("shake");
    }, 300);
  }
}

// ===== mở trang thư =====

function openLetter() {
  sessionStorage.setItem("playLetterMusicOnLoad", "true");
  window.location.href = "pages/letter.html";
}

// ===== bắt đầu trải nghiệm =====

function beginExperience() {
  // Ẩn start screen
  document.getElementById("startScreen").style.display = "none";
  
  // Hiện intro
  document.getElementById("intro").style.display = "block";
  
  // Chạy nhạc
  startMusic();
  
  // Bắt đầu typing
  typeLine();
}

// ===== khởi tạo nhạc =====

let musicStarted = false;

function startMusic() {
  if (musicStarted) return;

  const bgMusic = document.getElementById("bgMusic");
  if (bgMusic) {
    bgMusic.volume = 0.3;
    bgMusic.currentTime = 0;
    bgMusic
      .play()
      .then(() => {
        musicStarted = true;
        console.log("Music started successfully");
      })
      .catch((e) => console.log("Autoplay blocked:", e));
  }
}

// Reset khi reload trang
window.addEventListener("beforeunload", function () {
  musicStarted = false;
});

// ===== click để skip typing =====

document.addEventListener("click", function () {
  if (lineIndex < lines.length || pLineIndex < passwordLines.length) {
    skipTyping = true;
  }
});
