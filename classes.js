class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Triangle {
  constructor(v1, v2, v3, color) {
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(this.v1.x, this.v1.y);
    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.lineTo(this.v3.x, this.v3.y);
    ctx.fill();
    ctx.stroke();
  }
}
