import React, { useEffect } from "react";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import { useHistory } from "react-router";
import styles from "./home.module.css";

function Home() {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { push } = useHistory();

  useEffect(() => {
    if (userToken) {
      push("/stats");
    }
  }, [userToken, push]);

  return (
    <>
      <Flex className={styles.container}>
        <Flex alignItems="center">
          <Heading
            mb="5"
            border="solid"
            borderRadius="3xl"
            backgroundColor="blue.500"
            h="40"
            p="10"
            color="black"
            fontSize={["2x1", "3x1", "4x1", "5xl"]}
          >
            Welcome to Covid-19 App
          </Heading>
        </Flex>
        <Stack direction={["row"]} spacing="10">
          <Login />
          <Signup />
        </Stack>
      </Flex>
    </>
  );
}

export default Home;
