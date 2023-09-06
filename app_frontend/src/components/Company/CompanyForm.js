import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { Container } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { Card, CardContent, CardActions } from "@mui/material";
import { firstUpperCase } from "../contexts/helpers";
import {  enqueueSnackbar } from 'notistack';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import { useParams } from "react-router-dom";

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000 0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });
  
  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  
  
export default function CompanyForm(){
    const {companyId} = useParams();
    const {setPageName, loginUser} = useStateContext();

    const [errors, setErrors] = useState([]);

    const [name, setName] = useState("");
    const [sector, setSector] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [website, setWebsite] = useState("");

    const companySubmit = (ev)=>{
        ev.preventDefault()
        setErrors([]);

        if(companyId>0){
            updateCompany(ev);
            return;
        }

        var formData = {
            'owner': parseInt(JSON.parse(loginUser).id),
            'name': name,
            'sector': sector,
            'address': address,
            'province': province,
            'city': city,
            'location': location,
            'website': website
        }

        axiosClient.post("/company/create", formData)
        .then(({data})=>{
            enqueueSnackbar(data,{variant:"success"});
            setName("");
            setSector("");
            setAddress("");
            setProvince("");
            setCity("");
            setLocation("");
            setWebsite("");
        })
        .catch((err)=>{
            if (err.response) {
                const { data } = err.response;
                if (data.fieldErrors) {
                  setErrors(data.fieldErrors);
                }
            }else{
                enqueueSnackbar(err,{variant:"error"}) 
            }
        })
    }

    const getCompany = () => {
        axiosClient.get("/company/"+companyId)
        .then(({data})=>{
            setName(data.name);
            setSector(data.sector);
            setAddress(data.address);
            setProvince(data.province);
            setCity(data.city);
            setLocation(data.location);
            setWebsite(data.website);
        })
        .catch((err)=>{
            if (err.response) {
                const { data } = err.response;
                if (data.fieldErrors) {
                  setErrors(data.fieldErrors);
                }
            }else{
                enqueueSnackbar(err,{variant:"error"}) 
            }
        })
    }

    const updateCompany = (ev) => {
        ev.preventDefault()
        setErrors([]);

        var formData = {
            'owner': parseInt(JSON.parse(loginUser).id),
            'name': name,
            'sector': sector,
            'address': address,
            'province': province,
            'city': city,
            'location': location,
            'website': website
        }

        axiosClient.put("/company/update/"+parseInt(companyId), formData)
        .then(({data})=>{
            enqueueSnackbar(data,{variant:"success"});
            
        })
        .catch((err)=>{
            if (err.response) {
                const { data } = err.response;
                if (data.fieldErrors) {
                  setErrors(data.fieldErrors);
                }
            }else{
                enqueueSnackbar(err,{variant:"error"}) 
            }
        })
    }

    useEffect(()=>{
        setPageName("Create Company");
        if(companyId>0){
            getCompany();
        }
    },[])
        
    return (
        <Container style={{marginBottom:"80px", marginTop:"40px"}}>
            
            <Container>
                <Grid container direction="row" justifyContent="center" alignItems="center"> 
                    <Grid item xs={12} md={6}>                 
                        <form onSubmit={  companySubmit }>
                            <Card sx={{ textAlign: 'left' }}>
                                <CardContent> 
                                    { errors &&
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                        {errors.map((key,i) => (
                                            <Alert key={key+i} severity="error">{firstUpperCase(key.field)+" "+key.message}</Alert>
                                        ))}
                                    </Stack>
                                    }
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Name" 
                                            onChange={(ev)=>setName(ev.target.value)}
                                            value={name}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Sector</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Sector" 
                                            onChange={(ev)=>setSector(ev.target.value)}
                                            value={sector}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Website</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Website" 
                                            onChange={(ev)=>setWebsite(ev.target.value)}
                                            value={website}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Address"
                                            multiline
                                            rows={2}
                                            value={address}
                                            onChange={(e)=>{setAddress(e.target.value)}}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Province</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Province" 
                                            onChange={(ev)=>setProvince(ev.target.value)}
                                            value={province}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">City</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="City" 
                                            onChange={(ev)=>setCity(ev.target.value)}
                                            value={city}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Location</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Location" 
                                            onChange={(ev)=>setLocation(ev.target.value)}
                                            value={location}
                                        />
                                    </FormControl>
                                </CardContent>
                                <CardActions disableSpacing sx={{display:'flex', flexDirection:'row-reverse', p:2}} >
                                    <Button type="Submit" variant="contained">Submit</Button>
                                </CardActions>
                            </Card>                    
                        </form>
                    </Grid>    
                </Grid>
            </Container>
        </Container>
    )
       
}
