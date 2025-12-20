function handleWait(fn: () => void) {
    setTimeout(() => {
      fn();
    }, 150);
  }

  export {handleWait}