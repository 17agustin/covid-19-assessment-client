import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Flex, Input, Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { search } from "../../actions";

function SearchBar() {
  const [query, setQuery] = useState("");
  const { push } = useHistory();

  const handleChange = (e) => {
    setQuery((query) => (query = e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query === "") return alert("country not found");
    const id = await search(query);
    if (id.msg) {
      setQuery("");
      return alert("Country not found");
    }
    push(`detail/${id}`);
    setQuery("");
  };

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
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
            w={"60px"}
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
