import { RadioGroup as RadioGroupRoot } from './RadioGroup';
import { RadioGroupItem } from './RadioGroupItem';

const RadioGroup = Object.assign(RadioGroupRoot, {
    Item: RadioGroupItem,
});

export { RadioGroup, RadioGroupItem };
export type { RadioGroupProps } from './RadioGroup';
