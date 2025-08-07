const pages = document.querySelectorAll(".page");
let current = 0;

function goNext() {
  if (current < pages.length) {
    pages[current].classList.add("flipped");
    current++;

    if (current === 1) {
      document.getElementById("book").style.transform =
        "translateX(50%)";
    }

    if (current === pages.length) {
      document.getElementById("book").style.transform =
        "translateX(100%)";
    }
  }
}

function goPrev() {
  if (current > 0) {
    current--;
    pages[current].classList.remove("flipped");

    if (current === 0) {
      document.getElementById("book").style.transform =
        "translateX(0%)";
    }

    if (current === pages.length - 1) {
      document.getElementById("book").style.transform =
        "translateX(50%)";
    }
  }
}

function checkOrientation() {
  const warning = document.getElementById("orientation-warning");
  if (window.innerHeight > window.innerWidth) {
    warning.style.display = "block";
  } else {
    warning.style.display = "none";
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("load", checkOrientation);

const canvas = document.getElementById('background-particles');
const ctx = canvas.getContext('2d');
let squares = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createSquares(num) {
  squares = [];
  for (let i = 0; i < num; i++) {
    squares.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 5 + Math.random() * 10,
      speed: 0.3 + Math.random() * 0.7,
      opacity: 0.3 + Math.random() * 0.5,
    });
  }
}
createSquares(50);

function drawSquares() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  squares.forEach(sq => {
    ctx.beginPath();
    ctx.arc(sq.x, sq.y, sq.size / 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 105, 180, ${sq.opacity})`;
    ctx.fill();

    // Gerakkan ke atas
    sq.y -= sq.speed;
    if (sq.y + sq.size < 0) {
      sq.y = canvas.height + sq.size;
      sq.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawSquares);
}

drawSquares();
