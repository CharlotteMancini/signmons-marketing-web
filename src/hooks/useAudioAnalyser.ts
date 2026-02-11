import { useEffect, useRef } from 'react';

type AudioAnalyserOptions = {
  enabled?: boolean;
  fftSize?: number;
  smoothingTimeConstant?: number;
  minDecibels?: number;
  maxDecibels?: number;
};

const useAudioAnalyser = (options: AudioAnalyserOptions = {}) => {
  const {
    enabled = true,
    fftSize = 1024,
    smoothingTimeConstant = 0.8,
    minDecibels = -90,
    maxDecibels = -10,
  } = options;
  const amplitudeRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    if (!navigator.mediaDevices?.getUserMedia) return;

    let rafId = 0;
    let analyser: AnalyserNode | null = null;
    let audioContext: AudioContext | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let stream: MediaStream | null = null;
    let isMounted = true;

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (!isMounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        audioContext = new AudioContext();
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

        analyser = audioContext.createAnalyser();
        analyser.fftSize = fftSize;
        analyser.smoothingTimeConstant = smoothingTimeConstant;
        analyser.minDecibels = minDecibels;
        analyser.maxDecibels = maxDecibels;

        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);

        const data = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          if (!analyser) return;
          analyser.getByteFrequencyData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i += 1) {
            sum += data[i];
          }
          amplitudeRef.current = sum / data.length / 255;
          rafId = requestAnimationFrame(tick);
        };

        tick();
      } catch {
        amplitudeRef.current = 0;
      }
    };

    void start();

    return () => {
      isMounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (source) source.disconnect();
      if (analyser) analyser.disconnect();
      if (audioContext) void audioContext.close();
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [enabled, fftSize, smoothingTimeConstant, minDecibels, maxDecibels]);

  return amplitudeRef;
};

export default useAudioAnalyser;
