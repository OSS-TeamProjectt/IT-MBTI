import React from 'react';
import { render, screen } from '@testing-library/react';
import Detail from '../../components/Detail';


// Mocking the results data
jest.mock('../../data/results.json', () => [
  {
    type: 'Frontend Developer',
    introduction: 'Develops user interfaces and client-side logic.',
    jobDescription: 'Responsible for implementing visual elements.',
    relatedJobs: ['Web Developer', 'UI Developer'],
    coreSkills: ['HTML', 'CSS', 'JavaScript'],
    tags: ['UI', 'UX', 'JavaScript'],
  },
  {
    type: 'Backend Developer',
    introduction: 'Handles server-side logic and databases.',
    jobDescription: 'Responsible for server-side application logic.',
    relatedJobs: ['API Developer', 'Database Administrator'],
    coreSkills: ['Node.js', 'Databases', 'APIs'],
    tags: ['Server', 'Database', 'APIs'],
  },
]);

describe('Detail Component', () => {
  test('Verify that components are rendered normally', () => {
    render(<Detail type="Frontend Developer" />);

    expect(screen.getByText('work')).toBeInTheDocument();
    expect(screen.getByText('job description')).toBeInTheDocument();
    expect(screen.getByText('related job')).toBeInTheDocument();
    expect(screen.getByText('core ability')).toBeInTheDocument();
    expect(screen.getByText('tag')).toBeInTheDocument();
  });

  test('Verify that the data that fits the type prop is displayed correctly', () => {
    render(<Detail type="Frontend Developer" />);

    expect(screen.getByText('Develops user interfaces and client-side logic.')).toBeInTheDocument();
    expect(screen.getByText('Responsible for implementing visual elements.')).toBeInTheDocument();
    expect(screen.getByText('Web Developer, UI Developer')).toBeInTheDocument();
    expect(screen.getByText('HTML, CSS, JavaScript')).toBeInTheDocument();
    expect(screen.getByText('UI')).toBeInTheDocument();
    expect(screen.getByText('UX')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  test('Verify that the default value is displayed when type is not in results.json', () => {
    render(<Detail type="Unknown" />);

    expect(screen.getByText('No introduction available.')).toBeInTheDocument();
    expect(screen.getByText('No job description.')).toBeInTheDocument();
    expect(screen.getByText('No related jobs.')).toBeInTheDocument();
    expect(screen.getByText('No core skills.')).toBeInTheDocument();
    expect(screen.getByText('No tags.')).toBeInTheDocument();
  });
});