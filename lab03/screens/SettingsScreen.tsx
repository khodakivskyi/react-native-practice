import React from 'react';
import styled from 'styled-components/native';
import { Switch } from 'react-native';
import { useGame } from '../context/GameContext';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  padding: 16px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const Row = styled.View`
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: 600;
`;

export function SettingsScreen() {
    const { isDarkMode, toggleTheme } = useGame();

    return (
        <Container>
            <Title>Налаштування</Title>
            <Row>
                <Label>Темна тема</Label>
                <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </Row>
        </Container>
    );
}