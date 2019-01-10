import * as audioUtils from '../utils/audio';

export const getMicrophoneData = async ({
  onData = () => {},
  onFinish = () => {},
}) => {
  if (!(await audioUtils.isMicrophoneAllowed())) {
    throw new Error('The use of the microphone must be allowed');
  }
  const stream = await audioUtils.getAudioStream();
  audioUtils.processAudioStream(stream, onData);
  audioUtils.playStream(stream);
  const recorder = new MediaRecorder(stream);
  recorder.start();
  recorder.ondataavailable = event => {
    audioUtils.stopAllTracks(stream);
    onFinish(event.data);
  };
  return { stream, recorder };
};
