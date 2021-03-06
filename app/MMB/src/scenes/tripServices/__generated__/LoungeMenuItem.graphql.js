/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type LocationPopupButton$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type LoungeMenuItem$ref: FragmentReference;
export type LoungeMenuItem = {|
  +lounge: ?{|
    +relevantAirports: ?$ReadOnlyArray<?{|
      +whitelabelURL: ?string,
      +location: ?{|
        +$fragmentRefs: LocationPopupButton$ref
      |},
    |}>
  |},
  +$refType: LoungeMenuItem$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "LoungeMenuItem",
  "type": "WhitelabeledServices",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "lounge",
      "storageKey": null,
      "args": null,
      "concreteType": "LoungeService",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "relevantAirports",
          "storageKey": null,
          "args": null,
          "concreteType": "LoungeServiceRelevantAirports",
          "plural": true,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "whitelabelURL",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "location",
              "storageKey": null,
              "args": null,
              "concreteType": "Location",
              "plural": false,
              "selections": [
                {
                  "kind": "FragmentSpread",
                  "name": "LocationPopupButton",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
// prettier-ignore
(node/*: any*/).hash = '681e3b6818a52aa4d89fee568b80a528';
module.exports = node;
