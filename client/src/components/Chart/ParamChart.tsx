import { observer } from "mobx-react-lite";
import { ParamStore } from "../../store/ParamStore";
import Plot from "react-plotly.js";


interface Props {
  store: ParamStore;
}

export const ParamChart = observer(({ store }: Props) => {

  //Удаление старых данных
  let data = store.history.filter(row => {
    let now = Date.now()
    const tenMinAgo = now - 10 * 60 * 1000;//10 минут
    return row.timestamp > tenMinAgo
  })

  const timestamps = data.map((p) => new Date(Number(p.timestamp)));
  const values = data.map((p) => p.value);



  return (
    <div style={{ height: "350px" }}>
      <Plot
        data={[
          {
            x: timestamps,
            y: values,
            type: "scatter",
            mode: "lines",
            line: { shape: "spline", smoothing: 1.3 },
          },
        ]}
        layout={{
          margin: { t: 40, b: 40, l: 40, r: 40 },
          yaxis: {
            range: [store.config.min, store.config.max],
            title: { text: "Value" },
          },
          xaxis: {
            title: { text: "Time" },
          },
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
});