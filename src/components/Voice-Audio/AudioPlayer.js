import React, { useState, useEffect, useRef } from "react";

//MUI
import { Box, IconButton, Paper, Stack, Select, MenuItem } from "@mui/material";
import {
  PlayArrow,
  Pause,
  CloudUpload,
  Mic,
  Stop,
  Delete,
  Save,
} from "@mui/icons-material";

//values
import { TITLE, TITLE_THICK, CONTENT } from "../values/Fonts";

const AudioPlayer = () => {
  // Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [waveformData, setWaveformData] = useState([]);
  const [animatedHeights, setAnimatedHeights] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState("audio/wav");
  const [recordingWaveform, setRecordingWaveform] = useState([]);

  // Refs
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const animationFrameRef = useRef();
  const analyserRef = useRef(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const calculateWaveform = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const padding = Math.floor(containerWidth * 0.05);
      const availableWidth = containerWidth - padding;
      const barWidth = Math.max(2, Math.floor(containerWidth * 0.006));
      const gap = Math.max(1, Math.floor(containerWidth * 0.003));
      const numBars = Math.floor(availableWidth / (barWidth + gap));
      const staticWaveform = Array(numBars)
        .fill()
        .map(() => Math.random() * 0.5 + 0.2);
      setWaveformData(staticWaveform);
      setAnimatedHeights(staticWaveform);
    }
  };

  const animateWaves = () => {
    if (!isPlaying || !waveformData.length) return;

    setAnimatedHeights((prev) =>
      prev.map((height, i) => {
        const baseHeight = waveformData[i];
        const maxHeight = baseHeight * 2.5;
        const minHeight = baseHeight * 0.5;
        const randomHeight =
          minHeight + Math.random() * (maxHeight - minHeight);
        const smoothing = 0.05;
        return height + (randomHeight - height) * smoothing;
      })
    );

    animationFrameRef.current = requestAnimationFrame(animateWaves);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported(selectedFormat)
        ? selectedFormat
        : "audio/webm;codecs=opus";

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => setRecordedChunks(chunks);

      mediaRecorder.start(100);
      setIsRecording(true);
      visualizeRecording();
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const visualizeRecording = () => {
    if (!isRecording) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    const normalizedData = Array.from(dataArray)
      .slice(0, 32)
      .map((value) => value / 255);

    setRecordingWaveform(normalizedData);
    animationFrameRef.current = requestAnimationFrame(visualizeRecording);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const generateWaveform = async (arrayBuffer) => {
    const audioContext = audioContextRef.current;
    const decodedBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channelData = decodedBuffer.getChannelData(0);

    const containerWidth = containerRef.current?.clientWidth || 800;
    const padding = Math.floor(containerWidth * 0.05);
    const availableWidth = containerWidth - padding;
    const barWidth = Math.max(2, Math.floor(containerWidth * 0.006));
    const gap = Math.max(1, Math.floor(containerWidth * 0.003));
    const maxBars = Math.floor(availableWidth / (barWidth + gap));
    const compressionRatio = Math.ceil(channelData.length / maxBars);
    const numBars = Math.floor(channelData.length / compressionRatio);

    const blockSize = compressionRatio;
    const dataPoints = [];

    for (let i = 0; i < numBars; i++) {
      const start = blockSize * i;
      const end = start + blockSize;
      let sum = 0;

      for (let j = start; j < end; j++) {
        sum += Math.abs(channelData[j] || 0);
      }

      const average = sum / blockSize;
      const normalizedValue = Math.min(average * 4, 1);
      dataPoints.push(Math.max(0.2, normalizedValue));
    }

    setWaveformData(dataPoints);
    setAudioBuffer(decodedBuffer);
    setDuration(decodedBuffer.duration);
  };

  const previewRecording = () => {
    if (recordedChunks.length === 0) return;

    stopRecording();
    setIsPreviewing(true);

    const blob = new Blob(recordedChunks, { type: selectedFormat });
    const url = URL.createObjectURL(blob);
    audioRef.current.src = url;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const arrayBuffer = e.target.result;
      await generateWaveform(arrayBuffer);
    };
    reader.readAsArrayBuffer(blob);
  };

  const encodeWAV = (samples, sampleRate) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    // RIFF identifier
    writeString(view, 0, "RIFF");
    // file length
    view.setUint32(4, 36 + samples.length * 2, true);
    // RIFF type
    writeString(view, 8, "WAVE");
    // format chunk identifier
    writeString(view, 12, "fmt ");
    // format chunk length
    view.setUint32(16, 16, true);
    // sample format (raw)
    view.setUint16(20, 1, true);
    // channel count
    view.setUint16(22, 1, true);
    // sample rate
    view.setUint32(24, sampleRate, true);
    // byte rate (sample rate * block align)
    view.setUint32(28, sampleRate * 4, true);
    // block align (channel count * bytes per sample)
    view.setUint16(32, 4, true);
    // bits per sample
    view.setUint16(34, 16, true);
    // data chunk identifier
    writeString(view, 36, "data");
    // data chunk length
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);

    return buffer;
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  };

  const convertToWavOrMp3 = async (blob, format) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const offlineContext = new OfflineAudioContext({
      numberOfChannels: audioBuffer.numberOfChannels,
      length: audioBuffer.length,
      sampleRate: audioBuffer.sampleRate,
    });

    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();

    const renderedBuffer = await offlineContext.startRendering();
    const wavBlob = new Blob([exportWavOrMp3(renderedBuffer, format)], {
      type: format,
    });
    return wavBlob;
  };

  const exportWavOrMp3 = (audioBuffer, format) => {
    const interleaved = new Float32Array(audioBuffer.length);
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < audioBuffer.length; i++) {
      interleaved[i] = channelData[i];
    }

    if (format === "audio/wav") {
      return encodeWAV(interleaved, audioBuffer.sampleRate);
    } else {
      // MP3 conversion would go here - requires additional library
      return encodeWAV(interleaved, audioBuffer.sampleRate);
    }
  };

  const saveRecording = async () => {
    if (recordedChunks.length === 0) return;

    const webmBlob = new Blob(recordedChunks, {
      type: "audio/webm;codecs=opus",
    });
    const convertedBlob = await convertToWavOrMp3(webmBlob, selectedFormat);
    const url = URL.createObjectURL(convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `recording.${selectedFormat.split("/")[1]}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteRecording = () => {
    setRecordedChunks([]);
    setIsPreviewing(false);
    setAudioBuffer(null);
    setWaveformData([]);
    if (audioRef.current) {
      audioRef.current.src = "";
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        await generateWaveform(arrayBuffer);

        if (audioRef.current) {
          audioRef.current.src = URL.createObjectURL(file);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getRemainingTime = () => {
    if (!audioRef.current) return "0:00";
    const remainingSeconds = duration - duration * (progress / 100);
    return formatTime(remainingSeconds);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleWaveformClick = (event) => {
    if (!audioBuffer) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    if (audioRef.current) {
      const time = (duration * percentage) / 100;
      audioRef.current.currentTime = time;
      setProgress(percentage);
    }
  };

  const handleMouseDown = (event) => {
    if (!audioBuffer) return;
    setIsDragging(true);
    handleDrag(event);
  };

  const handleDrag = (event) => {
    if (!isDragging || !audioBuffer) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    if (audioRef.current) {
      const time = (duration * percentage) / 100;
      audioRef.current.currentTime = time;
      setProgress(percentage);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    calculateWaveform();
    window.addEventListener("resize", calculateWaveform);
    return () => window.removeEventListener("resize", calculateWaveform);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      animateWaves();
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAnimatedHeights(waveformData);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, waveformData]);

  useEffect(() => {
    setAnimatedHeights(waveformData);
  }, [waveformData]);

  useEffect(() => {
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, audioBuffer]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "100%", p: "2%" }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton
          onClick={isRecording ? stopRecording : startRecording}
          sx={{
            bgcolor: isRecording ? "error.main" : "success.main",
            "&:hover": { bgcolor: isRecording ? "error.dark" : "success.dark" },
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 },
          }}
        >
          {isRecording ? <Stop /> : <Mic />}
        </IconButton>

        {recordedChunks.length > 0 && (
          <>
            <IconButton
              onClick={previewRecording}
              sx={{
                bgcolor: "primary.main",
                "&:hover": { bgcolor: "primary.dark" },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
              }}
            >
              <PlayArrow />
            </IconButton>

            <IconButton
              onClick={saveRecording}
              sx={{
                bgcolor: "success.main",
                "&:hover": { bgcolor: "success.dark" },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
              }}
            >
              <Save />
            </IconButton>

            <IconButton
              onClick={deleteRecording}
              sx={{
                bgcolor: "error.main",
                "&:hover": { bgcolor: "error.dark" },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
              }}
            >
              <Delete />
            </IconButton>

            <Select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              sx={{ height: { xs: 32, sm: 40 }, minWidth: 100 }}
            >
              <MenuItem value="audio/wav">WAV</MenuItem>
              <MenuItem value="audio/mp3">MP3</MenuItem>
            </Select>
          </>
        )}

        <Box component="label" sx={{ flexShrink: 0 }}>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <IconButton
            component="span"
            sx={{
              bgcolor: "grey.700",
              "&:hover": { bgcolor: "grey.600" },
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
            }}
          >
            <CloudUpload
              sx={{
                color: "white",
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            />
          </IconButton>
        </Box>
      </Stack>

      <Paper
        sx={{
          width: "100%",
          maxWidth: "100%",
          borderRadius: { xs: "30px", sm: "60px" },
          bgcolor: "grey.900",
          p: { xs: "1%", sm: "1.25%" },
          pl: { xs: "2%", sm: "3%" },
          pr: { xs: "3%", sm: "4%" },
          overflow: "hidden",
        }}
      >
        <audio ref={audioRef} />
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <IconButton
            onClick={togglePlayPause}
            disabled={!audioBuffer}
            sx={{
              bgcolor: audioBuffer ? "primary.main" : "grey.500",
              "&:hover": { bgcolor: audioBuffer ? "primary.dark" : "grey.500" },
              flexShrink: 0,
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
            }}
          >
            {isPlaying ? (
              <Pause
                sx={{
                  color: "white",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              />
            ) : (
              <PlayArrow
                sx={{
                  color: "white",
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                }}
              />
            )}
          </IconButton>

          <Box
            ref={containerRef}
            onClick={handleWaveformClick}
            onMouseDown={handleMouseDown}
            sx={{
              flex: 1,
              height: { xs: 48, sm: 64 },
              display: "flex",
              alignItems: "center",
              gap: "1px",
              cursor: audioBuffer ? "pointer" : "default",
              position: "relative",
              overflow: "hidden",
              userSelect: "none",
            }}
          >
            {animatedHeights.map((height, index) => {
              const isCurrent =
                audioBuffer &&
                (index / animatedHeights.length) * 100 <= progress;
              const barWidth = Math.max(
                2,
                Math.floor((containerRef.current?.clientWidth || 800) * 0.006)
              );
              const gap = Math.max(
                1,
                Math.floor((containerRef.current?.clientWidth || 800) * 0.003)
              );

              return (
                <Box
                  key={index}
                  sx={{
                    width: `${barWidth}px`,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    marginRight: `${gap}px`,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: isCurrent ? "primary.main" : "grey.600",
                      height: `${height * 100}%`,
                      maxHeight: "100%",
                      minHeight: "2px",
                      borderRadius: 0.5,
                      transition: "height 0.1s linear",
                      "&:hover": audioBuffer
                        ? {
                            opacity: 0.75,
                          }
                        : {},
                    }}
                  />
                </Box>
              );
            })}

            {audioBuffer && progress > 0 && progress < 100 && (
              <Box
                sx={{
                  position: "absolute",
                  height: "100%",
                  width: "2px",
                  bgcolor: "primary.light",
                  top: 0,
                  left: `${progress}%`,
                  transition: isDragging
                    ? "none"
                    : "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              color: "grey.400",
              minWidth: { xs: 40, sm: 50 },
              textAlign: "right",
              flexShrink: 0,
              fontFamily: CONTENT,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            {getRemainingTime()}
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default AudioPlayer;
