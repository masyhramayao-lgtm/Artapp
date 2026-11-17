import { flushSync } from 'react-dom';

/**
 * Runs a React state update inside the browser's View Transitions API when supported
 * and motion is permitted, falling back seamlessly to an immediate update.
 */
export function runWithViewTransition(
  update: () => void,
  onFinished?: () => void
): void {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };

  if (!doc.startViewTransition || prefersReduced) {
    update();
    if (onFinished) {
      requestAnimationFrame(onFinished);
    }
    return;
  }

  try {
    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        update();
      });
    });
    if (onFinished) {
      transition.finished.finally(onFinished);
    }
  } catch {
    update();
    if (onFinished) {
      requestAnimationFrame(onFinished);
    }
  }
}
