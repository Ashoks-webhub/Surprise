const countdownElement = document.getElementById('countdown');
const messageElement = document.getElementById('birthday-message');
const music = document.getElementById('birthday-music');
const replayButton = document.getElementById('replay');

// Set the date and time for the countdown
const birthday = new Date('2024-08-31T00:25:00').getTime();

// Update the countdown every second
const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // If the countdown is finished
    if (distance < 0) {
        clearInterval(interval);
        countdownElement.style.display = 'none';
        messageElement.style.display = 'block';
        launchBlast();
    }
}, 1000);

function launchBlast() {
    // Play the birthday music
    music.play();

    // Add a visual blast effect
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Allow replay of the blast
replayButton.addEventListener('click', () => {
    launchBlast();
});
