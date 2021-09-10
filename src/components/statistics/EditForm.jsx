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

function EditForm() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const initialRef = React.useRef()
    const finalRef = React.useRef()

    const dispatch = useDispatch()
    const {push} = useHistory()

    const [input, setInput] = useState({
        cases:{
            new:"",
            recovered:"",
            critical:"",
            active:""
        },
        deaths:"",
        tests:""
    })



    const handleChange = (e) => {
        if(e.target.name === "email"){
            setEmail(e.target.value)
        }else{
            setPassword(e.target.value)
        }
    }
    const handleSubmit = ()=>{
e.preventDefaul()
return console.log("dale river plateeee")
    }

    return (
        <>
        {/* adding new deaths, tests, and cases by status*/}
        {/* (active, critical, new, and recovered). */}
        <Button onClick={onOpen} m="10px" colorScheme="blue">Login</Button>
          <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login !</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
        <form onChange={(e)=>handleChange(e)} onSubmit={handleSubmit}>
            <Text>Cases</Text>
            <FormControl  isRequired>
              <FormLabel>active</FormLabel>
              <Input type="text" name="cases_active" ref={initialRef} placeholder="active" />
            </FormControl>
            <FormControl mt={4}  isRequired>
              <FormLabel>critical</FormLabel>
              <Input name="text" type="cases_critical" placeholder="critical" />
            </FormControl>
            <FormControl mt={4}  isRequired>
              <FormLabel>new</FormLabel>
              <Input name="new" type="text" placeholder="new" />
            </FormControl>
            <FormControl mt={4}  isRequired>
              <FormLabel>recovered</FormLabel>
              <Input name="recovered" type="text" placeholder="recovered" />
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

export default EditForm
