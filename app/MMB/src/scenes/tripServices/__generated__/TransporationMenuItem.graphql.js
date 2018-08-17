/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteFragment } from 'relay-runtime';
type LocationPopupButton$ref = any;
import type { FragmentReference } from "relay-runtime";
declare export opaque type TransporationMenuItem$ref: FragmentReference;
export type TransporationMenuItem = {|
  +lounge: ?{|
    +relevantAirports: ?$ReadOnlyArray<?{|
      +whitelabelURL: ?string,
      +location: ?{|
        +$fragmentRefs: LocationPopupButton$ref
      |},
    |}>
  |},
  +$refType: TransporationMenuItem$ref,
|};
*/


const node/*: ConcreteFragment*/ = {
  "kind": "Fragment",
  "name": "TransporationMenuItem",
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
(node/*: any*/).hash = '5514c09dbdd966d7c0bcf13d07aa2dbe';
module.exports = node;
