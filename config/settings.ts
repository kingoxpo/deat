import Config from 'react-native-config';

const settings = {
  development: {
    apiUrl: 'http://localhost:3001',
  },
  production: {
    apiUrl: 'https://deat.io',
  },
};

const currentSettings = settings[Config.ENV as keyof typeof settings] || settings.development;

export default { ...currentSettings };