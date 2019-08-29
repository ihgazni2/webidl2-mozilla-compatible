import { Container } from "./container.js";
import { Attribute } from "./attribute.js";
import { Operation } from "./operation.js";
import { Constant } from "./constant.js";
import { IterableLike } from "./iterable.js";
import { stringifier, autofixAddExposedWindow } from "./helpers.js";
import { validationError } from "../error.js";
import { checkInterfaceMemberDuplication } from "../validators/interface.js";

/**
 * @param {import("../tokeniser").Tokeniser} tokeniser
 */
function static_member(tokeniser,{enableMozillaAttributeSequence}) {
  const special = tokeniser.consume("static");
  if (!special) return;
  const member = Attribute.parse(tokeniser, { special }) ||
    Operation.parse(tokeniser, { special }) ||
    tokeniser.error("No body in static member");
  return member;
}

export class Interface extends Container {
  /**
   * @param {import("../tokeniser").Tokeniser} tokeniser
   */ 

  ////add argument enableMozillaBodylessInterface
  ////enableMozillaAttributeSequence
  static parse(tokeniser, base, { partial = null ,enableMozillaBodylessInterface,enableMozillaAttributeSequence} = {}) {
    ////
    ////
    const tokens = { partial, base };
    return Container.parse(tokeniser, new Interface({ source: tokeniser.source, tokens }), {
      type: "interface",
      inheritable: !partial,
      allowedMembers: [
        ////enableMozillaAttributeSequence
        [Constant.parse,{enableMozillaAttributeSequence}],
        ////enableMozillaAttributeSequence
        [static_member,{enableMozillaAttributeSequence}],
        [stringifier],
        [IterableLike.parse],
        ////enableMozillaAttributeSequence
        [Attribute.parse,{enableMozillaAttributeSequence}],
        [Operation.parse]
      ],
      ////
      enableMozillaBodylessInterface,
      enableMozillaAttributeSequence
    });
  }

  get type() {
    return "interface";
  }

  *validate(defs) {
    yield* this.extAttrs.validate(defs);
    if (
      !this.partial &&
      this.extAttrs.every(extAttr => extAttr.name !== "Exposed") &&
      this.extAttrs.every(extAttr => extAttr.name !== "NoInterfaceObject")
    ) {
      const message = `Interfaces must have \`[Exposed]\` extended attribute. \
To fix, add, for example, \`[Exposed=Window]\`. Please also consider carefully \
if your interface should also be exposed in a Worker scope. Refer to the \
[WebIDL spec section on Exposed](https://heycam.github.io/webidl/#Exposed) \
for more information.`;
      yield validationError(this.source, this.tokens.name, this, message, {
        autofix: autofixAddExposedWindow(this)
      });
    }

    yield* super.validate(defs);
    if (!this.partial) {
      yield* checkInterfaceMemberDuplication(defs, this);
    }
  }
}
