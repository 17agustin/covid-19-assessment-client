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
  Button
} from "@chakra-ui/react";
import {useDispatch} from "react-redux"
import {useHistory} from "react-router-dom"
import { detail } from "../../actions";

function StatTable({ statistics }) {
    const headers = ["Country","Cases","Deaths","Tests"];
  const dispatch = useDispatch()
  const {push} = useHistory()

    const goDetail = (e) =>{
      dispatch(detail(e.target.value))
      return push("/detail/" + e.target.value)
    }

  return (
    <>
    <Flex flexDirection="column" m="10" border="solid" borderRadius="lg" borderColor="black" >
    <Badge variant="solid" colorScheme="green" w="35vw" borderBottom="solid" borderColor="black"  h="10" textAlign="center" fontSize="3xl">{statistics[0].continent}</Badge>
    <Flex overflowX="hidden" h="50vh" overflowY="scroll" w="35vw" justifyContent="flex-start"  flexDirection="column" alignItems="center" >
      <Table  variant="simple"  colorScheme="blackAlpha" >
        <Thead>
          <Tr>
            {headers.map( h => <Th>{h}</Th>)}
          </Tr>
        </Thead>
        <Tbody >
          {statistics.length > 0 ? statistics.map(stat => 
            <Tr>
              <Td><Button value={stat._id} onClick={e => goDetail(e)} size="sm" variant="ghost">{stat.country}</Button></Td>
              <Td fontWeight="semibold">{stat.cases.total || "-"}</Td>
              <Td fontWeight="semibold">{stat.deaths.total || "-"}</Td>
              <Td fontWeight="semibold">{stat.tests.total || "-"}</Td>
            </Tr>
          ) : null }
        </Tbody>
      </Table>
      </Flex>
      </Flex>
    </>
  );
}

export default StatTable;
