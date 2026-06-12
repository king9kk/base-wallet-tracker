// Performance Optimization Module
const perfMetrics = {
  apiCalls: 0,
  cacheHits: 0,
  renderTime: 0,
  errors: 0
};

function trackAPICall(name, startTime) {
  perfMetrics.apiCalls++;
  const duration = Date.now() - startTime;
  console.debug(`API: ${name} took ${duration}ms`);
  return duration;
}

function trackCacheHit(key) {
  perfMetrics.cacheHits++;
  console.debug(`Cache hit: ${key}`);
}

function measureRender(name, fn) {
  const start = performance.now();
  fn();
  const duration = performance.now() - start;
  perfMetrics.renderTime += duration;
  console.debug(`Render: ${name} took ${duration.toFixed(2)}ms`);
}

function lazyLoad(selector, loadFn) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadFn(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(selector).forEach(el => {
    observer.observe(el);
  });
}

function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

function getPerformanceReport() {
  return {
    ...perfMetrics,
    cacheHitRate: perfMetrics.apiCalls > 0
      ? ((perfMetrics.cacheHits / perfMetrics.apiCalls) * 100).toFixed(1) + '%'
      : '0%',
    avgRenderTime: (perfMetrics.renderTime / Math.max(1, perfMetrics.apiCalls)).toFixed(2) + 'ms'
  };
}