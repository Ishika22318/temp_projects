import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'whiteSmoke',
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(grade, rating, colorCodeBorder, colorCodeFill) {
  return { grade, rating, colorCodeBorder, colorCodeFill };
}

const rows = [
  createData('Always Outstanding', '4.1-5', '#D9DAE4', 'white'),
  createData('Mostly Outstanding', '3.1-4', '#D9DAE4', 'white'),
  createData('Always Target', '2.1-3', '#E8B321', '#F7E6B5'),
  createData('Mostly Target', '1.6-2',  '#E93820' ,'#F9DCDF'),
  createData('Threshold', '1-1.5',  '#E93820', '#F9DCDF' ),
];

export default function RatingsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow sx={{ border: '2px solid lightGrey' }}>
            <StyledTableCell>Grade</StyledTableCell>
            <StyledTableCell align='center'>Rating</StyledTableCell>
            <StyledTableCell align='left'>Color Code</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <StyledTableCell align='left'>{row.grade}</StyledTableCell>
              <StyledTableCell align='center'>{row.rating}</StyledTableCell>
              <StyledTableCell align='center'>
                <div
                  style={{
                    border: `1px solid ${row.colorCodeBorder}`,
                    backgroundColor: `${row.colorCodeFill}`,
                    height: '20px',
                    width: '80%',
                  }}
                ></div>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
