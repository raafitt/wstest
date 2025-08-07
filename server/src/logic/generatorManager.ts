export interface GenConfig {
  min: number;
  max: number;
  frequency: number;
  running: boolean;
}

type Callback = (param: string, value: number, timestamp: string) => void;

// Хранилище конфигураций параметров — динамическое
const config: Record<string, GenConfig> = {};

// Таймеры по параметрам
const timers: Record<string, NodeJS.Timeout> = {};

export function getConfig(param: string): GenConfig {
  if (!config[param]) {
    // Инициализация конфигурации по умолчанию для нового param
    config[param] = { min: 0, max: 100, frequency: 1000, running: false };
  }
  return config[param];
}

export function startGenerator(param: string, cb: Callback) {
  stopGenerator(param); // остановим, если уже есть генератор

  // Создадим конфиг, если нет
  if (!config[param]) {
    config[param] = { min: 0, max: 100, frequency: 1000, running: false };
  }
  config[param].running = true;

  timers[param] = setInterval(() => {
    const { min, max } = config[param];
    const value = Math.random() * (max - min) + min;
    const timestamp = new Date().toISOString();

    cb(param, parseFloat(value.toFixed(2)), timestamp);
  }, config[param].frequency);
}

export function stopGenerator(param: string) {
  if (config[param]) {
    config[param].running = false;
  }
  if (timers[param]) {
    clearInterval(timers[param]);
    delete timers[param];
  }
}

export function updateConfig(param: string, min: number, max: number, frequency: number) {
  if (!config[param]) {
    config[param] = { min, max, frequency, running: false };
  } else {
    config[param].min = min;
    config[param].max = max;
    config[param].frequency = frequency;
  }

  // Если генератор запущен, нужно перезапустить его с новыми настройками
  if (config[param].running) {
    startGenerator(param, (p, value, timestamp) => {
      // Обработчик генерации — тут его нужно будет передать снаружи (возможно прокидывать через callback)
    });
  }
}
