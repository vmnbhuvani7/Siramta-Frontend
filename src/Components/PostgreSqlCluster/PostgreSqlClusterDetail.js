import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { Tabs } from 'antd';

import ApiService from '../../ApiService';

const { TabPane } = Tabs;
const PostgreSqlClusterDetail = (props) => {

    const [clusterData, setClusterData] = useState({})
    const [isClusterModal, setIsClusterModal] = useState(false);

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

    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col span={9}></Col>
                <Col style={{ marginLeft: 8 }}>
                    <h1>PostgreSQL Cluster Detail</h1>
                </Col>
            </Row>

            <Row style={{ marginTop: 20 }}>
                <Col span={9}></Col>
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
                    <TabPane tab="Tab 2" key="2">
                        Content of Tab Pane 2
                </TabPane>
                    <TabPane tab="Tab 3" key="3">
                        Content of Tab Pane 3
                </TabPane>
                </Tabs>
            </Row>
        </>
    );
}

export default PostgreSqlClusterDetail;