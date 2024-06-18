import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Text, VStack, FormControl, WarningOutlineIcon } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '@/src/contexts/AuthContext';
import { RootStackParamList } from '@/src/types/navigation';
import { useRouter } from 'expo-router';

type Props = NativeStackScreenProps<RootStackParamList, 'login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const router = useRouter();

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // navigation 객체가 올바르게 전달되었는지 확인
    console.log('Navigation:', navigation);
  }, [navigation]);

  const handleLogin = () => {
    // 여기에 인증 로직을 추가하세요.
    if (email === 'test@example.com' && password === 'password') {
      login();
      navigation.navigate('index'); // 로그인 성공 후 홈 화면으로 이동
    } else {
      setError('Invalid email or password');
    }
  };

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
