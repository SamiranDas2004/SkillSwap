// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
// import { Camera } from 'expo-camera';
// import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

// const Video = () => {
//   const [localStream, setLocalStream] = useState<any>(null);
//   const [remoteStream, setRemoteStream] = useState<any>(null);
//   const [isCalling, setIsCalling] = useState(false);
//   const peerConnection = useRef<any>(null);

//   // Initialize WebRTC
//   const setupWebRTC = async () => {
//     // Configure STUN servers
//     const configuration = {
//       iceServers: [
//         {
//           urls: [
//             'stun:stun1.l.google.com:19302',
//             'stun:stun2.l.google.com:19302',
//           ],
//         },
//       ],
//     };

//     // Create peer connection
//     peerConnection.current = new RTCPeerConnection(configuration);

//     // Get local stream
//     const stream = await mediaDevices.getUserMedia({
//       audio: true,
//       video: {
//         facingMode: 'user',
//       },
//     });

//     setLocalStream(stream);

//     // Add stream to peer connection
//     stream.getTracks().forEach((track) => {
//       peerConnection.current.addTrack(track, stream);
//     });

//     // Handle incoming stream
//     peerConnection.current.ontrack = (event:any) => {
//       setRemoteStream(event.streams[0]);
//     };
//   };

//   // Start call
//   const startCall = async () => {
//     setIsCalling(true);
    
//     try {
//       // Create and set local description
//       const offer = await peerConnection.current.createOffer();
//       await peerConnection.current.setLocalDescription(offer);

//       // Here you would typically send the offer to the other peer through your signaling server
//       // For demo purposes, we'll just log it
//       console.log('Offer created:', offer);
//     } catch (error) {
//       console.error('Error starting call:', error);
//     }
//   };

//   // End call
//   const endCall = () => {
//     if (peerConnection.current) {
//       peerConnection.current.close();
//     }
//     if (localStream) {
//       localStream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
//     }
//     setLocalStream(null);
//     setRemoteStream(null);
//     setIsCalling(false);
//   };

//   // Initialize WebRTC when component mounts
//   useEffect(() => {
//     setupWebRTC();
//     return () => {
//       endCall();
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* Local video stream */}
//       <View style={styles.localVideo}>
//         {localStream && (
//           <RTCView
//             streamURL={localStream.toURL()}
//             style={styles.videoStream}
//             objectFit="cover"
//           />
//         )}
//       </View>

//       {/* Remote video stream */}
//       <View style={styles.remoteVideo}>
//         {remoteStream ? (
//           <RTCView
//             streamURL={remoteStream.toURL()}
//             style={styles.videoStream}
//             objectFit="cover"
//           />
//         ) : (
//           <View style={styles.noRemoteStream}>
//             <Text style={styles.noRemoteStreamText}>
//               Waiting for peer to connect...
//             </Text>
//           </View>
//         )}
//       </View>

//       {/* Call controls */}
//       <View style={styles.controls}>
//         {!isCalling ? (
//           <Button title="Start Call" onPress={startCall} />
//         ) : (
//           <Button title="End Call" onPress={endCall} color="red" />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   localVideo: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     width: 100,
//     height: 150,
//     backgroundColor: '#444',
//     zIndex: 1,
//   },
//   remoteVideo: {
//     flex: 1,
//     backgroundColor: '#444',
//   },
//   videoStream: {
//     flex: 1,
//   },
//   noRemoteStream: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noRemoteStreamText: {
//     color: '#fff',
//   },
//   controls: {
//     position: 'absolute',
//     bottom: 20,
//     left: 0,
//     right: 0,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Video;