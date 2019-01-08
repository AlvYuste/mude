export const isMicrophoneAllowed = async cb => {
  const permission = await navigator.permissions.query({ name: 'microphone' });
  permission.onchange = cb;
  return permission.state !== 'denied';
};

export const getMicrophoneData = async cb => {
  if (!(await isMicrophoneAllowed())) {
    throw Error('The use of the microphone must be allowed');
  }
  const context = new AudioContext();
  const source = context.createMediaStreamSource(
    await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    }),
  );
  const processor = context.createScriptProcessor(1024, 1, 1);

  source.connect(processor);
  processor.connect(context.destination);

  processor.onaudioprocess = e => {
    console.log(e);
    console.log(e.inputBuffer);
    if (cb && typeof cb === 'function') {
      cb(e);
    }
  };
};
