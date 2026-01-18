import { useRef } from 'react';

type Options<T> = {
  delay?: number;
  onLongPress: (payload: T) => void;
};

export function useLongPress<T>({ onLongPress, delay = 500 }: Options<T>) {
  const timerRef = useRef<number | null>(null);

  const handleTouchStart = (payload: T) => {
    timerRef.current = window.setTimeout(() => {
      onLongPress(payload);
    }, delay);
  };

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleTouchMove = clear;
  const handleTouchCancel = clear;
  const handleTouchEnd = clear;

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
  };
}
