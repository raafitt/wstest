import { observer } from "mobx-react-lite";
import { ParamStore } from "../store/ParamStore";
import { sendMessage } from "../service/ws";

interface Props {
  param: string;
  store: ParamStore;
}

export const ParamControls = observer(({ param,store }: Props) => {
  const { min, max, frequency, running } = store.config;

  const handleChange = (field: string, value: number) => {
    store.updateConfig({ [field]: value });
  };



  return (
    <div className="p-4 space-y-2">
      <label>
        Min:
        <input type="number" value={min} onChange={(e) => handleChange("min", +e.target.value)} />
      </label>
      <label>
        Max:
        <input type="number" value={max} onChange={(e) => handleChange("max", +e.target.value)} />
      </label>
      <label>
        Frequency (ms):
        <input type="number" value={frequency} onChange={(e) => handleChange("frequency", +e.target.value)} />
      </label>

      <div className="space-x-2">
        <button onClick={() => { store.reset(); store.updateConfig({ running: true }); sendMessage({ type: "start", param: param, ...store.config }); }}>
          {running ? "Restart" : "Start"}
        </button>
        <button onClick={() => { store.updateConfig({ running: false }); sendMessage({ type: "stop", param: param, ...store.config }); }}>
          Stop
        </button>
      </div>
    </div>
  );
});
