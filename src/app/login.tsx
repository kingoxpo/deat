import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Text, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '@/src/contexts/AuthContext';
import { RootStackParamList } from '@/src/types/navigation';
import * as userModel from '../model/user';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../stores/useAuth';

type Props = NativeStackScreenProps<RootStackParamList, 'login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const router = useRouter();

  const { checkLogin, userInfo, logout } = useAuthStore((state: { userInfo: any; login: any; logout: any; }) => ({
    userInfo: state.userInfo,
    checkLogin: state.login,
    logout: state.logout
  }));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await checkLogin({ email, password });
      router.replace('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  // 로그인 체크
  useEffect(() => {
    if (userInfo.loginStatus === 'LOGIN') {
      if (userInfo.token) {
        router.replace('/');
      }
    }

  }, [userInfo.loginStatus, userInfo.token, userInfo.user]);

  return (
    <Box flex={1} p={4} justifyContent="center">
      <VStack space={4} alignItems="center">
        <Text fontSize="2xl" fontWeight="bold">Login</Text>
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
          {error ? (
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          ) : null}
        </FormControl>
        <Button onPress={handleLogin} mt={4} w="100%">
          Login
        </Button>
        <Button variant="link" onPress={() => router.replace('/signup')}>
          Don't have an account? Sign up
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginScreen;
