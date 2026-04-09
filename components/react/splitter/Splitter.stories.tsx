import type { Meta, StoryObj } from '@storybook/react';
import { SplitterGroup, SplitterPanel, SplitterHandle } from './Splitter';

const meta: Meta<typeof SplitterGroup> = {
  title: 'Components/Layout/Splitter',
  component: SplitterGroup,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ height: '400px', border: '1px solid #e5e7eb' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof SplitterGroup>;

export const Horizontal: Story = {
  render: () => (
    <SplitterGroup direction="horizontal">
      <SplitterPanel defaultSize={30}><div className="p-4">Left Panel</div></SplitterPanel>
      <SplitterHandle />
      <SplitterPanel defaultSize={70}><div className="p-4">Right Panel</div></SplitterPanel>
    </SplitterGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <SplitterGroup direction="vertical">
      <SplitterPanel defaultSize={40}><div className="p-4">Top Panel</div></SplitterPanel>
      <SplitterHandle />
      <SplitterPanel defaultSize={60}><div className="p-4">Bottom Panel</div></SplitterPanel>
    </SplitterGroup>
  ),
};

export const ThreePanel: Story = {
  render: () => (
    <SplitterGroup direction="horizontal">
      <SplitterPanel defaultSize={20}><div className="p-4">Files</div></SplitterPanel>
      <SplitterHandle />
      <SplitterPanel defaultSize={50}><div className="p-4">Editor</div></SplitterPanel>
      <SplitterHandle />
      <SplitterPanel defaultSize={30}><div className="p-4">Preview</div></SplitterPanel>
    </SplitterGroup>
  ),
};
