import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Components/Footer';

describe('Footer component', () => {
  test('should render contact link', () => {
    render(<Footer />);
    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', 'mailto:team@shopthe-line.com');
  });

  test('should render Icons8 attribution link', () => {
    render(<Footer />);
    const icons8Link = screen.getByRole('link', { name: 'Icons8' });
    expect(icons8Link).toBeInTheDocument();
    expect(icons8Link).toHaveAttribute('href', 'https://icons8.com');

  });

  test('should render The Odds API attribution link', () => {
    render(<Footer />);
    const contactUsLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactUsLink).toBeInTheDocument();
    expect(contactUsLink).toHaveAttribute('href', 'mailto:team@shopthe-line.com');
  });

  test('should render PopupComponent with type "instructions"', () => {
    const { getByText } = render(<Footer />);
    const instructionsPopup = getByText('How to Use');
    expect(instructionsPopup).toBeInTheDocument();
  });

  test('should render PopupComponent with type "sportsbook-list"', () => {
    const { getByText } = render(<Footer />);
    const sportsbookListPopup = getByText('Sportsbooks');
    expect(sportsbookListPopup).toBeInTheDocument();
  });
});