import React, { forwardRef } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import type { StyledPricingTableProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledPressable = styled(Pressable); const StyledScrollView = styled(ScrollView);
const PricingTable = forwardRef<React.ElementRef<typeof View>, StyledPricingTableProps>(({ tiers, onSelect, title, ...props }, ref) => (
    <StyledView ref={ref} {...props}>
        {title && <StyledText className="text-xl font-bold text-center mb-4">{title}</StyledText>}
        <StyledScrollView horizontal>{tiers.map(t => (
            <StyledView key={t.id} className={`w-64 rounded-xl border p-5 mr-4 ${t.highlighted ? 'border-blue-500 border-2' : 'border-gray-200'}`}>
                <StyledText className="font-semibold text-lg">{t.name}</StyledText>
                <StyledText className="text-3xl font-bold mt-2">{typeof t.price === 'number' ? `$${t.price}` : t.price}</StyledText>
                {t.features.map((f, i) => <StyledText key={i} className="text-sm text-gray-600 mt-1">✓ {f}</StyledText>)}
                <StyledPressable onPress={() => onSelect?.(t)} className="mt-4 bg-blue-600 rounded-lg py-2.5 items-center"><StyledText className="text-white font-medium text-sm">{t.cta || 'Get Started'}</StyledText></StyledPressable>
            </StyledView>
        ))}</StyledScrollView>
    </StyledView>
));
PricingTable.displayName = 'PricingTable';
export { PricingTable };
