import { TUser } from '../types/user';
import { Button, Space, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';

const formatDate = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

const formatDateTime = (date: Date) => {
    const formattedDate = formatDate(date);
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${formattedDate} ${hh}:${mi}:${ss}`;
};

type TableRowSelection = TableProps<TUser>['rowSelection'];

export const rowSelection: TableRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log('Selected Row Keys:', selectedRowKeys);
        console.log('Selected Rows:', selectedRows);
    },
};

export const columns: TableProps<TUser>['columns'] = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Balance ($)',
        dataIndex: 'balance',
        key: 'balance',
        render: (balance) => `$${balance.toLocaleString()}`,
        sorter: (a, b) => a.balance - b.balance
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Registration',
        dataIndex: 'registerAt',
        key: 'registerAt',
        render: (date) => {
            const dateObj = new Date(date);
            return (
                <Tooltip title={formatDateTime(dateObj)}>
                    <span>{formatDate(dateObj)}</span>
                </Tooltip>
            );
        },
        sorter: (a, b) => new Date(a.registerAt).getTime() - new Date(b.registerAt).getTime(),
    },
    {
        title: 'Status',
        dataIndex: 'active',
        key: 'active',
        render: (active) => (
            <Tag color={active ? 'green' : 'red'}>
                {active ? 'Active' : 'Inactive'}
            </Tag>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_) => (
            <Space size="middle">
                <Button type="link" icon={<EditOutlined />} />
                <Button type="link" danger icon={<DeleteOutlined />} />
            </Space>
        ),
    },
];