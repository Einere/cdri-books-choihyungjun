export function useIntersectionObserver(callback: () => void) {
  const observer = new IntersectionObserver((entries) => {
    const target = entries[0];

    if (target.isIntersecting) {
      callback();
    }
  });

  function observe(querySelector: string) {
    const target = document.querySelector(querySelector);

    if (target) {
      observer.observe(target);
    }
  }

  function unobserve(querySelector: string) {
    const target = document.querySelector(querySelector);

    if (target) {
      observer.unobserve(target);
    }
  }

  return {
    observe,
    unobserve,
  };
}
