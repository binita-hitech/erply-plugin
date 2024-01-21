import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TablePagination, IconButton } from "@mui/material";
import { Download, KeyboardArrowDown, KeyboardArrowUp, UnfoldMore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976d2",
    color: "#ffffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    width: "180px",
  },
  "& svg": {
    position: "relative",
    top: "5px"
  },
  '&:last-child': {
    // paddingRight: 64,
    '& svg': {
      // display: 'none',
      // color: theme.palette.primary.dark
    },
  },
}));


export default function TableComponent1(props) {

  //console.log("prrpss", props);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [editedRow, setEditedRow] = React.useState(null)
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const state = {
    clientCode: props.clientCode,
    sessionKey: props.sessionKey,
    warehouse: props.warehouse,
  };

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#ffffff",
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#f5f5f5",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {props.columns.map((col, index) =>
                  props.sort ?
                    index === 0 ?
                      <StyledTableCell onClick={() => props.handleSort(col.id)}>
                        {props.currentColumn === col.id ? <span style={{ fontWeight: "700" }}>{col.name}</span> : col.name}
                        {props.currentColumn === col.id ? props.direction === "asc" ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" /> : <UnfoldMore fontSize="small" />}
                      </StyledTableCell>
                      :
                      <StyledTableCell align="left" onClick={() => props.handleSort(col.id)}>
                        {props.currentColumn === col.id ? <span style={{ fontWeight: "700" }}>{col.name}</span> : col.name}
                        {props.currentColumn === col.id ? props.direction === "asc" ? <KeyboardArrowUp fontSize="small" /> : <KeyboardArrowDown fontSize="small" /> : <UnfoldMore fontSize="small" />}
                      </StyledTableCell>
                    :
                    index === 0 ?
                      <StyledTableCell>
                        {col.name}
                      </StyledTableCell>
                      :
                      <StyledTableCell align="left">
                        {col.name}
                      </StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows.length > 0 ? (
                props.rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                  
                    return (
                      <StyledTableRow
                        key={Math.random()}

                      >
                        {props.columns.map((col, index) => (
                          <React.Fragment key={index}>
                            {col.id === "image" && index === 0 ? (
                              <StyledTableCell component="th" scope="row">
                                <img
                                  src={row.image}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                  }}
                                  alt={row.firstname}
                                />
                              </StyledTableCell>
                            ) : col.id === "image" ? (
                              <StyledTableCell align="left">
                                <img
                                  src={row.image}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                  }}
                                  alt={row.firstname}
                                />
                              </StyledTableCell>
                            ) : index === 0 ? (
                              <StyledTableCell component="th" scope="row">
                                {row[col.id]}
                              </StyledTableCell>
                            ) : (
                              <StyledTableCell align="left" sx={{ width: "120px" }}>
                                {col.id === "clientName" ||
                                  col.id === "description" ||
                                  col.id === "shortDescription" ||
                                  col.id === "text"
                                  ? (row[col.id]
                                    .substring(0, 25)
                                    .concat(row[col.id].length > 25 ? "..." : " ")
                                    .replaceAll(/<[^>]+>/g, ""))
                                  : col.id === "amount" ? (
                                    <div>
                                      {parseInt(row?.quantity || row?.amount)}
                                    </div>
                                  ) : col.id === "actions" ? (
                                    <>
                                      <Link to={`/purchaseorderdetail/${row.id}`} state={state}>
                                        <Button color="primary" variant="contained">
                                          Receive PO
                                        </Button>
                                      </Link>
                                    </>
                                  ) : col.id === "total" ||
                                    col.id === "costTotal" ||
                                    col.id === "totalWithGst" ||
                                    col.id === "price" ? (
                                    <span>{"$" + row[col.id]}</span>
                                  ) : col.id === "date" ? (
                                    <span>
                                      {moment(row[col.id]).format(
                                        "ddd, MMM Do YYYY, h:mm:ss a"
                                      )}
                                    </span>
                                  ) : col.id === "poLink" ? (
                                    <IconButton
                                      href={row[col.id]}
                                      download
                                      target="_blank"
                                    >
                                      <Download color="primary" fontSize="medium" />
                                    </IconButton>
                                  ) : (
                                    <span>{row[col.id]}</span>
                                  )}
                              </StyledTableCell>
                            )}
                          </React.Fragment>
                        ))}
                      </StyledTableRow>
                    );
                  })
              ) : (
                <TableRow sx={{ position: "relative", height: "50px" }}>
                  <StyledTableCell sx={{ position: "absolute", right: "35%", minWidth: "400px", borderBottom: "none" }}>
                    No Purchase Order Found
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>

          </Table>

        </TableContainer>
        {props.footer !== false && (
          <TablePagination
            rowsPerPageOptions={[20, 50, 100]}
            component="div"
            count={props.rows.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}

      </Paper>

    </div>
  );
}
