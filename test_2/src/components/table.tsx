import { Table, TableProps, Row, Col, Flex, Pagination, Typography } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { paginateData } from "../util/pagination";

const { Text } = Typography;

interface TableComponentProps<T> {
    data: T[];
    columns: TableProps<T>["columns"];
    rowSelection?: TableRowSelection<T>;
    count: number
}

const TableComponent = <T extends { id: string }>({
    data,
    columns,
    rowSelection,
    count
}: TableComponentProps<T>) => {
    const [dataPaginate, setDataPaginate] = useState<T[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const changePagination = (page: number) => {
        setCurrentPage(page);
        setDataPaginate(paginateData<T>(data, page, 10));
    };

    useEffect(() => {
        setDataPaginate(paginateData<T>(data, 1, 10));
    }, [data]);

    return (
        <>
            <Table<T>
                rowSelection={rowSelection}
                rowKey="id"
                columns={columns}
                dataSource={dataPaginate}
                pagination={false}
                scroll={{ x: 300 }}
            />
            <Row style={{ padding: "16px" }} gutter={16}>
                <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                    <Flex justify="flex-start">
                        <Text style={{ marginTop: "5px" }}>{count} results</Text>
                    </Flex>
                </Col>
                <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
                    <Flex justify="flex-end">
                        <Pagination current={currentPage} total={count} onChange={changePagination} showSizeChanger={false} />
                    </Flex>
                </Col>
            </Row>
        </>
    );
};

export default TableComponent;