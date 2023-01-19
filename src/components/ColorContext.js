import { createContext } from 'react';
import '../style.css';

export const ColorContext = createContext({
  color: '#ff0000',
  background: '#ff0000',
  padding: '15px',
});
