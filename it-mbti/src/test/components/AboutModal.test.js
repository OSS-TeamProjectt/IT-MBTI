import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AboutModal from '../../components/AboutModal';

describe('AboutModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  test('Verify that modals are rendered normally', () => {
    render(<AboutModal onClose={mockOnClose} />);

    expect(screen.getByText('About IT-MBTI')).toBeInTheDocument();
    expect(
      screen.getByText(
        /IT-MBTI helps you discover your ideal career path in the IT field through a personality-based career test./i
      )
    ).toBeInTheDocument();
  });

  test('Verify the close button is rendered and the text is correct', () => {
    render(<AboutModal onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('Verify that the onClose function is invoked when the Close button is clicked', () => {
    render(<AboutModal onClose={mockOnClose} />);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

});
