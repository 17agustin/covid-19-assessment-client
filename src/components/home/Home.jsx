import React, { useEffect } from "react";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
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
          <Heading h="40" color="white" fontSize={["2x1","3x1","4x1","5xl"]}>
            Welcome to Covid-19 App
          </Heading>
        </Box>
        <Stack direction={["row"]} spacing="10">
          <Login />
          <Signup />
        </Stack>
      </Flex>
    </>
  );
}

export default Home;
