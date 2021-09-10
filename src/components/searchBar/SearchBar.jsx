import React, { useState } from "react";
import {useHistory} from "react-router-dom"
import { FormControl, FormLabel, Flex, Input, Button } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import {useDispatch, useSelector} from "react-redux"
import { search } from "../../actions";


function SearchBar() {

const [query,setQuery] = useState("")
const dispatch = useDispatch()
const {push} = useHistory()

const handleChange = (e) => {
    setQuery((query) => (query = e.target.value));
  };

const handleSubmit = async (e)=>{
    e.preventDefault()
    const id = await search(query)
    if(id.msg){
      setQuery("")
      return alert("Country not found")
    }
    push(`detail/${id}`)
    setQuery("")
}

  return (
    <Flex flexDirection="column" alignItems="center" justifyContent="center">
      <form onSubmit={(e)=> handleSubmit(e)}>
          <Flex >
        <Input onChange={handleChange} value={query} placeholder="Search..." name="query" />
        <Button  type="submit"  w={"60px"} float="right" bgColor="transparent">
          <Search2Icon />
        </Button>
        </Flex>
      </form>
    </Flex>
  );
}

export default SearchBar;
