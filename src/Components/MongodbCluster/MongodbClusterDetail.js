import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table } from 'antd';
import { Tabs } from 'antd';
import { Space } from 'antd';

import ApiService from '../../ApiService';

const { TabPane } = Tabs;
const MongodbClusterDetail = (props) => {

    const [clusterData, setClusterData] = useState({})

    let apiService = new ApiService()
    let id = props.match.params.id;

    useEffect(() => {
        getClusterDetail()
    }, [])

    const getClusterDetail = async () => {
        const data = await apiService.getClusterById(id);
        if (data.status === 200) {
            console.log("Data:- " + JSON.stringify(data.data))
            setClusterData(data.data)
        }
    }

    const columnsOfNetwork = [
        {
            title: 'User name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Authentication Method',
            dataIndex: 'authenticationMethod',
            key: 'authenticationMethod',
        },
        {
            title: 'MongoDB Roles',
            dataIndex: 'mongoDBRoles',
            key: 'mongoDBRoles',
        },
        {
            title: 'Resources',
            dataIndex: 'resources',
            key: 'resources',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => (
                <Space size="middle">
                    <Button type="primary" style={{ marginRight: 5 }}>{text.tags[0]} </Button>
                    <Button type="primary" danger>{text.tags[1]}</Button>
                </Space>
            ),
        },
    ];

    const columnsOfDatabase = [
        {
            title: 'IP address',
            dataIndex: 'ipAddress',
            key: 'ipAddress',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <Space>
                    <input type="radio" checked />
                    <p>{text}</p>
                </Space>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => (
                <Space size="middle">
                    <Button type="primary" style={{ marginRight: 5 }}>{text.tags[0]}</Button>
                    <Button type="primary" danger >{text.tags[1]}</Button>
                </Space>
            ),
        },
    ];

    const dataOfNetwork = [{
        key: '1',
        userName: 'dev040',
        authenticationMethod: 'SCRAM',
        mongoDBRoles: 'test@admin',
        resources: 'All Resources',
        tags: ['Edit', 'Delete'],
    }];

    const dataOfDatabase = [{
        key: '1',
        ipAddress: '0.0.0.0/0',
        comment: 'no comment',
        status: 'test status',
        tags: ['Edit', 'Delete'],
    }];

    return (
        <>
            <Row style={{ paddingTop: 20 }}>
                <Col span={9}></Col>
                <Col style={{ marginLeft: 8 }} >
                    <h1>MongoDB Cluster Detail</h1>
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
                <Col span={5}></Col>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Cluster Detail" key="1">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Cluster Name: </th>
                                    <td style={{ paddingLeft: 10 }}>{clusterData.cluster_name}</td>
                                </tr>
                                <tr>
                                    <th>User Name: </th>
                                    <td style={{ paddingLeft: 10 }}>{clusterData.user_name}</td>
                                </tr>
                                <tr>
                                    <th>RAM: </th>
                                    <td style={{ paddingLeft: 10 }}>{clusterData.RAM}</td>
                                </tr>
                                <tr>
                                    <th>Hard Drive: </th>
                                    <td style={{ paddingLeft: 10 }}>{clusterData.hard_drive}</td>
                                </tr>
                                <tr>
                                    <th>Base Url: </th>
                                    <td style={{ paddingLeft: 10 }}>{clusterData.base_url}</td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPane>

                    <TabPane tab="Network" key="2">
                        <Row style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                            <Button type="primary">
                                <PlusOutlined /> Add IP Address
                            </Button>
                        </Row>
                        <Table columns={columnsOfNetwork} dataSource={dataOfNetwork} pagination={false} />
                    </TabPane>
                    <TabPane tab="Database user" key="3">
                        <Row style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                            <Button type="primary">
                                <PlusOutlined /> Add New DataBase User
                            </Button>
                        </Row>
                        <Table columns={columnsOfDatabase} dataSource={dataOfDatabase} pagination={false} />
                    </TabPane>
                </Tabs>
            </Row>
        </>
    );
}

export default MongodbClusterDetail;