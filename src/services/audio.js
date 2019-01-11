/**
 * PRIVATE METHODS
 */

const stopAllTracks = stream => stream.getTracks().map(track => track.stop());

const processAudioStream = (stream, onProcessCallback) => {
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);
  source.connect(processor);
  processor.connect(context.destination);
  processor.addEventListener('audioprocess', onProcessCallback);
  stream.addEventListener('inactive', () =>
    processor.removeEventListener('audioprocess', onProcessCallback),
  );
};

const isMicrophoneAllowed = async cb => {
  const permission = await navigator.permissions.query({ name: 'microphone' });
  permission.onchange = cb;
  return permission.state !== 'denied';
};

const getAudioStream = () =>
  navigator.mediaDevices.getUserMedia({
    audio: true,
  });

const playStream = stream => {
  const audioElement = document.createElement('audio');
  document.documentElement.appendChild(audioElement);
  audioElement.srcObject = stream;
  audioElement.play();
  stream.addEventListener('inactive', () => audioElement.remove());
};

/**
 * PUBLIC METHODS
 */

export const askMicrophonePermission = () =>
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => stopAllTracks(stream))
    .catch(() => {
      throw Error('The use of the microphone must be allowed');
    });

export const getMicrophoneData = async ({
  onData = () => {},
  onFinish = () => {},
}) => {
  if (!(await isMicrophoneAllowed())) {
    throw new Error('The use of the microphone must be allowed');
  }
  const stream = await getAudioStream();
  processAudioStream(stream, onData);
  playStream(stream);
  const recorder = new MediaRecorder(stream);
  recorder.start();
  recorder.ondataavailable = event => {
    stopAllTracks(stream);
    onFinish(event.data);
  };
  return { stream, recorder };
};
