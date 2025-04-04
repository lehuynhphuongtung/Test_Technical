import { Input, Flex, Button, Drawer, Select, Form, Row, Col, Typography } from 'antd';
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import type { GetProps } from 'antd';
import { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDarkMode } from '../context/darkmode';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

interface FilterComponentProps {
    onFilterChange?: (filters: Record<string, any>) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { statusMode } = useDarkMode();

    type SearchProps = GetProps<typeof Input.Search>;

    const onSearch: SearchProps['onSearch'] = (value) => {
        const filterData = {
            id: value,
            name: "",
            email: "",
            active: "",
        };
        onFilterChange?.(filterData);
    };

    const {
        control,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            active: "",
        }
    });

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onFinish = (values: any) => {
        onFilterChange?.({ ...values, id: "" });
        reset();
        onClose();
    };

    const clearFormdata = () => {
        reset()
    }

    const clearFliter = () => {
        setSearchValue('')
        const filterData = {
            id: "",
            name: "",
            email: "",
            active: "",
        };
        onFilterChange?.(filterData);
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Search
                        placeholder="Search ID User"
                        enterButton="Search"
                        size="large"
                        suffix={searchValue === '' ? <SearchOutlined /> : <CloseOutlined onClick={clearFliter} />}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value === '') {
                                clearFliter()
                                const filterData = {
                                    id: "",
                                    name: "",
                                    email: "",
                                    active: "",
                                };
                                onFilterChange?.(filterData);
                            }
                        }}
                        onSearch={onSearch}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
                    <Flex gap={16}>
                        <Button size='large' onClick={showDrawer}>Advanced</Button>
                        <Button size='large' type='default' onClick={clearFliter}>Clear Filter...</Button>
                    </Flex>
                </Col>
            </Row>
            <Drawer
                title="Advanced Filter"
                placement='left'
                closable={false}
                onClose={onClose}
                open={open}
                style={{ backgroundColor: !statusMode ? "#fff" : "#374151" }}
            >
                <Form
                    layout='vertical'
                    onFinish={handleSubmit(onFinish)}
                >
                    <Form.Item label="Name" name="name">
                        <Controller name="name" control={control} render={({ field }) => (<Input {...field} key="name" size="large" placeholder={"Enter your Name"} />)} />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Controller name="email" control={control} render={({ field }) => (<Input {...field} key="email" size="large" placeholder={"Enter your Email"} />)} />
                    </Form.Item>

                    <Form.Item label="Active" name="active">
                        <Controller name="active" control={control} render={({ field }) => (
                            <Select
                                {...field}
                                size="large"
                                placeholder="Enter your Active"
                                defaultValue=""
                                dropdownRender={(menu) => (
                                    <div style={statusMode ? { backgroundColor: "#374151" } : {}}>
                                        {menu}
                                    </div>
                                )}
                            >
                                <Option value="">
                                    All
                                </Option>
                                <Option value="true">
                                    Active
                                </Option>
                                <Option value="false">
                                    Inactive
                                </Option>
                            </Select>)} />
                    </Form.Item>

                    <Form.Item>
                        <Flex gap={16}>
                            <Button type='default' size='large' style={{ width: "100%" }} onClick={clearFormdata}>
                                Clear
                            </Button>
                            <Button type="primary" htmlType="submit" size='large' style={{ width: "100%" }}>
                                Submit
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    )
}

export default FilterComponent;