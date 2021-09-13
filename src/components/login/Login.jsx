import React, { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../actions";
import axios from "axios";

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { push } = useHistory();
  const toast = useToast()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = async () => {
    const user = {
      email: email,
      password: password,
    };
    const response = await axios.post("http://localhost:3001/api/auth/login",user)
    if(response.data.msg) return toast({
      title:"Error",
      description: `${response.data.msg}`,
      isClosable:true,
      status:"error"
    })
    dispatch(login(user));
    setEmail("");
    setPassword("");
    toast({
      title:"Log In",
      description: `welcome !`,
      isClosable:true,
      status:"success"
    })
    return push("/stats");
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onChange={(e) => handleChange(e)} onSubmit={(e)=>handleSubmit(e)}>
              <FormControl isRequired>
                <FormLabel>email</FormLabel>
                <Input type="email" name="email" placeholder="email" />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>password</FormLabel>
                <Input name="password" type="password" placeholder="password" />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="green"
              mr={3}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Button variant="solid" colorScheme="red" onClick={onClose}>
              cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
export default Login;
