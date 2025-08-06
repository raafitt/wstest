// stores/ParamStore.ts
import { makeAutoObservable } from "mobx";

type DataPoint = { timestamp: number; value: number };

export class ParamStore {
  param: string
  currentValue = 0;
  history: DataPoint[] = [];
  config = { min: 0, max: 100, frequency: 1000, running: false };

  constructor(param: string) {
    this.param=param
    makeAutoObservable(this);
  }


  updateValue(data: any) {
    if(data.param===this.param){
        this.currentValue = data.value;
        const now = Date.now();
        this.history.push({ timestamp:now, value: data.value });
    }

    // удаление данных старше 10 минут
    const tenMinAgo = Date.now() - 10 *60* 1000;
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

export const param1Store = new ParamStore("param1");
export const param2Store = new ParamStore("param2");
