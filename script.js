const anyDiag = document.getElementById('diag');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lblType = document.getElementById('type');

let type = "strip"

const columns = 10;
const rows = 10;
const vertexVariation = 14;

const xSpc = canvas.clientWidth / columns;
const ySpc = canvas.clientHeight / rows;

const vertices = [];
const triangles = [];

document.querySelector('#changeBtn').addEventListener('click', function (event) {
  event.preventDefault();
  if (type === "strip") {
    lblType.textContent = "Quad Triangle";
    anyDiag.disabled = true;
    type = "quad"
    quadTriangles();
  } else {
    lblType.textContent = "Triangle Strip";
    anyDiag.disabled = false;
    type = "strip"
    triangleStrip();
  }
}, false);

anyDiag.addEventListener('click', function (event) {
  triangleStrip();
}, false);

for (let r = 0; r < rows + 1; r++) {
  for (let c = 0; c < columns + 1; c++) {
    const id = (rows + 1) * r + c;

    let x, y;
    if (id % (columns + 1) == 0 || id % (columns + 1) == columns) x = c * xSpc;
    else x = c * xSpc + Math.random() * vertexVariation - (vertexVariation / 2);

    if (id <= columns + 1 || id >= (columns + 1) * rows) y = r * ySpc;
    else y = r * ySpc + Math.random() * vertexVariation - (vertexVariation / 2);

    vertices[id] = new Point(x, y);
  }
}

function triangleStrip() {
  for (let v = 0; v < (vertices.length - rows - 1); v++) {
    if (v % (columns + 1) != columns) {
      if (!anyDiag.checked || Math.random() > .5) {
        (new Triangle(vertices[v], vertices[v + 1], vertices[v + columns + 1], hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
        (new Triangle(vertices[v + 1], vertices[v + columns + 1], vertices[v + columns + 2], hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
      } else {
        (new Triangle(vertices[v], vertices[v + columns + 1], vertices[v + columns + 2], hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
        (new Triangle(vertices[v], vertices[v + 1], vertices[v + columns + 2], hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
      }
    }
  }
}

function quadTriangles() {
  for (let v = 0; v < (vertices.length - rows - 1); v++) { 
    if (v % (columns + 1) != columns) {
      const centerPoint = new Point(
        ((vertices[v].x + vertices[v + 1].x + vertices[v + columns + 1].x + vertices[v + columns + 2].x) / 4) + Math.random() * vertexVariation - (vertexVariation / 2),
        ((vertices[v].y + vertices[v + 1].y + vertices[v + columns + 1].y + vertices[v + columns + 2].y) / 4) + Math.random() * vertexVariation - (vertexVariation / 2),
      );
  
      (new Triangle(vertices[v], vertices[v + 1], centerPoint, hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
      (new Triangle(vertices[v + 1], vertices[v + columns + 2], centerPoint, hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
      (new Triangle(vertices[v + columns + 1], vertices[v + columns + 2], centerPoint, hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
      (new Triangle(vertices[v], vertices[v + columns + 1], centerPoint, hslToHex(125, 50, 50 + (Math.random() * 30 - 15)))).draw(ctx);
    }
  }
}

// ctx.fillStyle = 'black';
// ctx.beginPath();
// ctx.arc(vertices[v].x, vertices[v].y, 2, 0, Math.PI * 2);
// ctx.fill();

triangleStrip();

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}