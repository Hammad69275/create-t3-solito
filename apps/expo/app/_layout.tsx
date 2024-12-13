import '../global.css';

import { Provider } from '@packages/ui/provider';
import { Slot } from 'expo-router';

export default () => {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
};
