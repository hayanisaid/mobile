/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type TravelDocumentPassengerMenuItem$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type PassengerTravelDocumentMenuGroup$ref: FragmentReference;
export type PassengerTravelDocumentMenuGroup = {|
  +passengers: ?$ReadOnlyArray<?{|
    +databaseId: ?number,
    +$fragmentRefs: TravelDocumentPassengerMenuItem$ref,
  |}>,
  +$refType: PassengerTravelDocumentMenuGroup$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "PassengerTravelDocumentMenuGroup",
  "type": "BookingInterface",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "passengers",
      "storageKey": null,
      "args": null,
      "concreteType": "Passenger",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "databaseId",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "FragmentSpread",
          "name": "TravelDocumentPassengerMenuItem",
          "args": null
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '4f5856bc20258c6a1362f7d637ccc41f';
module.exports = node;
