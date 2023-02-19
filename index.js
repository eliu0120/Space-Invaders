const canvas = document.querySelector('canvas');
const canvasDrawer = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

function animate() {
    window.requestAnimationFrame(animate);
    canvasDrawer.fillStyle = 'black';
    canvasDrawer.fillRect(0, 0, canvas.width, canvas.height);
}
animate();