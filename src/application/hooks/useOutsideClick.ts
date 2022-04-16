import { RefObject, useEffect } from 'react';

type CallBack = (event: MouseEvent) => void;
export function useOutsideClick<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, callback: CallBack) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
}

export default useOutsideClick;
