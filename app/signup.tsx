import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { AuthList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthList, 'Signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = () => {
    // 여기에 회원가입 로직을 추가하세요.
    if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      // 회원가입 성공 후 로그인 상태로 변경
      login();
    }
  };

  return (
    <Box flex={1} p={4} justifyContent="center">
      <VStack space={4} alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">Sign Up</Text>
        <FormControl isInvalid={!!error}>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Input
            mt={4}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            type="password"
          />
          <Input
            mt={4}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type="password"
          />
          {error ? (
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          ) : null}
        </FormControl>
        <Button onPress={handleSignup} mt={4} w="100%">
          Sign Up
        </Button>
        <Button variant="link" onPress={() => navigation.navigate('Login')}>
          Already have an account? Login
        </Button>
      </VStack>
    </Box>
  );
};

export default SignupScreen;
