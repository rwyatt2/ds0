import React, { forwardRef } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { styled } from 'nativewind';
import type { StyledProductCardProps } from '@ds0/primitives';
const StyledView = styled(View); const StyledText = styled(Text); const StyledPressable = styled(Pressable);
const ProductCard = forwardRef<React.ElementRef<typeof View>, StyledProductCardProps>(({ name, price, image, description, badge, onAddToCart, ...props }, ref) => (
    <StyledView ref={ref} className="rounded-xl border bg-white overflow-hidden" accessibilityRole="none" {...props}>
        {image && <Image source={{ uri: image }} className="w-full aspect-square" resizeMode="cover" />}
        <StyledView className="p-4"><StyledText className="font-semibold">{name}</StyledText>{description && <StyledText className="text-xs text-gray-500 mt-1">{description}</StyledText>}<StyledView className="flex-row items-center justify-between mt-3"><StyledText className="text-lg font-bold">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</StyledText>{onAddToCart && <StyledPressable onPress={onAddToCart} className="bg-blue-600 rounded-md px-3 py-1.5"><StyledText className="text-white text-xs font-medium">Add</StyledText></StyledPressable>}</StyledView></StyledView>
    </StyledView>
));
ProductCard.displayName = 'ProductCard';
export { ProductCard };
