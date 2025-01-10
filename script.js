class PomodoroTimer {
    constructor() {
        this.workTime = 25 * 60; // 25 minutes in seconds
        this.breakTime = 5 * 60; // 5 minutes in seconds
        this.timeLeft = this.workTime;
        this.isRunning = false;
        this.isWorkSession = true;
        this.timer = null;

        // DOM elements
        this.timeLeftDisplay = document.getElementById('time-left');
        this.sessionTypeDisplay = document.getElementById('session-type');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');

        // Bind event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateDisplay() {
        this.timeLeftDisplay.textContent = this.formatTime(this.timeLeft);
        this.sessionTypeDisplay.textContent = this.isWorkSession ? 'Work Time' : 'Break Time';
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();

                if (this.timeLeft === 0) {
                    this.switchSession();
                }
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.timer);
            this.isRunning = false;
        }
    }

    reset() {
        clearInterval(this.timer);
        this.isRunning = false;
        this.isWorkSession = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
    }

    switchSession() {
        this.isWorkSession = !this.isWorkSession;
        this.timeLeft = this.isWorkSession ? this.workTime : this.breakTime;
        this.updateDisplay();
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const pomodoro = new PomodoroTimer();
}); 