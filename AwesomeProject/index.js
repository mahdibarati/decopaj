/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Navigation} from 'react-native-navigation';
import {AddPlanSceen} from './src/decopaj/add-plan-screen';
import {DecopajScreen} from './src/decopaj/decopaj';

// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('Home', () => DecopajScreen);
Navigation.registerComponent('AddPlanSceen', () => AddPlanSceen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  });
});
