import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import RootNavigator from './src/navigation/RootNavigator';
import SizeUpdater from './store/sizeUpdater';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <SizeUpdater />
      <RootNavigator />
    </Provider>
  );
}

export default App;
