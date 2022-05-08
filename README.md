# notatimer

notatimer is "not a timer." It is, in fact, a stopwatch, though it doesn't stop some people (see: speedrunners) from calling it a timer.

## Install

`npm i notatimer`

## Requiring/Importing

```js
// CommonJS
const Stopwatch = require('notatimer');

// ESM
import Stopwatch from 'notawatch';
```

It is a default export, so it can be named whatever you want.

## Creating an Instance

```js
const stopwatch = new Stopwatch()
```

Optionally, an object can be passed into the constructor, with three possible properties.

```js
const stopwatch = new Stopwatch({
    initial: 0, // must be a number
    delay: 0, // must be a nonnegative number
    callback: null // must be a function with one parameter -- details below
})
```

## Usage

### Properties

##### `stopwatch.time`

Current time in milliseconds ([accurate to 5 microseconds](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)).

##### `stopwatch.times`

Current time as an array in the format `[hours, minutes, seconds, milliseconds]`.

##### `stopwatch.started`

If the stopwatch has started (true/false).

##### `stopwatch.running`

If the stopwatch is currently running (true/false).

##### `stopwatch.finished`

If the stopwatch has finished (true/false).

##### `stopwatch.initial`

The initial time for the stopwatch (use the constructor or `stopwatch.set()` to set).

##### `stopwatch.delay`

The initial delay for the stopwatch (use the constructor or `stopwatch.set()` to set).

##### `stopwatch.laps`

Array of objects, each with a [`time`](#stopwatchtime) property and [`times`](#stopwatchtimes) property.

The stopwatch is started with `stopwatch.start()`. You can pause it with `stopwatch.pause()` and stop it with `stopwatch.stop()`. It can also be reset with `stopwatch.reset()`. Using `stopwatch.lap()` will record a lap and save it in the `stopwatch.laps` array. Each element is an object with both the `stopwatch.time` and `stopwatch.times` properties.

Most methods return void, but `stopwatch.lap()` and `stopwatch.stop()` both return the same object that is stored in `stopwatch.laps`.