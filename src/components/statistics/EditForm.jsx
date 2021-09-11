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
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateCountry } from "../../actions";

function EditForm() {
  const actualDetail = useSelector((state) => state.detail);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [newCases, setNewCases] = useState(0);
  const [activeCases, setActiveCases] = useState(0);
  const [recoveredCases, setRecoveredCases] = useState(0);
  const [criticalCases, setCriticalCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [tests, setTests] = useState(0);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "new":
        setNewCases(e.target.value);
        break;
      case "recovered":
        setRecoveredCases(e.target.value);
        break;
      case "active":
        setActiveCases(e.target.value);
        break;
      case "critical":
        setCriticalCases(e.target.value);
        break;
      case "deaths":
        setDeaths(e.target.value);
        break;
      case "tests":
        setTests(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const detailToUpdate = {
      cases: {
        new: `+${newCases}` || actualDetail.cases.new,
        active: activeCases || actualDetail.cases.active,
        recovered: recoveredCases || actualDetail.cases.recovered,
        critical: criticalCases || actualDetail.cases.critical,
        total: parseInt(actualDetail.cases.total) + parseInt(newCases),
      },
      deaths: {
        new: `+${deaths}` || actualDetail.deaths.new,
        total: parseInt(actualDetail.deaths.total) + parseInt(deaths),
      },
      tests: tests || actualDetail.tests.total,
    };
    dispatch(updateCountry(id, detailToUpdate));
    toast({
      title: "updating",
      status: "success",
    });
    setTimeout(onClose, 1000);
    setTimeout(window.location.reload(), 1500);
  };

  return (
    <>
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
          <ModalHeader>Update this stats!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onChange={(e) => handleChange(e)} onSubmit={handleSubmit}>
              <Stack
                h="500px"
                shouldWrapChildren
                justifyContent="space-around"
                alignItems="center"
              >
                <Text>new cases</Text>
                <NumberInput name="new" min="0" w="150px">
                  <NumberInputField placeholder="how many" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Text>recovered cases</Text>
                <NumberInput name="recovered" min="0" w="150px">
                  <NumberInputField placeholder="how many" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Text>active cases</Text>
                <NumberInput name="active" min="0" w="150px">
                  <NumberInputField placeholder="how many" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Text>critical cases</Text>
                <NumberInput name="critical" min="0" w="150px">
                  <NumberInputField placeholder="how many" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Text>deaths</Text>
                <NumberInput name="deaths" min="0" w="150px">
                  <NumberInputField placeholder="how many" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Text>tests</Text>
                <NumberInput name="tests" min="0" w="150px">
                  <NumberInputField placeholder="how many" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Stack>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="green"
              mr={3}
              onClick={handleSubmit}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditForm;
