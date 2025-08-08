import { observer } from "mobx-react-lite";
import { ParamStore } from "../../store/ParamStore";
import { sendMessage } from "../../service/ws";
import styles from "./ParamControl.module.css"
interface Props {
  param: string;
  store: ParamStore;
}

export const ParamControls = observer(({ param, store }: Props) => {
  const { min, max, frequency, running } = store.config;

  const handleChange = (field: string, value: number) => {
    store.updateConfig({ [field]: value });
  };

  const sendStart = () => {
    store.reset();
    store.updateConfig({ running: true });
    sendMessage({ type: "start", param, ...store.config });
  };

  const sendStop = () => {
    store.updateConfig({ running: false });
    sendMessage({ type: "stop", param, ...store.config });
  };

  return (
    <div className={styles.container}>
      <div className={styles.currentValueRow}>
        <div className={styles.currentValueLabel}>Текущее значение</div>
        <div className={styles.currentValueBox}>{store.currentValue.toFixed(2)}</div>
      </div>

      <div className={styles.rowInputs}>
        <label className={styles.inputGroup}>
          Min:
          <input
            type="number"
            value={min}
            onChange={e => handleChange("min", +e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.inputGroup}>
          Max:
          <input
            type="number"
            value={max}
            onChange={e => handleChange("max", +e.target.value)}
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.frequencyWrapper}>
        <label className={styles.inputGroup}>
          Frequency (ms):
          <input
            type="number"
            value={frequency}
            onChange={e => handleChange("frequency", +e.target.value)}
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.buttonsRow}>
        <button
          onClick={sendStart}
          className={`${styles.button} ${running ? styles.restartButton : styles.startButton}`}
        >
          {running ? "Restart" : "Start"}
        </button>
        <button
          onClick={sendStop}
          className={`${styles.button} ${styles.stopButton}`}
        >
          Stop
        </button>
      </div>
    </div>
  );
});
