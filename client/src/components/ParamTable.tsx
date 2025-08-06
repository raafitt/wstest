import { observer } from "mobx-react-lite";
import { ParamStore } from "../store/ParamStore";

interface Props {
  store: ParamStore;
}

export const ParamTable = observer(({ store }: Props) => (
  <table className="border w-full text-sm">
    <thead>
      <tr>
        <th className="border px-2">Time</th>
        <th className="border px-2">Value</th>
      </tr>
    </thead>
    <tbody>
      {[...store.history].reverse().map((dp, i) => (
        <tr key={i}>
          <td className="border px-2">{new Date(Number(dp.timestamp)).toLocaleTimeString()}</td>
          <td className="border px-2">{dp.value.toFixed(2)}</td>
        </tr>
      ))}
    </tbody>
  </table>
));
