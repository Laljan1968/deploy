import React, { useState } from 'react';
import './App.css';

function App() {
  // State to manage the play/pause status and track time
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Toggle play/pause
  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle audio time update
  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  // Handle audio loaded metadata (for duration)
  const handleLoadedMetadata = () => {
    setDuration(audio.duration);
  };

  // Handle seeking (change current time of the audio)
  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Event listeners for time updates
  React.useEffect(() => {
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Clean up on component unmount
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audio]);

  return (
    <div className="App">
      <h1>React Audio Player</h1>
      <div className="audio-player">
        <button onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="time">
          <span>{Math.floor(currentTime)} / {Math.floor(duration)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
        />
      </div>
    </div>
  );
}