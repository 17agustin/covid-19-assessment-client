import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStatistic } from '../../actions'
import {
    Text, 
    Flex,
    Spinner
  } from "@chakra-ui/react"
import Detail from './Detail';
import StatTable from "./StatTable"
import Header from "../header/Header";
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { useHistory } from 'react-router';



function Statistics() {

  const breakpoints = createBreakpoints({
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
  })
  
  const userToken =  JSON.parse(localStorage.getItem("user"));
  const statistics = useSelector((state) => state.Statistics);
  const user = useSelector(state => state.loggedUser)
  const { push } = useHistory();
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

useEffect(() => {
  const verify = async () => {
    const userToken = await JSON.parse(localStorage.getItem("user"));
    if(!userToken){
      push("/")
    }
  }
verify()
}, [userToken])


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
  
{userToken && statistics && statistics.length > 0 ?
    <>
    <Flex  pb="20" p="80px" bgColor="white" /* #0b090a */ h={"90vh"} flexDirection={["column","column","column","row"]} alignItems="center" justifyContent="center" flexWrap={["nowrap","nowrap","nowrap","wrap"]}>
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
