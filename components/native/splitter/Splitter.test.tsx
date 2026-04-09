import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SplitterGroup, SplitterPanel, SplitterHandle } from './Splitter';
import { Text } from 'react-native';

describe('Splitter (Native)', () => {
  it('renders panels', () => {
    render(
      <SplitterGroup><SplitterPanel><Text>Left</Text></SplitterPanel><SplitterHandle /><SplitterPanel><Text>Right</Text></SplitterPanel></SplitterGroup>,
    );
    expect(screen.getByText('Left')).toBeTruthy();
    expect(screen.getByText('Right')).toBeTruthy();
  });
});
