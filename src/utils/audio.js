export const stopAllTracks = stream =>
  stream.getTracks().map(track => track.stop());

export const processAudioStream = (stream, onProcessCallback) => {
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

export const askMicrophonePermission = () =>
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => stopAllTracks(stream))
    .catch(() => {
      throw Error('The use of the microphone must be allowed');
    });

export const isMicrophoneAllowed = async cb => {
  const permission = await navigator.permissions.query({ name: 'microphone' });
  permission.onchange = cb;
  return permission.state !== 'denied';
};

export const getAudioStream = () =>
  navigator.mediaDevices.getUserMedia({
    audio: true,
  });

export const playStream = stream => {
  const audioElement = document.createElement('audio');
  document.documentElement.appendChild(audioElement);
  audioElement.srcObject = stream;
  audioElement.play();
  stream.addEventListener('inactive', () => audioElement.remove());
};
