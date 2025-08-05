// Utility to convert SVG files to text format and export them

export const convertSvgToText = async (svgPath: string): Promise<string> => {
  try {
    const response = await fetch(svgPath);
    const svgText = await response.text();
    return svgText;
  } catch (error) {
    console.error('Error converting SVG to text:', error);
    throw error;
  }
};

export const exportSvgAsText = (svgContent: string, filename: string = 'world.svg'): void => {
  // Create a blob with the SVG content
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportSvgAsTypeScript = (svgContent: string, variableName: string = 'worldSvg'): string => {
  // Escape the SVG content for TypeScript
  const escapedContent = svgContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
  
  return `export const ${variableName} = \`${escapedContent}\`;`;
};

// Function to convert your existing world.ts back to SVG format
export const convertTypeScriptToSvg = (tsContent: string): string => {
  // Extract the SVG content from the TypeScript export
  const match = tsContent.match(/export const \w+ = `([\s\S]*?)`;/);
  if (match) {
    return match[1];
  }
  throw new Error('Could not extract SVG content from TypeScript file');
}; 