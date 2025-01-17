/* -*- Mode: IDL; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */

/* This Source Code Form is subject to the terms of the Mozilla Public

 * License, v. 2.0. If a copy of the MPL was not distributed with this file,

 * You can obtain one at http://mozilla.org/MPL/2.0/.

 *

 * The origin of this IDL file is

 * https://w3c.github.io/navigation-timing/#the-performancenavigation-interface

 *

 * Copyright © 2012 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C

 * liability, trademark and document use rules apply.

 */



interface PerformanceNavigation {

  const unsigned short TYPE_NAVIGATE = 0;

  const unsigned short TYPE_RELOAD = 1;

  const unsigned short TYPE_BACK_FORWARD = 2;

  const unsigned short TYPE_RESERVED = 255;



  readonly attribute unsigned short type;

  readonly attribute unsigned short redirectCount;



  [Default] object toJSON();

};
