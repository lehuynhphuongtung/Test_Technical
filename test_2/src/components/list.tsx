import React, { useEffect, useState } from 'react';
import { Divider, List, message, Skeleton, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataType {
    name: string;
    url: string;
}

const { Text } = Typography

const ListComponent: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
    const [offset, setOffset] = useState(0);

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '20 more items loaded!',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Error loaded!',
        });
    };

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch(`https://pokeapi.co/api/v2/ability/?limit=20&offset=${offset}`)
            .then((res) => res.json())
            .then((body) => {
                setTimeout(() => {
                    setData([...data, ...body.results]);
                    setOffset((prevOffset) => prevOffset + 20);
                    setLoading(false);
                    success();
                }, 1000);
            })
            .catch(() => {
                setLoading(false);
                error()
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <div
            id="scrollableDiv"
            style={{
                height: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            {contextHolder}
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 200}
                loader={<Skeleton avatar paragraph={{ rows: 3 }} active />}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item.name}>
                            <Text>{item.name} - <a href={`${item.url}`}>Go to...</a></Text>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div >
    );
};

export default ListComponent;