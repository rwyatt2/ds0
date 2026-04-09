import React, { forwardRef } from 'react';
import { View, Text, type ViewProps } from 'react-native';
import { styled } from 'nativewind';
const StyledView = styled(View);
const StyledText = styled(Text);
const Stepper = forwardRef<React.ElementRef<typeof View>, ViewProps & { activeStep: number; steps: { title: string }[] }>(
    ({ activeStep, steps, ...props }, ref) => (
        <StyledView ref={ref} className="flex-row items-center gap-2" accessibilityRole="tablist" {...props}>
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    <StyledView className={`h-8 w-8 rounded-full items-center justify-center ${i < activeStep ? 'bg-primary' : i === activeStep ? 'bg-primary' : 'bg-muted'}`}>
                        <StyledText className="text-sm font-medium text-primary-foreground">{i < activeStep ? '✓' : i + 1}</StyledText>
                    </StyledView>
                    <StyledText className="text-sm">{step.title}</StyledText>
                    {i < steps.length - 1 && <StyledView className="flex-1 h-0.5 bg-border" />}
                </React.Fragment>
            ))}
        </StyledView>
    ),
);
Stepper.displayName = 'Stepper';
export { Stepper };
