// @flow

import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet, TextIcon, Color, Text } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';

export default function AddressLocationLegend() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>
          <Translation id="mmb.trip_service.transportation.map.legend.long_tap" />
        </Text>
        <TextIcon code="j" style={[styles.icon, { color: Color.brand }]} />
        <Text style={styles.text}>
          <Translation id="mmb.trip_service.transportation.map.legend.markerA" />
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.text}>
          <Translation id="mmb.trip_service.transportation.map.legend.tap" />
        </Text>
        <TextIcon
          code="k"
          style={[styles.icon, { color: Color.orange.normal }]}
        />
        <Text style={styles.text}>
          <Translation id="mmb.trip_service.transportation.map.legend.markerB" />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: Color.textLight,
    fontSize: 16,
  },
  container: {
    height: 40,
    borderColor: Color.white,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Color.white,
    position: 'absolute',
    bottom: 20,
    start: 0,
    end: 0,
    marginHorizontal: 45,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: Color.black,
    shadowOffset: { height: 0, width: 0 },
  },
  icon: {
    fontSize: 15,
    alignSelf: 'center',
    paddingHorizontal: 5,
  },
});
