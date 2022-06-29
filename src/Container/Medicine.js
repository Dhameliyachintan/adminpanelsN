import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';


export default function Medicine() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [data, setData] = useState([]);
  const [dopen, setDopen] = React.useState(false)
  const [did, setDid] = useState();
  const [update, setUpdate] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setDopen(false);
    setOpen(false);
  };

  const handleClickDopen = (id) => {
    setDopen(true);
    setDid(id);
  };

  const handleSubmit = () => {
    // console.log(name, price, quantity, expiry);
    let data = {
      id: Math.floor(Math.random() * 1000),
      name,
      price,
      quantity,
      expiry
    }

    const handleupdate = (value) => {
      let localdata = JSON.parse(localStorage.getItem("medicine"));
      
      let udata = localdata.map((l, i)=> {
        if (l.id === value) {
            return value;
        } else {
          return l;
        }
        
      })
      
      localStorage.setItem("medicine", JSON.stringify(udata))
      setOpen(false)
      setUpdate()
      getdata()
    } 

    // console.log(data);
    let localdata = JSON.parse(localStorage.getItem("medicine"));

    if (localdata === null) {
      localStorage.setItem("medicine", JSON.stringify([data]))
    } else {
      localdata.push(data)
      localStorage.setItem("medicine", JSON.stringify(localdata))
    }


    setOpen(false);
    // setName();
    // setPrice();
    // setQuantity();
    // setExpiry();
    getdata()

  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'price', headerName: 'Pricee', width: 130 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'expiry', headerName: 'Expiry', width: 130 },
    { field: 'delete', headerName: 'Delete', width: 130,
    renderCell: (params) => (
      <>
      <IconButton aria-label="delete" onClick={() => handleClickDopen(params.row.id)}>
        <DeleteIcon />
      </IconButton>
      </>
    )
  },
  { field: 'edit', headerName: 'Edit', width: 130,
    renderCell: (params) => (
      <>
      <IconButton aria-label="delete" onClick={() => handleEdit(params.row.id)}>
        <CreateIcon />
      </IconButton>
      </>
    )
  }
  ];

  const handleEdit  = (data) => {
    setOpen(true);
    setUpdate(data);
   data.setValues(data);  
  }

  const handleDelete = () => {
    let localData = JSON.parse(localStorage.getItem("medicine"))

    let filterData = localData.filter((v, i) => v.id !== did );

    localStorage.setItem("medicine", JSON.stringify(filterData));
    getdata()
    
    setDopen(false)
  }

  const getdata = () => {
    let localdata = JSON.parse(localStorage.getItem("medicine"));

    if (localdata !== null) {
      setData(localdata)
    }
  }

  useEffect(
    () => {
      getdata()
    },
    [])

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Medicine1
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
        <DialogTitle>Add Medicine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name='name'
            label="Medicine name"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}     
          />
          <TextField
            autoFocus
            margin="dense"
            id="price"
            name='price'
            label="Medicine price"
            fullWidth
            variant="standard"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="quantity"
            name='quantity'
            label="Medicine quantity"
            fullWidth
            variant="standard"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="expiry"
            name='expiry'
            label="Medicine expiry"
            fullWidth
            variant="standard"
            onChange={(e) => setExpiry(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
         {
           update ?
           <Button onClick={handleSubmit}>Update</Button>
           :
           <Button onClick={handleSubmit}>Submit</Button>
         }
        </DialogActions>
      </Dialog>
      <div>
      
      <Dialog
        open={dopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are You Sure Delete Medicine Data ...?  "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>yes</Button>
          <Button onClick={handleClose} >No</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
    
  )
}