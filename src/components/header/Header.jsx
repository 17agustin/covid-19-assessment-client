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
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { HEADER } from "../../styles/styleConstants";

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
          duration: 4000,
          isClosable: true,
        }),
      1000
    );
    setTimeout(() => dispatch(getStatistic()), 3100);
  };

  const logout = () => {
    dispatch(logOut());
    localStorage.removeItem("user");
    toast({
      title: "Log Out",
      description: `good Bye ${user.name || user.userResponse.name}`,
      isClosable: true,
      status: "success",
    });
    return push("/");
  };
  return (
    <Flex className={styles.header} w={HEADER.width}>
      <Image
        src={
          "https://i1.wp.com/mrsvg.com/wp-content/uploads/edd/2021/03/virus.png?w=363&ssl=1"
        }
        h="80px"
        w={HEADER.imageWidth}
        alt="img not found"
      />

      <Text
        display={HEADER.display}
        fontSize="x-large"
        color="white"
        alignSelf="center"
      >
        welcome {(user.userResponse && user.userResponse.name) || user.name} !
      </Text>
      <Text color="white" fontSize={HEADER.fontSize} letterSpacing="wider">
        Covid-19 Stats
      </Text>

      <Stack display={HEADER.display} direction={["row"]} spacing="80px">
        <Button onClick={logout}>Logout</Button>
        <Button onClick={syncUp}>Sync</Button>
        <SearchBar />
      </Stack>
      <Flex display={HEADER.flexDisplay} justifyContent="space-between">
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />}></MenuButton>
          <MenuList>
            <MenuItem onClick={logout}> Logout</MenuItem>
            <MenuItem onClick={syncUp}> Sync</MenuItem>
          </MenuList>
        </Menu>
        <SearchBar />
      </Flex>
    </Flex>
  );
}

export default Header;
