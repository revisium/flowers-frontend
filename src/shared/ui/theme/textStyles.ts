import { defineTextStyles } from '@chakra-ui/react';

const sizes: Record<string, { fontSize: string; lineHeight: string }> = {
  xxs: { fontSize: '11px', lineHeight: '14px' },
  xs: { fontSize: '13px', lineHeight: '16px' },
  sm: { fontSize: '15px', lineHeight: '20px' },
  md: { fontSize: '17px', lineHeight: '24px' },
  lg: { fontSize: '20px', lineHeight: '28px' },
  xl: { fontSize: '24px', lineHeight: '32px' },
  xxl: { fontSize: '28px', lineHeight: '36px' },
  h2: { fontSize: '36px', lineHeight: '48px' },
  h1: { fontSize: '48px', lineHeight: '56px' },
  dp: { fontSize: '60px', lineHeight: '68px' },
};

const weights: Record<string, string> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

const textStyleConfig: Parameters<typeof defineTextStyles>[0] = {};

textStyleConfig.serif = {
  value: { fontFamily: "Georgia, 'Times New Roman', serif" },
};

for (const [weight, fontWeight] of Object.entries(weights)) {
  for (const [size, { fontSize, lineHeight }] of Object.entries(sizes)) {
    textStyleConfig[`${weight}-${size}`] = {
      value: { fontSize, fontWeight, lineHeight },
    };
  }
}

export const textStyles = defineTextStyles(textStyleConfig);
