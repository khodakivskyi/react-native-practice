import React from 'react';
import styled from 'styled-components/native';

const Row = styled.View`
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  flex: 1;
  margin-right: 8px;
`;

const Status = styled.Text<{ done: boolean }>`
  color: ${({ done, theme }) => (done ? theme.success : theme.subText)};
  font-weight: 700;
`;

export function TaskItem({ title, done }: { title: string; done: boolean }) {
    return (
        <Row>
            <Title>{title}</Title>
            <Status done={done}>{done ? '✅ Виконано' : '⏳ В процесі'}</Status>
        </Row>
    );
}