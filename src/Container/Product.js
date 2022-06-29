import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


export default function Product() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [Update, setUpdate] = useState();
    const [dopen, setDopen] = React.useState(false);
    const [did, setDid] = useState()
    const [uid, setUid] = useState()


    const handleClickDopen = (id) => {
        setDopen(true);
        setDid(id);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate()
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate()
        setDopen()
        formik.resetForm();
    };


    let medicine = {
        productname: yup.string().required('please enter productname'),
        productprice: yup.string().required('please enter productprice'),
        productquantity: yup.string().required('please enter productquantity'),
        productexpiry: yup.string().required('please enter productexpiry'),
        producttype: yup.string().required('please enter producttype'),
    }


    let schema = yup.object().shape(medicine);

    const formik = useFormik({
        initialValues: {
            productname: '',
            productprice: '',
            productquantity: '',
            productexpiry: '',
            producttype: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (Update) {
                handleupdate(values)
            } else {
                handleSubmitdata(values)
            }
        }
    })

    const handleupdate = (values) => {
        let localdata = JSON.parse(localStorage.getItem("medicine"));

        let udata = localdata.map((l, i) => {
            if (l.id === uid) {
                return { id: uid, ...values };
            } else {
                return l;
            }
        })
        console.log(udata);

        localStorage.setItem("medicine", JSON.stringify(udata))
        setOpen(false)
        setUpdate(false)
        loadData()
    }

    const handleSubmitdata = (values) => {
        let localdata = JSON.parse(localStorage.getItem("medicine"));

        let data = {
            id: Math.floor(Math.random() * 1000),
            ...values
        }

        if (localdata === null) {
            localStorage.setItem("medicine", JSON.stringify([data]))
        } else {
            localdata.push(data)
            localStorage.setItem("medicine", JSON.stringify(localdata))
        }

        setOpen(false);
        loadData()

    }


    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("medicine"))

        if (localData !== null) {
            setData(localData)
        }
    }

    useEffect(
        () => {
            loadData()
        },
        [])

    const columns = [
        { field: 'id', headerName: 'Id', width: 130 },
        { field: 'productname', headerName: 'Productname', width: 130 },
        { field: 'productprice', headerName: ' Productprice', width: 130 },
        { field: 'productquantity', headerName: 'Productquantity', width: 130 },
        { field: 'productexpiry', headerName: 'Productexpiry', width: 130 },
        { field: 'producttype', headerName: 'Producttype', width: 130 },
        {
            field: 'delete', headerName: 'Delete', width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleClickDopen(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
        {
            field: 'edit', headerName: 'Edit', width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <CreateIcon />
                    </IconButton>
                </>
            )
        }
    ];



    const handleEdit = (params) => {
        setOpen(true);
        //console.log(params.row);
        setUid(params.row.id)
        setUpdate(true)
        console.log(params.row.id)
        formik.setValues({
            productname: params.row.productname,
            productprice: params.row.productprice,
            productquantity: params.row.productquantity,
            productexpiry: params.row.productexpiry,
            producttype: params.row.producttype,
        });
    }

    const handleDelete = () => {
        let localData = JSON.parse(localStorage.getItem("medicine"))

        let filterData = localData.filter((v, i) => v.id !== did);

        localStorage.setItem("medicine", JSON.stringify(filterData));
        loadData()
        setDopen(false)
    }

    return (


        <Box>
            <Container>
                <div>
                    <center>
                        <Button variant="outlined" onClick={() => handleClickOpen()}>
                            product
                        </Button>
                    </center>
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
                        <DialogTitle>Add Medicine</DialogTitle>
                        <Formik values={formik}>
                            <Form onSubmit={formik.handleSubmit}>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="productname"
                                        label="productname"
                                        type="productname"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.productname}
                                        helperText={formik.errors.productname}
                                        error={formik.errors.productprice ? true : false}
                                    />
                                    {
                                        formik.errors.productname && formik.touched.productname ? <p>{formik.errors.productname}</p> : ''
                                    }
                                    <TextField
                                        margin="dense"
                                        id="productprice"
                                        label="productprice"
                                        type="productprice"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.productprice}
                                        helperText={formik.errors.productprice}
                                        error={formik.errors.productprice ? true : false}
                                    />
                                    {
                                        formik.errors.productprice && formik.touched.productprice ? <p>{formik.errors.productprice}</p> : ''
                                    }

                                    <TextField
                                        margin="dense"
                                        id="productquantity"
                                        label="productquantity"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.productquantity}
                                        helperText={formik.errors.productquantity}
                                        error={formik.errors.productquantity ? true : false}

                                    />
                                    {
                                        formik.errors.productquantity && formik.touched.productquantity ? <p>{formik.errors.productquantity}</p> : ''
                                    }
                                    <TextField
                                        margin="dense"
                                        id="productexpiry"
                                        label="productexpiry"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.productexpiry}
                                        helperText={formik.errors.productexpiry}
                                        error={formik.errors.productexpiry ? true : false}

                                    />
                                    {
                                        formik.errors.productexpiry && formik.touched.productexpiry ? <p>{formik.errors.productexpiry}</p> : ''
                                    }
                                    <TextField
                                        margin="dense"
                                        id="producttype"
                                        label="producttype"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.producttype}
                                        helperText={formik.errors.producttype}
                                        error={formik.errors.productexpiry ? true : false}

                                    />
                                    {
                                        formik.errors.producttype && formik.touched.producttype ? <p>{formik.errors.producttype}</p> : ''
                                    }
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">Submit</Button>
                                    </DialogActions>
                                </DialogContent>
                            </Form>
                        </Formik>
                    </Dialog>
                    <div>
                        <Dialog
                            open={dopen}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are You Sure Delete Medicine Data ...? "}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleDelete()} autofocus>yes</Button>
                                <Button onClick={handleClose}>No</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </Container>
        </Box>

    )
}