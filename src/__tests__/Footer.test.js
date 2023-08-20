import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer';

describe('Footer component', () => {
  test('should render contact link', () => {
    render(<Footer />);
    const contactLinks = screen.getAllByRole('link', { name: 'Contact Us' });
    expect(contactLinks).toHaveLength(2);
    for(const link of contactLinks){
        expect(link).toHaveAttribute('href', 'mailto:team@shopthe-line.com');
    }
  });
  
  test('should render Icons8 attribution link', () => {
    render(<Footer />);
    const icons8Links = screen.getAllByRole('link', { name: 'Icons8' });
    expect(icons8Links).toHaveLength(2);
    for(const link of icons8Links){
      expect(link).toHaveAttribute('href', 'https://icons8.com');
    }

  });
  
  test('should render The Odds API attribution link', () => {
    render(<Footer />);
    const contactUsLinks = screen.getAllByRole('link', { name: 'Contact Us' });
    expect(contactUsLinks).toHaveLength(2);
    for(const link of contactUsLinks){
      expect(link).toHaveAttribute('href', 'mailto:team@shopthe-line.com');
    }
  });

  test('should render PopupComponent with type "instructions"', () => {
    render(<Footer />);
    const instructionsPopups = screen.getAllByText('How to Use');
    expect(instructionsPopups).toHaveLength(2);
  });

  test('should render PopupComponent with type "sportsbook-list"', () => {
    render(<Footer />);
    const sportsbookListPopups = screen.getAllByText('Sportsbooks');
    expect(sportsbookListPopups).toHaveLength(2);
  });

  test('should render Terms of Use link', () => {
    render(<Footer />);
    const termsOfUseLinks = screen.getAllByText('Terms of Use');
    expect(termsOfUseLinks).toHaveLength(2);
  });

  test('should render Privacy Policy link', () => {
    render(<Footer />);
    const privLinks = screen.getAllByText('Privacy Policy');
    expect(privLinks).toHaveLength(2);
  });
  
});