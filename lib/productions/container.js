import { Base } from "./base.js";
import { ExtendedAttributes } from "./extended-attributes.js";
import { unescape } from "./helpers.js";

/**
 * @param {import("../tokeniser.js").Tokeniser} tokeniser
 */
function inheritance(tokeniser) {
  const colon = tokeniser.consume(":");
  if (!colon) {
    return {};
  }
  const inheritance = tokeniser.consume("identifier") || tokeniser.error("Inheritance lacks a type");
  return { colon, inheritance };
}

export class Container extends Base {
    /**
     * @param {import("../tokeniser.js").Tokeniser} tokeniser
     * @param {*} instance
     * @param {*} args
     */
    ////add argument enableMozillaBodylessInterface to parse(tokeniser, instance, { type, inheritable, allowedMembers})
    static parse(tokeniser, instance, { type, inheritable, allowedMembers,enableMozillaBodylessInterface }) {
      const { tokens } = instance;
      tokens.name = tokeniser.consume("identifier") || tokeniser.error(`Missing name in ${instance.type}`);
      tokeniser.current = instance;
      if (inheritable) {
        Object.assign(tokens, inheritance(tokeniser));
      }
      ////
      ////console.log(enableMozillaBodylessInterface)
      ////
      /*permit Bodyless*/
      tokens.open = tokeniser.consume("{")
      if(!tokens.open && (enableMozillaBodylessInterface===true)) {
          tokens.termination = tokeniser.consume(";") || tokeniser.error(`Missing semicolon after ${type}`);
          return instance;
      } else  {
          tokens.open ||  tokeniser.error(`Bodyless ${type}`);
      } 
      /**/      
      ////tokens.open = tokeniser.consume("{") || tokeniser.error(`Bodyless ${type}`);
      instance.members = [];
      while (true) {
        tokens.close = tokeniser.consume("}");
        if (tokens.close) {
          tokens.termination = tokeniser.consume(";") || tokeniser.error(`Missing semicolon after ${type}`);
          return instance;
        }
        const ea = ExtendedAttributes.parse(tokeniser);
        let mem;
        for (const [parser, ...args] of allowedMembers) {
          mem = parser(tokeniser, ...args);
          if (mem) {
            break;
          }
        }
        if (!mem) {
          tokeniser.error("Unknown member");
        }
        mem.extAttrs = ea;
        instance.members.push(mem);
      }
    }

    get partial() {
      return !!this.tokens.partial;
    }
    get name() {
      return unescape(this.tokens.name.value);
    }
    get inheritance() {
      if (!this.tokens.inheritance) {
        return null;
      }
      return unescape(this.tokens.inheritance.value);
    }

    *validate(defs) {
      for (const member of this.members) {
        if (member.validate) {
          yield* member.validate(defs);
        }
      }
    }
  }
