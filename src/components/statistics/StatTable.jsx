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
import { createBreakpoints } from "@chakra-ui/theme-tools";

function StatTable({ statistics }) {
  const breakpoints = createBreakpoints({
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  });

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
        w={["80vw", "80vw", "80vw", "35vw"]}
        flexDirection="column"
        borderRadius="2xl"
        m="10"
        pb="5"
        bgColor="#caf0f8"
        borderColor="black"
      >
        <Badge
          variant="solid"
          bgColor="#023e8a"
          w={["80vw", "80vw", "80vw", "35vw"]}
          borderRadius="10px"
          p="4"
          textAlign="center"
          fontSize="3xl"
        >
          {statistics[0].continent}
        </Badge>
        <Flex
          overflowX="hidden"
          h="50vh"
          overflowY="scroll"
          w={["80vw", "80vw", "80vw", "35vw"]}
          flexDirection="column"
          alignItems="center"
        >
          <Table variant="simple" colorScheme="blackAlpha">
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
