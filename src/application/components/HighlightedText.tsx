import cn from 'classnames';
import React, { HTMLAttributes } from 'react';

import styles from './HiglightedText.module.scss';

type Props = HTMLAttributes<HTMLSpanElement> & {
  text: string;
  indexesToHighlight?: number[];
};

const HighlightedTextComp: React.FC<Props> = ({ indexesToHighlight = [], text, ...rest }) => {
  return (
    <span className={styles.container} {...rest}>
      {text.split('').map((char, index) => {
        const shouldHighlight = indexesToHighlight.includes(index);

        return (
          <span key={index} className={cn({ [styles.highLightedText]: shouldHighlight })}>
            {char}
          </span>
        );
      })}
    </span>
  );
};

export const HighlightedText = React.memo(HighlightedTextComp);
export default HighlightedText;
