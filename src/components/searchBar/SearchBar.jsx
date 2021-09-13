import React, { useState } from "react";
import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { search } from "../../actions";
import { useDispatch } from "react-redux";

function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    setQuery((query) => (query = e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query === "")
      return toast({
        title: "error",
        description: "you must fill the input",
        isClosable: true,
        status: "error",
      });
    toast({
      title: "success",
      isClosable: true,
      status: "success",
    });
    setQuery("");
    return dispatch(search(query));
  };

  return (
    <Flex
      ml="5"
      pr="10"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Flex>
          <Input
            onChange={handleChange}
            value={query}
            placeholder="Search..."
            name="query"
          />
          <Button
            type="submit"
            float="right"
            bgColor="transparent"
            _hover={{ backgroundColor: "transparent" }}
            color="white"
          >
            <Search2Icon />
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default SearchBar;
