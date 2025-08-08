import { observer } from "mobx-react-lite";
import { AgGridReact } from "ag-grid-react";
import { ParamStore } from "../../store/ParamStore";
import { useEffect, useMemo, useRef } from "react";
import { ModuleRegistry, AllCommunityModule, GridApi, ColDef, themeQuartz } from 'ag-grid-community';


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface Props {
  store: ParamStore;
}

interface RowData {
  time: string;
  value: string;
}
ModuleRegistry.registerModules([AllCommunityModule]);
export const ParamTable = observer(({ store }: Props) => {
  const gridApiRef = useRef<GridApi<RowData> | null>(null);

  const columnDefs = useMemo<ColDef<RowData>[]>(() => [
    { headerName: "Time", field: "time", sortable: true, filter: true },
    { headerName: "Value", field: "value", sortable: true, filter: true }
  ], []);

  // Инициализация только один раз
  const initialData = useMemo<RowData[]>(() =>
    store.history.map(dp => ({
      time: new Date(dp.timestamp).toLocaleTimeString(),
      value: dp.value.toFixed(2),
    }))
    , [store]);

  // При добавлении новых данных — обновляем таблицу без перерендера
  useEffect(() => {
    if (gridApiRef.current && store.history.length > 0) {
      const lastPoint = store.history[store.history.length - 1];
      const rowCount = gridApiRef.current.getDisplayedRowCount()
      gridApiRef.current.applyTransaction({
        add: [{
          time: new Date(lastPoint.timestamp).toLocaleTimeString(),
          value: lastPoint.value.toFixed(2),
        }],
        addIndex: rowCount
      });
      gridApiRef.current.ensureIndexVisible(rowCount, "bottom");
    }
  }, [store.history.length]); // следим только за изменением длины

  const myTheme = themeQuartz.withParams({
    fontSize: 35,
    headerFontSize: 10,
  });

  const theme = useMemo(() => { return myTheme; }, []);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact<RowData>
          columnDefs={columnDefs}
          rowData={initialData}
          theme={theme}
          loadThemeGoogleFonts={true}
          defaultColDef={{ flex: 1, minWidth: 100, resizable: true }}
          onGridReady={params => {
            gridApiRef.current = params.api;
          }}
        />
      </div>
    </div>
  );
});

