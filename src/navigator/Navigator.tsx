import { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAppModule } from '@modules/app.module';
import TabNavigator from './tab/Tab';

function Navigator() {
  const { dispatch, checked, loggedIn, loadUser } = useAppModule();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  // TODO: switch router by loggedIn status
  console.log('[##] loggedIn', loggedIn);

  return checked && loggedIn ? (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  ) : (
    <View />
  );
}

export default Navigator;
