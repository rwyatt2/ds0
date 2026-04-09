import type { Meta, StoryObj } from '@storybook/react';
import { Carousel, CarouselItem } from './Carousel';
const meta: Meta<typeof Carousel> = { title: 'Components/Data Display/Carousel', component: Carousel, tags: ['autodocs'], argTypes: { variant: { control: 'select', options: ['default', 'card'] }, loop: { control: 'boolean' }, autoPlay: { control: 'boolean' } } };
export default meta;
type Story = StoryObj<typeof Carousel>;
export const Default: Story = { render: (args) => (<Carousel {...args}><CarouselItem><div className="bg-muted rounded-lg p-12 text-center">Slide 1</div></CarouselItem><CarouselItem><div className="bg-muted rounded-lg p-12 text-center">Slide 2</div></CarouselItem><CarouselItem><div className="bg-muted rounded-lg p-12 text-center">Slide 3</div></CarouselItem></Carousel>) };
export const WithLoop: Story = { ...Default, args: { loop: true } };
export const AutoPlay: Story = { ...Default, args: { autoPlay: true, autoPlayInterval: 3000, loop: true } };
