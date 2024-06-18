import React, { useState } from 'react';
import { Box, Button, Input, Text, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '@/src/contexts/AuthContext';
import { RootStackParamList } from '@/src/types/navigation';
import * as userModel from '../model/user';
import { useRouter } from 'expo-router';

type Props = NativeStackScreenProps<RootStackParamList, 'signup'>;

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const router = useRouter();

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response: any = await userModel.signUp({ email, password });
      if (response.success) {
        // 회원가입 성공 후 로그인 상태로 변경
        login();
        navigation.navigate('index'); // 회원가입 후 홈 화면으로 이동
      } else {
        setError(response.message || 'Sign up failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign up');
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
        <Button variant="link" onPress={() => router.replace('/login')}>
          Already have an account? Login
        </Button>
      </VStack>
    </Box>
  );
};

export default SignupScreen;
