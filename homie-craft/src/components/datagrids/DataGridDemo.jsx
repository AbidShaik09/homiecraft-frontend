import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridDemo(params) {
  const activeOrderColumns = [
    { field: 'CraftName', headerName: 'Craft Name', width: 170,
      renderHeader: () => (
        <strong>
          Craft Name
        </strong>
      ),


     },
    { field: 'Qty', headerName: 'Qty', width: 20, editable: false ,
      
      renderCell: (params) => (
      
        params!=undefined &&
        <div style={{display:"flex", justifyContent:"end"}}>
          {params.value}
          
        </div>
      ),

      renderHeader: () => (
      <strong>
        Qty
      </strong>
    ),},
    { field: 'Status', headerName: 'Status', width: 155, editable: false ,
      renderHeader: () => (
        <strong>
          Status
        </strong>
      ),
    },
    { field: 'Payment', headerName: 'Payment', width: 80, editable: false,
      renderHeader: () => (
        <strong>
          Payment
        </strong>
      ),
     },
    { field: 'Price', headerName: 'Price', width: 85, editable: false ,
      renderHeader: () => (
        <strong>
          Price
        </strong>
      ),
      renderCell: (params) => (
      
        params!=undefined &&
        <div style={{display:"flex", justifyContent:"end"}}>
          {params.value}
          
        </div>
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
