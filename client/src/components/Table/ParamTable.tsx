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
  timestamp: number
}
ModuleRegistry.registerModules([AllCommunityModule]);

export const ParamTable = observer(({ store }: Props) => {
  const gridApiRef = useRef<GridApi<RowData> | null>(null);

  const cellStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    fontSize: '25px'
  }

  const columnDefs = useMemo<ColDef<RowData>[]>(() => [
    {
      headerName: "Time", field: "time", sortable: true, filter: true, cellStyle: cellStyle
    },
    {
      headerName: "Value", field: "value", sortable: true, filter: true, cellStyle: cellStyle
    }
  ], []);

  // Инициализация в зависимомти от store
  const initialData = useMemo<RowData[]>(() =>
    store.history.map(dp => ({
      time: new Date(dp.timestamp).toLocaleTimeString(),
      value: dp.value.toFixed(2),
      timestamp: dp.timestamp
    }))
    , [store.history]);

  // Обновление таблицы без перерендера
  useEffect(() => {
    if (!gridApiRef.current || store.history.length === 0) return;

    const now = Date.now();
    const tenMinAgo = now - 10 * 60 * 1000;//10 минут

    // Удаление старых строк
    const rowsToRemove: RowData[] = [];
    gridApiRef.current.forEachNode((node) => {
      if (node.data != undefined) {
        if (node.data.timestamp < tenMinAgo) {
          rowsToRemove.push(node.data);
        }
      }
    });

    // Добавление новой строки (если она ещё не в таблице)
    const lastPoint = store.history[store.history.length - 1];
    const rowCount = gridApiRef.current.getDisplayedRowCount();

    const newRow: RowData = {
      timestamp: lastPoint.timestamp,
      time: new Date(lastPoint.timestamp).toLocaleTimeString(),
      value: lastPoint.value.toFixed(2),
    };

    const tx: any = {};
    if (rowsToRemove.length > 0) tx.remove = rowsToRemove;
    tx.add = [newRow];
    tx.addIndex = rowCount;

    gridApiRef.current.applyTransaction(tx);
    gridApiRef.current.ensureIndexVisible(gridApiRef.current.getDisplayedRowCount() - 1, "bottom");

  }, [store.history.length]);

  const myTheme = themeQuartz.withParams({
    fontSize: 35,
    headerFontSize: 20,
  });

  const theme = useMemo(() => { return myTheme; }, []);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact<RowData>
          headerHeight={40}
          rowHeight={40}
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

