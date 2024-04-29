import {
  Add,
  Edit,
  Margin,
  Padding,
  RemoveRedEye,
} from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputTextField from "../InputTextField/InputTextField";
import { Pagination } from "./Pagination";
import { replace } from "../../app/HelperFunction";

const TableList = ({
  data,
  meta,
  totalItems,
  setApiParam,
  buttonLabel,
  onEdit,
  onAdd,
  editButtonShow,
  handleView,
  showAdd,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [filteredData, setFilteredData] = useState(data);
  console.log(totalItems,"totalItems")

  useEffect(() => {
    setApiParam({
      pageNo: page + 1,
      pageSize: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (value) => {
    setSearch(value);
    const filtered = data.filter((item) =>
      item.productName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Card>
      <Grid container sx={{ p: 2 }} spacing={2}>
        <Grid item sm={4}>
          {showAdd && (
            <Button
              variant="text"
              onClick={onAdd}
              className="text-button"
              sx={{ mx: "auto", borderRadius: "20px" }}
            >
              <Add /> {buttonLabel}
            </Button>
          )}
        </Grid>
        <Grid item sm={4}></Grid>
        <Grid item sm={4}>
          <InputTextField
            label="Search"
            value={search}
            onChange={handleSearch}
          />
        </Grid>
      </Grid>
      <Table
        sx={{
          minWidth: 650,
          "& .MuiTableBody-root .MuiTableRow-root:hover": {
            color: "#0171a3",
            borderLeft: "3px solid",
          },
        }}
        aria-label="simple table"
        className="tablePadding"
      >
        <TableHead>
          <TableRow>
            {meta?.thead?.map((head) => (
              <TableCell key={head.label}>{head.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData?.map((row) => (
            <TableRow key={row.id} onClick={() => handleView(row.id)}>
              {meta?.tbody?.map((col) => (
                <TableCell key={col.key}>
                  {col.key !== "thumbnailPath" ? (
                    col.key === "actionButoon" ? (
                      <>
                        {col?.button?.icon === "Edit" && (
                          <Button
                            variant={col?.button?.variant}
                            color={col?.button?.color}
                            onClick={() => onEdit(row)}
                          >
                            <Edit />
                          </Button>
                        )}
                        {col?.button?.icon !== "Edit" && (
                          <Button
                            variant={col?.button?.variant}
                            color={col?.button?.color}
                            onClick={() => handleView(row)}
                          >
                            <RemoveRedEye />
                          </Button>
                        )}
                        {editButtonShow && (
                          <Button
                            variant={col?.button?.variant}
                            color={col?.button?.color}
                            onClick={() => onEdit(row)}
                          >
                            <Edit />
                          </Button>
                        )}
                      </>
                    ) : col?.replace ? (
                      replace(row[col?.key], ",@,", " ")
                    ) : (
                      row[col?.key]
                    )
                  ) : (
                    <TableCell>
                      <img src={row[col?.key]} style={{ height: "50px", marginLeft:"-15px"}} />
                    </TableCell>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredData?.length > 0 ? (
        <Pagination
          totalItems={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : (
        <div style={{ width: "100%", textAlign: "center" }}>
          No Records Available
        </div>
      )}
    </Card>
  );
};

export default TableList;
