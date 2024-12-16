import React from 'react';
import { render, screen } from '@testing-library/react';
import Professor from '../../components/Professor';


// Mocking the results data
jest.mock('../../data/results.json', () => [
  {
    type: 'DevOps Engineer',
    professors: [
      {
        name: 'Jaekyung Ahn',
        image: '/img/professor/안재경교수님.png',
        website: 'https://itm.seoultech.ac.kr/about_itm/about_professor/?togo=list&menu=1920&profidx=02159',
      },
      {
        name: 'Josue Obregon',
        image: '/img/professor/오브레곤교수님.png',
        website: 'https://itm.seoultech.ac.kr/about_itm/about_professor/?togo=list&menu=1920&profidx=02684',
      },
    ],
  },
]);

describe('Professor Component', () => {
  test('Verify that components are rendered normally', () => {
    render(<Professor type="DevOps Engineer" />);

    expect(screen.getByText('Professor of ITM')).toBeInTheDocument();
  });

  test('Verify that the correct faculty for the type prop is displayed correctly', () => {
    render(<Professor type="DevOps Engineer" />);

    expect(screen.getByText(/Jaekyung Ahn/)).toBeInTheDocument();
    expect(screen.getByText(/Josue Obregon/)).toBeInTheDocument();
  });

  test('Verify that the link to the professor profile and the image are rendered correctly', () => {
    render(<Professor type="DevOps Engineer" />);

    const jaekyungAhnLink = screen.getByRole('link', { name: /Jaekyung Ahn/ });
    expect(jaekyungAhnLink).toHaveAttribute(
      'href',
      'https://itm.seoultech.ac.kr/about_itm/about_professor/?togo=list&menu=1920&profidx=02159'
    );

    const josueObregonLink = screen.getByRole('link', { name: /Josue Obregon/ });
    expect(josueObregonLink).toHaveAttribute(
      'href',
      'https://itm.seoultech.ac.kr/about_itm/about_professor/?togo=list&menu=1920&profidx=02684'
    );
  });

  test('Verify that the default text is displayed when type is not in results.json', () => {
    render(<Professor type="Unknown" />);

    expect(screen.getByText('Unknown Professors')).toBeInTheDocument();
  });
});
