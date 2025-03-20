import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import React from 'react';

interface DataTableProps<T> {
    columns: { header: string; accessor: keyof T | ((item: T) => React.ReactNode) }[];
    data: T[];
}

const toReactNode = (value: unknown): React.ReactNode => {
    if (value === null || value === undefined) {
        return '';
    }
    return typeof value === 'object' ? JSON.stringify(value) : String(value);
};

export const DataTable = <T,>({ columns, data }: DataTableProps<T>) => (
    <TableContainer>
        <Table variant="simple" colorScheme="brand">
            <Thead>
                <Tr>
                    {columns.map((col, index) => (
                        <Th key={index}>{col.header}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item, rowIndex) => (
                    <Tr key={rowIndex}>
                        {columns.map((col, colIndex) => (
                            <Td key={colIndex}>
                                {typeof col.accessor === 'function'
                                    ? col.accessor(item)
                                    : toReactNode(item[col.accessor])}
                            </Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    </TableContainer>
);
