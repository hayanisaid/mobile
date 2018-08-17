// @flow

import * as React from 'react';
import { View, Platform, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { HeaderBackButton } from 'react-navigation';
import { StyleSheet, DropMarker, Color } from '@kiwicom/mobile-shared';
import { HeaderButton, HeaderTitle } from '@kiwicom/mobile-navigation';
import { Translation, Alert } from '@kiwicom/mobile-localization';

import MarkerLocationButton from './transportation/MarkerLocationButton';
import CurrentPositionButton from './transportation/CurrentPositionButton';

type State = {
  region: Region,
  markers: Marker,
  destination: string,
};

type Region = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
};

type Marker = {
  [key: string]: {
    latitude: number,
    longitude: number,
  },
};

type NativeEvent = {
  nativeEvent: {
    coordinate: {
      latitude: number,
      longitude: number,
    },
  },
};

type Props = *;
class TransportationMap extends React.Component<Props, State> {
  state = {
    region: {
      latitude: 51.11,
      longitude: 17.032 - 0.005, // move center little bit right
      latitudeDelta: 0.0375,
      longitudeDelta: 0.0349,
    },
    markers: {},
    destination: '',
  };

  static navigationOptions = ({ navigation }) => {
    function goBack() {
      navigation.goBack(null);
    }

    function todo() {
      console.warn('TODO');
    }

    return {
      headerLeft: <HeaderBackButton tintColor={Color.brand} onPress={goBack} />,
      headerTitle: (
        <HeaderTitle>
          <Translation id="mmb.trip_services.transportation.map.title" />
        </HeaderTitle>
      ),
      headerRight: (
        <HeaderButton.Right onPress={todo}>
          <HeaderButton.Text>
            <Translation id="mmb.trip_services.transportation.map.right_button" />
          </HeaderButton.Text>
        </HeaderButton.Right>
      ),
      headerStyle: {
        backgroundColor: Color.white,
        borderBottomWidth: 0,
      },
    };
  };

  openLocationPicker = () => {
    this.props.navigation.navigate('AddressPickerScreen');
  };

  openSettings = () => {
    Linking.openURL('app-settings:');
  };

  onRegionChange = (region: Region) => {
    this.setState({ region });
  };

  renderMarkerA = (e: NativeEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    this.setState(state => ({
      markers: {
        ...state.markers,
        markerA: {
          latitude,
          longitude,
        },
      },
    }));
  };

  renderMarkerB = (e: NativeEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    this.getFormattedAddress(latitude, longitude);
    this.setState(state => ({
      markers: {
        ...state.markers,
        markerB: {
          latitude,
          longitude,
        },
      },
    }));
  };

  getFormattedAddress = async (latitude: number, longitude: number) => {
    const address = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBe164u1hIv7BMeGWG0alICABGscZlziek`,
    )
      .then(res => res.json())
      .then(json => json.results[0].address_components);

    const city = (address.find(x => x.types.includes('locality')) || {})
      .long_name;
    const route = (address.find(x => x.types.includes('route')) || {})
      .long_name;
    const streetNumber = (
      address.find(x => x.types.includes('street_number')) || {}
    ).long_name;

    const area = (
      address.find(x => x.types.includes('administrative_area_level_1')) || {}
    ).long_name;

    const streetAddress =
      route !== undefined && streetNumber !== undefined
        ? route.concat(' ', streetNumber)
        : route;

    const formattedAddress = [city, streetAddress, area]
      .filter(item => item !== undefined)
      .join(', ');

    this.setState({
      destination: formattedAddress,
    });
  };

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0375,
          longitudeDelta: 0.0349,
        };

        this.setState({
          region: region,
        });
      },
      () => {
        return Alert.translatedAlert(
          undefined,
          {
            id: 'mmb.trip_services.transportation.map.current_position_alert',
          },
          [
            {
              text: { passThrough: 'OK' },
              undefined,
              style: 'default',
            },
            {
              text: { passThrough: 'Settings' },
              onPress: this.openSettings,
              style: 'default',
            },
          ],
        );
      },
    );
  };

  render() {
    const { markerA, markerB } = this.state.markers;
    const { destination } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MarkerLocationButton
          destination={destination}
          onPress={this.openLocationPicker}
        />
        <View style={{ flex: 1 }}>
          <MapView
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChange}
            onPress={this.renderMarkerB}
            onLongPress={this.renderMarkerA}
            scrollEnabled={true}
            style={[StyleSheet.absoluteFillObject, styles.mapBottom]}
          >
            {markerA &&
              markerA.latitude &&
              markerA.longitude && (
                <MapView.Marker
                  coordinate={{
                    latitude: markerA.latitude,
                    longitude: markerA.longitude,
                  }}
                >
                  <DropMarker size={30} />
                </MapView.Marker>
              )}
            {markerB &&
              markerB.latitude &&
              markerB.longitude && (
                <MapView.Marker
                  coordinate={{
                    latitude: markerB.latitude,
                    longitude: markerB.longitude,
                  }}
                >
                  <DropMarker size={30} color={Color.orange.normal} />
                </MapView.Marker>
              )}
          </MapView>
        </View>
        <CurrentPositionButton onPress={this.getCurrentPosition} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapBottom: {
    android: {
      bottom: -25,
    },
  },
});

export default TransportationMap;
