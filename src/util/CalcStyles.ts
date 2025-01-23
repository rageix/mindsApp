import { Styles } from '@react-pdf/renderer';
import { IRBStyle } from '@/types/Resume';
import _ from 'lodash';

export function calcStyles(
  style: Record<string, any>,
  styleContext: IRBStyle,
): Styles {
  const newStyle = { ...style };

  for (const prop in newStyle) {
    if (Object.prototype.hasOwnProperty.call(newStyle, prop)) {
      if (_.isNumber(newStyle[prop])) {
        newStyle[prop] = Math.round(newStyle[prop] * styleContext.scale);
      }
    }
  }

  newStyle['lineHeight'] = styleContext.lineHeight;

  return newStyle;
}
