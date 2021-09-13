import { Button } from '@chakra-ui/button'
import { Flex, Heading, Text } from '@chakra-ui/layout'
import React from 'react'
import { useHistory } from 'react-router'

function ErrorComponent() {

    const { push } = useHistory()

    const goBack = () => {
        return push("/")
    }
    return (
        <Flex color="white" bgColor="#0b090a" flexDirection="column" h="100vh" justifyContent="center" alignItems="center">
            <Heading>
                ERROR 404
            </Heading>
            <Text>
                page not found
            </Text>
            <Button mt="5" variant="solid" colorScheme="teal" onClick={goBack}>
                back
            </Button>
        </Flex>
    )
}

export default ErrorComponent
