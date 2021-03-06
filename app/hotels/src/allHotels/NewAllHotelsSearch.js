// @flow strict

import * as React from 'react';
import { graphql, PublicApiRenderer } from '@kiwicom/mobile-relay';
import { DateFormatter, Translation } from '@kiwicom/mobile-localization';
import { GeneralError } from '@kiwicom/mobile-shared';

import {
  withHotelsFilterContext,
  type HotelsFilterState,
} from '../HotelsFilterContext';
import {
  type RoomConfigurationType,
  type HotelsContextState,
  withHotelsContext,
} from '../HotelsContext';
import { sanitizeHotelFacilities } from '../GraphQLSanitizers';
import type { NewAllHotelsSearchQueryResponse } from './__generated__/NewAllHotelsSearchQuery.graphql';
import HotelsPaginationContainer from './HotelsPaginationContainer';

type Props = {|
  +checkin: Date | null,
  +checkout: Date | null,
  +currency: string,
  +roomsConfiguration: RoomConfigurationType | null,
  +cityId: string | null,
  +orderBy: $PropertyType<HotelsFilterState, 'orderBy'>,
  +filterParams: $PropertyType<HotelsFilterState, 'filterParams'>,
|};

class NewAllHotelsSearch extends React.Component<Props> {
  renderAllHotelsSearchList = (
    propsFromRenderer: NewAllHotelsSearchQueryResponse,
  ) => {
    return <HotelsPaginationContainer data={propsFromRenderer} />;
  };

  render() {
    const {
      cityId,
      checkin,
      checkout,
      roomsConfiguration,
      currency,
      orderBy,
      filterParams,
    } = this.props;
    if (checkin === null || checkout === null) {
      return (
        <GeneralError
          errorMessage={
            <Translation id="hotels_search.all_hotels_search.date_error" />
          }
        />
      );
    }
    return (
      <PublicApiRenderer
        query={graphql`
          query NewAllHotelsSearchQuery(
            $search: HotelsSearchInput!
            $filter: HotelsFilterInput!
            $options: AvailableHotelOptionsInput
            $first: Int
            $after: String
          ) {
            ...HotelsPaginationContainer
          }
        `}
        variables={{
          search: {
            cityId,
            checkin: DateFormatter(checkin).formatForMachine(),
            checkout: DateFormatter(checkout).formatForMachine(),
            roomsConfiguration,
          },
          filter: {
            ...filterParams,
            hotelFacilities: sanitizeHotelFacilities(
              filterParams.hotelFacilities,
            ),
          },
          first: 50,
          options: {
            currency,
            orderBy,
          },
        }}
        render={this.renderAllHotelsSearchList}
      />
    );
  }
}

const selectHotelsFilterContext = ({
  orderBy,
  filterParams,
}: HotelsFilterState) => ({
  orderBy,
  filterParams,
});

const selectHotelsContext = (state: HotelsContextState) => ({
  checkin: state.checkin,
  checkout: state.checkout,
  currency: state.currency,
  roomsConfiguration: state.roomsConfiguration,
  cityId: state.cityId,
});

export default withHotelsContext(selectHotelsContext)(
  withHotelsFilterContext(selectHotelsFilterContext)(NewAllHotelsSearch),
);
