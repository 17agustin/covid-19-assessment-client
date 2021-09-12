import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from 'react-redux'
import { useHistory} from "react-router"
import axios from "axios";
import { login } from "../../actions";

function Signin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

  const dispatch = useDispatch();
  const { push } = useHistory();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(error.email || error.password){
      return alert("should fill the input correctly")
    }else{
    /* const response = */ await axios.post("http://localhost:3001/api/auth/signup",input)
    const user = {
      email: input.email,
      password: input.password
    }
    dispatch(login(user))
    alert("the user has been created successfully")
    return push("/stats")
    }
  };

  return (
    <>
      <Button onClick={onOpen} m="10px" colorScheme="green">
        signUp
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>signUp</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onChange={(e) => handleChange(e)} onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>name: </FormLabel>
                <Input
                  type="text"
                  name="name"
                  ref={initialRef}
                  placeholder="name"
                  value={input.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>lastname: </FormLabel>
                <Input
                  name="lastname"
                  type="text"
                  placeholder="lastname"
                  value={input.lastname}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  ref={initialRef}
                  placeholder="email"
                  value={input.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={input.password}
                  onChange={handleChange}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="blue" mr={3} onClick={handleSubmit}>
              SignUp
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose} variant="ghost">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Signin;
