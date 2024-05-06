document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    resizeCanvas(); // Assicurati che il canvas sia ridimensionato correttamente

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.onresize = resizeCanvas; // Ridimensiona il canvas quando la finestra cambia dimensione

    const stars = [];
    const maxStars = 100; // Numero massimo di stelle

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 1 + 1;
            this.color = Math.random() > 0.5 ? 'yellow' : 'red';
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    for (let i = 0; i < maxStars; i++) {
        stars.push(new Star());
    }

    function connectStars() {
        let opacityValue = 1;
        for (let i = 0; i < maxStars; i++) {
            for (let j = 0; j < maxStars; j++) {
                const dx = stars[i].x - stars[j].x;
                const dy = stars[i].y - stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    opacityValue = 1 - (distance / 150);
                    ctx.strokeStyle = `rgba(255,255,0,${opacityValue})`;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let star of stars) {
            star.draw();
        }
        connectStars();
        requestAnimationFrame(animate);
    }

    animate();
});
