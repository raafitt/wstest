import { makeAutoObservable } from "mobx";
import { ParamStore } from "./ParamStore";

export class StoreManager {
    stores: Map<string, ParamStore> = new Map();
    counter = 1;
    activeParam: string | null = null;
    constructor() {
        makeAutoObservable(this);
        // Инициализируем с двумя параметрами
        this.addStore("param1");
        this.addStore("param2");
    }

    get allStores() {
        return Array.from(this.stores.values());
    }

    getStore(param: string): ParamStore | undefined {
        return this.stores.get(param);
    }

    addStore(param?: string) {
        const newCounter = this.counter++;
        const name = param || `param${newCounter}`;
        if (!this.stores.has(name)) {
            const store = new ParamStore(name);
            this.stores.set(name, store);
        }
    }

    removeStore(param: string) {
        this.stores.delete(param);
        // при удалении активного параметра
        if (this.activeParam === param) {
            this.setActiveParam(null);
        }
    }

    updateParamData(data: { param: string; value: number; timestamp: string }) {
        const store = this.getStore(data.param);
        if (store) {
            store.updateValue(data);
        }
    }
    setActiveParam(param: string | null) {
        this.activeParam = param;
    }
}

export const storeManager = new StoreManager();
