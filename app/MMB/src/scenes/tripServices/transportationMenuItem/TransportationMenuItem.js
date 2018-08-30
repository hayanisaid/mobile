// @flow strict

import * as React from 'react';
import { graphql, createFragmentContainer } from '@kiwicom/mobile-relay';
import { TextIcon } from '@kiwicom/mobile-shared';
import { Translation } from '@kiwicom/mobile-localization';
import {
  MenuItem,
  withNavigation,
  type NavigationType,
} from '@kiwicom/mobile-navigation';
import idx from 'idx';

import LocationsPopup from '../LocationsPopup';
import TransportLocationItem from './TransportLocationItem';
import type { TransportationMenuItem as TransportationMenuItemType } from './__generated__/TransportationMenuItem.graphql';

type Props = {|
  +data: TransportationMenuItemType,
  +onOpenWebview: string => void,
  +navigation: NavigationType,
|};

type State = {|
  isPopupVisible: boolean,
|};

type MapParams = {|
  +location: {| +lat: ?number, +lng: ?number |},
  +whitelabelURL: string,
|};

class TransportationMenuItem extends React.Component<Props, State> {
  state = {
    isPopupVisible: false,
  };

  openTransportationMap = (params: MapParams) => {
    this.setState(
      {
        isPopupVisible: false,
      },
      () => this.props.navigation.navigate('TransportationMap', { params }),
    );
  };

  openPopup = () => {
    const relevantLocations =
      idx(this.props, _ => _.data.transportation.relevantLocations) || [];
    if (relevantLocations.length === 1) {
      // do not open the modal for only one whitelabel URL (open it directly)
      const whitelabelURL =
        idx(relevantLocations, _ => _[0].whitelabelURL) || '';

      const location = idx(relevantLocations, _ => _[0].location.location);

      if (location != null) {
        this.openTransportationMap({ location, whitelabelURL });
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.openTransportationMap({
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            whitelabelURL,
          });
        });
      }
      return;
    }

    this.setState({
      isPopupVisible: true,
    });
  };

  hidePopup = () => {
    this.setState({
      isPopupVisible: false,
    });
  };

  render = () => {
    const transport = idx(this.props, _ => _.data.transportation);

    if (!transport) {
      return null;
    }

    const relevantLocations = idx(transport, _ => _.relevantLocations) || [];

    return (
      <React.Fragment>
        <LocationsPopup
          isVisible={this.state.isPopupVisible}
          onClose={this.hidePopup}
        >
          {relevantLocations.map(relevantLocation => {
            if (!relevantLocation) {
              return null;
            }
            const { whitelabelURL, location, date } = relevantLocation;
            const currentCityName = idx(location, _ => _.city.name);
            return (
              <TransportLocationItem
                key={whitelabelURL}
                data={location}
                date={date}
                displayDate={
                  relevantLocations.filter(_relevantLocation => {
                    const cityName = idx(
                      _relevantLocation,
                      _ => _.location.city.name,
                    );
                    return (
                      cityName &&
                      currentCityName &&
                      cityName === currentCityName
                    );
                  }).length !== 1
                }
                whitelabelURL={whitelabelURL}
                onPress={this.openTransportationMap}
                displayIata={false}
              />
            );
          })}
        </LocationsPopup>

        <MenuItem
          title={
            <Translation id="mmb.trip_services.local_services.transportation" />
          }
          onPress={this.openPopup}
          icon={<TextIcon code=";" />}
        />
      </React.Fragment>
    );
  };
}

export default createFragmentContainer(
  withNavigation(TransportationMenuItem),
  graphql`
    fragment TransportationMenuItem on WhitelabeledServices {
      transportation {
        relevantLocations {
          whitelabelURL
          location {
            ...TransportLocationItem
            location {
              lat
              lng
            }
            city {
              name
            }
          }
          date
        }
      }
    }
  `,
);
