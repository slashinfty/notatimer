module.exports = class NotATimer {
    #present;

    constructor(opt) {
        const options = Object.assign({
            initial: 0,
            delay: 0
        }, opt);
        this.running = false;
        this.started = false;
        this.finished = false;
        this.initial = typeof options.initial === 'number' ? options.initial : 0;
        this.delay = typeof options.delay === 'number' && options.delay >= 0 ? options.delay : 0;
        this.reset();
    }

    reset() {
        this.started = false;
        this.running = false;
        this.finished = false;
        this.laps = [];
        this.times = [0, 0, 0, 0];
        this.time = 0;
    }

    async start() {
        if (this.running || this.finished) {
            return;
        }
        this.running = true;
        if (!this.started) {
            this.started = true;
            this.time = this.initial;
        }
        if (this.delay > 0) {
            await this.#wait(this.delay);
        }
        this.#present = performance.now();
        setImmediate(() => this.#step(performance.now()));
    }

    pause() {
        if (this.finished || !this.started || !this.running) {
            return;
        }
        this.running = false;
    }

    stop() {
        if (!this.started || this.finished) {
            return;
        }
        this.running = false;
        this.finished = true;
        return {
            time: this.time,
            times: this.times
        }
    }

    lap() {
        const lap = {
            time: this.time,
            times: this.times
        }
        this.laps.push(lap);
        return lap;
    }

    #step(timestamp) {
        if (!this.running) {
            return;
        }
        this.#update(timestamp);
        this.#present = timestamp;
        setImmediate(() => this.#step(performance.now()));
    }

    #update(timestamp) {
        const difference = timestamp - this.#present;
        this.time += difference;
        this.times[0] = Math.floor(this.time / 3600000);
        this.times[1] = Math.floor(this.time / 60000) - (60 * this.times[0]);
        this.times[2] = Math.floor(this.time / 1000) - (3600 * this.times[0]) - (60 * this.times[1]);
        this.times[3] = this.time - (3600000 * this.times[0]) - (60000 * this.times[1]) - (1000 * this.times[2]);
    }

    #wait(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}