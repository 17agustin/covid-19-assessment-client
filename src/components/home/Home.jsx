import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../../actions";
import {
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Login from "../login/Login";
import Signup from "../signup/Signup";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector(state => state.loggedUser)



  return (
    <>
      <Flex
        h={"100vh"}
        w={"100vw"}
        bgColor="#0b090a"
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
      >
        <Box>
          <Text h="40" w="220" color="white" alignSelf="flex-start">
            Welcome to Covid-19 App
          </Text>
        </Box>
        <Box>
          <Login  />
          <Signup   />
        </Box>
      </Flex>
      {/* {login ? <Button onClick={()=>setLogin(false)}><Login/></Button> : null} */}
    </>
  );
}

export default Home;
