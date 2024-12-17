import React, { useState, useEffect } from 'react';
import './App.css';

const songs = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3'
];

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audio, setAudio] = useState(new Audio(songs[currentSongIndex]));
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextPlay = () => {
    audio.pause();
    const nextIndex = (currentSongIndex + 1) % songs.length;
    const newAudio = new Audio(songs[nextIndex]);
    setAudio(newAudio);
    setCurrentSongIndex(nextIndex);
    newAudio.play();
    setIsPlaying(true);
  };

  const prevPlay = () => {
    audio.pause();
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    const newAudio = new Audio(songs[prevIndex]);
    setAudio(newAudio);
    setCurrentSongIndex(prevIndex);
    newAudio.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [audio]);

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="App">
      <h1>React Audio Player</h1>
      <div className="audio-player">
        <div className="controls">
          <button onClick={prevPlay}>Prev</button>
          <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={nextPlay}>Next</button>
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

export default App;
