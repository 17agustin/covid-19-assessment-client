import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStatistic } from '../../actions'
import {
    Table,
    Thead,
    Tbody,
    Tfoot, 
    Tr,   
    Th,   //  EDITAR DESDE EL DETALLE
    Td,
    Text,
    Flex,
    Spinner
  } from "@chakra-ui/react"
import Detail from './Detail';
import StatTable from "./StatTable"
import Header from "../header/Header";

function Statistics() {
  const statistics = useSelector((state) => state.Statistics);
  const user = useSelector(state => state.loggedUser)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistic());
    console.log(user)
  }, [dispatch]);

console.log(statistics)

const Samerica = statistics.length > 0 && statistics.filter(stat => stat.continent === "South-America")
const Namerica = statistics.length > 0 && statistics.filter(stat => stat.continent === "North-America")
const Europe = statistics.length > 0 && statistics.filter(stat => stat.continent === "Europe")
const Oceania = statistics.length > 0 && statistics.filter(stat => stat.continent === "Oceania")
const Asia = statistics.length > 0 && statistics.filter(stat => stat.continent === "Asia")
const Africa = statistics.length > 0 && statistics.filter(stat => stat.continent === "Africa")

const allStats = [Samerica,Namerica,Europe,Oceania,Asia,Africa]



  return(
      <>
 <Header/>
  
{    statistics && statistics.length > 0 ?
    <>
    <Flex pb="20" p="80px" bgColor="white" /* #0b090a */ h={"90vh"} flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap">
        {/* {statistics && statistics.map(e => <SingleStat country={e}/>) } */}
        {/* <SingleStat country={statistics[0]}/> */}
        {allStats.map( continent => <StatTable statistics={continent}/>)}
    </Flex>
    </>
    :
    <Flex justifyContent="center" alignItems="center" h="100vh">
    <Text> Loading...</Text>
    <Spinner size="xl"/>
    </Flex>}
    </>
);
}

export default Statistics;
