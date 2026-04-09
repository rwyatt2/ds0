import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AppShell } from './AppShell';
import { Text } from 'react-native';

describe('AppShell (Native)', () => {
  it('renders children', () => {
    render(<AppShell><Text>Main</Text></AppShell>);
    expect(screen.getByText('Main')).toBeTruthy();
  });
});
