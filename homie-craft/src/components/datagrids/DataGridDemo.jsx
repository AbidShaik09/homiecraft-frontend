import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridDemo(params) {
  const activeOrderColumns = [
    { field: 'CraftName', headerName: 'Craft Name', width: 200,
      renderHeader: () => (
        <strong>
          Craft Name
        </strong>
      ),


     },
    { field: 'Qty', headerName: 'Qty', width: 30, editable: false ,renderHeader: () => (
      <strong>
        Qty
      </strong>
    ),},
    { field: 'Status', headerName: 'Status', width: 150, editable: false ,
      renderHeader: () => (
        <strong>
          Status
        </strong>
      ),
    },
    { field: 'Payment', headerName: 'Payment', width: 85, editable: false,
      renderHeader: () => (
        <strong>
          Payment
        </strong>
      ),
     },
    { field: 'Price', headerName: 'Price', width: 75, editable: false ,
      renderHeader: () => (
        <strong>
          Price
        </strong>
      ),
     },
  ];

  return (
    <Box sx={{ height: 327, width: '100%' }}>
      <DataGrid
        sx={{
          ".MuiDataGrid-columnHeaders": {
            fontWeight: 'bold',
          },
          ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
            marginTop: "1em",
            marginBottom: "1em",
          },
        }}
        rows={params.activeOrderRows}
        columns={activeOrderColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 4,
            },
          },
          columns: {
            columnVisibilityModel: {
              Payment: false,
            },
          },
        }}
        pageSizeOptions={[4, 8, 16, 32, { value: -1, label: "All" }]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
