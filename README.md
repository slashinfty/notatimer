# notatimer

notatimer is "not a timer." It is, in fact, a stopwatch, though it doesn't stop some people (see: speedrunners) from calling it a timer.

You can install it with `npm i notatimer`.

You can require it as `const Stopwatch = require('notatimer')`, but it's a default export so you can name it whatever you want.

If you're developing an ESM module, you can do `import Stopwatch from 'notawatch'`.

An instance can be created with `const stopwatch = new Stopwatch()`. You can optionally pass an object into the constructor, with two possible properties: `initial` (which must be a number) and `delay` (which must be a nonnegative number).

There are two ways to read the time. `stopwatch.time` will be the current time in milliseconds ([accurate to 5 microseconds](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)), while `stopwatch.times` is an array of numbers in the format `[hours, minutes, seconds, milliseconds]`.

You can determine if a stopwatch has started with `stopwatch.started`. You can determine if a stopwatch is running with `stopwatch.running`. You can determine if a stopwatch has finished with `stopwatch.finished`.

The stopwatch is started with `stopwatch.start()`. You can pause it with `stopwatch.pause()` and stop it with `stopwatch.stop()`. It can also be reset with `stopwatch.reset()`. Using `stopwatch.lap()` will record a lap and save it in the `stopwatch.laps` array. Each element is an object with both the `stopwatch.time` and `stopwatch.times` properties.

Most methods return void, but `stopwatch.lap()` and `stopwatch.stop()` both return the same object that is stored in `stopwatch.laps`.