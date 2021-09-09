import React from 'react';
import { View } from 'react-native';
import Home from './components/Home'
import globalStyles from "./styles/globalStyles";


export default function App() {
  const { container, brandName } = globalStyles;
  return (
   <View style={container}>
     <Home/>
   </View>
  
  );
}


