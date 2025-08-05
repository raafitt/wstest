"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = getConfig;
exports.startGenerator = startGenerator;
exports.stopGenerator = stopGenerator;
exports.updateConfig = updateConfig;
const config = {
    param1: { min: 0, max: 100, frequency: 1000, running: false },
    param2: { min: 0, max: 100, frequency: 1000, running: false },
};
const timers = {};
function getConfig(param) {
    return config[param];
}
function startGenerator(param, cb) {
    stopGenerator(param);
    config[param].running = true;
    timers[param] = setInterval(() => {
        const { min, max } = config[param];
        const value = Math.random() * (max - min) + min;
        const timestamp = new Date().toISOString();
        cb(param, parseFloat(value.toFixed(2)), timestamp);
    }, config[param].frequency);
}
function stopGenerator(param) {
    config[param].running = false;
    if (timers[param]) {
        clearInterval(timers[param]);
        delete timers[param];
    }
}
function updateConfig(param, min, max, frequency) {
    config[param].min = min;
    config[param].max = max;
    config[param].frequency = frequency;
}
//# sourceMappingURL=generatorManager.js.map