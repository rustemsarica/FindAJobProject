import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import { Avatar, Box, Button, Container, Grid, Menu, MenuItem, Stack, TextField } from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function Company(){
    
    const {setPageName, loginUser} = useStateContext();
    const {companyId} = useParams();

    const [company, setCompany] = useState(null);

    const [selectedTab, setSelectedTab] = useState(0);

    const [anchorElCompany, setAnchorElCompany] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElCompany(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElCompany(false);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const getCompany = () => {
        axiosClient.get("/company/"+parseInt(companyId))
        .then(({data}) => {
            setCompany(data);
            setPageName( data.name );
        })
        .catch((error) => {

        })
    }

    const [permissions, setPermissions] = useState();

    const getPermissions = () => {
        axiosClient.get("/role-permission/permissions")
        .then(({data}) => {
            setPermissions(data);            
        })
        .catch((error) => {

        })
    }

    const [roleModalOpen, setRoleModalOpen] = useState(false);

    const handleClickRoleModalOpen = () => {
        setRoleModalOpen(true);
    };

    const handleClickRoleModalClose = () => {
        setRoleModalOpen(false);
    };
  
    const[roleName, setRoleName] = useState();
    const[rolePermissions, setRolePermissions] = useState([]);

    const changePermission = (e,permission)=>{
        if(e.target.checked){
            rolePermissions.push(permission.id);
        }else{
            var index = rolePermissions.findIndex((e)=>e==permission.id);
            rolePermissions.splice(index,1);
        }
    }

    const createRole = (ev) => {
        ev.preventDefault()
        var formData = {
            "companyId": companyId,
            "name":roleName,
            "permissions":rolePermissions
        };
        axiosClient.post("/company/roles/add", formData)
        .then(({data}) => {
            getCompany();
            setRolePermissions([]);
            setRoleName("");          
        })
        .catch((error) => {

        })
    } 

    useEffect(()=>{   
        getCompany();
        getPermissions();
        setPageName("Company");
    },[companyId])


    return (
        <Container style={{marginBottom:"80px", marginTop:"40px"}}>
            {company!=null &&
            <Box>
                <Card style={{marginBottom:"40px", textAlign:"start"}}>
                    <CardContent>
                        <Grid container direction="row" >
                            <Grid item xs={6} md={10}>                                
                                <div style={{display:"flex", verticalAlign:"middle"}}>
                                    <Avatar alt={company.name} style={{marginRight:"10px"}} />                                
                                    <Typography style={{marginBlock:"auto"}} variant="h5" component="div" gutterBottom>{company.name}</Typography>
                                </div>
                                <Typography style={{marginTop:"10px"}} variant="h6" component="div" gutterBottom>{company.sector}</Typography>
                            </Grid>
                            <Grid item xs={6} md={2}>
                                <Box sx={{ flexGrow: 0 }}>
                                    
                                    <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>Settings</Button>    
                                           
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElCompany}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElCompany)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        
                                        <MenuItem component={Link} to={"/company/edit/"+company.id} onClick={handleCloseUserMenu}>Profile Edit</MenuItem>
                                        <MenuItem component={Link} to={"/company/"+company.id+"/roles"} onClick={handleCloseUserMenu}>Roles</MenuItem>
                                        
                                    </Menu>
                                </Box>                    
                                
                                <div style={{marginTop:"15px"}}>
                                {/* {company.username!=="" && <Link to={"mailTo:"+user.username} style={{textDecoration:"none"}}><AlternateEmailIcon/></Link>}
                                {user.userContactInfo.linkedin!=="" && <Link to={user.userContactInfo.linkedin} style={{textDecoration:"none"}}><LinkedInIcon/></Link>}
                                {user.userContactInfo.github!=="" && <Link to={user.userContactInfo.github} style={{textDecoration:"none"}}><GitHubIcon/></Link>}
                                {user.userContactInfo.url!=="" && <Link to={user.userContactInfo.url} style={{textDecoration:"none"}}><LinkIcon/></Link>} */}
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>                      
                                {/* <Typography variant="div" component="div" gutterBottom>{user.userDetail.info}</Typography> */}
                            </Grid>
                            <Grid item xs={12} md={12}>                      
                                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                                    <Tab label="Posts" />
                                    <Tab label="Jobs" />
                                    <Tab label="Roles" />
                                </Tabs>
                            </Grid>
                        </Grid>  
                    </CardContent>
                </Card>
                {selectedTab === 0 &&
                    <Card style={{marginBottom:"40px", textAlign:"start"}}>
                        <CardContent>
                            <Grid container direction="row" >
                                
                            </Grid>  
                        </CardContent>
                    </Card>
                }
                {selectedTab === 1 &&
                    <Card style={{marginBottom:"40px", textAlign:"start"}}>
                        <CardContent>
                            <Grid container direction="row" >

                                <Grid item xs={12} md={12} style={{marginTop:"20px"}}>
                                    <Stack direction="column" spacing={1}>
                                                        
                                    </Stack>    
                                </Grid>

                            </Grid>  
                        </CardContent>
                    </Card>
                }                
                {selectedTab === 2 &&
                    <Card style={{marginBottom:"40px", textAlign:"start"}}>
                        <CardContent>
                            <Grid container direction="row" >

                            <Button variant="outlined" onClick={handleClickRoleModalOpen}>Open alert dialog</Button>
                            <Dialog
                                open={roleModalOpen}
                                onClose={handleClickRoleModalClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <form onSubmit={createRole}>
                                    <DialogTitle id="alert-dialog-title">Create Role</DialogTitle>
                                    <DialogContent>
                                        
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                label="Name" 
                                                onChange={(ev)=>setRoleName(ev.target.value)}
                                                value={roleName}
                                            />
                                        </FormControl>
                                        <FormGroup>
                                            {permissions.map((permission,i)=>(
                                                <FormControlLabel key={"permission-"+i} control={<Switch onChange={(e)=>{changePermission(e,permission)}} />} label={permission.name} />
                                            ))}                                        
                                        </FormGroup>
                                        
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClickRoleModalClose}>Disagree</Button>
                                        <Button type="Submit" onClick={handleClickRoleModalClose} autoFocus>Agree</Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                                <Grid item xs={12} md={12} style={{marginTop:"20px"}}>
                                    <Stack direction="column" spacing={1}>
                                        {company.roles.map((role)=>(
                                            <div key={role}>{role.name}</div>
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
