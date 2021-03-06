import { filter, isUndefined } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Modal,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import { getCategory, showCategory, addCategory, editCategory, deleteCat } from '../reducers/categoryReducer'
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: '' },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
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
  if (array.length > 0) {
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
  return []
}

export default function Category() {
  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);

  const [order, setOrder] = useState('desc');

  const [selected, setSelected] = useState([]);

  const [categoryList, setCategoryList] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [formData, setFormData] = useState({ name: '', id: '' })

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();

  const categories = useSelector(showCategory);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getCategories = async () => {
    dispatch(getCategory())
  }

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!isUndefined(categories)) {
      setCategoryList(categories);
    }
  }, [categories])

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categoryList.map((n) => n.name);
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

  const saveCategory = async (values) => {
    const saveData = await dispatch(addCategory(values))
    setOpen(false)
    toast.success(saveData.data.message);
  }
  const updateCategory = async (values) => {
    const updateData = await dispatch(editCategory(values))
    setOpen(false)
    toast.success(updateData.data.message);
  }
  const deleteCategory = async (values) => {
    const deleteData = await dispatch(deleteCat(values))
    setOpen(false)
    toast.success(deleteData.data.message);
  }
  const dataSet = (row) => {
    setOpen(true)
    setFormData({
      ...formData,
      name: row.name,
      id: row._id
    })
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoryList.length) : 0;

  const filteredUsers = categoryList.length > 0 && applySortFilter(categoryList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Category">
      <ToastContainer />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)} component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Category
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={categoryList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.length > 0 && filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name } = row;
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
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu dataSet={dataSet} row={row} deleteCategory={deleteCategory} />
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={categoryList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: '60%' }}>
          <h2 id="parent-modal-title">Category Form</h2>
          {/* <Box
            sx={{
              maxWidth: '100%',
              marginTop: '20px'
            }}
          >
            <TextField required fullWidth label="Name" id="fullWidth" />
            <Button variant="contained" sx={{ marginTop: '20px', float: 'right' }}>
              Save
            </Button>
          </Box> */}
          {console.log(formData)}
          <Formik
            initialValues={{ name: formData.name, id: formData.id }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Name field is Required';
              }
              return errors;
            }}
            onSubmit={(values) => {
              if (values.id) {
                updateCategory(values)
              } else {
                saveCategory(values)
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}
                style={{
                  maxWidth: '100%',
                  marginTop: '20px'
                }}>
                <TextField fullWidth label="Name" id="fullWidth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  name="name" />
                {errors.name && touched.name && errors.name}
                <Button type="submit" variant="contained" sx={{ marginTop: '20px', float: 'right' }} disabled={isSubmitting}>
                  Save
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Page>
  );
}
