import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  Autocomplete,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Box,
  List,
  ListItem,
  ListItemText,
  Input,
  Table,
  Avatar,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  TableContainer,
} from '@mui/material';
// components
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Scrollbar from '../components/Scrollbar';
import Page from '../components/Page';
// mock
import USERLIST from '../_mock/user';
import Iconify from '../components/Iconify';
import Label from '../components/Label';
import { UserListHead, UserMoreMenu } from '../sections/@dashboard/sales';
import SearchNotFound from '../components/SearchNotFound';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [value, setValue] = useState(new Date());

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;


  return (
    <Page title="Sales">
      <Container>
        <Grid container spacing={4}>
          <Grid xs={9}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Typography variant="h2" gutterBottom>
                Sales Register
              </Typography>
              <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                Suspended Sales
              </Button>
            </Stack>
            <Grid container sx={{ mb: '55px' }}>
              <Grid xs={2}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Salesman</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={TABLE_HEAD}
                    // onChange={handleChange}
                    label="Salesman"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={2}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-labell"
                    id="demo-simple-select-standard"
                    // value={TABLE_HEAD}
                    // onChange={handleChange}
                    label="category"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={2}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Area</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={TABLE_HEAD}
                    // onChange={handleChange}
                    label="area"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={2}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel id="demo-simple-select-standard-label">Stock Place</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    // value={TABLE_HEAD}
                    // onChange={handleChange}
                    label="stock"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={3}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Sale Date"
                      inputFormat="MM/dd/yyyy"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid xs={1}>
                <Button sx={{ ml: '10px', mt: '3px' }} size="large" variant="contained">Add</Button>
              </Grid>
              {/* <AutoSizer/> */}
              {/* </AutoSizer/> */}
            </Grid>
            <Grid container spacing={1}>
              <Grid xs={11}>
                <Autocomplete
                  id="free-solo-demo"
                  Product
                  options={TABLE_HEAD.map((option) => { console.log(option.label); return option?.label })}
                  renderInput={(params) => <TextField {...params} label="Product" />}
                />
              </Grid>
              <Grid xs={1}>
                <Button sx={{ ml: '10px', mt: '3px' }} size="large" variant="contained">Add</Button>
              </Grid>

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 ,mt:5}}>
                  <Table>
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={USERLIST.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { id, name, role, status, company, avatarUrl, isVerified } = row;
                        const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{company}</TableCell>
                            <TableCell align="left">{role}</TableCell>
                            <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="left">
                              <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Grid>
          </Grid>
          <Grid xs={3} sx={{ mt: '20px' }}>
            <Box sx={{ ml: '20px' }}>
              <Button variant="contained">Suspend Sale</Button>
              <Button variant="contained">Cancel Sale</Button>
            </Box>
            <Box
              sx={{
                mt: '20px',
                ml: '10px',
                backgroundColor: '#2ecc71',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#2ecc71',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <List>
                <ListItem secondaryAction={
                  <Typography>30</Typography>
                }>
                  <ListItemText
                    primary="Products In Cart:"
                  />
                </ListItem>
                <ListItem secondaryAction={
                  <Typography>TK. 30</Typography>
                }>
                  <ListItemText
                    primary="Total:"
                    primaryTypographyProps={{
                      fontSize: 20,
                      fontWeight: 'medium',
                    }}
                  />
                </ListItem>
              </List>
            </Box>
            <Box
              sx={{
                ml: '10px',
                backgroundColor: '#1abc9c',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1abc9c',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <List>
                <ListItem secondaryAction={
                  <Typography>30</Typography>
                }>
                  <ListItemText
                    primary="Amount Due:"
                  />
                </ListItem>
              </List>
            </Box>
            <Box
              sx={{
                ml: '10px',
                backgroundColor: '#16a085',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#16a085',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <List>
                <ListItem secondaryAction={
                  <Typography>30</Typography>
                }>
                  <ListItemText
                    primary="Total Due:"
                  />
                </ListItem>
              </List>
            </Box>
            <Box
              sx={{
                ml: '10px',
                backgroundColor: '#9b59b6',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#9b59b6',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <List>
                <ListItem secondaryAction={
                  <TextField
                    required
                    id="outlined-required"
                    sx={{ background: '#fff', borderRadius: '2px', width: '100px' }}
                  />
                }>
                  <ListItemText
                    primary="Discount(TK.):"
                  />
                </ListItem>
                <ListItem sx={{ mt: '15px' }} secondaryAction={
                  <TextField
                    required
                    id="outlined-required"
                    sx={{ background: '#fff', borderRadius: '2px', width: '100px' }}
                  />
                }>
                  <ListItemText
                    primary="Cash Payment:"
                  />
                </ListItem>
                <ListItem sx={{ mt: '15px' }} secondaryAction={
                  <TextField
                    required
                    id="outlined-required"
                    sx={{ background: '#fff', borderRadius: '2px', width: '100px' }}
                  />
                }>
                  <ListItemText
                    primary="Payment Duration:"
                  />
                </ListItem>
              </List>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '20vh' }}
              >

                <Grid item xs={3}>
                  <Button variant="contained" color="warning">Submit</Button>
                  <Button variant="contained">Submit and Print</Button>
                </Grid></Grid>
            </Box>
          </Grid>
        </Grid>

      </Container>
    </Page >
  );
}
