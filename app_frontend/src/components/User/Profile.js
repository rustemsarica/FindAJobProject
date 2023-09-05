import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Avatar, Box, Button, Container, Grid, Paper, TableContainer } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';

import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LinkIcon from '@mui/icons-material/Link';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Profile(){
    
    const {setPageName, loginUser} = useStateContext();

    const [user, setUser] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const[page, setPage] = useState(0);
    const[totalPages, setTotalPages] = useState(0);
    const[totalElements, setTotalElements] = useState(0);
    const[rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {        
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    
    const getDayOffs = (pageNumber, size) => {
        axiosClient.get("/day-offs/"+parseInt(JSON.parse(loginUser).id)+"?page="+parseInt(pageNumber)+"&size="+parseInt(size))
        .then(
            ({data})=>{
                setTransactions(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
            },
            (error)=>{
            }
        )
    }

    const getUser = () => {
        axiosClient.get("/users/"+parseInt(JSON.parse(loginUser).id))
        .then(
            ({data})=>{
                console.log(data)
                setUser(data);
            },
            (error)=>{
            }
        )
    }

    useEffect(()=>{
        setPageName("Profile");   
        getUser();
    },[])
    
    
    useEffect(()=>{
        getDayOffs(page,rowsPerPage);
    },[page,rowsPerPage])

        
    return (
        <Container style={{marginBottom:"80px", marginTop:"40px"}}>
            {user!=null &&
            <Box>
                <Card style={{marginBottom:"40px", textAlign:"start"}}>
                    <CardContent>
                        <Grid container direction="row" >
                            <Grid item xs={12} md={9}>
                                
                                <div style={{display:"flex", verticalAlign:"middle"}}>
                                    <Avatar alt={user.name} style={{marginRight:"10px"}} />                                
                                    <Typography style={{marginBlock:"auto"}} variant="h5" component="div" gutterBottom>{user.name}</Typography>
                                </div>
                                <Typography style={{marginTop:"10px"}} variant="h6" component="div" gutterBottom>{user.userDetail.title}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>                      
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
                        </Grid>  
                    </CardContent>
                </Card>
            </Box>
            }
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">Start Date</TableCell>
                            <TableCell align="left">End Date</TableCell>
                            <TableCell align="left">Day Off Count</TableCell>
                            <TableCell align="left">Created By</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {transactions.map((element,i) => (
                            <TableRow hover
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell align="left"> {new Date(element.startDate).toDateString() } </TableCell>
                                <TableCell align="left">{new Date(element.endDate).toDateString()}</TableCell>
                                <TableCell align="left">{element.dayOffsCount}</TableCell>
                                <TableCell align="left">{element.createdBy}</TableCell>
                                <TableCell align="right">{new Date(element.createdDate).toDateString()}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {totalPages > 1 &&
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />}
            </Paper>
        </Container>
    )
       
}
