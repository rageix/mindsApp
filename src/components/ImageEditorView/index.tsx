'use client';
import { useState } from 'react';
import ImageEditorController from '@/components/ImageEditor/ImageEditorController';
import ImageEditor from '@/components/ImageEditor';

export default function ImageEditorView() {
  const [controller] = useState(
    new ImageEditorController({
      name: 'test1',
      width: 1000,
      height: 1000,
      layers: [],
    }),
  );

  return <ImageEditor controller={controller} />;
}
