
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStateContext } from "./components/contexts/ContextProvider";
import { ThemeProvider , createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Header from "./components/Partials/Header";
import UserDetail from './components/Home/UserDetail';
import Profile from './components/User/Profile';
import ProfileUpdate from './components/User/ProfilUpdate';
const theme = createTheme({
  palette: {
    background: {
      default: "#e76097"
    },
    mode: 'light',
    common:{
      black:'#000',
      white: '#fff'
    },
    primary: {
      main: '#e0196a',
      soft:'#e76097',
      dark:'#b91660'
    },
    action:{
      disabled:'#e76097'
    }
    
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    common:{
      black:'#000',
      white: '#fff'
    },
    primary: {
      main: '#e0196a',
      soft:'#e76097',
      dark:'#b91660'
    },
    action:{
      disabled:'#e76097'
    }
  },
});

function App() {
  const {token,loginUser} = useStateContext();
  return (
    <div className="App" style={{paddingBottom:0}}>
      <ThemeProvider  theme={localStorage.getItem("THEME_MODE")==='light' ? theme : darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <div className='container'  style={{height:'100vh'}}>

            <Header></Header>
              
            <div className='row' style={{ verticalAlign:'middle' }}>
                
                  <Routes>
                    <Route exact path='/' element={
                      token === null 
                      ? 
                        <Navigate to="/auth/login"/> 
                      : 
                        JSON.parse(loginUser).role==="ROLE_ADMIN" ? <Home  /> : <Profile />
                      }
                    ></Route>
                    <Route exact path='/profile' element={token==null ? <Navigate to="/auth/login"/> : <Profile></Profile>} />
                    <Route exact path='/profile/edit' element={token==null ? <Navigate to="/auth/login"/> : <ProfileUpdate></ProfileUpdate>} />
                    <Route exact path='/user/:userId' element={token == null || JSON.parse(loginUser).role!=="ROLE_ADMIN" ? <Navigate to="/"/> : <UserDetail />}></Route>
                    <Route exact path='/auth/register' element={token != null ? <Navigate to="/"/> : <Register/>}></Route>
                    <Route exact path='/auth/login' element={token != null ? <Navigate to="/"/> : <Login/>}></Route>
                    
                  </Routes>      
                
            </div>
          </div>
          </BrowserRouter>   
      </ThemeProvider>
    </div>
  );
}

export default App;
