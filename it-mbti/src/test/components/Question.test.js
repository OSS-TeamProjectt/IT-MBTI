import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Question from '../../components/Questions';

describe('Question Component', () => {
  const mockOnAnswer = jest.fn();
  const questionText = 'How satisfied are you with the product?';

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  test('Verify that the question text is rendered correctly', () => {
    render(<Question questionText={questionText} onAnswer={mockOnAnswer} />);

    expect(screen.getByText(questionText)).toBeInTheDocument();
  });

  test('Verify that all option buttons are rendered', () => {
    render(<Question questionText={questionText} onAnswer={mockOnAnswer} />);

    expect(screen.getByText('Strongly Disagree')).toBeInTheDocument();
    expect(screen.getByText('Disagree')).toBeInTheDocument();
    expect(screen.getByText('Neutral')).toBeInTheDocument();
    expect(screen.getByText('Agree')).toBeInTheDocument();
    expect(screen.getByText('Strongly Agree')).toBeInTheDocument();
  });

  test('Check to see if the selection status changes when the button is clicked', () => {
    render(<Question questionText={questionText} onAnswer={mockOnAnswer} />);

    const agreeButton = screen.getByText('Agree');
    fireEvent.click(agreeButton);

    expect(agreeButton).toHaveStyle('background: #3a7664');
  });

  test('Verify that the onAnswer callback function is invoked when the button is clicked', () => {
    render(<Question questionText={questionText} onAnswer={mockOnAnswer} />);

    const neutralButton = screen.getByText('Neutral');
    fireEvent.click(neutralButton);

    expect(mockOnAnswer).toHaveBeenCalledWith(5);
    expect(mockOnAnswer).toHaveBeenCalledTimes(1);
  });
});
