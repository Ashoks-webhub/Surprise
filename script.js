document.addEventListener('DOMContentLoaded', function() {
    var cakeButton = document.getElementById('cakeButton');
    var replayButton = document.getElementById('replayButton');
    var birthdayMusic = document.getElementById('birthdayMusic');
    var flame = document.querySelector('.flame');
    var title = document.getElementById('title');
    var waitingMessage = document.getElementById('waitingMessage');
    var countdown = document.getElementById('countdown');
    var birthdayMessage = document.getElementById('birthdayMessage');

    function startCountdown() {
        var targetDate = new Date('2024-08-31T00:00:00').getTime();
        var countdownInterval = setInterval(function() {
            var now = new Date().getTime();
            var distance = targetDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdown.innerHTML = "It's Time!";
                cakeButton.style.display = 'inline-block';
            } else {
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }, 1000);
    }

    cakeButton.addEventListener('click', function() {
        // Hide the countdown and other texts
        title.style.display = 'none';
        waitingMessage.style.display = 'none';
        countdown.style.display = 'none';

        // Show the happy birthday message
        birthdayMessage.style.display = 'block';

        // Play the music and start confetti
        birthdayMusic.play();
        flame.style.opacity = 1; // Light up the candle
        startConfetti();

        cakeButton.style.display = 'none';
        replayButton.style.display = 'inline-block';
    });

    replayButton.addEventListener('click', function() {
        startConfetti();
    });

    function startConfetti() {
        var duration = 15 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
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
        }, 250);
    }

    startCountdown();
});
