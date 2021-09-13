import { Switch, Route, Redirect } from "react-router";
import "./App.css";
import Home from "./components/home/Home";
import Statistics from "./components/statistics/Statistics";
import { ChakraProvider } from "@chakra-ui/react";
import Detail from "./components/statistics/Detail";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { autoLog } from "./actions";
import axios from "axios";
import { myNewTheme } from "./styles/theme";
import ErrorComponent from "./components/error/ErrorComponent";

function App() {
  const user = useSelector((state) => state.loggedUser);
  const userToken = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  useEffect(() => {
    const fn = async () => {
      if (userToken !== null) {
        const response = await axios.get(
          "http://localhost:3001/api/auth/login",
          {
            headers: {
              Authorization: `${userToken}`,
            },
          }
        );
        dispatch(autoLog(response.data));
      }
    };
    fn();
  }, [dispatch, userToken]);

  return (
    <>
      <ChakraProvider theme={myNewTheme}>
        <Switch>
          <Route exact path="/" component={Home} />
          <>
            {user || userToken ? (
              <>
                <Switch>
                  <Route exact path="/stats" component={Statistics} />
                  <Route exact path="/detail/:id" component={Detail} />
                  <Route path="/*" component={ErrorComponent} />
                </Switch>
              </>
            ) : (
              <Redirect to="/" />
            )}
          </>
        </Switch>
      </ChakraProvider>
    </>
  );
}

export default App;
