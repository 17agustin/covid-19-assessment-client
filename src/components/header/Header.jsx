import React from "react";
import styles from "./header.module.css";
import SearchBar from "../searchBar/SearchBar";
import { Button, IconButton } from "@chakra-ui/button";
import { useSelector } from "react-redux";
import { Text, Stack, Flex } from "@chakra-ui/layout";
import { useDispatch } from "react-redux";
import { getStatistic, sync, logOut } from "../../actions";
import { useHistory } from "react-router";
import { useToast } from "@chakra-ui/toast";
import { Image } from "@chakra-ui/image";
import {   Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";

function Header() {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast();

  const syncUp = () => {
    dispatch(sync());
    setTimeout(
      () =>
        toast({
          title: "updating",
          description: "the stats are syncing.",
          status: "success",
          duration:4000,
          isClosable:true
        }),
      1000
    );
    setTimeout(() => dispatch(getStatistic()), 3100);
  };

  const logout = () => {
    dispatch(logOut());
    localStorage.removeItem("user");
    alert("logged out!");
    return push("/");
  };
  return (
    <Flex className={styles.header} w={["140vw","120vw","120vw","100vw"]}>
      <Image
        src={
          "https://i1.wp.com/mrsvg.com/wp-content/uploads/edd/2021/03/virus.png?w=363&ssl=1"
        }
        h="80px"
        w={["80px","100px","100px","120px"]}
        alt="img not found"
        /* display={["none",,,"flex"]} */
      />
      
      <Text display={["none",,,"flex"]} fontSize="x-large" color="white" alignSelf="center">
        welcome {(user.userResponse && user.userResponse.name) || user.name} !
      </Text>
      <Text color="white"  fontSize={["medium","large","x-large","x-large"]} letterSpacing="wider">
        Covid-19 Stats
      </Text>
      
      <Stack display={["none",,,"flex"]} direction={["row"]} spacing="80px">
        <Button onClick={logout}>Logout</Button>
        <Button onClick={syncUp}>Sync</Button>
      <SearchBar />
      </Stack>
      <Flex display={["flex",,,"none"]} justifyContent="space-between">
        <Menu>
        <MenuButton as={IconButton} icon={<HamburgerIcon />}>
        </MenuButton>
          <MenuList>
              <MenuItem><Button onClick={logout}>Logout</Button></MenuItem>
              <MenuItem><Button onClick={syncUp}>Sync</Button></MenuItem>
           </MenuList>
        </Menu>
        <SearchBar />
        </Flex>
    </Flex>
  );
}

export default Header;
