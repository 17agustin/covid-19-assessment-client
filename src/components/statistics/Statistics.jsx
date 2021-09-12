import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatistic } from "../../actions";
import { Text, Flex, Spinner } from "@chakra-ui/react";
import StatTable from "./StatTable";
import Header from "../header/Header";
import { useHistory } from "react-router";

function Statistics() {


  const userToken = JSON.parse(localStorage.getItem("user"));
  const statistics = useSelector((state) => state.Statistics);
  const { push } = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

  useEffect(() => {
    const verify = async () => {
      const userToken = await JSON.parse(localStorage.getItem("user"));
      if (!userToken) {
       return push("/");
      }
    };
    verify();
  }, [userToken,push]);

  const Samerica =
    statistics.length > 0 &&
    statistics.filter((stat) => stat.continent === "South-America");
  const Namerica =
    statistics.length > 0 &&
    statistics.filter((stat) => stat.continent === "North-America");
  const Europe =
    statistics.length > 0 &&
    statistics.filter((stat) => stat.continent === "Europe");
  const Oceania =
    statistics.length > 0 &&
    statistics.filter((stat) => stat.continent === "Oceania");
  const Asia =
    statistics.length > 0 &&
    statistics.filter((stat) => stat.continent === "Asia");
  const Africa =
    statistics.length > 0 &&
    statistics.filter((stat) => stat.continent === "Africa");

  const allStats = [Samerica, Namerica, Europe, Oceania, Asia, Africa];

  return (
    <>
      <Header />

      {userToken && statistics && statistics.length > 0 ? (
        <>
          <Flex
            pb="20"
            p="80px"
            bgColor="white"
            w={["140vw","120vw","120vw","100vw"]}
            flexDirection={["column", "column", "column", "row"]}
            alignItems="center"
            justifyContent="center"
            flexWrap={["nowrap", "nowrap", "nowrap", "wrap"]}
          >
            {allStats.map((continent,i) => (
              <StatTable key={i} statistics={continent} />
            ))}
          </Flex>
        </>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="100vh">
          <Text> Loading...</Text>
          <Spinner size="xl" />
        </Flex>
      )}
    </>
  );
}

export default Statistics;
