import { Container } from "./container.js";
import { Attribute } from "./attribute.js";
import { Operation } from "./operation.js";
import { validationError } from "../error.js";
import { autofixAddExposedWindow } from "./helpers.js";


import {Constant} from "./constant.js";
////import Constant  for  adding Constant.parse to allowedMembers



export class Namespace extends Container {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */
  static parse(tokeniser, { partial,enableMozillaNamespacesConstants } = {}) {
    //// add argument  options.enableMozillaNamespacesConstants to parse
    const tokens = { partial };
    tokens.base = tokeniser.consume("namespace");
    if (!tokens.base) {
      return;
    }
    /*for enable-mozilla-namespaces-constants*/
    let allowedMembers;
    if(enableMozillaNamespacesConstants === true) {
        allowedMembers = [
          [Constant.parse],
          ////add const parse 
          [Attribute.parse, { noInherit: true, readonly: true }],
          [Operation.parse, { regular: true }],
         ]
    } else {
        allowedMembers = [
          [Attribute.parse, { noInherit: true, readonly: true }],
          [Operation.parse, { regular: true }],
         ]

    }
    return Container.parse(tokeniser, new Namespace({ source: tokeniser.source, tokens }), {
      type: "namespace",
      allowedMembers: allowedMembers
      ////depends on (enableMozillaNamespacesConstants === true)
    });
  }

  get type() {
    return "namespace";
  }

  *validate(defs) {
    if (!this.partial && this.extAttrs.every(extAttr => extAttr.name !== "Exposed")) {
      const message = `Namespaces must have [Exposed] extended attribute. \
To fix, add, for example, [Exposed=Window]. Please also consider carefully \
if your namespace should also be exposed in a Worker scope. Refer to the \
[WebIDL spec section on Exposed](https://heycam.github.io/webidl/#Exposed) \
for more information.`;
      yield validationError(this.source, this.tokens.name, this, message, {
        autofix: autofixAddExposedWindow(this)
      });
    }
    yield* super.validate(defs);
  }
}
