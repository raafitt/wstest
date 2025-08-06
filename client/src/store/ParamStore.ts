// stores/ParamStore.ts
import { makeAutoObservable } from "mobx";

type DataPoint = { timestamp: number; value: number };

export class ParamStore {
  currentValue = 0;
  history: DataPoint[] = [];
  config = { min: 0, max: 100, frequency: 1000, running: false };

  constructor() {
    makeAutoObservable(this);
  }


  updateValue(value: number) {
    this.currentValue = value;
    const now = Date.now();
    this.history.push({ timestamp:now, value });

    // удаление данных старше 10 минут
    const tenMinAgo = now - 10 * 1000;
    this.history = this.history.filter((d) => d.timestamp >= tenMinAgo);
  }

  updateConfig(newConfig: Partial<typeof this.config>) {
    this.config = { ...this.config, ...newConfig };
  }

  reset() {
    this.history = [];
    this.currentValue = 0;
  }
}
