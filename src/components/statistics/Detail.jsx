import React, { useState } from "react";
import { Flex, Text, Spinner, Stack, Button, Input } from "@chakra-ui/react";
import { ArrowBackIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { cleanDetail, detail } from "../../actions";

function Detail() {
  const country = useSelector((state) => state.detail);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    dispatch(detail(id));
    return () => {
      dispatch(cleanDetail());
    };
  }, [id]);

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
          colorScheme="red"
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
            bgColor="#a4161a"
            borderRadius="xl"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction={["row"]} shouldWrapChildren>
            <Text justifySelf="flex-start" fontSize="lg" fontWeight="bold" color="black" fontSize="3xl">
              {country.continent} - {country.country}
            </Text>
            <Button color="black" colorScheme="blackAlpha" justifySelf="flex-end" variant="ghost" borderRadius="full" size="lg">
            <EditIcon/>
          </Button>
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