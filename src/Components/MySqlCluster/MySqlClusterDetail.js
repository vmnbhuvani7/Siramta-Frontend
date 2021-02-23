import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';

import ApiService from '../../ApiService';

const MySQLClusterDetail = (props) => {

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

    const onModalOpen = () => {
        setIsClusterModal(!isClusterModal)
    };

    const onModalClose = () => {
        setIsClusterModal(!isClusterModal)
    };

    const onClickClusterDetail = () => {
        setIsClusterModal(true)
    }

    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col span={9}></Col>
                <Col style={{ marginLeft: 8 }}>
                    <h1>MySQL Cluster Detail</h1>
                </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
                <Col span={6}></Col>
                <Col md={12}>
                    <Button type='primary' block onClick={onClickClusterDetail}>Cluster Detail</Button>
                </Col>
            </Row>
            {  isClusterModal &&
                <Modal title="Cluster Detail" visible={isClusterModal} onOk={onModalOpen} onCancel={onModalClose}>
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
                </Modal>
            }
        </>
    );
}

export default MySQLClusterDetail;