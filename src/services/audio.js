import * as audioUtils from '../utils/audio';

export const getMicrophoneData = async ({
  next = () => {},
  finish = () => {},
}) => {
  if (!(await audioUtils.isMicrophoneAllowed())) {
    throw new Error('The use of the microphone must be allowed');
  }
  const stream = await audioUtils.getAudioStream();
  audioUtils.processAudioStream(stream, next);
  audioUtils.playStream(stream);
  const recorder = new MediaRecorder(stream);
  recorder.start();
  recorder.ondataavailable = event => {
    audioUtils.stopAllTracks(stream);
    finish(event.data);
  };
  // TODO: Remove the timeout
  setTimeout(() => recorder.stop(), 5000);

  return { stream, recorder };
};
