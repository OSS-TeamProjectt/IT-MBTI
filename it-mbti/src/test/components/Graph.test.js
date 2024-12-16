import React from 'react';
import { render, screen } from '@testing-library/react';
import Graph from '../../components/Graph';

describe('Graph Component', () => {
  test('Verify that components are rendered normally', () => {
    const scores = [['Frontend Developer', 15], ['Backend Developer', 10]];

    render(<Graph scores={scores} />);

    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();
    expect(screen.getByText('Backend Developer')).toBeInTheDocument();
  });

  test('Verify the percentage is displayed correctly based on the score', () => {
    const scores = [['Frontend Developer', 15], ['Backend Developer', 10]];
    const maxScorePerType = 30;

    const frontendPercentage = Math.round((15 / maxScorePerType) * 100); // 50%
    const backendPercentage = Math.round((10 / maxScorePerType) * 100); // 33%

    render(<Graph scores={scores} />);

    expect(screen.getByText(`${frontendPercentage}%`)).toBeInTheDocument();
    expect(screen.getByText(`${backendPercentage}%`)).toBeInTheDocument();
  });

  test('If there is no score, make sure the percentage is displayed as 0%', () => {
    const scores = [['Frontend Developer', 0], ['Backend Developer', 0]];

    render(<Graph scores={scores} />);

    // getAllByText를 사용하여 0%가 두 번 나타나는지 확인
    expect(screen.getAllByText('0%')).toHaveLength(2);
  });

  test('Verify that a component is empty when it is in an empty score array', () => {
    render(<Graph scores={[]} />);

    // 퍼센트 표시가 없는지 확인
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });
});
