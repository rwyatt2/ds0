import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureFlagProvider, useFeatureFlag, Feature } from '../../src/utils/FeatureFlagProvider';

function FlagConsumer({ flag }: { flag: string }) {
    const { enabled } = useFeatureFlag(flag);
    return <span data-testid="status">{enabled ? 'enabled' : 'disabled'}</span>;
}

describe('FeatureFlagProvider', () => {
    it('provides flag values to children', () => {
        render(
            <FeatureFlagProvider flags={{ myFlag: true }}>
                <FlagConsumer flag="myFlag" />
            </FeatureFlagProvider>,
        );

        expect(screen.getByTestId('status').textContent).toBe('enabled');
    });

    it('returns disabled for unknown flags', () => {
        render(
            <FeatureFlagProvider flags={{ otherFlag: true }}>
                <FlagConsumer flag="nonexistent" />
            </FeatureFlagProvider>,
        );

        expect(screen.getByTestId('status').textContent).toBe('disabled');
    });

    it('returns disabled when flag is false', () => {
        render(
            <FeatureFlagProvider flags={{ myFlag: false }}>
                <FlagConsumer flag="myFlag" />
            </FeatureFlagProvider>,
        );

        expect(screen.getByTestId('status').textContent).toBe('disabled');
    });

    it('returns disabled with no provider', () => {
        render(<FlagConsumer flag="anyFlag" />);

        expect(screen.getByTestId('status').textContent).toBe('disabled');
    });
});

describe('Feature component', () => {
    it('renders children when flag is enabled', () => {
        render(
            <FeatureFlagProvider flags={{ newUI: true }}>
                <Feature flag="newUI">
                    <span data-testid="new">New UI</span>
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(screen.getByTestId('new')).toBeDefined();
    });

    it('renders fallback when flag is disabled', () => {
        render(
            <FeatureFlagProvider flags={{ newUI: false }}>
                <Feature flag="newUI" fallback={<span data-testid="old">Old UI</span>}>
                    <span data-testid="new">New UI</span>
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(screen.getByTestId('old')).toBeDefined();
        expect(screen.queryByTestId('new')).toBeNull();
    });

    it('renders nothing when flag is disabled and no fallback', () => {
        const { container } = render(
            <FeatureFlagProvider flags={{ newUI: false }}>
                <Feature flag="newUI">
                    <span data-testid="new">New UI</span>
                </Feature>
            </FeatureFlagProvider>,
        );

        expect(screen.queryByTestId('new')).toBeNull();
        expect(container.textContent).toBe('');
    });
});
