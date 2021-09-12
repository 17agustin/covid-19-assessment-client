import React, { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import { useHistory } from "react-router";

function Home() {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { push } = useHistory();

  useEffect(() => {
    if (userToken) {
      push("/stats");
    }
  }, [userToken,push]);

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
          <Login />
          <Signup />
        </Box>
      </Flex>
    </>
  );
}

export default Home;
