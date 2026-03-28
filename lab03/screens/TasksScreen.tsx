import React from 'react';
import styled from 'styled-components/native';
import { useGame } from '../context/GameContext';
import { TaskItem } from '../components/TaskItem';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  padding: 16px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
`;

export function TasksScreen() {
    const { tasks } = useGame();

    return (
        <Container contentContainerStyle={{ paddingBottom: 24 }}>
            <Title>Список завдань</Title>

            <TaskItem title="Зробити 10 кліків" done={tasks.tap10} />
            <TaskItem title="Зробити подвійний клік 5 разів" done={tasks.doubleTap5} />
            <TaskItem title="Утримувати об'єкт 3 секунди" done={tasks.longPress3s} />
            <TaskItem title="Перетягнути об'єкт" done={tasks.dragObject} />
            <TaskItem title="Зробити свайп вправо" done={tasks.flingRight} />
            <TaskItem title="Зробити свайп вліво" done={tasks.flingLeft} />
            <TaskItem title="Змінити розмір об'єкта (pinch)" done={tasks.pinchResize} />
            <TaskItem title="Отримати 100 очок" done={tasks.score100} />
            <TaskItem title="Власне завдання: натиснути кнопку внизу головного екрану" done={tasks.customTask} />
        </Container>
    );
}