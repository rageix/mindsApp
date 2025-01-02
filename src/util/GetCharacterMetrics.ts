export interface IFontMetrics {
  family: string,
  size: number,
  width: number,
  height: number,
  baseline: number
}

export function getCharFontMetrics (char: string, family: string, size: number): IFontMetrics{
  // this._family = family || (family = "Monaco, 'Courier New', Courier, monospace");
  // this._size = parseInt(size) || (size = 12);

  // Preparing container
  const line = document.createElement('div'),
    body = document.body;
  line.style.position = 'absolute';
  line.style.whiteSpace = 'nowrap';
  line.style.font = size + 'px ' + family;
  body.appendChild(line);

  console.log('isSpace', char === ' ');
  // Now we can measure width and height of the letter
  const text = char === ' ' ? "\u00A0" : char; // 10 symbols to be more accurate with width
  line.innerHTML = text;
  const width = line.offsetWidth / text.length;
  const height = line.offsetHeight;

  // Now creating 1px sized item that will be aligned to baseline
  // to calculate baseline shift
  const span = document.createElement('span');
  span.style.display = 'inline-block';
  span.style.overflow = 'hidden';
  span.style.width = '1px';
  span.style.height = '1px';
  line.appendChild(span);

  // Baseline is important for positioning text on canvas
  const baseline = span.offsetTop + span.offsetHeight;

  document.body.removeChild(line);

  return {
    family,
    size,
    width,
    height,
    baseline
  }
};