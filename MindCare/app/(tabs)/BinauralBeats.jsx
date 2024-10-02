import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';


function App() {
  const [audioContext, setAudioContext] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedFrequency, setSelectedFrequency] = useState('adhd'); // Default selection is ADHD
  const [showFeedback, setShowFeedback] = useState(false); // Show feedback form after stopping
  const [feedback, setFeedback] = useState([]); // Store feedback data
  const [mood, setMood] = useState(5); // Default mood rating
  const [progressLog, setProgressLog] = useState([]); // Store progress logs

  // Pomodoro Timer States
  const [isPomodoroActive, setIsPomodoroActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1); // 25 minutes in seconds
  const [focusLevel, setFocusLevel] = useState(5); // Default focus level

  const frequencies = {
    adhd: { base: 40, beat: 10 },
    focus: { base: 20, beat: 15 },
    relax: { base: 10, beat: 7 },
    meditation: { base: 6, beat: 3 },
    sleep: { base: 3, beat: 1 },
  };

  useEffect(() => {
    let timer;
    if (isPomodoroActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      alert("Pomodoro session complete! Time for a break.");
      setIsPomodoroActive(false);
      setTimeLeft(1); // Reset timer
    }
    return () => clearInterval(timer);
  }, [isPomodoroActive, timeLeft]);

  const startBinauralBeats = () => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      const { base, beat } = frequencies[selectedFrequency];

      const leftOscillator = context.createOscillator();
      leftOscillator.frequency.value = base;

      const rightOscillator = context.createOscillator();
      rightOscillator.frequency.value = base + beat;

      const leftPan = context.createStereoPanner();
      leftPan.pan.value = -1;

      const rightPan = context.createStereoPanner();
      rightPan.pan.value = 1;

      leftOscillator.connect(leftPan).connect(context.destination);
      rightOscillator.connect(rightPan).connect(context.destination);

      leftOscillator.start();
      rightOscillator.start();

      setAudioContext(context);
      setIsPlaying(true);
      setShowFeedback(false);
    }
  };

  const stopBinauralBeats = () => {
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
      setIsPlaying(false);
      setShowFeedback(true);
    }
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFeedback = {
      relaxation: formData.get('relaxation'),
      focus: formData.get('focus'),
      sleep: formData.get('sleep'),
    };
    setFeedback([...feedback, newFeedback]);
    setShowFeedback(false);
    alert("Thank you for your feedback!");
  };

  const handleProgressSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      mood: mood,
      date: new Date().toLocaleDateString(),
    };
    setProgressLog([...progressLog, newLog]);
    setMood(5); // Reset mood rating after logging
    alert("Progress logged!");
  };

  const startPomodoro = () => {
    setIsPomodoroActive(true);
    setTimeLeft(1); // Reset to 25 minutes
  };

  const handleFocusLevelSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      focus: focusLevel,
      date: new Date().toLocaleDateString(),
    };
    setProgressLog((prev) => [...prev, newLog]);
    alert("Focus level logged!");
    setFocusLevel(5); // Reset focus level after logging
  };

  return (
    <ScrollView>
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #800080, #0000FF)', // Purple to Blue Gradient
      color: '#fff',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Binaural Beats for Mental Health</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>Select Frequency for Purpose:</label>
        <select 
          value={selectedFrequency} 
          onChange={(e) => setSelectedFrequency(e.target.value)} 
          style={{ margin: '0 10px', padding: '5px' }}
        >
          <option value="adhd">ADHD (Gamma 40 Hz)</option>
          <option value="focus">Focus (Beta 20 Hz)</option>
          <option value="relax">Relaxation (Alpha 10 Hz)</option>
          <option value="meditation">Meditation (Theta 6 Hz)</option>
          <option value="sleep">Deep Sleep (Delta 3 Hz)</option>
        </select>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={startBinauralBeats} 
          disabled={isPlaying}
          style={{
            backgroundColor: isPlaying ? '#555' : '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: isPlaying ? 'not-allowed' : 'pointer'
          }}
        >
          Start Binaural Beats
        </button>
        <button 
          onClick={stopBinauralBeats} 
          disabled={!isPlaying}
          style={{
            backgroundColor: !isPlaying ? '#555' : '#f44336',
            color: 'white',
            padding: '10px 20px',
            margin: '5px',
            border: 'none',
            borderRadius: '5px',
            cursor: !isPlaying ? 'not-allowed' : 'pointer'
          }}
        >
          Stop Binaural Beats
        </button>
      </div>

      {/* Pomodoro Timer */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Pomodoro Timer</h2>
        <div>
          {isPomodoroActive ? (
            <h3>
              Time Left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}
            </h3>
          ) : (
            <button onClick={startPomodoro} style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Start Pomodoro (25 minutes)
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Container for Feedback and Logs */}
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #fff', borderRadius: '5px', padding: '10px' }}>
        
        {/* Feedback Form */}
        {showFeedback && (
          <div style={{ marginBottom: '20px' }}>
            <h2>How do you feel after the session?</h2>
            <form onSubmit={handleFeedbackSubmit}>
              <div>
                <label>Relaxation Level (1-10):</label>
                <input type="number" name="relaxation" min="1" max="10" required style={{ margin: '0 10px' }} />
              </div>
              <div>
                <label>Focus Level (1-10):</label>
                <input type="number" name="focus" min="1" max="10" required style={{ margin: '0 10px' }} />
              </div>
              <div>
                <label>Sleep Quality (1-10):</label>
                <input type="number" name="sleep" min="1" max="10" required style={{ margin: '0 10px' }} />
              </div>
              <button type="submit" style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>Submit Feedback</button>
            </form>
          </div>
        )}

        {/* Mood Tracking Form */}
        <div style={{ marginBottom: '20px' }}>
          <h2>Track Your Mood</h2>
          <form onSubmit={handleProgressSubmit}>
            <div>
              <label>Mood (1-10):</label>
              <input
                type="number"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                min="1"
                max="10"
                required
                style={{ margin: '0 10px' }}
              />
            </div>
            <button type="submit" style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Log Mood</button>
          </form>
        </div>

        {/* Focus Level Tracking */}
        <div style={{ marginBottom: '20px' }}>
          <h2>Log Focus Level</h2>
          <form onSubmit={handleFocusLevelSubmit}>
            <div>
              <label>Focus Level (1-10):</label>
              <input
                type="number"
                value={focusLevel}
                onChange={(e) => setFocusLevel(e.target.value)}
                min="1"
                max="10"
                required
                style={{ margin: '0 10px' }}
              />
            </div>
            <button type="submit" style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>Log Focus</button>
          </form>
        </div>

        {/* Progress Logs */}
        <div>
          <h2>Progress Logs</h2>
          {progressLog.length === 0 ? (
            <p>No logs available.</p>
          ) : (
            <ul>
              {progressLog.map((log, index) => (
                <li key={index}>
                  Date: {log.date}, Mood: {log.mood}, Focus: {log.focus || 'N/A'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </ScrollView>
  );
}

export default App;
