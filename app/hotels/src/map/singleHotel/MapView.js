// @flow

import * as React from 'react';
import NativeMapView from 'react-native-maps';
import { createFragmentContainer, graphql } from '@kiwicom/mobile-relay';
import { DropMarker, StyleSheet } from '@kiwicom/mobile-shared';

import type { MapView_hotel } from './__generated__/MapView_hotel.graphql';

type ContainerProps = {|
  hotel: any,
|};

type Props = {
  ...ContainerProps,
  hotel: ?MapView_hotel,
};

export class MapView extends React.Component<Props> {
  render() {
    const { hotel } = this.props;
    const latitude = hotel?.coordinates?.lat;
    const longitude = hotel?.coordinates?.lng;

    return (
      <NativeMapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <NativeMapView.Marker coordinate={{ latitude, longitude }}>
          <DropMarker size={50} />
        </NativeMapView.Marker>
      </NativeMapView>
    );
  }
}

export default (createFragmentContainer(
  MapView,
  graphql`
    fragment MapView_hotel on HotelInterface {
      coordinates {
        lat
        lng
      }
    }
  `,
): React.ComponentType<ContainerProps>);
