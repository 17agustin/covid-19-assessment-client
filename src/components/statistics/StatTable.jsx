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
  Heading,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { detail, getStatistic } from "../../actions";
import { TABLE } from "../../styles/styleConstants";

function StatTable({ statistics }) {

  const headers = ["Country", "Cases", "Deaths", "Tests"];
  const dispatch = useDispatch();
  const { push } = useHistory();

  const goDetail = (e) => {
    dispatch(detail(e.target.value));
    return push("/detail/" + e.target.value);
  };

  const reset = ()=>{
    dispatch(getStatistic())
  }

  return ( statistics.length > 0 ?
    <>
      <Flex
        w={TABLE.width}
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
          w={TABLE.width}
          borderRadius="10px"
          p="4"
          textAlign="center"
          fontSize="3xl"
        >
          {statistics[0].continent === statistics[statistics.length - 1].continent ? statistics[0].continent : "search results"}
        </Badge>
        <Flex
          overflowX={TABLE.scroll}
          h="50vh"
          overflowY="scroll"
          w={TABLE.width}
          flexDirection="column"
        >
          <Table  variant="simple" colorScheme="blackAlpha" size="sm">
            <Thead>
              <Tr>
                {headers.map((h) => (
                  <Th key={h}>{h}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {statistics.length > 0
                ? statistics.map((stat) => (
                    <Tr key={stat.country}>
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
      :
      <Flex alignItems="center" flexDirection="column">
        <Heading>
          oops! No Result for that search
        </Heading>
        <Button mt="10" w="60px" onClick={reset}>
          Reset
        </Button>
      </Flex>
  );

}

export default StatTable;
