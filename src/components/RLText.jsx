//import libraries to create components
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const RLText = ({ children, ...props }) => {
  return (
    <Text style={{ color: 'black', ...props }}>{children && children}</Text>
  );
};

export default RLText;
