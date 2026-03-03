import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/PLACEHOLDER/Form', {
    props: {
        layout: figma.enum('Layout', { Vertical: 'vertical', Horizontal: 'horizontal' }),
    },
    example: ({ layout }) =>
        `<Form layout="${layout}" onSubmit={handleSubmit}>
  <Form.Field name="email">
    <Form.Label>Email</Form.Label>
    <Input type="email" />
  </Form.Field>
  <Form.Actions>
    <Button type="submit">Submit</Button>
  </Form.Actions>
</Form>`,
});
