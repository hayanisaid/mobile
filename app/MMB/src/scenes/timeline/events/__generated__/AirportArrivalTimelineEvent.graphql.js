/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type AirportArrivalTimelineEvent$ref: FragmentReference;
export type AirportArrivalTimelineEvent = {|
  +timestamp: ?any,
  +location: ?{|
    +airport: ?{|
      +locationId: ?string,
      +name: ?string,
    |}
  |},
  +$refType: AirportArrivalTimelineEvent$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "AirportArrivalTimelineEvent",
  "type": "AirportArrivalTimelineEvent",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "timestamp",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "location",
      "storageKey": null,
      "args": null,
      "concreteType": "RouteStop",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "airport",
          "storageKey": null,
          "args": null,
          "concreteType": "Location",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "locationId",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "name",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '7d8949cffbf26574a6730a5f2093c45f';
module.exports = node;
