import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ParamStore } from "../store/ParamStore";
import { closeWebSocket, initWebSocket } from "../service/ws";
import { ParamControls } from "../components/ParamControls";
import { ParamTable } from "../components/ParamTable";
import { ParamChart } from "../components/ParamChart";
import styles from "./ParamPage.module.css";

interface Props {
  param: string;
  store: ParamStore;
}

export const ParamPage = observer(({ param, store }: Props) => {
  
  useEffect(() => {
    const socket=initWebSocket((msg) => {
      const { type, value, timestamp } = JSON.parse(msg.data);
      console.log(msg.data)
      if (type === "data") {
        console.log(value)
        store.updateValue(value);
      }
    });
    return ()=>{
      closeWebSocket()
    }
  }, [param]);


  return (
    <div className={styles.dashboard}>

      <div className={styles.topSection}>
        <div className={styles.controlsWrapper}>
          <div className={styles.currentValueBox}>
            <h2>Текущее значение</h2>
            <p>{store.currentValue.toFixed(2)}</p>
          </div>
          <ParamControls 
            store={store} 
            param={param}/>    
        </div>
        <div className={styles.tableWrapper}>
          <ParamTable store={store} />
        </div>
      </div>


      <div className={styles.chartWrapper}>
        <ParamChart store={store} />
      </div>
    </div>
  );
});
