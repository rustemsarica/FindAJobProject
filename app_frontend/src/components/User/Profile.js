import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import { Avatar, Box, Button, Container, Grid } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {  enqueueSnackbar } from 'notistack';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Profile(){
    
    const {setPageName, loginUser} = useStateContext();

    const [user, setUser] = useState(null);
    const [skillSearchText, setSkillSearchText] = useState("");

    const [skills, setSkills] = useState([]);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const getUser = () => {
        axiosClient.get("/users/"+parseInt(JSON.parse(loginUser).id))
        .then(({data}) => {
            setUser(data);
        })
        .catch((error) => {

        })
    }

    const onSelectSkill = (skill)=>{
        if(skill==null){
            return;
        }
        var formData = new FormData();
        formData.append("skillId",parseInt(skill.id))

        axiosClient.post("/skills/"+parseInt(JSON.parse(loginUser).id)+"/addSkill", formData)
        .then(({data}) => {
            enqueueSnackbar(data,{variant:"success"})
            getUser();
            setSkillSearchText("");
        })
        .catch((error) => {

        })
    }

    const searchSkill = () => {
        if(skillSearchText.length>0){
            axiosClient.get("/skills?q="+skillSearchText)
            .then(({data}) => {
                setSkills(data);
            })
            .catch((error) => {

            })
        }else{
            setSkills([]);
        }
        
    }

    useEffect(()=>{
        setPageName("Profile");   
        getUser();
    },[])
    
    useEffect(()=>{
        searchSkill();
    },[skillSearchText])
            
    return (
        <Container style={{marginBottom:"80px", marginTop:"40px"}}>
            {user!=null &&
            <Box>
                <Card style={{marginBottom:"40px", textAlign:"start"}}>
                    <CardContent>
                        <Grid container direction="row" >
                            <Grid item xs={6} md={9}>
                                
                                <div style={{display:"flex", verticalAlign:"middle"}}>
                                    <Avatar alt={user.name} style={{marginRight:"10px"}} />                                
                                    <Typography style={{marginBlock:"auto"}} variant="h5" component="div" gutterBottom>{user.name}</Typography>
                                </div>
                                <Typography style={{marginTop:"10px"}} variant="h6" component="div" gutterBottom>{user.userDetail.title}</Typography>
                            </Grid>
                            <Grid item xs={6} md={3}>                      
                                <Link to={"/profile/edit"}><Button variant="outlined">Profile Edit</Button></Link>
                                <div style={{marginTop:"15px"}}>
                                {user.username!=="" && <Link to={"mailTo:"+user.username} style={{textDecoration:"none"}}><AlternateEmailIcon/></Link>}
                                {user.userContactInfo.linkedin!=="" && <Link to={user.userContactInfo.linkedin} style={{textDecoration:"none"}}><LinkedInIcon/></Link>}
                                {user.userContactInfo.github!=="" && <Link to={user.userContactInfo.github} style={{textDecoration:"none"}}><GitHubIcon/></Link>}
                                {user.userContactInfo.url!=="" && <Link to={user.userContactInfo.url} style={{textDecoration:"none"}}><LinkIcon/></Link>}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>                      
                                <Typography variant="div" component="div" gutterBottom>{user.userDetail.info}</Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>                      
                                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                                    <Tab label="Skills" />
                                    <Tab label="Item Two" />
                                    <Tab label="Item Three" />
                                </Tabs>
                            </Grid>
                        </Grid>  
                    </CardContent>
                </Card>
                {selectedTab===0 &&
                    <Card style={{marginBottom:"40px", textAlign:"start"}}>
                        <CardContent>
                            <Grid container direction="row" >
                                <Grid container direction={"row"} justifyContent="space-between" alignItems="center">
                                    <Typography variant="h5" component="div" gutterBottom>Skills</Typography>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        blurOnSelect
                                        disableClearable
                                        options={skills}
                                        getOptionLabel={(option)=>option.name}
                                        onInputChange={(e)=>{ setSkillSearchText(e && e!=null ? e.target.value : "")}}
                                        sx={{ width: 300 }}
                                        onChange={(ev,val)=>onSelectSkill(val)}
                                        inputValue={skillSearchText}
                                        renderInput={(params) => <TextField {...params} label="Skill" />}
                                        renderOption={(props, option) => (
                                            <Box component="li" {...props}>                                      
                                            {option.name}
                                            </Box>
                                        )}
                                        
                                    />
                                </Grid>                            
                                <Grid item xs={12} md={12} style={{marginTop:"20px"}}>
                                    <Stack direction="row" spacing={1}>
                                        {user.skills.map((skill,i)=>(
                                            <Chip key={"skill-"+i}  label={skill.name}  />
                                        ))}                   
                                    </Stack>    
                                </Grid>
                            </Grid>  
                        </CardContent>
                    </Card>
                }
                {selectedTab===1 &&
                    <Card style={{marginBottom:"40px", textAlign:"start"}}>
                        <CardContent>
                            <Grid container direction="row" >

                                <Grid item xs={12} md={12} style={{marginTop:"20px"}}>
                                    <Stack direction="row" spacing={1}>
                                        {user.companies.map((company,i)=>(
                                            <Chip key={"company-"+i}  label={company.name}  />
                                        ))}                   
                                    </Stack>    
                                </Grid>

                            </Grid>  
                        </CardContent>
                    </Card>
                }
                
            </Box>
            }
        </Container>
    )
       
}
