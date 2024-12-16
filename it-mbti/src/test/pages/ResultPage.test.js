import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ResultPage from '../../pages/ResultPage';

// Mock 하위 컴포넌트
jest.mock('../../components/Cat', () => ({ title }) => <div data-testid="cat-component">{title}</div>);
jest.mock('../../components/Detail', () => ({ type }) => <div data-testid="detail-component">{type}</div>);
jest.mock('../../components/Graph', () => ({ scores }) => <div data-testid="graph-component">{JSON.stringify(scores)}</div>);
jest.mock('../../components/Professor', () => ({ type }) => <div data-testid="professor-component">{type}</div>);
jest.mock('../../components/Skill', () => ({ type }) => <div data-testid="skill-component">{type}</div>);

describe('ResultPage Component', () => {
  const mockScores = {
    'Frontend Developer': 10,
    'Backend Developer': 8,
    'DevOps Engineer': 10,
  };

  test('Verify that components are rendered correctly with the highest score', () => {
    const priorityOrder = [
      'Frontend Developer',
      'UI/UX Designer',
      'Business Development Manager',
      'IT Strategy Consultant',
      'DevOps Engineer',
      'Data Analyst',
      'Backend Developer',
    ];
  
    render(
      <MemoryRouter initialEntries={[{ pathname: '/result', state: { scores: mockScores } }]}>
        <Routes>
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );
  
    const sortedScores = Object.entries(mockScores).sort(([keyA, valueA], [keyB, valueB]) => {
      if (valueA === valueB) {
        return priorityOrder.indexOf(keyA) - priorityOrder.indexOf(keyB);
      }
      return valueB - valueA;
    });
  
    const highestType = sortedScores[0][0];
  
    expect(screen.getByTestId('cat-component')).toHaveTextContent(highestType);
    expect(screen.getByTestId('detail-component')).toHaveTextContent(highestType);
    expect(screen.getByTestId('graph-component')).toHaveTextContent(JSON.stringify(sortedScores));
    expect(screen.getByTestId('professor-component')).toHaveTextContent(highestType);
    expect(screen.getByTestId('skill-component')).toHaveTextContent(highestType);
  });

  test('Verify that Next button changes the result type', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/result', state: { scores: mockScores } }]}>
        <Routes>
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </MemoryRouter>
    );

    const nextButton = screen.getByAltText('Next');
    expect(screen.getByTestId('cat-component')).toHaveTextContent('Frontend Developer');

    fireEvent.click(nextButton);
    expect(screen.getByTestId('cat-component')).toHaveTextContent('DevOps Engineer');
  });
});
