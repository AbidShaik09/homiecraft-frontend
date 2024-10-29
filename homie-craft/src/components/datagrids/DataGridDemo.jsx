import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridDemo(params) {
    
  const activeOrderColumns= [
    { field: 'CraftName', headerName: 'Craft Name', width: 120 },
    
    {
      field: 'Qty',
      
      headerName: 'Qty',
      width: 30,
      editable: false,
    },{
      field: 'Status',
      headerName: 'Status',
      width: 150,
      editable: false,
    },
    {
      field: 'Payment',
      headerName: 'Payment',
      width: 85,
      editable: false,
      
    }
    ,{
      field: 'Price',
      headerName: 'Price',
      width: 75,
      editable: false,
    }
    
  ];
    return (
      <Box sx={{ height: 325, width: '100%' }}>
        <DataGrid
        sx={{
            ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel": {
              "margin-top": "1em",
              "margin-bottom": "1em"
            }
          }}
          rows={params.activeOrderRows}
          columns={activeOrderColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 4,
              },
            },columns: {
                columnVisibilityModel: {
                  Payment: false
                },
              },
          }}
          pageSizeOptions={[4,8,16,32,{value:-1,label:"All"}]}
          
          disableRowSelectionOnClick
        />
      </Box>
    );
  }