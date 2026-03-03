import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/PLACEHOLDER/Breadcrumb', {
    props: {
        levels: figma.number('Levels'),
    },
    example: () =>
        `<Breadcrumb>
  <Breadcrumb.List>
    <Breadcrumb.Item><Breadcrumb.Link href="/">Home</Breadcrumb.Link></Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item><Breadcrumb.Page>Current</Breadcrumb.Page></Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb>`,
});
