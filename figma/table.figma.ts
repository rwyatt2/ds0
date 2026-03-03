import figma from '@figma/code-connect';

figma.connect('https://figma.com/file/[FILE_ID]/Table', {
    props: {},
    example: () => (
        <Table>
        <Table.Header>
        <Table.Row>
        <Table.Head>Name </Table.Head>
        < Table.Head > Email </Table.Head>
        </Table.Row>
        </Table.Header>
        < Table.Body >
        <Table.Row>
        <Table.Cell>Alice </Table.Cell>
        < Table.Cell > alice@example.com </Table.Cell>
        </Table.Row>
        </Table.Body>
</Table>
),
});
