// @flow

import * as React from 'react';
import { View, Linking } from 'react-native';
import MapView from 'react-native-maps';
import { HeaderBackButton } from 'react-navigation';
import { StyleSheet, PositionMarker, Color } from '@kiwicom/mobile-shared';
import {
  HeaderButton,
  HeaderTitle,
  type NavigationType,
} from '@kiwicom/mobile-navigation';
import { Translation, Alert } from '@kiwicom/mobile-localization';

import MarkerLocationButton from './transportation/MarkerLocationButton';
import CurrentPositionButton from './transportation/CurrentPositionButton';
import AddressLocationLegend from './transportation/AddressLocationLegend';

type State = {|
  region: Region,
  markers: Marker,
  destination: string,
  showUserLocation: boolean,
  currentLocation: Region,
|};

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

type Props = {|
  +navigation: NavigationType,
|};

export default class TransportationMap extends React.Component<Props, State> {
  state = {
    region: {
      latitude: 51.11,
      longitude: 17.032 - 0.005, // move center little bit right
      latitudeDelta: 0.0375,
      longitudeDelta: 0.0349,
    },
    markers: {},
    destination: '',
    showUserLocation: false,
    currentLocation: {
      latitude: 0,
      longitude: 0, // move center little bit right
      latitudeDelta: 0,
      longitudeDelta: 0,
    },
  };

  static navigationOptions = ({ navigation }: Props) => {
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

  openLocationPicker = async () => {
    const currentLocation = await this.getFormattedAddress(
      this.state.currentLocation.latitude,
      this.state.currentLocation.longitude,
    );

    this.props.navigation.navigate('AddressPickerScreen', {
      currentLocation: currentLocation,
    });
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
    this.setDestination(latitude, longitude);
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
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=API_KEY`,
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

    return formattedAddress;
  };

  setDestination = async (latitude: number, longitude: number) => {
    const destination = await this.getFormattedAddress(latitude, longitude);
    this.setState({
      destination: destination,
    });
  };

  getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0375,
          longitudeDelta: 0.0349,
        };

        this.setState(
          {
            currentLocation: currentLocation,
          },
          () => {
            return currentLocation;
          },
        );
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

  showUserLocation = () => {
    this.setState(state => ({
      region: state.currentLocation,
      showUserLocation: true,
    }));
  };

  componentDidMount() {
    this.getCurrentPosition();
  }

  render() {
    const { destination, showUserLocation, markers } = this.state;
    const { markerA, markerB } = markers;

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
            showsUserLocation={showUserLocation}
            userLocationAnnotationTitle=""
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
                  <PositionMarker code="j" />
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
                  <PositionMarker code="k" color={Color.orange.normal} />
                </MapView.Marker>
              )}
          </MapView>
        </View>
        <AddressLocationLegend />
        <CurrentPositionButton onPress={this.showUserLocation} />
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
