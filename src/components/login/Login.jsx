import React, { useState } from 'react'
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
    FormErrorMessage,
    FormHelperText,
    Input
  } from "@chakra-ui/react"
import { useDispatch } from 'react-redux'
import { useHistory} from "react-router"
import { login } from '../../actions'

function Login() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const dispatch = useDispatch()
    const {push} = useHistory()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleChange = (e) => {
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }
    const handleSubmit = ()=>{
        const user = {
            email:email,
            password:password 
        }
     dispatch(login(user))
     setEmail("")
     setPassword("")
     return push("/stats")
    }

    return (
        <>
        <Button onClick={onOpen} m="10px" colorScheme="blue">Login</Button>
          <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login !</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
            <form onChange={(e)=>handleChange(e)} onSubmit={handleSubmit}>
            <FormControl  isRequired>
              <FormLabel>email</FormLabel>
              <Input type="email" name="email" ref={initialRef} placeholder="email" />
            </FormControl>

            <FormControl mt={4}  isRequired>
              <FormLabel>password</FormLabel>
              <Input name="password" type="password" placeholder="password" />
            </FormControl>
            </form>
          </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="green" mr={3} onClick={handleSubmit}>
                  Login
                </Button>
                <Button variant="solid" colorScheme="red" onClick={onClose}>cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>)
  }
export default Login
