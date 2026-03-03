import figma from '@figma/code-connect';
figma.connect('https://figma.com/file/FIGMA_FILE_ID/AspectRatio', {
    props: { ratio: figma.enum('Ratio', { '1:1': 1, '16:9': 16 / 9, '4:3': 4 / 3 }) },
    example: ({ ratio }) => (<AspectRatio ratio= { ratio } > <div /></AspectRatio >),
});
