import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStatistics, getStatistic } from "../../actions";
import { Text, Flex, Spinner, Button } from "@chakra-ui/react";
import StatTable from "./StatTable";
import Header from "../header/Header";
import { useHistory } from "react-router";
import { STATISTICS } from "../../styles/styleConstants";

function Statistics() {
  const userToken = JSON.parse(localStorage.getItem("user"));
  const statistics = useSelector((state) => state.statistics);
  const { push } = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatistic());
    return (()=>{
      dispatch(clearStatistics())
    })
  }, [dispatch]);

  useEffect(() => {
    const verify = async () => {
      const userToken = await JSON.parse(localStorage.getItem("user"));
      if (!userToken || userToken === undefined) {
        return push("/");
      } else {
        dispatch(getStatistic());
      }
    };
    verify();
  }, [userToken, push, dispatch]);

  const reset = () => {
    dispatch(getStatistic());
  };

  return (
    <>
      <Header />

      {userToken && statistics && statistics.length > 0 ? (
        <>
          <Flex
            pb="20"
            p="80px"
            bgColor="white"
            w={STATISTICS.width}
            flexDirection={STATISTICS.direction}
            alignItems="center"
            justifyContent="center"
            flexWrap={STATISTICS.wrap}
          >
            {statistics.map((continent, i) => (
              <StatTable key={i} statistics={continent} />
            ))}
            <Button
              onClick={reset}
              display={statistics.length > 1 ? "none" : "flex"}
            >
              reset
            </Button>
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
