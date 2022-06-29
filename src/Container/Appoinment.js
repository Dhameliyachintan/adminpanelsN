import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { DialogContentText } from '@mui/material';


function Appoinment(props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState();
    const [Dopen, setDopen] = useState()
    const [did, setDid] = useState()
    const [uid, setUid] = useState()

    const handleClickopens = (id) => {
        setDopen(true);
        setDid(id);
    };

    const handleClickOpen = (id) => {
        setOpen(true);
        setUpdate()
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate()
        setDopen()
    };


    let schema = yup.object().shape({
        name: yup.string().required('please enter name'),
        price: yup.string().required('please enter price'),
        salary: yup.string().required('please enter salary'),
        degree: yup.string().required('please enter degree name'),
        address: yup.string().required('please enter address'),
    });
    

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            salary: '',
            degree: '',
            address: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleupdate(values)
            } else {
                handleSubmit(values)
            }
        },
    });

    const columns = [
        { field: 'id', headerName: 'id', width: 70 },
        { field: 'name', headerName: 'Name', width: 70 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'salary', headerName: 'Salary', width: 130 },
        { field: 'degree', headerName: 'Degree', width: 130 },
        { field: 'address', headerName: 'Address', width: 130 },
        {
            field: 'delete', headerName: 'Delete', width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleClickopens(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
        {
            field: 'Edit', headerName: 'Edit', width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        },
    ];




    const handleEdit = (params) => {
        setOpen(true);
        // console.log(params.row.id)
        setUid(params.row.id)
        setUpdate(true)
        formik.setValues({
            name: params.row.name,
            price: params.row.price,
            salary: params.row.salary,
            degree: params.row.degree,
            address: params.row.address,
        })

    }

    const handleupdate = (values) => {
        let localData = JSON.parse(localStorage.getItem("Appoinment"))
        // console.log(localData);
        let udata = localData.map((l, i) => {
            if (l.id === uid) {
                return { id: uid, ...values }
            } else {
                return l
            }
        })
        console.log(udata);

        localStorage.setItem("Appoinment", JSON.stringify(udata))
        setUpdate(false)
        setOpen(false)
        getData()
    }



    const handleDelete = () => {
        const localData = JSON.parse(localStorage.getItem("Appoinment"))
        // console.log(localData);
        let filterData = localData.filter((v, i) => v.id !== did)
        // console.log(filterData);
        localStorage.setItem("Appoinment", JSON.stringify(filterData))
        getData()
        setDopen(false);
    }


    const handleSubmit = (values) => {
        const localData = JSON.parse(localStorage.getItem("Appoinment"))
        console.log(localData);

        const data = {
            id: Math.floor(Math.random() * 1000),
            ...values
        }

        if (localData == null) {
            localStorage.setItem("Appoinment", JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem("Appoinment", JSON.stringify(localData))
        }

        setOpen(false)
        getData()
        console.log(values)
    }


    const getData = () => {
        let localData = JSON.parse(localStorage.getItem("Appoinment"))

        if (localData !== null) {
            setData(localData)
        }
    }

    useEffect(
        () => {
            getData()
        },
        [])

    console.log(formik.errors)
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
            Appoinment
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Doctor data</DialogTitle>
                <Formik values={formik}>
                    <Form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <TextField
                                        margin="dense"
                                        id="name"
                                        label="name"
                                        type="name"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        helperText={formik.errors.name}
                                        error={formik.errors.name ? true : false}
                                        onBlur={formik.handleBlur}
                                    />

                                    {
                                        formik.errors.name && formik.touched.name ? <p>{formik.errors.name}</p> : ''
                                    }

                                    <TextField
                                        margin="dense"
                                        id="price"
                                        label="price"
                                        type="price"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        helperText={formik.errors.price}
                                        error={formik.errors.price ? true : false}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.errors.price && formik.touched.price ? <p>{formik.errors.price}</p> : ''
                                    }

                                    <TextField
                                        margin="dense"
                                        id="salary"
                                        label="salary"
                                        type="salary"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.salary}
                                        helperText={formik.errors.salary}
                                        error={formik.errors.salary ? true : false}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.errors.salary && formik.touched.salary ? <p>{formik.errors.salary}</p> : ''
                                    }
                                    <TextField
                                        margin="dense"
                                        id="degree"
                                        label="degree"
                                        type="degree"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.degree}
                                        helperText={formik.errors.degree}
                                        error={formik.errors.degree ? true : false}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.errors.degree && formik.touched.degree ? <p>{formik.errors.degree}</p> : ''
                                    }
                                    <TextField
                                        margin="dense"
                                        id="address"
                                        label="address"
                                        type="address"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.address}
                                        helperText={formik.errors.address}
                                        error={formik.errors.address ? true : false}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.errors.address && formik.touched.address ? <p>{formik.errors.address}</p> : ''
                                    }
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="Submit">Submit</Button>
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>

            <Dialog
                open={Dopen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDelete()} autoFocus>
                        yes
                    </Button>
                    <Button onClick={handleClose}>No</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Appoinment;


