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
    authentication_method: "",
    mongodb_roles: "",
    // resources: "",
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
    const [showPassword, setShowPassword] = useState(true);

    let id = props.match.params.id;

    const [form] = Form.useForm();
    React.useEffect(() => {
    }, [formData]);

    useEffect(() => {
        getClusterDetail()
        getDatabaseUser()
        getNetwork()
    }, [networkFormData, formData])

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
        setFormData({ ...formData, authentication_method: text })
    };
    const onChangeRoles = (text) => {
        setFormData({ ...formData, mongodb_roles: text })
    };
    const onChangeNetworkText = (event) => {
        setNetworkFormData({ ...networkFormData, [event.target.name]: event.target.value })
    };

    const onCreateDatabaseUser = async () => {
        setIsLoadingCreateCluster(true)
        let data
        if (formData._id) {
            data = await apiService.databaseUserUpdate(formData)
        } else {
            data = await apiService.databaseUserCreate(formData)
        }
        if (data.status === 200) {
            toast.success("Create Database User Successfully!")
            setTimeout(function () {
                setIsCreateCluster(false)
                setIsLoadingCreateCluster(false)
                window.location.reload()
            }, 3000)
        } else {
            toast.error(data)
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
    const onNetworkDelete = async (item) => {
        if (window.confirm("Are you sure you want to delete this record ?")) {
            const data = await apiService.networkDelete(item._id)
            if (data.status === 200) {
                toast.error("Delete cluster successfully!")
                setTimeout(function () {
                    window.location.reload()
                }, 3000);
            } else {
                toast.error(data)
            }
        }
    };
    const onDatabaseDelete = async (item) => {
        if (window.confirm("Are you sure you want to delete this record ?")) {
            const data = await apiService.databaseDelete(item._id)
            if (data.status === 200) {
                toast.error("Delete cluster successfully!")
                setTimeout(function () {
                    window.location.reload()
                }, 3000);
            } else {
                toast.error(data)
            }
        }
    };
    const onDatabaseEdit = (item) => {
        setIsCreateCluster(true)
        setShowPassword(false)
        setFormData(item)
    }
    const callback = (key) => {
        localStorage.setItem("tab_key", key)
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
        // {
        //     title: 'Resources',
        //     dataIndex: 'resources',
        //     key: 'resources',
        // },
        {
            title: 'Action',
            key: 'action',
            render: (item) => (
                <Space size="middle">
                    <Button type="primary" style={{ marginRight: 5 }} onClick={() => onDatabaseEdit(item)}>Edit </Button>
                    <Button type="primary" danger onClick={() => onDatabaseDelete(item)}>Delete</Button>
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
            render: (item) => (
                <Space size="middle">
                    <Button type="primary" danger onClick={() => onNetworkDelete(item)} >Delete</Button>
                </Space>
            ),
        },
    ];
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
                            <Input placeholder="User Name" name='user_name' defaultValue={formData.user_name} onChange={(e) => onChangeText(e)} id='user_name' />
                        </Form.Item>
                        {/* <label>Password: </label> */}
                        {showPassword && <Form.Item
                            name="password"
                            label="Password:"
                        >
                            <Input.Password placeholder="Password" name='password' value={formData.password} onChange={(e) => onChangeText(e)} id='password' />
                        </Form.Item>
                        }
                        <Form.Item
                            name="authentication_method"
                            label="Authentication Method:"
                        >
                            <Select placeholder="Please select an owner" defaultValue={formData.authentication_method || "Please select a method"} name="authentication_method" onChange={onChangeAuthentication}>
                                <Option value="Password" >Password</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="mongodb_roles"
                            label="MongoDB Roles:"
                        >
                            <Select placeholder="Please select an owner" defaultValue={formData.mongodb_roles || "Please select a role"} name="mongodb_roles" onChange={onChangeRoles}>
                                <Option value="Atlas_Admin" >Atlas Admin</Option>
                                <Option value="Read_And_Write" >Read And Write</Option>
                                <Option value="Only_Read" >Only Read</Option>
                                <Option value="Grant_Specific_Privileges" >Grant Specific Privileges</Option>
                            </Select>
                        </Form.Item>
                        {/* <label>Resources: </label>
                        <Input placeholder="Resources" name='resources' value={formData.resources} onChange={onChangeText} id='resources' /> */}


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
                <Tabs defaultActiveKey={localStorage.getItem("tab_key")} onChange={callback}>
                    <TabPane tab="Cluster Detail" key="1">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Cluster Name: </th>
                                    <td style={{ paddingLeft: 10 }}>{clusterData.cluster_name}</td>
                                </tr>
                                {/* <tr>
                                    <th>User Name: </th>
                                    <td style={{ paddingLeft: 10 }}>{clusterData.user_name}</td>
                                </tr> */}
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