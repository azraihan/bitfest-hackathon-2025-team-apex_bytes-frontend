import React, { useState, useEffect, useRef } from 'react';

//MUI
import { Box, IconButton, Paper, Stack } from '@mui/material';
import { PlayArrow, Pause, CloudUpload } from '@mui/icons-material';

//values
import {TITLE, TITLE_THICK, CONTENT} from '../values/Fonts'

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [waveformData, setWaveformData] = useState([]);
  const [animatedHeights, setAnimatedHeights] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const animationFrameRef = useRef();

  const calculateWaveform = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const padding = Math.floor(containerWidth * 0.05);
      const availableWidth = containerWidth - padding;
      const barWidth = Math.max(2, Math.floor(containerWidth * 0.006));
      const gap = Math.max(1, Math.floor(containerWidth * 0.003));
      const numBars = Math.floor(availableWidth / (barWidth + gap));
      const staticWaveform = Array(numBars).fill().map(() => Math.random() * 0.5 + 0.2);
      setWaveformData(staticWaveform);
      setAnimatedHeights(staticWaveform);
    }
  };

  const animateWaves = () => {
    if (!isPlaying || !waveformData.length) return;
    
    setAnimatedHeights(prev => prev.map((height, i) => {
      const baseHeight = waveformData[i];
      const maxHeight = baseHeight * 2.5;
      const minHeight = baseHeight * 0.5;
      const randomHeight = minHeight + (Math.random() * (maxHeight - minHeight));
      const smoothing = 0.05; // Reduced for smoother transitions
      return height + (randomHeight - height) * smoothing;
    }));
    
    animationFrameRef.current = requestAnimationFrame(animateWaves);
  };

  useEffect(() => {
    calculateWaveform();
    window.addEventListener('resize', calculateWaveform);
    return () => window.removeEventListener('resize', calculateWaveform);
  }, []);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
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
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getRemainingTime = () => {
    if (!audioRef.current) return "0:00";
    const remainingSeconds = duration - (duration * (progress / 100));
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
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
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

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <Stack 
      direction="row" 
      spacing={1} 
      alignItems="center" 
      sx={{ 
        width: '100%', 
        maxWidth: '100%',
        p: '2%'
      }}
    >
      <Box component="label" sx={{ flexShrink: 0 }}>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <IconButton
          component="span"
          sx={{
            bgcolor: 'grey.700',
            '&:hover': { bgcolor: 'grey.600' },
            width: { xs: 32, sm: 40 },
            height: { xs: 32, sm: 40 }
          }}
        >
          <CloudUpload sx={{ 
            color: 'white',
            fontSize: { xs: '1.2rem', sm: '1.5rem' }
          }} />
        </IconButton>
      </Box>

      <Paper 
        sx={{ 
          width: '100%',
          maxWidth: '100%',
          borderRadius: { xs: '30px', sm: '60px' },
          bgcolor: 'grey.900',
          p: { xs: '1%', sm: '1.25%' },
          pl: { xs: '2%', sm: '3%' },
          pr: { xs: '3%', sm: '4%' },
          overflow: 'hidden',
        }}
      >
        <audio ref={audioRef} />
        <Stack 
          direction="row" 
          spacing={1}
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <IconButton
            onClick={togglePlayPause}
            disabled={!audioBuffer}
            sx={{
              bgcolor: audioBuffer ? 'primary.main' : 'grey.500',
              '&:hover': { bgcolor: audioBuffer ? 'primary.dark' : 'grey.500' },
              flexShrink: 0,
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 }
            }}
          >
            {isPlaying ? (
              <Pause sx={{ 
                color: 'white',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }} />
            ) : (
              <PlayArrow sx={{ 
                color: 'white',
                fontSize: { xs: '1.2rem', sm: '1.5rem' }
              }} />
            )}
          </IconButton>
          
          <Box
            ref={containerRef}
            onClick={handleWaveformClick}
            onMouseDown={handleMouseDown}
            sx={{
              flex: 1,
              height: { xs: 48, sm: 64 },
              display: 'flex',
              alignItems: 'center',
              gap: '1px',
              cursor: audioBuffer ? 'pointer' : 'default',
              position: 'relative',
              overflow: 'hidden',
              userSelect: 'none'
            }}
          >
            {animatedHeights.map((height, index) => {
              const isCurrent = audioBuffer && (index / animatedHeights.length) * 100 <= progress;
              const barWidth = Math.max(2, Math.floor((containerRef.current?.clientWidth || 800) * 0.006));
              const gap = Math.max(1, Math.floor((containerRef.current?.clientWidth || 800) * 0.003));
              
              return (
                <Box
                  key={index}
                  sx={{
                    width: `${barWidth}px`,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: `${gap}px`
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      bgcolor: isCurrent ? 'primary.main' : 'grey.600',
                      height: `${height * 100}%`,
                      maxHeight: '100%',
                      minHeight: '2px',
                      borderRadius: 0.5,
                      transition: 'height 0.1s linear',
                      '&:hover': audioBuffer ? {
                        opacity: 0.75
                      } : {}
                    }}
                  />
                </Box>
              );
            })}
            
            {audioBuffer && progress > 0 && progress < 100 && (
              <Box
                sx={{
                  position: 'absolute',
                  height: '100%',
                  width: '2px',
                  bgcolor: 'primary.light',
                  top: 0,
                  left: `${progress}%`,
                  transition: isDragging ? 'none' : 'left 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            )}
          </Box>

          <Box sx={{ 
            color: 'grey.400',
            minWidth: { xs: 40, sm: 50 },
            textAlign: 'right',
            flexShrink: 0,
            fontFamily: CONTENT,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}>
            {getRemainingTime()}
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default AudioPlayer;