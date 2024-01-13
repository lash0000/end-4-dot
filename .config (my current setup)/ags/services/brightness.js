import { Service, Utils } from '../imports.js';
const { exec, execAsync } = Utils;

// Define the clamp function with the lowest limit of 0.05
const clamp = (num, min = 0.05, max = 1) => Math.min(Math.max(num, min), max);

class BrightnessService extends Service {
  static {
    Service.register(
      this,
      { 'screen-changed': ['float'], },
      { 'screen-value': ['float', 'rw'], },
    );
  }

  _screenValue = 0;

  get screen_value() { return this._screenValue; }

  set screen_value(percent) {
    percent = clamp(percent); // Use the clamp function with default limits
    this._screenValue = percent;

    Utils.execAsync(`brightnessctl s ${percent * 100}% -q`)
      .then(() => {
        this.emit('screen-changed', percent);
        this.notify('screen-value');
      })
      .catch(print);
  }

  constructor() {
    super();
    const current = Number(exec('brightnessctl g'));
    const max = Number(exec('brightnessctl m'));
    this._screenValue = current / max;
  }

  connectWidget(widget, callback, event = 'screen-changed') {
    super.connectWidget(widget, callback, event);
  }
}

const service = new BrightnessService();
globalThis.brightness = service;
export default service;

