module.exports = class NotATimer {
    #present;

    constructor(opt) {
        const options = Object.assign({
            initial: 0,
            delay: 0,
            callback: null
        }, opt);
        this.running = false;
        this.started = false;
        this.finished = false;
        this.initial = typeof options.initial === 'number' ? options.initial : 0;
        this.delay = typeof options.delay === 'number' && options.delay >= 0 ? options.delay : 0;
        this.callback = typeof options.callback === 'function' ? options.callback : null;
        this.times = [0, 0, 0, 0];
        this.reset();
    }

    reset() {
        this.started = false;
        this.running = false;
        this.finished = false;
        this.laps = [];
        this.time = this.initial;
        this.#update();
        if (this.callback !== null) {
            this.callback({
                time: this.time,
                times: this.times
            });
        }
    }

    async start() {
        if (this.running || this.finished) {
            return;
        }
        this.running = true;
        if (!this.started) {
            this.started = true;
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

    set(opt) {
        if (this.started) {
            return;
        }
        const options = Object.assign({
            initial: this.initial,
            delay: this.delay
        }, opt);
        if (typeof options.initial === 'number'){
            this.initial = options.initial;
            this.time = this.initial;
            this.#update();
        }
        if (typeof options.delay === 'number' && options.delay > 0) {
            this.delay = options.delay;
        }
        if (options.hasOwnProperty('callback') && typeof options.callback === 'function') {
            this.callback = options.callback;
        }
        if (this.callback !== null) {
            this.callback({
                time: this.time,
                times: this.times
            });
        }
    }

    #step(timestamp) {
        if (!this.running) {
            return;
        }
        const difference = timestamp - this.#present;
        this.time += difference;
        this.#update();
        this.#present = timestamp;
        if (this.callback !== null) {
            this.callback({
                time: this.time,
                times: this.times
            });
        }
        setTimeout(() => this.#step(performance.now()), 50);
    }

    #update() {
        this.times[0] = Math.floor(this.time / 3600000);
        this.times[1] = Math.floor(this.time / 60000) - (60 * this.times[0]);
        this.times[2] = Math.floor(this.time / 1000) - (3600 * this.times[0]) - (60 * this.times[1]);
        this.times[3] = this.time - (3600000 * this.times[0]) - (60000 * this.times[1]) - (1000 * this.times[2]);
    }

    #wait(ms) {
        return new Promise(res => setTimeout(res, ms));
    }
}