import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppModule } from '@modules/app.module';
import TabNavigator from './tab/Tab';

function Navigator() {
  const { dispatch, fetchReferrals } = useAppModule();

  useEffect(() => {
    dispatch(fetchReferrals());
  }, []);

  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default Navigator;
