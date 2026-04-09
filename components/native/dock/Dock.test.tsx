import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Dock } from './Dock';
import { Text } from 'react-native';

describe('Dock (Native)', () => { it('renders', () => { render(<Dock><Text>Panel</Text></Dock>); expect(screen.getByText('Panel')).toBeTruthy(); }); });
