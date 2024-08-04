import React from 'react';
import MarkdownTypography from './MarkdownTypography';

const renderers = {
  h1: (props: any) => (
    <MarkdownTypography
      variant="h1"
      component="h1"
      sx={{ fontSize: '2.5rem' }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <MarkdownTypography
      variant="h2"
      component="h2"
      sx={{ fontSize: '2rem' }}
      {...props}
    />
  ),
  h3: (props: any) => (
    <MarkdownTypography
      variant="h3"
      component="h3"
      sx={{ fontSize: '1.75rem' }}
      {...props}
    />
  ),
  h4: (props: any) => (
    <MarkdownTypography
      variant="h4"
      component="h4"
      sx={{ fontSize: '1.5rem' }}
      {...props}
    />
  ),
  h5: (props: any) => (
    <MarkdownTypography
      variant="h5"
      component="h5"
      sx={{ fontSize: '1.25rem' }}
      {...props}
    />
  ),
  h6: (props: any) => (
    <MarkdownTypography
      variant="h6"
      component="h6"
      sx={{ fontSize: '1rem' }}
      {...props}
    />
  ),
  p: (props: any) => (
    <MarkdownTypography
      variant="body1"
      component="p"
      sx={{ fontSize: '1rem' }}
      {...props}
    />
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => {
    console.log('Image source:', src); // Log the image source
    return <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto' }} />;
  },
};

export default renderers;
