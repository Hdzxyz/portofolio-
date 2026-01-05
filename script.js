const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
let stars = [];
const STAR_COUNT = 120;
let mouseX = 0, mouseY = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* STAR OBJECT */
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 1.5 + 0.3;
    this.speed = Math.random() * 0.3 + 0.1;
    this.depth = Math.random() * 2 + 0.5; // parallax depth
  }

  update() {
    this.y += this.speed;
    if (this.y > h) this.y = 0;
  }

  draw() {
    const offsetX = (mouseX - w / 2) / (40 * this.depth);
    const offsetY = (mouseY - h / 2) / (40 * this.depth);

    ctx.beginPath();
    ctx.arc(this.x + offsetX, this.y + offsetY, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#93c5fd";
    ctx.fill();
  }
}

/* INIT */
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push(new Star());
}

/* ANIMATE */
function animate() {
  ctx.clearRect(0, 0, w, h);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}
animate();

/* PARALLAX MOUSE */
window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

/* PARALLAX TOUCH (HP) */
window.addEventListener("touchmove", e => {
  mouseX = e.touches[0].clientX;
  mouseY = e.touches[0].clientY;
});
