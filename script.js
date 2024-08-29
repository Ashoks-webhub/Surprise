// Countdown Timer
const countdownElement = document.getElementById('countdown');
const birthdayDate = new Date('2024-08-31T00:00:00').getTime();
const music = document.getElementById('birthdayMusic');

function updateCountdown() {
    const now = new Date().getTime();
    const timeleft = birthdayDate - now;

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeleft < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "Happy Birthday, Saranya!";
        launchBlast();
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

// Confetti Blast with Emojis
function launchBlast() {
    // Play the birthday music
    music.play();

    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // Standard confetti
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });

        // Emoji confetti
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
            scalar: 1.2,
            colors: ['#FF69B4', '#FF1493'], // Pink tones
            shapes: ['circle'], // Placeholder for emoji shapes
            ticks: 200,
            draw: function(ctx) {
                ctx.font = '20px serif';
                ctx.fillText(Math.random() > 0.5 ? '❤️' : '💖', ctx.canvas.width / 2, ctx.canvas.height / 2);
            }
        });
    }, 250);
}

// Replay Button for Confetti
document.getElementById('replayButton').addEventListener('click', () => {
    launchBlast();
});
