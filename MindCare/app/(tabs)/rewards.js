import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Video } from 'expo-av';

const satisfactionVideos = [
  require('../../assets/satisfaction/v1.mp4'),
  require('../../assets/satisfaction/v2.mp4'),
  require('../../assets/satisfaction/v3.mp4'),
];

const eduVideos = [
  require('../../assets/edu/ve1.mp4'),
  require('../../assets/edu/ve2.mp4'),
  require('../../assets/edu/ve3.mp4'),
];

const App = () => {
  const [videoSource, setVideoSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const videoRef = useRef(null);

  const handleOptionPress = (option) => {
    setLoading(true); // Start loading
    const selectedVideos = option === 'satisfaction' ? satisfactionVideos : eduVideos;
    setVideoList(selectedVideos);
    setVideoSource(selectedVideos[0]);
    setCurrentIndex(0); // Reset current index to 0
  };

  const handleLoad = () => {
    setLoading(false); // Stop loading when video is loaded
    videoRef.current.presentFullscreenPlayer(); // Automatically present full-screen mode
  };

  const handleVideoError = (e) => {
    console.log('Video Error: ', e);
    setLoading(false); // Stop loading on error
  };

  const handleScrollEnd = (event) => {
    const index = Math.floor(event.nativeEvent.contentOffset.y / event.nativeEvent.layoutMeasurement.height);
    if (index >= 0 && index < videoList.length) {
      setCurrentIndex(index);
      setVideoSource(videoList[index]); // Update video source based on scroll
    }
  };

  return (
    <View style={styles.container}>
      {!videoSource ? (
        <>
          <Text style={styles.title}>Select a Video Category</Text>
          <TouchableOpacity style={styles.button} onPress={() => handleOptionPress('satisfaction')}>
            <Text style={styles.buttonText}>Play Satisfaction Video</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOptionPress('edu')}>
            <Text style={styles.buttonText}>Play Educational Video</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {loading && <ActivityIndicator size="large" color="#ffffff" />}
          <ScrollView 
            ref={scrollViewRef}
            pagingEnabled 
            onMomentumScrollEnd={handleScrollEnd} 
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            {videoList.map((video, index) => (
              <View key={index} style={styles.videoContainer}>
                <Video
                  ref={videoRef}
                  source={video}
                  style={styles.fullScreenVideo}
                  useNativeControls
                  resizeMode="contain"
                  onLoad={handleLoad}
                  onError={handleVideoError}
                  shouldPlay={currentIndex === index} // Play only the current video
                  onFullscreenUpdate={({ fullscreenUpdate }) => {
                    if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_DID_DISMISS) {
                      // Optionally reset state or just handle clean-up
                      setVideoSource(null);
                      setCurrentIndex(0); // Reset index if needed
                    }
                  }}
                />
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B0082', // Dark purple background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    width: '100%',
    height: height,
  },
  videoContainer: {
    width: '100%',
    height: height, // Use full height for video container
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {
    width: width,
    height: height,
  },
});

export default App;
