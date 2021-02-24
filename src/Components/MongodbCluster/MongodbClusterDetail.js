import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Table } from 'antd';
import { Tabs } from 'antd';

import ApiService from '../../ApiService';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { Tag, Space } from 'antd';


const { TabPane } = Tabs;
const MongodbClusterDetail = (props) => {

    const [clusterData, setClusterData] = useState({})
    const [isClusterModal, setIsClusterModal] = useState(false);
    const [clusterListData, setClusterListData] = useState([]);


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

    const callback = (key) => {
        setIsClusterModal(!isClusterModal)
    }

    // const clusterListColumns = [
    //     {
    //         title: 'Sr no.',
    //         dataIndex: 'sr_no',
    //         key: 'sr_no',
    //         render: (index) => <Link to={'/MySQL-detail/' + index[1]}>{index[0] + 1}</Link>,
    //     },
    //     {
    //         title: 'Cluster Name',
    //         dataIndex: 'cluster_name',
    //         key: '2',
    //         render: (index) => <Link to={'/MySQL-detail/' + index[1]._id}>{index[0]}</Link>,
    //     },
    //     {
    //         title: 'User Name',
    //         dataIndex: 'user_name',
    //         key: 'user_name',
    //         render: (index) => <Link to={'/MySQL-detail/' + index[1]._id}>{index[0]}</Link>,
    //     },
    //     {
    //         title: 'RAM',
    //         dataIndex: 'RAM',
    //         key: 'RAM',
    //         render: (index) => <Link to={'/MySQL-detail/' + index._id}>{index.RAM}</Link>,
    //     },
    //     {
    //         title: 'Action',
    //         key: 'tags',
    //         dataIndex: 'tags',
    //         width: '23%',
    //         render: tags => (
    //             <>
    //                 <Button type="primary"
    //                     // Click={() => onEdit(tags)}
    //                     style={{ marginRight: 5 }}>Edit </Button>
    //                 <Button type="primary" danger
    //                 //  onClick={() => onDelete(tags)}
    //                 >Delete</Button>
    //             </>
    //         ),
    //     },
    // ];


    const columns = [
        {
            title: 'User name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Authentication Method',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'MongoDB Roles',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Resources',
            dataIndex: 'place',
            key: 'place',
        },
        // {
        //     title: 'Action',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: tags => (
        //         <>   
        //             {tags.map(tag => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <a>Invite {record.name}</a>
                    <a>Delete</a> */}

                    <Button type="primary"
                        //  onClick={() => onEdit(tags)}
                        style={{ marginRight: 5 }}>Edit </Button>
                    <Button type="primary" danger
                    // onClick={() => onDelete(tags)}
                    >Delete</Button>
                </Space>
            ),
        },
    ];
    const columns1 = [
        {
            title: 'IP address',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Comment',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <a>Invite {record.name}</a>
                    <a>Delete</a> */}

                    <Button type="primary"
                        //  onClick={() => onEdit(tags)}
                        style={{ marginRight: 5 }}>Edit </Button>
                    <Button type="primary" danger
                    // onClick={() => onDelete(tags)}
                    >Delete</Button>
                </Space>
            ),
        },
    ];

    const data1 = [
        {
            key: '1',
            name: 'test1',
            age: 32,
            address: 'test address1',
            status: 'test status 1',
            tags: ['nice', 'developer'],
        },
    ];
    const data = [
        {
            key: '1',
            name: 'test1',
            age: 32,
            address: 'test address1',
            place: 'Test resource1',
            tags: ['nice', 'developer'],
        },
    ];

    return (
        <>
            <Row style={{ paddingTop: 20 }}>
                <Col span={9}></Col>
                <Col style={{ marginLeft: 8 }} >
                    <h1>MongoDB Cluster Detail</h1>
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
                <Col span={1}></Col>
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="Cluster Detail" key="1">
                        {isClusterModal && <table>
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
                        }
                    </TabPane>

                    <TabPane tab="Network" key="2">
                        {/* Content of Tab Pane 2 */}


                        <Row style={{ marginTop: 20 }}>
                            <Col span={1}></Col>
                            <Col span={18}>
                                {/* <Table columns={clusterListColumns} dataSource={clusterListData} /> */}
                                <Row style={{ paddingTop: 20 }}>
                                    <Col span={4}></Col>
                                    <Col span={14}>
                                        <h1>MongoDB clusters</h1>
                                    </Col>
                                    <Col>
                                        <Button type="primary">
                                            <PlusOutlined /> Create Cluster
                                         </Button>
                                    </Col>
                                </Row>
                                <Table columns={columns} dataSource={data} pagination={false} />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Database user" key="3">
                        {/* Content of Tab Pane 3 */}

                        <Row style={{ marginTop: 20 }}>
                            <Col span={3}></Col>
                            <Col span={18}>
                                <Row style={{ paddingTop: 20 }}>
                                    <Col span={1}></Col>
                                    <Col span={14}>
                                        <h1>Database user</h1>
                                    </Col>
                                    <Col>
                                        <Button type="primary">
                                            <PlusOutlined /> Create Cluster
                                         </Button>
                                    </Col>
                                </Row>
                                <Table columns={columns1} dataSource={data1} pagination={false} />
                                {/* <Table columns={clusterListColumns} dataSource={clusterListData} /> */}
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Row>
        </>
    );
}

export default MongodbClusterDetail;