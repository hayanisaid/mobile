// @flow

import {
  StackNavigator,
  StackNavigatorOptions,
} from '@kiwicom/mobile-navigation';
import { withMappedNavigationAndConfigProps as withMappedProps } from 'react-navigation-props-mapper';
import { Color } from '@kiwicom/mobile-shared';

import DetailScreen, { MenuComponents } from './DetailScreen';
import ListScreen from './ListScreen';
import FillTravelDocumentScreen from './FillTravelDocumentScreen';
import TravelDocumentModalScreen from './TravelDocumentModalScreen';
import AppleWalletScreen from './AppleWalletScreen';
import AddressPickerScreen from './AddressPickerScreen';
import TransportationMap from '../scenes/tripServices/TransportationMap';

// THIS IS ONLY FOR MOBILE DEVICES!
const Screens = {};
Object.entries(MenuComponents).forEach(
  // $FlowIssue: https://github.com/facebook/flow/issues/2221
  ([routeName, { screen, headerTitle, headerStyle }]) => {
    Screens[routeName] = {
      screen: withMappedProps(screen),
      navigationOptions: {
        headerTitle,
        headerStyle: {
          ...headerStyle,
          backgroundColor: Color.white,
        },
      },
    };
  },
);

const TravelDocumentStack = StackNavigator(
  {
    TravelDocumentScreen: {
      screen: withMappedProps(FillTravelDocumentScreen),
    },
    TravelDocumentModalScreen: {
      screen: withMappedProps(TravelDocumentModalScreen),
    },
  },
  {
    ...StackNavigatorOptions,
    initialRouteName: 'TravelDocumentScreen',
    mode: 'modal',
  },
);

const MainStack = StackNavigator(
  {
    ListScreen: {
      screen: withMappedProps(ListScreen),
    },
    DetailScreen: {
      screen: withMappedProps(DetailScreen),
    },
    AppleWalletScreen: {
      screen: withMappedProps(AppleWalletScreen),
    },
    ...Screens,
  },
  {
    ...StackNavigatorOptions,
    initialRouteName: 'ListScreen',
  },
);

const TransportationStack = StackNavigator(
  {
    AddressPickerScreen: AddressPickerScreen,
    TransportationMap: TransportationMap,
  },
  {
    ...StackNavigatorOptions,
    initialRouteName: 'TransportationMap',
    mode: 'modal',
  },
);

export default StackNavigator(
  {
    MMBMainStack: {
      screen: MainStack,
    },
    TravelDocumentScreen: {
      screen: TravelDocumentStack,
    },
    TransportationAddressPickerScreen: {
      screen: TransportationStack,
    },
  },
  {
    ...StackNavigatorOptions,
    initialRouteName: 'MMBMainStack',
    headerMode: 'none',
  },
);
