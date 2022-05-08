# notatimer

notatimer is "not a timer." It is, in fact, a stopwatch, though it doesn't stop some people (see: speedrunners) from calling it a timer.

## Install

```
npm i notatimer
```

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

The [callback function](#stopwatchcallback) is passed an object containing a [`time`](#stopwatchtime) property and [`times`](#stopwatchtimes) property.

These three properties can be updated after construction using [`stopwatch.set(object)`](#stopwatchsetobject).

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

##### `stopwatch.callback`

Function that is called every step or when [`setting`](#stopwatchsetobject) a property. Use this function to update where the time is displayed.

### Methods

##### `stopwatch.start()`

Start the timer. Returns void.

##### `stopwatch.pause()`

Pause the timer. Returns void.

##### `stopwatch.stop()`

Stops the timers. Returns an object with a [`time`](#stopwatchtime) property and [`times`](#stopwatchtimes) property.

##### `stopwatch.reset()`

Stops and resets the timer to the initial value. Returns void.

##### `stopwatch.lap()`

Adds an object with a [`time`](#stopwatchtime) property and [`times`](#stopwatchtimes) property to the[`stopwatch.laps`](#stopwatchlaps) array. Returns the aforementioned object.

##### `stopwatch.set(object)`

Sets the [`initial`](#stopwatchinitial) property, [`delay`](#stopwatchdelay) property, and/or [`callback`](#stopwatchcallback) function. Returns void.