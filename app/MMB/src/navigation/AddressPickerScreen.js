// @flow

import * as React from 'react';
import { View } from 'react-native';
import { Translation } from '@kiwicom/mobile-localization';
import { HeaderButton } from '@kiwicom/mobile-navigation';

export default class AddressPickerScreen extends React.Component<*> {
  static navigationOptions = (props: Props) => {
    function goBack() {
      props.navigation.goBack();
    }

    return {
      headerLeft: (
        <HeaderButton.CloseModal
          onPress={goBack}
          text={
            <Translation id="mmb.trip_services.transportation.address_picker.cancel_button" />
          }
        />
      ),
    };
  };
  render() {
    return <View />;
  }
}
