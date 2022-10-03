import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import {RouteParams} from '../InputForm';

const degrees_to_radians = (degrees: number) => degrees * (Math.PI / 180);

const Results = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {angle = 0, distance = 0} = (route.params as RouteParams) || {};
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    if (angle && distance) {
      setResult(
        Number((Math.tan(degrees_to_radians(angle)) * distance).toFixed(2)),
      );
    }
  }, [angle, distance]);

  return (
    <Box
      w="100%"
      h="100%"
      alignItems="center"
      bg={useColorModeValue('warmGray.50', 'coolGray.800')}>
      <Box
        mt={20}
        w="70%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: 'coolGray.600',
          backgroundColor: 'gray.700',
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: 'gray.50',
        }}>
        <Box pt="10" alignItems="center">
          <Heading>Datos ingresados</Heading>
        </Box>
        <Stack p="10" pt="5" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Ángulo (grados)
            </Heading>
            <Text fontSize="lg">{angle}°</Text>
          </Stack>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Distancia al árbol (metros)
            </Heading>
            <Text fontSize="lg">{distance} mts</Text>
          </Stack>
        </Stack>
        <Box alignItems="center">
          <Heading>Resultados</Heading>
        </Box>
        <Stack p="10" pt="5" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Altura calculada
            </Heading>
          </Stack>
          <Text fontSize="25" fontWeight="600">
            {result} mts
          </Text>
        </Stack>
      </Box>
      <Button
        mt="10"
        size="lg"
        width="50%"
        onPress={() => navigation.goBack()}
        colorScheme="emerald">
        Volver
      </Button>
    </Box>
  );
};

export default Results;
