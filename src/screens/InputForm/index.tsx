import React, {useEffect} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  useColorModeValue,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {useFormik} from 'formik';
import * as Yup from 'yup';

export interface RouteParams {
  angle: number;
  distance: number;
}

const InputForm = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const formik = useFormik({
    initialValues: {
      angle: '',
      distance: '',
    },
    validationSchema: Yup.object().shape({
      distance: Yup.number()
        .typeError('Debe ser un número válido.')
        .min(0, 'El valor debe ser mayor a 0 metros.')
        .required('El valor es requerido.'),
      angle: Yup.number()
        .typeError('Debe ser un número válido.')
        .min(0, 'El valor debe ser mayor a 0º.')
        .max(89.99, 'El valor debe ser menor a 90º.')
        .required('El valor es requerido.'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: values => {
      // issue with react navigation types
      navigation.navigate(
        'Results' as never,
        {
          angle: Number(values.angle),
          distance: Number(values.distance),
        } as RouteParams as never,
      );
    },
  });

  useEffect(() => {
    if (isFocused) {
      formik.resetForm();
    }
  }, [isFocused, formik]);

  const onChange = (target: string, value: string) => {
    formik.setFieldValue(target, value);
  };

  return (
    <Box
      w="100%"
      h="100%"
      alignItems="center"
      bg={useColorModeValue('warmGray.50', 'coolGray.800')}>
      <Box safeArea p="2" py="8" w="90%">
        <VStack space={10} mt="5">
          <FormControl isInvalid={Boolean(formik.errors.angle)}>
            <Text my="3" fontSize="md">
              Ángulo (grados)
            </Text>
            <Input
              size="lg"
              variant="outline"
              keyboardType="number-pad"
              value={formik.values.angle}
              onChangeText={value => onChange('angle', value)}
              isRequired
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {formik.errors.angle}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={Boolean(formik.touched && formik.errors.distance)}>
            <Text my="3" fontSize="md">
              Distancia al árbol (metros)
            </Text>
            <Input
              size="lg"
              variant="outline"
              keyboardType="number-pad"
              value={formik.values.distance}
              onChangeText={value => onChange('distance', value)}
              isRequired
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}>
              {formik.errors.distance}
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <FormControl.HelperText>
              Si el número tiene parte decimal, la misma debe representarse con
              un punto "."
            </FormControl.HelperText>
            <FormControl.HelperText>Ej: 19.21</FormControl.HelperText>
          </FormControl>
          <Button
            mt="2"
            colorScheme="emerald"
            size="lg"
            onPress={formik.submitForm}>
            Calcular
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default InputForm;
