import React from 'react';
import { render, screen } from '@testing-library/react';
import InstructionCarousel from '../Components/InstructionCarousel';

describe('InstructionCarousel component', () => {
  test('should have all of the slides', () => {
    render(<InstructionCarousel />);
    const slides = screen.getAllByTestId('slide');
    expect(slides).toHaveLength(8);
  });

  test('should have text on each slide', () => {
    render(<InstructionCarousel />);
    const slides = screen.getAllByTestId('slide');
    for(const slide of slides){
        const text = slide.querySelector('p').textContent;
        expect(text).toBeDefined;
    }
  });

  test('should have images on each slide', () => {
    render(<InstructionCarousel />);
    const slides = screen.getAllByTestId('slide');
    let counter = 0;
    for(const slide of slides){
        const imageAlt = slide.querySelector('img').getAttribute('alt');
        expect(imageAlt).toBe('slide ' + counter);
        counter++;
    }
  });
});