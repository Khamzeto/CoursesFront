// src/components/Course/MarkdownTypography.tsx
import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

interface MarkdownTypographyProps extends TypographyProps {
  component: React.ElementType;
}

const MarkdownTypography: React.FC<MarkdownTypographyProps> = props => {
  return <Typography {...props} />;
};

export default MarkdownTypography;
