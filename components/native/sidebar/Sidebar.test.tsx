import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Sidebar } from './Sidebar';
import { Text } from 'react-native';

describe('Sidebar (Native)', () => {
  it('renders children', () => {
    render(<Sidebar><Text>Nav Items</Text></Sidebar>);
    expect(screen.getByText('Nav Items')).toBeTruthy();
  });
});
