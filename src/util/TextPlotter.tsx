import { Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import { ReactElement } from 'react';
import { getCharFontMetrics } from '@/util/GetCharacterMetrics';

export interface IPlotTextProps {
  text: string,
  fontFamily: string,
  fontSize: number,
  maxWidth?: number
  fillColor: string,
  fillAlpha?: number,
  lineHeight?: number
}

export class TextPlotter {
  items: ReactElement[] = [];
  x: number = 0;
  y: number = 0;
  prevWidth = 0;

  plotText = ({text, fontFamily, fontSize, maxWidth, fillColor, fillAlpha = 1, lineHeight = 1.5}: IPlotTextProps) => {

    for (let i = 0, len = text.length; i < len; i++) {
      const char = text[i];
      const charMetrics = getCharFontMetrics(char, fontFamily, fontSize);

      console.log(char, charMetrics);

      let newX = this.x + (this.prevWidth / 2) + (charMetrics.width / 2);

      if (maxWidth && newX > maxWidth) {
        newX = 0;
        this.x = 0;
        this.y += fontSize * lineHeight;
        this.prevWidth = 0;
      }

      const newItem = <Text
        text={char}
        anchor={0.5}
        x={newX}
        y={this.y}
        alpha={fillAlpha}
        style={
          new TextStyle({
            align: 'center',
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: '400',
            fill: fillColor,
          })
        }

      />

      this.items.push(newItem);

      this.prevWidth = charMetrics.width;
      this.x = newX;
    }


  }

}