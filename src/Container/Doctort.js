import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from "formik";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function Doctort(props) {
    const [open, setOpen] = React.useState(false);
  const [data, setdata] = React.useState([]);
  const [dopen, setDOpen] = React.useState(false)
  const [did, setdid] = React.useState()
  const [uid, setuid] =React.useState();
  const [update, setupdate] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
  };

  const handleClickDOpen = (id) => {
    console.log(id);
    setdid(id);
    setDOpen(true)
  }

  

  const HandleSubmitData = (values) => {
    let LocalData = JSON.parse(localStorage.getItem("Doctors"))
    let data = {
      id: Math.floor(Math.random() * 1000),
      ...values
    }

    if (LocalData === null) {
      localStorage.setItem("Doctors", JSON.stringify([data]))
    } else {
      LocalData.push(data)
      localStorage.setItem("Doctors", JSON.stringify(LocalData))
    }

    loadData();
    setOpen(false);
  }

  let schema = yup.object().shape({
    name: yup.string().required("Please enter your Name"),
    age: yup.number().required("Please enter your Age").positive().integer(),
    email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    speciality: yup.string().required("Please enter your speciality"),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: '',
      speciality: '',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      HandleSubmitData(values)
      resetForm();
    },
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  let TableData = JSON.parse(localStorage.getItem("Doctors"));

  const handleDelete = () => {
    const LocalData = JSON.parse(localStorage.getItem("Doctors"));
    let filterData = LocalData.filter((v, i) => v.id !== did)
    localStorage.setItem("Doctors", JSON.stringify(filterData));
    loadData();
    handleClose();
    setdid();
  };

  const loadData = () => {
    const LocalData = JSON.parse(localStorage.getItem("Doctors"))

    if (LocalData === null) {
      setdata(LocalData);
    }

    console.log(LocalData);
  }

  React.useEffect(
    () => {
      loadData()
    },
    []
  )

  const handleEdit = (TableData) => {
    console.log(TableData);
    setOpen(true);
    formik.setValues({
      name: TableData.name,
      age: TableData.age
    })

    setupdate(true);
    setuid(TableData.id);
    console.log(uid + "setuid");
  }
    return (
        <div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>ID</StyledTableCell>
                <StyledTableCell align='center'>Name</StyledTableCell>
                <StyledTableCell align="center">Age</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Speciality</StyledTableCell>
                <StyledTableCell align="center">Delete</StyledTableCell>
                <StyledTableCell align="center">Edit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {TableData.map((d, i) => {
                return ( 
                  
                  <StyledTableRow key={d.id}>
                    <StyledTableCell align="center">{d.id}</StyledTableCell>
                    <StyledTableCell component="th" align='center' scope="row">
                      {d.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">{d.age}</StyledTableCell>
                    <StyledTableCell align="center">{d.email}</StyledTableCell>
                    <StyledTableCell align="center">{d.speciality}</StyledTableCell>
                    <StyledTableCell align="center">{
                        <IconButton aria-label="delete" onClick={() => handleClickDOpen(d.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }</StyledTableCell>
                    <StyledTableCell align="center">{
                        <IconButton aria-label="edit" onClick={() => handleEdit(d)}>
                        <EditIcon />
                      </IconButton>
                    }</StyledTableCell>
                  </StyledTableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="outlined" className='medicine_button mt-2' onClick={handleClickOpen}>
          Add Doctor's Data
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Doctor's Data</DialogTitle>
          <Formik value={formik}>
            <Form onSubmit={formik.handleSubmit}>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name='name'
                  label="Name"
                  fullWidth
                  variant="standard"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  helperText={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                error={formik.errors.name && formik.touched.name ? true : false}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="age"
                  name='age'
                  label="Age"
                  fullWidth
                  variant="standard"
                  onChange={formik.handleChange}
                  value={formik.values.age}
                  helperText={formik.errors.age && formik.touched.age ? formik.errors.age : null}
                error={formik.errors.age && formik.touched.age ? true : false}
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  name='email'
                  label="Email"
                  fullWidth
                  variant="standard"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                error={formik.errors.email && formik.touched.email ? true : false}
                />
                <TextField

                  autoFocus
                  margin="dense"
                  id="speciality"
                  name='speciality'
                  label="Speciality"
                  fullWidth
                  variant="standard"
                  onChange={formik.handleChange}
                  value={formik.values.speciality}
                  helperText={formik.errors.speciality && formik.touched.speciality ? formik.errors.speciality : null}
                  error={formik.errors.speciality && formik.touched.speciality ? true : false}
                />
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>Submit</Button>
                </DialogActions>
              </DialogContent>
            </Form>
          </Formik>
        </Dialog>
        <Dialog
        open={dopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure want delete ?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
    );
}

export default Doctort;