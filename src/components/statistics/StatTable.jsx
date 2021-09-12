import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { detail } from "../../actions";

function StatTable({ statistics }) {

  const headers = ["Country", "Cases", "Deaths", "Tests"];
  const dispatch = useDispatch();
  const { push } = useHistory();

  const goDetail = (e) => {
    dispatch(detail(e.target.value));
    return push("/detail/" + e.target.value);
  };

  return (
    <>
      <Flex
        w={["300px", "320px", "500px", "500px"]}
        flexDirection="column"
        alignItems="center"
        borderRadius="2xl"
        m="10"
        pb="5"
        bgColor="#caf0f8"
        borderColor="black"
      >
        <Badge
          variant="solid"
          bgColor="#023e8a"
          w={["300px", "320px", "500px", "500px"]}
          borderRadius="10px"
          p="4"
          textAlign="center"
          fontSize="3xl"
        >
          {statistics[0].continent}
        </Badge>
        <Flex
          overflowX={["scroll","scroll","hidden","hidden"]}
          h="50vh"
          overflowY="scroll"
          w={["300px", "320px", "500px", "500px"]}
          flexDirection="column"
        >
          <Table  variant="simple" colorScheme="blackAlpha" size="sm">
            <Thead>
              <Tr>
                {headers.map((h) => (
                  <Th>{h}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {statistics.length > 0
                ? statistics.map((stat) => (
                    <Tr>
                      <Td>
                        <Button
                          value={stat._id}
                          onClick={(e) => goDetail(e)}
                          size="sm"
                          variant="ghost"
                        >
                          {stat.country}
                        </Button>
                      </Td>
                      <Td fontWeight="semibold">{stat.cases.total || "-"}</Td>
                      <Td fontWeight="semibold">{stat.deaths.total || "-"}</Td>
                      <Td fontWeight="semibold">{stat.tests.total || "-"}</Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
}

export default StatTable;
