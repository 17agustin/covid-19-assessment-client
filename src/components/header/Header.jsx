import React from 'react'
import styles from "./header.module.css"
import SearchBar from "../searchBar/SearchBar"
import { Button } from '@chakra-ui/button'
import { useSelector } from 'react-redux'
import { Text, Stack} from '@chakra-ui/layout'
import { useDispatch } from "react-redux";
import { getStatistic, sync, logOut } from '../../actions'
import { useHistory} from "react-router"

function Header() {

const user = useSelector(state => state.loggedUser)
const dispatch = useDispatch()
const {push} = useHistory()

const syncUp = () => {
  dispatch(sync())
 setTimeout(()=>alert("updating stats"),1000)
 setTimeout(()=>dispatch(getStatistic()),3100)
}

const logout = () => {
  dispatch(logOut())
  localStorage.removeItem("user")
  alert("logged out!")
  return push("/")
}
    return (
        <header className={styles.header}>
        <img src={"https://i1.wp.com/mrsvg.com/wp-content/uploads/edd/2021/03/virus.png?w=363&ssl=1"} className={styles.img} alt="img not found" />
        <Text h="40" w="220" color="white" alignSelf="flex-start">
            welcome {user.userResponse && user.userResponse.name} !
          </Text>
          <h1>
            <span>Covid-19 Stats</span>
          </h1>
            <Stack direction={["row"]} spacing="120px">
        <Button onClick={logout}>Logout</Button>
        <Button onClick={syncUp}>Sync</Button>
        </Stack>
        <SearchBar />
      </header>
    )
}

export default Header


