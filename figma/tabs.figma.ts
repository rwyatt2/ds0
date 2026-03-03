import figma from '@figma/code-connect';

/**
 * Maps the Figma Tabs component to the DS0 React implementation.
 * When a developer inspects this component in Figma, they see real DS0 code.
 */
figma.connect('https://figma.com/file/[FILE_ID]/Tabs', {
    props: {
        orientation: figma.enum('Orientation', {
            Horizontal: 'horizontal',
            Vertical: 'vertical',
        }),
    },
    example: ({ orientation }) => (
        <Tabs defaultValue= "tab1" orientation={ orientation } >
        <Tabs.List>
        <Tabs.Trigger value="tab1"> Tab 1</ Tabs.Trigger >
    <Tabs.Trigger value="tab2" > Tab 2 </Tabs.Trigger>
    </Tabs.List>
< Tabs.Content value = "tab1" > Content 1 </Tabs.Content>
< Tabs.Content value = "tab2" > Content 2 </Tabs.Content>
</Tabs>
),
});
