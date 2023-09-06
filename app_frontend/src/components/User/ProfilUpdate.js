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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { Card, CardContent, CardActions } from "@mui/material";
import { firstUpperCase } from "../contexts/helpers";
import {  enqueueSnackbar } from 'notistack';

import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';

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
  
  
export default function ProfileUpdate(){
    
    const {setPageName, loginUser} = useStateContext();

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState("");
    const [gender, setGender] = useState("FEMALE");
    const [info, setInfo] = useState("");
    const [militaryStatus, setMilitaryStatus] = useState(true);

    const [linkedin, setLinkedin] = useState("");
    const [github, setGithub] = useState("");
    const [url, setUrl] = useState("");
    const [phone, setPhone] = useState("");

    const getUser = () => {
        axiosClient.get("/users/"+parseInt(JSON.parse(loginUser).id))
        .then(({data})=>{
                setUser(data);

                setTitle(data.userDetail.title??"");
                setGender(data.userDetail.gender??"");
                setInfo(data.userDetail.info??"");
                setMilitaryStatus(data.userDetail.militaryStatus??"");

                setLinkedin(data.userContactInfo.linkedin??"");
                setGithub(data.userContactInfo.github??"");
                setUrl(data.userContactInfo.url??"");
                setPhone(data.userContactInfo.phone??"");
        })
        .catch((error)=>{
            // setErrors(error)
        })
    }

    const onSubmitUserDetail = (ev)=>{
        ev.preventDefault()
        var formData = {
        'title': title,
        'info': info,
        'gender': gender,
        'militaryStatus': militaryStatus}

        axiosClient.put("/users/"+parseInt(JSON.parse(loginUser).id)+"/detail/update", formData)
        .then(({data})=>{
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

    const onSubmitUserContact = (ev)=>{
        ev.preventDefault()
        var formData = {
        'linkedin': linkedin,
        'github': github,
        'url': url,
        'phone': phone}

        axiosClient.put("/users/"+parseInt(JSON.parse(loginUser).id)+"/contact/update", formData)
        .then(({data})=>{
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
        setPageName("Edit Profile");   
        getUser();
    },[])
        
    return (
        <Container style={{marginBottom:"80px", marginTop:"40px"}}>
            
            <Container>
                <Grid container direction="row" justifyContent="center" alignItems="center"> 
                    <Grid item xs={12} md={6}>                 
                        <form onSubmit={onSubmitUserDetail}>
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
                                        <InputLabel htmlFor="outlined-adornment-amount">Title</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Name" 
                                            onChange={(ev)=>setTitle(ev.target.value)}
                                            value={title}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Info"
                                            multiline
                                            rows={4}
                                            value={info}
                                            onChange={(e)=>{setInfo(e.target.value)}}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            value={gender}
                                            name="row-radio-buttons-group"
                                            onChange={(e)=>{setGender(e.target.value)}}
                                        >
                                            <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                            <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                            <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                    </FormControl>
                                    {gender==="MALE" &&                                
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Military Status</FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                value={militaryStatus}
                                                name="row-radio-buttons-group"
                                                onChange={(e)=>{setMilitaryStatus(e.target.value)}}
                                            >
                                                <FormControlLabel value={true} control={<Radio />} label="Completed" />
                                                <FormControlLabel value={false} control={<Radio />} label="Not Completed" />
                                            </RadioGroup>
                                        </FormControl>
                                    }
                                </CardContent>
                                <CardActions disableSpacing sx={{display:'flex', flexDirection:'row-reverse', p:2}} >
                                    <Button type="Submit" variant="contained">Submit</Button>
                                </CardActions>
                            </Card>                    
                        </form>
                    </Grid>    
                </Grid>
            </Container>
            <Container>
                <Grid container direction="row" justifyContent="center" alignItems="center"> 
                    <Grid item xs={12} md={6}>                 
                        <form onSubmit={onSubmitUserContact}>
                            <Card sx={{ textAlign: 'left' }}>
                                <CardContent>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Phone</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Phone" 
                                            name="phone"
                                            onChange={(ev)=>setPhone(ev.target.value)}
                                            value={phone}
                                            inputComponent={TextMaskCustom}
                                        />
                                    </FormControl>                                     
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Linkedin Url</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Name" 
                                            onChange={(ev)=>setLinkedin(ev.target.value)}
                                            value={linkedin}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Github Url</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Name" 
                                            onChange={(ev)=>setGithub(ev.target.value)}
                                            value={github}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Url</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            label="Name" 
                                            onChange={(ev)=>setUrl(ev.target.value)}
                                            value={url}
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
