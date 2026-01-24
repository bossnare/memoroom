import { useSearchParams } from 'react-router-dom';

type UseQueryToggleReturn = {
  isOpen: boolean;
  open: () => void;
  toggle: () => void;
  close: () => void;
};

type Config = Partial<{
  key: string;
  value: string;
}>;

// Params driven UI/UX state
export const useQueryToggle = (config: Config): UseQueryToggleReturn => {
  const { key, value = '1' } = config;
  const [searchParams, setParams] = useSearchParams();

  //  if key or value is missing return a safe no-op implementation so callers never get `undefined`
  if (!key || !value) {
    console.warn(
      'useQueryToggle called without `key` or `value` - returning no-op toggle.'
    );
    return {
      isOpen: false,
      open: () => {},
      toggle: () => {},
      close: () => {},
    };
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
