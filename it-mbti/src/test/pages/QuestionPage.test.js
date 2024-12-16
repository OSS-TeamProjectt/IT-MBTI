import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import QuestionPage from '../../pages/QuestionPage';
import questions from '../../data/questions.json';

jest.mock('../../components/Questions', () => ({ questionText, onAnswer }) => (
  <div>
    <p>{questionText}</p>
    <button onClick={() => onAnswer(1)}>Answer 1</button>
  </div>
));

describe('QuestionPage Component', () => {
  test('Verify that the first question is displayed', () => {
    render(
      <MemoryRouter>
        <QuestionPage />
      </MemoryRouter>
    );

    expect(screen.getByText(questions[0].question)).toBeInTheDocument();
  });

  test('Verify that progress bar updates when answering a question', () => {
    render(
      <MemoryRouter>
        <QuestionPage />
      </MemoryRouter>
    );
  
    const totalQuestions = questions.length;
    const currentIndex = 0; // 시작 인덱스
  
    const progressBar = screen.getByRole('progressbar');
  
    // Initial progress calculation
    let percentage = ((currentIndex + 1) / totalQuestions) * 100;
    expect(progressBar).toHaveStyle(`width: ${percentage}%`);
  
    // Perform action to move to the next question
    fireEvent.click(screen.getByText(/Answer 1/));
  
    // Updated progress calculation
    percentage = ((currentIndex + 2) / totalQuestions) * 100;
    expect(progressBar).toHaveStyle(`width: ${percentage}%`);
  });

  test('Verify that navigating to /loading when last question is answered', () => {
    render(
      <MemoryRouter initialEntries={['/question']}>
        <Routes>
          <Route path="/question" element={<QuestionPage />} />
          <Route path="/loading" element={<div>Loading Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // 마지막 질문까지 답변
    for (let i = 0; i < questions.length; i++) {
      fireEvent.click(screen.getByText(/Answer 1/));
    }

    expect(screen.getByText(/Loading Page/)).toBeInTheDocument();
  });
});
