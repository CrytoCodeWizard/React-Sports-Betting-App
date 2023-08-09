import React from 'react';
import { render, screen } from '@testing-library/react';
import SportsBookList from '../Components/SportsBookList';
import {state_bookmakers, bookmaker_names, bookmaker_links} from '../Resources.js';

describe('Sportsbook List component', () => {
  test('list should have all sportsbooks', () => {
    render(<SportsBookList />);
    const bookList = screen.getAllByRole('button');
    expect(bookList).toHaveLength(Array.from(state_bookmakers["All"]).length);
  });

  test('books should have correct links', () => {
    render(<SportsBookList />);
    const bookList = screen.getAllByTestId('sportsbook');
    for(const book of bookList){
        const aTag = book.querySelector('a');
        const link = aTag.getAttribute('href');
        const text = aTag.textContent;
        expect(bookmaker_links[Object.keys(bookmaker_names).find(key => bookmaker_names[key] === text)]).toBe(link);
    }
  });
});