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
        let ts=new Date(data.timestamp).getTime()
        this.history.push({ timestamp: ts, value: data.value });
    }
  }

  updateConfig(newConfig: Partial<typeof this.config>) {
    this.config = { ...this.config, ...newConfig };
  }

  reset() {
    this.history = [];
    this.currentValue = 0;
  }
}


