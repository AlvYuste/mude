/**
 * PRIVATE METHODS
 */

const stopAllTracks = stream => stream.getTracks().map(track => track.stop());

const processAudioStream = (stream, onProcessCallback) => {
  const context = new AudioContext();
  const src = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor();
  const dest = context.destination;
  src.connect(processor);
  processor.connect(dest);
  processor.addEventListener('audioprocess', onProcessCallback);
  src.addEventListener('ended', () => {
    src.disconnect(processor);
    processor.disconnect(dest);
  });
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
  processAudioStream(stream, ({ inputBuffer }) =>
    onData({
      l: inputBuffer.getChannelData(0),
      r: inputBuffer.getChannelData(1),
      length: inputBuffer.getChannelData(0).length,
    }),
  );
  playStream(stream);
  const recorder = new MediaRecorder(stream);
  recorder.start();
  recorder.ondataavailable = event => {
    stopAllTracks(stream);
    onFinish(event.data);
  };
  return { stream, recorder };
};

export const getBlobDuration = blob => {
  const audioEl = document.createElement('audio');

  const durationPromise = new Promise(resolve =>
    audioEl.addEventListener('loadedmetadata', () => {
      // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
      if (audioEl.duration === Infinity) {
        audioEl.currentTime = Number.MAX_SAFE_INTEGER;
        audioEl.ontimeupdate = () => {
          audioEl.ontimeupdate = null;
          resolve(audioEl.duration);
          audioEl.currentTime = 0;
        };
      }
      // Normal behavior
      else resolve(audioEl.duration);
    }),
  );

  audioEl.src = window.URL.createObjectURL(blob);

  return durationPromise;
};
