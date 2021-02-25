import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Input, Row, Table } from 'antd';
import { Tabs } from 'antd';
import { Space } from 'antd';

import ApiService from '../../ApiService';
import Form from 'antd/lib/form/Form';

const { TabPane } = Tabs;
const MongodbClusterDetail = (props) => {

    const [clusterData, setClusterData] = useState({})
    const [isCreateCluster, setIsCreateCluster] = useState(false);



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

    const columnsOfDatabase = [
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

    const columnsOfNetwork = [
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
                <div style={{ display: "flex" }}>
                    <input type="radio" checked style={{ marginTop: 5 }} />
                    <p style={{ marginBottom: 0, marginLeft: 5 }}>{text}</p>
                </div>
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

    const dataOfDatabase = [{
        key: '1',
        userName: 'dev040',
        authenticationMethod: 'SCRAM',
        mongoDBRoles: 'test@admin',
        resources: 'All Resources',
        tags: ['Edit', 'Delete'],
    }];

    const dataOfNetwork = [{
        key: '1',
        ipAddress: '0.0.0.0/0',
        comment: 'no comment',
        status: 'test status',
        tags: ['Edit', 'Delete'],
    }];

    const createIpAddress = () => {
        // setFormData(initialState);
        setIsCreateCluster((isCreateCluster) => !isCreateCluster);
    };

    const handleCancel = () => {
        // setFormData(initialState);
        setIsCreateCluster(false);
    };

    return (
        <>
            <Row style={{ paddingTop: 20 }}>
                <Col span={9}></Col>
                <Col style={{ marginLeft: 8 }} >
                    <h1>MongoDB Cluster Detail</h1>
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
                <Col span={6}></Col>
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
                        <div>
                            <Row style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                                <Button type="primary" onClick={createIpAddress}>
                                    <PlusOutlined /> Add IP Address
                            </Button>
                            </Row>
                            {
                                isCreateCluster &&
                                <Drawer
                                    // title={formData._id === '' ? "Create Cluster" : "Update Cluster"}
                                    width={560}
                                    onClose={handleCancel}
                                    visible={isCreateCluster}
                                    bodyStyle={{ paddingBottom: 80 }}


                                    footer={
                                        <div
                                            style={{
                                                textAlign: 'right',
                                            }}
                                        >
                                            <Button style={{ marginRight: 8 }}
                                            // onClick={handleCancel}
                                            > Cancel </Button>
                                            <Button type="primary"
                                            //  onClick={clusterCreate}
                                            > Submit </Button>
                                        </div>
                                    }
                                >
                                    <h1 style={{margin:'18%'}}>Add Ip Access List Entry</h1>
                                    <Form layout="vertical" hideRequiredMark>
                                        <label>Ip Address: </label>
                                        <Input placeholder="Ip Address" name='ipaddress'
                                            //  value={formData.clusterName} 
                                            // onChange={onChangeText} 
                                            id='ipaddress' />
                                        <label>Comment: </label>
                                        <Input placeholder="Comment" name='comment'
                                            // value={formData.userName}
                                            //  onChange={onChangeText}
                                            id='comment' />
                                    </Form>
                                </Drawer>
                            }
                            <Table width='50%' columns={columnsOfNetwork} dataSource={dataOfNetwork} pagination={false} />
                        </div>
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