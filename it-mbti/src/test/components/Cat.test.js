import React from 'react';
import { render, screen } from '@testing-library/react';
import Cat from '../../components/Cat';
import results from '../../data/results.json';

// Mocking the image for the test environment
jest.mock('../../data/results.json', () => [
  {
    "type": "DevOps Engineer",
    "catType": "Independent Bengal Type",
    "catImage":"/img/cat/cat4.png",
  },
  {
    "type": "Data Analyst",
    "catImage":"/img/cat/cat5.png",
    "catType": "Curious Sphynx Type",
  },
]);

describe('Cat Component', () => {
  test('Verify that components are rendered normally', () => {
    render(<Cat title="DevOps Engineer" />);
    
    expect(screen.getByText(/DevOps Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/Independent Bengal Type/)).toBeInTheDocument();
  });

  test('Verify that the correct data is displayed according to the Title prop', () => {
    render(<Cat title="Data Analyst" />);
    
    expect(screen.getByText(/Data Analyst/)).toBeInTheDocument();
    expect(screen.getByText(/Curious Sphynx Type/)).toBeInTheDocument();
  });

  test('Verify that the default text is displayed when the type is not in results.json', () => {
    render(<Cat title="Unknown" />);
    
    expect(screen.getByText(/Unknown Title/)).toBeInTheDocument();
    expect(screen.getByText(/Unknown Cat Type/)).toBeInTheDocument();
  });

  test('Verify that the image is rendered correctly', () => {
    render(<Cat title="DevOps Engineer" />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', "/img/cat/cat4.png");
  });
});
