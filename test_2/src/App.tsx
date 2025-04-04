import ConfigProviderComponent from "./components/config"
import ContentComponent from "./components/content"
import LayoutComponent from "./components/layout"

import { Col, Row, Typography, Flex, Button, Spin, Switch } from 'antd';
import { UnorderedListOutlined, TableOutlined } from "@ant-design/icons";
import TableComponent from "./components/table";
import { columns, rowSelection } from "./tables/columns";

import { dataDummy } from "./data/data-dummy";
import FilterComponent from "./components/filter";
import { useState } from "react";
import { filterUsers } from "./util/filter";
import { TUser } from "./types/user";
import { useDarkMode } from "./context/darkmode";
import ListComponent from "./components/list";

const { Title, Text } = Typography;

function App() {

  const [data, setData] = useState<TUser[]>(dataDummy);
  const [loading, setLoading] = useState(false);
  const [screen, setScreen] = useState(false);
  const { statusMode, changeStatusDarkmode } = useDarkMode();

  const handleFilterChange = (newFilters: any) => {
    setLoading(true);

    setTimeout(() => {
      const filteredData = filterUsers(dataDummy, newFilters);
      setData(filteredData);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <ConfigProviderComponent>
        <LayoutComponent>
          <ContentComponent>
            <Flex>
              <Title level={2}>Management User</Title>
              <Switch value={statusMode} size='default' style={{ margin: "35px 0 0 15px" }} onClick={changeStatusDarkmode} />
            </Flex>
            <Text >This is the User Information Management page. You can do your work here.</Text>
            <Row gutter={[0, 16]} style={{ margin: "20px 0px" }}>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Flex justify="flex-start" gap={16}>
                  {!screen && <FilterComponent onFilterChange={handleFilterChange} />}
                </Flex>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                <Flex justify="flex-end">
                  <Button type="text" size="large" onClick={() => setScreen(false)}>
                    <TableOutlined />
                  </Button>
                  <Button type="text" size="large" onClick={() => setScreen(true)}>
                    <UnorderedListOutlined />
                  </Button>
                </Flex>
              </Col>
            </Row>
            <Spin spinning={loading}>
              {!screen ? (
                <TableComponent data={data} columns={columns} rowSelection={rowSelection} count={data.length} />
              ) : (
                <ListComponent />
              )}
            </Spin>
          </ContentComponent>
        </LayoutComponent>
      </ConfigProviderComponent>
    </>
  )
}

export default App