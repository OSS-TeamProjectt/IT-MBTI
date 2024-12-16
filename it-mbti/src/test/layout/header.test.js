import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../layout/header';


jest.mock('../../components/AboutModal', () => (props) => (
  <div data-testid="about-modal">
    <button onClick={props.onClose}>Close</button>
  </div>
));

describe('Header Component', () => {
  test('Verify that navigation links are rendered', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Take the Test/)).toBeInTheDocument();
  });

  test('Verify that About button is rendered and opens modal on click', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const aboutButton = screen.getByText(/About/);
    expect(aboutButton).toBeInTheDocument();

    fireEvent.click(aboutButton);

    expect(screen.getByTestId(/about-modal/)).toBeInTheDocument();
  });

  test('Verify that modal closes when the Close button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const aboutButton = screen.getByText(/About/);
    fireEvent.click(aboutButton);

    const closeButton = screen.getByText(/Close/);
    fireEvent.click(closeButton);

    expect(screen.queryByTestId(/about-modal/)).not.toBeInTheDocument();
  });
});