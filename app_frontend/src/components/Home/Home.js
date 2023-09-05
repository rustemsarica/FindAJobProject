import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Paper, TableContainer } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from "react-router-dom";

import { Card, CardContent, Typography } from "@mui/material";

function Home(){
    const navigate = useNavigate();

    const {setPageName, loginUser} = useStateContext();

    const [user, setUser] = useState(null);

    const [users, setUsers] = useState([]);

    const[page, setPage] = useState(0);
    const[totalPages, setTotalPages] = useState(0);
    const[totalElements, setTotalElements] = useState(0);
    const[rowsPerPage, setRowsPerPage] = useState(10);


    const handleChangePage = (event, newPage) => {        
        setPage(newPage);
        // getTransactions(newPage, rowsPerPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
        // getTransactions(0,event.target.value);
    };

    
    const getUsers = (pageNumber, size) => {
        axiosClient.get("/users?page="+parseInt(pageNumber)+"&size="+parseInt(size))
        .then(
            ({data})=>{
                setUsers(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
            }
        ).catch((error)=>{

        })
    }

   
    const getUser = () => {
        axiosClient.get("/users/"+JSON.parse(loginUser).id)
        .then(
            ({data})=>{
                setUser(data);
            }
        ).catch((error)=>{

        })
    }

    useEffect(()=>{
        setPageName("Home");   
        getUser();
    },[])
    
    
    useEffect(()=>{
        getUsers(page,rowsPerPage);
    },[page,rowsPerPage])

        
    return (
        <Container style={{marginBottom:"80px"}}>
            {user!=null &&
                <Card style={{marginBottom:"40px"}}>
                    <CardContent>                        
                        <Typography variant="h5" component="div" gutterBottom>{user.name}</Typography>
                        <Typography variant="h6" component="div" gutterBottom>Salary : {user.salary}</Typography>
                        <Typography variant="h6" component="div" gutterBottom>{user.username}</Typography>
                    </CardContent>
                </Card>
            }
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Salary</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((element,i) => (
                            <TableRow hover
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >    
                                <TableCell align="left">{element.id}</TableCell>
                                <TableCell style={{cursor:localStorage.getItem("IS_ADMIN")==="true" && "pointer"}} onClick={localStorage.getItem("IS_ADMIN")==="true" ? () => {navigate("/user/"+element.id);} : null} align="left"> {element.name } </TableCell>
                                <TableCell align="left">{element.salary}</TableCell>
                                <TableCell align="left">{element.role}</TableCell>
                                <TableCell align="right">{new Date(element.createdDate).toUTCString()}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { totalPages>1 &&
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                }
            </Paper>
        </Container>
    )
       
}

export default Home;