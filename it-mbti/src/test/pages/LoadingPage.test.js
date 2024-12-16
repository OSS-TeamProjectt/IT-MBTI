import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import LoadingPage from '../../pages/LoadingPage';

jest.setTimeout(7000); // 타임아웃을 7초로 설정

describe('LoadingPage Component', () => {
  test('Verify that loading text and spinner are rendered', () => {
    render(
      <MemoryRouter>
        <LoadingPage />
      </MemoryRouter>
    );

    // 로딩 텍스트 확인
    expect(screen.getByText('What type will it be? 🤔')).toBeInTheDocument();

    // Spinner 확인 (data-testid 사용)
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('Verify that it redirects to /result after 5 seconds', async () => {
    render(
      <MemoryRouter initialEntries={['/loading']}>
        <Routes>
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/result" element={<div>Result Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Result Page')).toBeInTheDocument();
    }, { timeout: 6000 });
  });
});