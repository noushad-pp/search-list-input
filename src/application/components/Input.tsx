import React, { useEffect, useState } from 'react';

import useDebouncedCallback from '../hooks/useDebouncedCallback';

type Props = {
  search: string;
  onChange: (v: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (key: string) => void;
};

const InputComp: React.FC<Props> = ({ search = '', onChange, onBlur, onFocus, onKeyDown }) => {
  const [text, setText] = useState(search);
  useEffect(() => {
    setText(search);
  }, [search]);

  const onSearchChange = useDebouncedCallback(onChange, 100);
  const onInputChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setText(value);
    onSearchChange(value);
  };
  const onInputKeyDown = ({ key }: React.KeyboardEvent) => onKeyDown && onKeyDown(key);

  return (
    <input
      id="item-selector-input"
      type="search"
      placeholder="Type here.."
      value={text}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onInputChange}
      onKeyDown={onInputKeyDown}
    />
  );
};

export const Input = React.memo(InputComp);
export default Input;
