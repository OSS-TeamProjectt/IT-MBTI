import React from 'react';
import { render, screen } from '@testing-library/react';
import Skill from '../../components/Skill';

// `results.json`에 맞는 모의(mock) 데이터
jest.mock('../../data/results.json', () => [
  {
    type: 'DevOps Engineer',
    recommendedSkills: [
      {
        "name": "Jenkins",
        "image": "/img/skill/jenkins.png",
        "website": "https://www.Jenkins.io/"
      },
      {
        "name": "Docker",
        "image": "/img/skill/docker.png",
        "website": "https://www.docker.com/"
      },
    ],
  },
]);

describe('Skill Component', () => {
  test('Verify that components are rendered normally', () => {
    render(<Skill type="DevOps Engineer" />);

    expect(screen.getByText('Recommended Skill')).toBeInTheDocument();
  });

  test('Verify that the skill that fits the type prop is displayed correctly', () => {
    render(<Skill type="DevOps Engineer" />);

    expect(screen.getByText(/Jenkins/i)).toBeInTheDocument();
    expect(screen.getByText(/Docker/i)).toBeInTheDocument();
  });

  test('Verify skill images and links are rendered correctly', () => {
    render(<Skill type="DevOps Engineer" />);

    const jenkinsLink = screen.getByRole('link', { name: /Jenkins/ });
    expect(jenkinsLink).toHaveAttribute('href', 'https://www.Jenkins.io/');

    const dockerLink = screen.getByRole('link', { name: /Docker/ });
    expect(dockerLink).toHaveAttribute('href', 'https://www.docker.com/');
  });

  test('Verify that the default text is displayed when type is not in results.json', () => {
    render(<Skill type="Unknown" />);

    expect(screen.getByText('Unknown Skills')).toBeInTheDocument();
  });
});
