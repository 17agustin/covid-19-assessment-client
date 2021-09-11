import React from "react";
import { Flex, Text, Spinner, Stack, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { cleanDetail, detail } from "../../actions";
import EditForm from "./EditForm";

function Detail() {
  const country = useSelector((state) => state.detail);
  const { id } = useParams();
  const dispatch = useDispatch();
  const userToken = JSON.parse(localStorage.getItem("user"));
  const { push } = useHistory();

  useEffect(() => {
    dispatch(detail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!userToken) {
      push("/");
    }
  }, [userToken]);

  const goBack = () => {
    return push("/stats");
  };

  return country ? (
    <>
      <Flex
        h="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Button
          onClick={goBack}
          mb="8"
          borderRadius="full"
          alignSelf="center"
          justifySelf="center"
          colorScheme="blue"
        >
          <ArrowBackIcon />
        </Button>
        <Flex
          bgColor="#f5f3f4"
          w={"50vw"}
          borderWidth="medium"
          borderRadius="2xl"
          border={"solid"}
          borderColor={"black"}
          flexDirection="column"
          boxShadow="2xl"
        >
          <Flex
            bgColor="#61a5c2"
            borderRadius="xl"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction={["row"]} shouldWrapChildren>
              <Text
                justifySelf="flex-start"
                fontSize="lg"
                fontWeight="bold"
                color="black"
                fontSize="3xl"
              >
                {country.continent} - {country.country}
              </Text>

              <EditForm />
            </Stack>
            <Stack direction={["row"]} spacing="180px">
              <Text
                fontSize="lg"
                fontWeight="bold"
                alignSelf="flex-end"
                w="160"
                color="black"
              >
                {" "}
                Population: {country.population}{" "}
              </Text>
              <Text
                fontSize="lg"
                fontWeight="bold"
                alignSelf="flex-start"
                w="160"
                color="black"
              >
                {country.day}
              </Text>
            </Stack>
          </Flex>

          <Flex flexDirection="column">
            <Flex m="2" flexDirection="column" justifyContent="space-around">
              <Text p="1" fontSize="lg" fontWeight="bold" alignSelf="center">
                Cases
              </Text>
              <Flex alignItems="center" justifyContent="space-around">
                <Stack>
                  <Text fontWeight="semibold">
                    New: {country.cases.new || "any"}{" "}
                  </Text>
                  <Text fontWeight="semibold">
                    Active: {country.cases.active || "any"}{" "}
                  </Text>
                  <Text fontWeight="semibold">
                    Critical: {country.cases.critical || "any"}{" "}
                  </Text>
                </Stack>
                <Stack>
                  <Text fontWeight="semibold">
                    {" "}
                    Recovered:{country.cases.recovered || "any"}{" "}
                  </Text>
                  <Text fontWeight="semibold">
                    Total: {country.cases.total || "any"}{" "}
                  </Text>
                </Stack>
              </Flex>
            </Flex>
            <Flex
              m="2"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <Text m="2" fontSize="lg" fontWeight="bold">
                Deaths
              </Text>
              <Stack direction={["row"]} spacing="120px">
                <Text fontWeight="semibold">
                  New: {country.deaths.new || " any"}
                </Text>
                <Text fontWeight="semibold">Total: {country.deaths.total}</Text>
              </Stack>
            </Flex>
            <Flex
              m="2"
              flexDirection="column"
              justifyContent="space-around"
              alignItems="center"
            >
              <Text fontSize="lg" fontWeight="bold">
                Tests
              </Text>
              <Stack direction={["row"]} spacing="120px">
                <Text fontWeight="semibold">total: {country.tests.total}</Text>
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  ) : (
    <Flex justifyContent="center" alignItems="center" h="100vh">
      <Spinner size="xl" />
    </Flex>
  );
}

export default Detail;
