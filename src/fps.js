export const FPS = frameFn => {
  let delta = 0;
  let fps = 0;
  let frameFPS = 0;

  let lastTime = 0;
  let lastSecond = 0;
  let frameCount = 0;

  return time => {
    if(time) {
      // Update
      frameCount++;
      delta = time - lastTime;
      frameFPS = 1 / delta;

      lastSecond = Math.floor(lastTime);
      const thisSecond = Math.floor(time);
      if(lastSecond !== thisSecond) {
        fps = frameCount / (thisSecond - lastSecond);

        // Reset
        frameCount = 0;
        lastSecond = thisSecond;

        if(frameFn)
          frameFn(fps);
      }

      lastTime = time;
    }

    // Read
    return { delta, fps, frameFPS };
  };
};
