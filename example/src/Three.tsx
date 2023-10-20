// YourScreenComponent.tsx
import { useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';

interface Props {
  someProps?: string;
  exCall(): any;
}

const Three: React.FC = () => {
  const route = useRoute();
  const { someProps, exCall } = route.params as Props;

  useEffect(() => {
    exCall()
  })

  return (
    <View>
      <Text>{someProps ?? 'asd'}</Text>
      {/* Additional content */}
    </View>
  );
};

export default Three;
