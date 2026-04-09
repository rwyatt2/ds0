import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { InfiniteScroll } from './InfiniteScroll';
import { Text } from 'react-native';
describe('InfiniteScroll (Native)', () => { it('renders', () => { render(<InfiniteScroll hasMore onEndReached={() => {}}><Text>Content</Text></InfiniteScroll>); expect(screen.getByText('Content')).toBeTruthy(); }); });
