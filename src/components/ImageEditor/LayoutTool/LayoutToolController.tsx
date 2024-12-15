import { ILayoutTool } from '@/types/ImageEditor';
import BasicController from '@/util/BasicController';

function getMousePos(e: React.MouseEvent<HTMLCanvasElement>) {
  // @ts-ignore
  const rect = e.target.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function newDefaultState(): ILayoutTool {
  return {
    type: null,
    active: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
}

export default class LayoutToolController extends BasicController<ILayoutTool> {
  defaultState = newDefaultState();
  state = this.defaultState;
  square = false;

  onMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    console.log('onMouseDown');
    console.log(e);
    const pos = getMousePos(e);
    console.log(pos);
    this.setState({
      active: true,
      startX: pos.x,
      startY: pos.y,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });
  };

  onMouseUp = () => {
    // console.log('onMouseUp');
    this.setState({
      active: false,
    });
  };

  onMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    // console.log('onMouseMove', this.state?.active);
    // console.log(this.state);
    if (this.state?.active || this.defaultState?.active) {
      // console.log('set new width height');
      const pos = getMousePos(e);
      const x = pos.x;
      const y = pos.y;
      let width = x - this.state.startX;
      let height = y - this.state.startY;

      if (this.square || e.shiftKey) {
        const min = Math.min(width, height);
        width = min;
        height = min;
      }

      this.setState({
        x,
        y,
        width: width,
        height: height,
      });
    }
  }
}
