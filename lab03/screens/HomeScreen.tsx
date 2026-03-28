import React, { useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, runOnJS } from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useGame } from '../context/GameContext';

const { width, height } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  padding: 16px;
`;

const Score = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 28px;
  font-weight: 800;
  text-align: center;
  margin-top: 12px;
`;

const Hint = styled.Text`
  color: ${({ theme }) => theme.subText};
  font-size: 14px;
  text-align: center;
  margin-top: 6px;
`;

const Playground = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(Animated.View)`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: ${({ theme }) => theme.primary};
  justify-content: center;
  align-items: center;
`;

const CircleText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
`;

const CustomTaskButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const BtnText = styled.Text`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
`;

export function HomeScreen() {
    const { score, onTap, onDoubleTap, onLongPress, onDrag, onFlingLeft, onFlingRight, onPinch, completeCustomTask } = useGame();

    const tx = useSharedValue(0);
    const ty = useSharedValue(0);
    const scale = useSharedValue(1);
    const [pinchMarked, setPinchMarked] = useState(false);

    const tap = Gesture.Tap().onEnd(() => {
        runOnJS(onTap)();
    });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            runOnJS(onDoubleTap)();
        });

    const longPress = Gesture.LongPress()
        .minDuration(3000)
        .onEnd((_, success) => {
            if (success) runOnJS(onLongPress)();
        });

    const pan = Gesture.Pan()
        .onUpdate((e) => {
            tx.value = e.translationX;
            ty.value = e.translationY;
        })
        .onEnd(() => {
            runOnJS(onDrag)();
        });

    const flingRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onEnd(() => {
            runOnJS(onFlingRight)();
        });

    const flingLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onEnd(() => {
            runOnJS(onFlingLeft)();
        });

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = Math.max(0.7, Math.min(2, e.scale));
            if (!pinchMarked && (e.scale > 1.1 || e.scale < 0.9)) {
                runOnJS(onPinch)();
                runOnJS(setPinchMarked)(true);
            }
        })
        .onEnd(() => {
            scale.value = 1;
            runOnJS(setPinchMarked)(false);
        });

    const composed = useMemo(
        () =>
            Gesture.Simultaneous(
                Gesture.Exclusive(doubleTap, tap),
                longPress,
                pan,
                flingRight,
                flingLeft,
                pinch
            ),
        []
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: Math.max(-width / 2 + 70, Math.min(width / 2 - 70, tx.value)) },
            { translateY: Math.max(-height / 3, Math.min(height / 3, ty.value)) },
            { scale: scale.value },
        ],
    }));

    return (
        <Container>
            <Score>Очки: {score}</Score>
            <Hint>Tap / Double Tap / Long Press 3s / Pan / Fling ← → / Pinch</Hint>

            <Playground>
                <GestureDetector gesture={composed}>
                    <Circle style={animatedStyle}>
                        <CircleText>Торкнись мене</CircleText>
                    </Circle>
                </GestureDetector>
            </Playground>

            <CustomTaskButton onPress={completeCustomTask}>
                <BtnText>Власне завдання: натисни цю кнопку 1 раз</BtnText>
            </CustomTaskButton>
        </Container>
    );
}