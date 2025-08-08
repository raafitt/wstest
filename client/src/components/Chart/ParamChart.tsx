import { observer } from "mobx-react-lite";
import { ParamStore } from "../../store/ParamStore";
import Plot from "react-plotly.js";

interface Props {
  store: ParamStore;
}

export const ParamChart = observer(({ store }: Props) => {
  const timestamps = store.history.map((p) => new Date(Number(p.timestamp)));
  const values = store.history.map((p) => p.value);

  return (
    <div style={{ height: "500px" }}>
      <Plot
        data={[{ x: timestamps, y: values, type: "scatter", mode: "lines+markers" }]}
        layout={{margin: { t: 40, b: 40, l: 40, r: 20 } }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});
