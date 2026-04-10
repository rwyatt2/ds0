'use client';

import { Stepper, StepperItem } from '../../../../components/react/stepper';
import { Stack } from '../../../../components/react/stack';

export function StepperPreview(): React.ReactElement {
    return (
        <Stack gap="6" className="w-full max-w-lg">
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Horizontal (step 2 of 4)</p>
                <Stepper activeStep={1}>
                    <StepperItem title="Account" description="Create your account" />
                    <StepperItem title="Profile" description="Set up your profile" />
                    <StepperItem title="Preferences" description="Choose settings" />
                    <StepperItem title="Complete" description="All done!" />
                </Stepper>
            </div>
            <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">Vertical</p>
                <Stepper activeStep={2} orientation="vertical">
                    <StepperItem title="Order Placed" description="Apr 9, 2026" />
                    <StepperItem title="Processing" description="Preparing your order" />
                    <StepperItem title="Shipped" description="In transit" />
                    <StepperItem title="Delivered" description="Estimated Apr 12" />
                </Stepper>
            </div>
        </Stack>
    );
}
