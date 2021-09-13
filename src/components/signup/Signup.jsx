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
  FormHelperText,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import axios from "axios";
import { login } from "../../actions";
import { useToast } from "@chakra-ui/toast";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../constants/constants";

function Signin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const dispatch = useDispatch();
  const { push } = useHistory();

  const [input, setInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validate = (e) => {
    if (e.target.name === "password") {
      if (PASSWORD_REGEX.test(e.target.value)) {
        setError({ ...error, password: false });
      } else {
        setError({ ...error, password: true });
      }
    } else {
      if (EMAIL_REGEX.test(e.target.value)) {
        setError({ ...error, email: false });
      } else {
        setError({ ...error, email: true });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error.email || error.password) {
      return toast({
        title: "Error",
        description: `you must fill the inputs correctly`,
        isClosable: true,
        status: "error",
      });
    } else {
      await axios.post("/auth/signup", input);
      const user = {
        email: input.email,
        password: input.password,
      };
      dispatch(login(user));
      toast({
        title: "Your signup has been processed correctly",
        description: `welcome to the covid 19 stats app`,
        isClosable: true,
        status: "success",
      });
      return push("/stats");
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">
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
                  placeholder="name"
                  value={input.name}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>lastname: </FormLabel>
                <Input
                  name="lastname"
                  type="text"
                  placeholder="lastname"
                  value={input.lastname}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>email</FormLabel>
                <Input
                  border="solid"
                  borderColor={error.email ? "crimson" : "green"}
                  type="email"
                  name="email"
                  onKeyUp={(e) => validate(e)}
                  onBlur={(e) => validate(e)}
                  placeholder="email"
                  value={input.email}
                />
                <FormHelperText display={error.email ? "flex" : "none"}>
                  you must use a valid address
                </FormHelperText>
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onKeyUp={(e) => validate(e)}
                  onBlur={(e) => validate(e)}
                  placeholder="password"
                  value={input.password}
                  border="solid"
                  borderColor={error.password ? "crimson" : "green"}
                />
                <FormHelperText display={error.password ? "flex" : "none"}>
                  password must have minimum eight characters, at least one
                  uppercase letter, and a number
                </FormHelperText>
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              SignUp
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose} variant="ghost">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Signin;
