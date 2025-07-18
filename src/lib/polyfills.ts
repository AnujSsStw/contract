// Global polyfills for compatibility with older Node.js versions

// Polyfill for Promise.withResolvers (not available in Node.js < 21)
if (typeof Promise !== "undefined" && !Promise.withResolvers) {
  Promise.withResolvers = function <T>() {
    let resolve: (value: T | PromiseLike<T>) => void;
    let reject: (reason?: unknown) => void;
    const promise = new Promise<T>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve: resolve!, reject: reject! };
  };
}
