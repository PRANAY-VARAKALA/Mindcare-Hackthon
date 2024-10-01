import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REWARD_INTERVAL = 1 * 1 * 1 * 1000; // 24 hours in milliseconds 24 * 60 * 60 * 1000;

const App = () => {
  const [lastRewarded, setLastRewarded] = useState(null);
  const [canReward, setCanReward] = useState(false);
  const [totalRewards, setTotalRewards] = useState(0); // Track total rewards

  // Function to check if 24 hours have passed
  const checkRewardEligibility = async () => {
    try {
      const lastRewardedTime = await AsyncStorage.getItem('lastRewardedTime');
      const totalRewardsCount = await AsyncStorage.getItem('totalRewards');

      // If total rewards exist in AsyncStorage, set it
      if (totalRewardsCount) {
        setTotalRewards(parseInt(totalRewardsCount));
      }

      if (lastRewardedTime) {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - parseInt(lastRewardedTime);
        if (timeElapsed >= REWARD_INTERVAL) {
          setCanReward(true);
        } else {
          setCanReward(false);
        }
        setLastRewarded(new Date(parseInt(lastRewardedTime)).toLocaleString());
      } else {
        setCanReward(true); // First-time user or no reward given yet
      }
    } catch (error) {
      console.error('Error checking reward eligibility:', error);
    }
  };

  // Function to give a reward and update the last rewarded time and total rewards count
  const giveReward = async () => {
    try {
      const currentTime = new Date().getTime();
      await AsyncStorage.setItem('lastRewardedTime', currentTime.toString());

      // Increment total rewards count
      const newTotalRewards = totalRewards + 1;
      await AsyncStorage.setItem('totalRewards', newTotalRewards.toString());

      setLastRewarded(new Date(currentTime).toLocaleString());
      setTotalRewards(newTotalRewards);
      setCanReward(false);
      Alert.alert('Reward Received!', 'You have received your daily reward!');
    } catch (error) {
      console.error('Error rewarding user:', error);
    }
  };

  // Check reward eligibility when the app is opened
  useEffect(() => {
    checkRewardEligibility();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Rewards App</Text>
      {lastRewarded && <Text>Last Rewarded: {lastRewarded}</Text>}
      <Text>Total Rewards: {totalRewards}</Text>
      <Text>{canReward ? 'You are eligible for a reward!' : 'Come back in 24 hours for your next reward!'}</Text>
      {canReward && (
        <Button title="Claim Reward" onPress={giveReward} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
