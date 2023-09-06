import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import { useParams } from "react-router-dom";

import { Card, CardContent, Typography } from "@mui/material";

import { Avatar, Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function UserDetail(){

    const {userId} = useParams();

    const {setPageName} = useStateContext();

    const [user, setUser] = useState(null);

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const getUser = () => {
        axiosClient.get("/users/"+userId)
        .then(
            ({data})=>{
                setUser(data);
                setPageName(data.name); 
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        setPageName("User");   
        getUser();
    },[])
        
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
                                <div style={{marginTop:"15px"}}>
                                {user.username!=="" && <Link to={"mailTo:"+user.username} style={{textDecoration:"none"}}><AlternateEmailIcon/></Link>}
                                {user.userContactInfo.linkedin!=="" && user.userContactInfo.linkedin!==null &&  <Link to={user.userContactInfo.linkedin} style={{textDecoration:"none"}}><LinkedInIcon/></Link>}
                                {user.userContactInfo.github!=="" && user.userContactInfo.github!==null &&  <Link to={user.userContactInfo.github} style={{textDecoration:"none"}}><GitHubIcon/></Link>}
                                {user.userContactInfo.url!=="" && user.userContactInfo.url!==null && <Link to={user.userContactInfo.url} style={{textDecoration:"none"}}><LinkIcon/></Link>}
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
