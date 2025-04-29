const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const pen = document.getElementById('pen');
const brush = document.getElementById('pensl');
const erase = document.getElementById('erase');
const basket = document.getElementById('basket');
const reload = document.getElementById('reload');

let drawing = false;

ctx.globalCompositeOperation = 'destination-over';
// Функция для корректного масштабирования canvas
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Функция получения правильных координат относительно canvas
function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Рисование
pen.addEventListener('click', function() {
    canvas.style.cursor = 'url("img/pen.png") 10 10, auto';
    pen.style.zIndex = 5;

    canvas.onmousedown = function(event) {
        drawing = true;
        const pos = getMousePos(event);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    };

    canvas.onmouseup = function() {
        drawing = false;
    };

    canvas.onmousemove = function(event) {
        if (!drawing) return;
        const pos = getMousePos(event);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.stroke();
    };
});

// Инструменты
brush.addEventListener('click', function() {
    canvas.style.cursor = 'url("img/penszl.png") 10 10, auto';
});

erase.addEventListener('click', function() {
    canvas.style.cursor = 'url("img/erase.png") 10 10, auto';
});

basket.addEventListener('click', function() {
    canvas.style.cursor = 'url("img/basket.png") 10 10, auto';
});

reload.addEventListener('click', function() {
    location.reload();
});
