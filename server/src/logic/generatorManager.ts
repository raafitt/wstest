// logic/generatorManager.ts
export type ParamKey = 'param1' | 'param2';

export interface GenConfig {
  min: number;
  max: number;
  frequency: number;
  running: boolean;
}

type Callback = (param: ParamKey, value: number, timestamp: string) => void;

const config: Record<ParamKey, GenConfig> = {
  param1: { min: 0, max: 100, frequency: 1000, running: false },
  param2: { min: 0, max: 100, frequency: 1000, running: false },
};

const timers: Partial<Record<ParamKey, NodeJS.Timeout>> = {};

export function getConfig(param: ParamKey): GenConfig {
  return config[param];
}

export function startGenerator(param: ParamKey, cb: Callback) {
  stopGenerator(param); // на случай перезапуска
  config[param].running = true;

  timers[param] = setInterval(() => {
    const { min, max } = config[param];
    const value = Math.random() * (max - min) + min;
    const timestamp = new Date().toISOString();

    cb(param, parseFloat(value.toFixed(2)), timestamp);
  }, config[param].frequency);
}

export function stopGenerator(param: ParamKey) {
  config[param].running = false;
  if (timers[param]) {
    clearInterval(timers[param]!);
    delete timers[param];
  }
}

export function updateConfig(param: ParamKey, min: number, max: number, frequency: number) {
  config[param].min = min;
  config[param].max = max;
  config[param].frequency = frequency;
}