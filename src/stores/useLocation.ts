import create from 'zustand';
import * as Location from 'expo-location';

interface LocationState {
  location: Location.LocationObject | null;
  errorMsg: string | null;
  requestLocation: () => void;
}

const useLocation = create<LocationState>((set: (arg0: { errorMsg?: string; location?: Location.LocationObject; }) => void) => ({
  location: null,
  errorMsg: null,
  requestLocation: async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      set({ errorMsg: 'Permission to access location was denied' });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    set({ location });
  },
}));

export default useLocation;
