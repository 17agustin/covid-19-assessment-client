import {Switch, Route, useHistory, useLocation, Redirect} from 'react-router'
import './App.css';
import Home from './components/home/Home';
import Statistics from './components/statistics/Statistics';
import { Box, ChakraProvider } from "@chakra-ui/react"
import Detail from './components/statistics/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { autoLog, login } from './actions';
import axios from 'axios';

function App() {

const user = useSelector(state => state.loggedUser)
const userToken = JSON.parse(localStorage.getItem("user")); 
const {push} = useHistory()
const dispatch = useDispatch()
const location = useLocation()


useEffect(() => {
  const fn = async()=>{
    if (userToken !== null){
     const response = await axios
      .get("http://localhost:3001/api/auth/login", {
        headers: {
          Authorization: `${userToken}`,
        },
      })
      dispatch(autoLog(response.data))
    }
  }
  fn()
}, []);

  return (
    <>
    <ChakraProvider>
    <Switch>
    <Route exact path="/" component={Home}/>
      <>{ user ? 
      <>
      <Switch>
    <Route exact path="/stats" component={Statistics}/>
    <Route exact path="/detail/:id" component={Detail}/>
    <Route path="/*" component={<><h1>error page</h1></>}/>
    </Switch>
    </>
    : <Redirect to="/"/>
    }</>
    <Route/>
    </Switch>
    </ChakraProvider>
    </>
  );
}

export default App;
