import React from "react";
import DownloadIcon from "../Images/downloadIcon.png";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "documentName", headerName: "Name", width: 130 },
  {
    field: "downloadDocument",
    headerName: "Action",
    headerAlign: "right",
    description: "Download your document.",
    sortable: false,
    width: 160,
    align: "right",
    renderCell: (params) => (
      <img
        style={{ height: "30px" }}
        src={DownloadIcon}
        alt="Download"
        onClick={() => {}}
      />
    ),
  },
];

const rows = [
  { id: 1, documentName: "Snow" },
  { id: 2, documentName: "Lannister" },
  { id: 3, documentName: "Lannister" },
  { id: 4, documentName: "Stark" },
  { id: 5, documentName: "Targaryen" },
  { id: 6, documentName: "Melisandre" },
  { id: 7, documentName: "Clifford" },
  { id: 8, documentName: "Frances" },
  { id: 9, documentName: "Roxie" },
];

export default function DocumentManagement() {
  return (
    <div className="card-document-container">
      <div className="card">
        <h5 className="card-header header-format">Document</h5>
        <div className="card-body">
          <span className="form-label">Download your notes</span>
          <DataGrid
            columnVisibilityModel={{
              id: false,
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
