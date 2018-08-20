// @flow

import * as React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Text, StyleSheet, TextIcon, Color } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';

type Props = {|
  +onPress: () => Promise<*>,
  +destination: ?string,
|};

export default function MarkerLocationButton(props: Props) {
  return (
    <View style={{ backgroundColor: 'white', padding: 10 }}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={styles.locationButton}>
          <TextIcon code="B" style={styles.icon} />
          <Text
            numberOfLines={1}
            style={
              props.destination ? styles.locationText : styles.placeholderText
            }
          >
            {props.destination ? (
              <Translation passThrough={props.destination} />
            ) : (
              <Translation id="mmb.trip_services.transportation.map.marker_location_button" />
            )}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  locationButton: {
    flexDirection: 'row',
    backgroundColor: Color.inputBackground,
    alignItems: 'center',
    android: {
      borderRadius: 2,
      elevation: 1,
      height: 48,
    },
    ios: {
      height: 47,
      borderRadius: 6,
    },
  },
  placeholderText: {
    color: Color.textLight,
    flex: 1,
  },
  locationText: {
    color: Color.textDark,
    flex: 1,
  },
  icon: {
    marginHorizontal: 10,
    alignSelf: 'center',
    color: Color.textLight,
  },
});
