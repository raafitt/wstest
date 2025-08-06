// store/storeManager.ts
import { ParamStore } from "./ParamStore";

const storeMap = new Map<string, ParamStore>();

export function getStoreForParam(param: string): ParamStore {
  if (!storeMap.has(param)) {
    storeMap.set(param, new ParamStore(param));
  }
  return storeMap.get(param)!;
}
