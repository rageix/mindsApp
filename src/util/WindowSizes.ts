export interface WindowSizes {
  windowWidth: number;
  windowHeight: number;
  pageWidth: number;
  pageHeight: number;
  screenWidth: number;
  screenHeight: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
  ratio: number;
}

export default function windowSizes(): WindowSizes {
  const contentWidth =
    typeof window !== 'undefined'
      ? Array.from(document?.body?.children).reduce(
          (a, el) => Math.max(a, el.getBoundingClientRect().right),
          0,
        ) - document.body.getBoundingClientRect().x
      : 0;

  return {
    windowWidth:
      typeof window !== 'undefined' ? document.documentElement.clientWidth : 0,
    windowHeight:
      typeof window !== 'undefined' ? document.documentElement.clientHeight : 0,
    pageWidth:
      typeof window !== 'undefined'
        ? Math.min(document.body.scrollWidth, contentWidth)
        : 0,
    pageHeight: typeof window !== 'undefined' ? document.body.scrollHeight : 0,
    screenWidth: typeof window !== 'undefined' ? window.screen.width : 0,
    screenHeight: typeof window !== 'undefined' ? window.screen.height : 0,
    pageX:
      typeof window !== 'undefined'
        ? document.body.getBoundingClientRect().x
        : 0,
    pageY:
      typeof window !== 'undefined'
        ? document.body.getBoundingClientRect().y
        : 0,
    screenX: typeof window !== 'undefined' ? -window.screenX : 0,
    screenY:
      typeof window !== 'undefined'
        ? -window.screenY - (window.outerHeight - window.innerHeight)
        : 0,
    ratio: typeof window !== 'undefined' ? window.devicePixelRatio : 0,
  };
}
