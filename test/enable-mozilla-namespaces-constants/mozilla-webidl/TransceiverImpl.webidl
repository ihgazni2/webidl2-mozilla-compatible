/* -*- Mode: IDL; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */

/* This Source Code Form is subject to the terms of the Mozilla Public

 * License, v. 2.0. If a copy of the MPL was not distributed with this file,

 * You can obtain one at http://mozilla.org/MPL/2.0/.

 *

 * PeerConnection.js' interface to the C++ TransceiverImpl.

 *

 * Do not confuse with RTCRtpTransceiver. This interface is purely for

 * communication between the PeerConnection JS DOM binding and the C++

 * implementation.

 *

 * See media/webrtc/signaling/src/peerconnection/TransceiverImpl.h

 *

 */



// Constructed by PeerConnectionImpl::CreateTransceiverImpl.

[ChromeOnly]

interface TransceiverImpl {

  MediaStreamTrack getReceiveTrack();

  void setReceiveTrackMuted(boolean muted);

  [Throws]

  void syncWithJS(RTCRtpTransceiver transceiver);

};


