/* -*- Mode: IDL; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */

/* This Source Code Form is subject to the terms of the Mozilla Public

 * License, v. 2.0. If a copy of the MPL was not distributed with this file,

 * You can obtain one at http://mozilla.org/MPL/2.0/.

 *

 * The origin of this IDL file is

 * http://www.whatwg.org/specs/web-apps/current-work/#the-fieldset-element

 *

 * © Copyright 2004-2011 Apple Computer, Inc., Mozilla Foundation, and

 * Opera Software ASA. You are granted a license to use, reproduce

 * and create derivative works of this document.

 */



[HTMLConstructor]

interface HTMLFieldSetElement : HTMLElement {

  [CEReactions, SetterThrows]

           attribute boolean disabled;

  readonly attribute HTMLFormElement? form;

  [CEReactions, SetterThrows]

           attribute DOMString name;



  readonly attribute DOMString type;



  readonly attribute HTMLCollection elements;



  readonly attribute boolean willValidate;

  readonly attribute ValidityState validity;

  [Throws]

  readonly attribute DOMString validationMessage;



  boolean checkValidity();

  boolean reportValidity();



  void setCustomValidity(DOMString error);

};
