import { useSearchParams } from 'react-router-dom';

type Config = Partial<{
  key: string;
  value: string;
}>;

// Params driven UI/UX state
export const useQueryToggle = (config: Config) => {
  const { key, value = '1' } = config;
  const [searchParams, setParams] = useSearchParams();

  if (!key || !value) {
    console.log("useQueryToggle isn't work without key, value.");
    return;
  }

  const isOpen = searchParams.get(key) === value;

  const open = () => {
    if (isOpen) return; // avoid second params navigation & push history
    // read the latest params from the URL to avoid races when multiple toggles run
    const p = new URLSearchParams(window.location.search);
    p.set(key, value);
    setParams(p);
  };

  const close = () => {
    // read the latest params from the URL to avoid races when multiple toggles run
    const p = new URLSearchParams(window.location.search);
    p.delete(key);
    // replace with current history on back
    setParams(p, { replace: true });
  };

  const toggle = () => {
    if (isOpen) close();
    else open();
  };

  return { isOpen, open, close, toggle };
};
