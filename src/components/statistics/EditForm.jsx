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
  FormErrorMessage,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../../actions";

function EditForm() {

  const actualDetail = useSelector(state => state.detail)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef();
  const finalRef = React.useRef();

  const dispatch = useDispatch();
  const { push } = useHistory();

  const [input, setInput] = useState({
    cases: {
      new: null,
      recovered: null,
      critical: null,
      active: null,
    },
    deaths: null,
    tests: null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefaul();
    const detailToUpdate = {
        cases:{
            new: input.cases.new || actualDetail.cases.new,
            active: input.cases.active || actualDetail.cases.active,
            recovered: input.cases.recovered || actualDetail.cases.recovered,
            critical: input.cases.critical || actualDetail.cases.critical,
            total: actualDetail.cases.total + (input.cases.new || 0)
        },
        deaths:{
            new: input.deaths || actualDetail.deaths.new,
            total: actualDetail.deaths.total + input.deaths
        },
        tests: input.tests || actualDetail.tests.total
    }
    return console.log("dale river plateeee");
  };

  return (
    <>
{/* {   
    "deaths":{
        "new":"+22",
        "total":"23"
    },
    "cases":{
        "new":"+22",
        "active":12,
        "recovered":33,
        "critical":2,
        "total": 333
    },
        "tests": "23"
} */}
      <Button
        onClick={onOpen}
        color="black"
        colorScheme="blackAlpha"
        justifySelf="flex-end"
        variant="ghost"
        borderRadius="full"
        size="lg"
      >
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} colorScheme="blue">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login !</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onChange={(e) => handleChange(e)} onSubmit={handleSubmit}>
              <Text>Cases</Text>
              <NumberInput min={0} size="sm" w="120px" >
                <NumberInputField name="cases_active" placeholder="how many" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormControl isRequired>
                <FormLabel>active</FormLabel>
                <Input
                  type="number"
                  name="cases_active"
                  ref={initialRef}
                  placeholder="active"
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>critical</FormLabel>
                <Input
                  name="text"
                  type="cases_critical"
                  placeholder="critical"
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>new</FormLabel>
                <Input name="new" type="text" placeholder="new" />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>recovered</FormLabel>
                <Input name="recovered" type="text" placeholder="recovered" />
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

export default EditForm;
