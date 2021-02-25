import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Col, Drawer, Input, Row, Table, Select } from 'antd';
import { Tabs } from 'antd';
import { Space } from 'antd';
import { toast } from 'react-toastify';

import ApiService from '../../ApiService';

const { Option } = Select;
const { TabPane } = Tabs;

const initialState = {
    user_name: "",
    password: "",
    authenticationMethod: "",
    mongoDBRoles: "",
    resources: "",
}

const initialStateNetwork = {
    ip_address: "",
    comment: "",
}

const MongodbClusterDetail = (props) => {

    const apiService = new ApiService()
    const [clusterData, setClusterData] = useState({})
    const [isCreateCluster, setIsCreateCluster] = useState(false);
    const [isCreateNetwork, setIsCreateNetwork] = useState(false);
    const [isLoadingCreateCluster, setIsLoadingCreateCluster] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [networkFormData, setNetworkFormData] = useState(initialStateNetwork);
    const [databaseUSerData, setDatabaseUSerData] = useState([]);
    const [networkData, setNetworkData] = useState([]);


    let id = props.match.params.id;

    useEffect(() => {
        getClusterDetail()
        getDatabaseUser()
        getNetwork()
    }, [])

    const getClusterDetail = async () => {
        const data = await apiService.getClusterById(id);
        if (data.status === 200) {
            setClusterData(data.data)
        }
    }

    const getDatabaseUser = async () => {
        const data = await apiService.getDatabaseUser()
        if (data.status === 200) {
            setDatabaseUSerData(data.data)
        }
    }
    const getNetwork = async () => {
        const data = await apiService.getNetwork()
        if (data.status === 200) {
            console.log("data.data", data.data);
            setNetworkData(data.data)
        }
    }

    const onOpenClusterDrawer = () => {
        setFormData(initialState);
        setIsCreateCluster((isCreateCluster) => !isCreateCluster);
    };
    const onOpenNetworkDrawer = () => {
        setNetworkFormData(initialStateNetwork);
        setIsCreateNetwork((isCreateNetwork) => !isCreateNetwork);
    };

    const handleCancel = () => {
        setIsCreateCluster(false);
    };
    const handleCancelNetwork = () => {
        setIsCreateNetwork(false);
    };

    const onChangeText = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    };
    const onChangeAuthentication = (text) => {
        setFormData({ ...formData, authenticationMethod: text })
    };
    const onChangeRoles = (text) => {
        setFormData({ ...formData, mongoDBRoles: text })
    };
    const onChangeNetworkText = (event) => {
        setNetworkFormData({ ...networkFormData, [event.target.name]: event.target.value })
    };

    const onCreateDatabaseUser = async () => {
        setIsLoadingCreateCluster(true)
        const data = await apiService.databaseUserCreate(formData)
        if (data.status === 200) {
            toast.success("Create Database User Successfully!")
            setTimeout(function () {
                setIsCreateCluster(false)
                setIsLoadingCreateCluster(false)
                window.location.reload()
            }, 3000)
        }
    }

    const onCreateNetwork = async () => {
        setIsLoadingCreateCluster(true)
        const data = await apiService.networkCreate(networkFormData)
        if (data.status === 200) {
            toast.success("Create Network Successfully!")
            setTimeout(function () {
                setIsCreateCluster(false)
                setIsLoadingCreateCluster(false)
                window.location.reload()
            }, 3000)
        }
    }
    const columnsOfDatabase = [
        {
            title: 'User name',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'Authentication Method',
            dataIndex: 'authentication_method',
            key: 'authentication_method',
        },
        {
            title: 'MongoDB Roles',
            dataIndex: 'mongodb_roles',
            key: 'mongodb_roles',
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
                    <Button type="primary" style={{ marginRight: 5 }}>Edit </Button>
                    <Button type="primary" danger>Delete</Button>
                </Space>
            ),
        },
    ];

    const columnsOfNetwork = [
        {
            title: 'IP address',
            dataIndex: 'ip_address',
            key: 'ip_address',
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
                <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{
                        height: 15,
                        width: 15,
                        backgroundColor: text === "deactive" ? "red" : "#00FF00",
                        borderRadius: "50%",
                        display: "inline-block",
                    }}></div>
                    <p style={{ marginBottom: 0, marginLeft: 5 }}>{text}</p>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="primary" danger >Delete</Button>
                </Space>
            ),
        },
    ];

    console.log("formData@@!@!", formData);

    return (
        <>
            {isCreateCluster &&
                <Drawer
                    title="Create a Database User"
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
                            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                                Cancel </Button>
                            {isLoadingCreateCluster ? <Button type="primary" loading>Loading</Button>
                                : <Button onClick={onCreateDatabaseUser} type="primary">
                                    Submit
</Button>
                            }
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        {/* <label>User name: </label> */}
                        <Form.Item
                            name="user_name"
                            label="User name:"
                        >
                            <Input placeholder="User Name" name='user_name' value={formData.user_name} onChange={onChangeText} id='user_name' />
                        </Form.Item>
                        {/* <label>Password: </label> */}
                        <Form.Item
                            name="password"
                            label="Password:"
                        >
                            <Input.Password placeholder="Password" name='password' value={formData.password} onChange={onChangeText} id='password' />
                        </Form.Item>
                        <Form.Item
                            name="authenticationMethod"
                            label="Authentication Method:"
                        >
                            <Select placeholder="Please select an owner" value={formData.authenticationMethod} name="authenticationMethod" onChange={onChangeAuthentication}>
                                <Option value="SCRAM" >SCRAM</Option>
                                <Option value="Password" >Password</Option>
                                <Option value="Certificate" >Certificate</Option>
                                <Option value="AWS-IAM" >AWS-IAM</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="mongoDBRoles"
                            label="MongoDB Roles:"
                        >
                            <Select placeholder="Please select an owner" value={formData.mongoDBRoles} name="authenticationMethod" onChange={onChangeRoles}>
                                <Option value="Atlas_Admin" >Atlas_Admin</Option>
                                <Option value="Read_And_Write" >Read_And_Write</Option>
                                <Option value="Only_Read" >Only_Read</Option>
                            </Select>
                        </Form.Item>
                        <label>Resources: </label>
                        <Input placeholder="Resources" name='resources' value={formData.resources} onChange={onChangeText} id='resources' />


                    </Form>
                </Drawer>

            }
            {isCreateNetwork &&
                <Drawer
                    title="Create a Network"
                    width={560}
                    onClose={handleCancelNetwork}
                    visible={isCreateNetwork}
                    bodyStyle={{ paddingBottom: 80 }}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={handleCancelNetwork} style={{ marginRight: 8 }}>
                                Cancel
              </Button>
                            {isLoadingCreateCluster ? <Button type="primary" loading>Loading</Button>
                                : <Button type="primary" onClick={onCreateNetwork}>
                                    Submit
              </Button>
                            }
                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Form.Item
                            name="ip_address"
                            label="IP address:"
                        >
                            <Input placeholder="IP address" name='ip_address' value={networkFormData.ip_address} onChange={onChangeNetworkText} id='ip_address' />
                        </Form.Item>
                        <Form.Item
                            name="comment"
                            label="Comment:"
                        >
                            <Input placeholder="Comment" name='comment' value={networkFormData.comment} onChange={onChangeNetworkText} id='comment' />
                        </Form.Item>
                    </Form>
                </Drawer>

            }
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
                                <Button type="primary" onClick={onOpenNetworkDrawer}>
                                    <PlusOutlined /> Add IP Address
                            </Button>
                            </Row>
                            <Table width='50%' columns={columnsOfNetwork} dataSource={networkData} pagination={false} />
                        </div>
                    </TabPane>
                    <TabPane tab="Database user" key="3">
                        <Row style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
                            <Button type="primary" onClick={onOpenClusterDrawer}>
                                <PlusOutlined /> Add New DataBase User
                            </Button>
                        </Row>
                        <Table columns={columnsOfDatabase} dataSource={databaseUSerData} pagination={false} />
                    </TabPane>
                </Tabs>
            </Row>
        </>
    );
}

export default MongodbClusterDetail;