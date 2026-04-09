import type { Meta, StoryObj } from '@storybook/react';
import { Map } from './Map';
const meta: Meta<typeof Map> = { title: 'Components/Data Viz/Map', component: Map, tags: ['autodocs'] };
export default meta;
type Story = StoryObj<typeof Map>;
export const Default: Story = { args: { center: { lat: 40.7128, lng: -74.0060 }, zoom: 12 } };
export const WithMarkers: Story = { args: { center: { lat: 40.7128, lng: -74.0060 }, markers: [{ id: '1', lat: 40.7128, lng: -74.0060, label: 'NYC' }, { id: '2', lat: 40.758, lng: -73.985, label: 'Times Square' }] } };
export const Dark: Story = { args: { variant: 'dark', center: { lat: 51.5072, lng: -0.1276 } } };
export const CustomSize: Story = { args: { width: 500, height: 300, center: { lat: 35.6762, lng: 139.6503 } } };
