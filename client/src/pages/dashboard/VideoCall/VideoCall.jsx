

import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import * as React from 'react';
import { useParams } from 'react-router-dom';


function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const VideoCall = () => {
  const { id } = useParams();
  const roomID = getUrlParams().get('roomID') || id;
      let myMeeting = async (element) => {
     // generate Kit Token
      const appID = 1297054783;
      const serverSecret = "9a5f4732a88be40c656a7c7b7746bd79";
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,randomID(5),randomID(5));


     // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
             window.location.protocol + '//' + 
             window.location.host + window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });
  };
 // console.log(myMeeting);

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '70vw', height: '90vh' }}
    ></div>
  );
};

export default VideoCall;