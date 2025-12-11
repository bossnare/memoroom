type VibrationType = 'low' | 'subtle' | 'soft' | 'medium' | 'strong';

export function vibrate(type: VibrationType) {
  if (!('vibrate' in navigator)) return;

  switch (type) {
    case 'low':
      navigator.vibrate([50, 20]);
      break;
    case 'subtle':
      navigator.vibrate([80, 40, 55]);
      break;
    case 'soft':
      navigator.vibrate(100);
      break;

    case 'medium':
      navigator.vibrate([200, 50, 200]);
      break;

    case 'strong':
      navigator.vibrate([300, 100, 300, 100, 300]);
      break;
  }
}

export const waitVibrate = (
  delay: number = 800,
  type: VibrationType = 'low'
) => {
  setTimeout(() => {
    vibrate(type);
  }, delay);
};
