declare module 'zustand' {
    import { StateCreator, StoreApi } from 'zustand';
  
    export default function create<T>(stateCreator: StateCreator<T>): StoreApi<T>;
  }
  