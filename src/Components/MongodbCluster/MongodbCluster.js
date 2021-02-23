import React, { useState, useEffect } from 'react';
import { Row, Col, Drawer, Collapse } from 'antd';
import { Button } from 'antd';
import { Input } from 'antd';
import { Table, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PlusOutlined } from '@ant-design/icons';

import ApiService from '../../ApiService';
import Form from 'antd/lib/form/Form';
import allImage from '../../images/all.png';

const initialState = {
  clusterName: '',
  userName: '',
  password: '',
  ram: '',
  ssd: '',
  url: '',
  port: '',
  _id: ''
}

const { Panel } = Collapse;

const MongodbCluster = () => {

  const apiService = new ApiService()
  const [isCreateCluster, setIsCreateCluster] = useState(false);
  const [clusterList, setClusterList] = useState([]);
  const [clusterListData, setClusterListData] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [isLoadingCreateCluster, setIsLoadingCreateCluster] = useState(false);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [baseUrl, setBaseUrl] = useState('');
  const [portUrl, setPortUrl] = useState('');

  useEffect(() => {
    getCluster()
  }, [])

  const getCluster = async () => {
    const data = await apiService.getCluster('MongoDB')
    if (data.status === 200) {
      setClusterList(data.data);
      data.data.map((item, index) => {
        setClusterListData((prevState) => [
          ...clusterListData,
          ...prevState,
          {
            key: index,
            sr_no: [index, item._id],
            cluster_name: [data.data[index].cluster_name, item],
            user_name: [data.data[index].user_name, item],
            RAM: data.data[index],
            tags: [item],
          }
        ])
      })
    } else {
    }
  }

  const onOpenClusterDrawer = () => {
    setFormData(initialState);
    setIsCreateCluster((isCreateCluster) => !isCreateCluster);
  };

  const handleCancel = () => {
    setFormData(initialState);
    setIsCreateCluster(false);
  };

  const onChangeText = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  };

  const onSelectStorage = (record) => {
    setSelectedStorage(record)
  };

  const onCreateCluster = async () => {
    setIsLoadingCreateCluster(true)
    const payload = {
      cluster_name: formData.clusterName,
      user_name: formData.userName,
      password: formData.password,
      cluster_for: "MongoDB",
      url: formData.url,
      RAM: selectedStorage.ram
    }
    if (formData._id === '') {
      const data = await apiService.runScriptCluster(payload)
      console.log("Script res: 1 " + JSON.stringify(data))
      if (data.status === 200) {
        toast.success("Create cluster successfully!")
        setTimeout(function () {
          setBaseUrl(data.data.base_url)
          setPortUrl(data.data.port)
          setIsLoadingCreateCluster(false)
        }, 3000)
      } else {
        setIsLoadingCreateCluster(false)
      }
    } else {
      const newPayload = {
        ...payload,
        _id: formData._id
      }
      const data = await apiService.runScriptUpdateCluster(newPayload)
      console.log("Script res: 2 " + JSON.stringify(data))
      if (data.status === 200) {
        toast.success("Update cluster successfully!")
        setTimeout(function () {
          setBaseUrl(data.data.base_url)
          setPortUrl(data.data.port)
          setIsLoadingCreateCluster(false)
        }, 3000)
      } else {
        setIsLoadingCreateCluster(false)
      }
    }
  };

  const clusterCreate = async () => {
    const payload = {
      cluster_name: formData.clusterName,
      user_name: formData.userName,
      password: formData.password,
      cluster_for: "MongoDB",
      RAM: selectedStorage.ram,
      hard_drive: selectedStorage.hardDrive,
      base_url: baseUrl,
      port: portUrl,
      url: formData.url
    }
    console.log("Data: " + JSON.stringify(payload))
    if (formData._id === '') {
      const data = await apiService.clusterCreate(payload)
      if (data.status === 200) {
        toast.success("Create MongoDB Cluster Successfully!")
        setTimeout(function () {
          const clone = [...clusterList];
          clone.push(data.data);
          setClusterList(clone)
          setFormData(initialState);
          setIsCreateCluster(false)
          window.location.reload()
        }, 3000)
      } else {
      }
    } else {
      const newPayload = {
        ...payload,
        _id: formData._id
      }
      const data = await apiService.clusterUpdate(newPayload)
      if (data.status === 200) {
        toast.success("Update MongoDb Cluster Successfully!")
        setTimeout(function () {
          const clone = [...clusterList];
          const index = clone.findIndex((x) => x._id === formData._id)
          if (index > -1) {
            clone[index] = newPayload
            setClusterList(clone)
          }
          setFormData(initialState);
          setIsCreateCluster(false)
          window.location.reload()
        }, 3000)
      } else {
      }
    }
  };

  const onDelete = async (record, i) => {
    if (window.confirm("Are you sure you want to delete this record ?")) {
      const data = await apiService.clusterDelete(record[0]._id)
      if (data.status === 200) {
        toast.error("Delete cluster successfully!")
        setTimeout(function () {
          const clone = [...clusterList];
          const index = clone.findIndex((x) => x._id === record[0]._id)
          if (index > -1) {
            clone.splice(index, 1)
            setClusterList(clone)
            window.location.reload()
          }
        }, 3000);
      }
    }
  };

  const onEdit = (record) => {
    setFormData({
      _id: record[0]._id,
      clusterName: record[0].cluster_name,
      userName: record[0].user_name,
      password: record[0].password,
      ram: record[0].RAM,
      ssd: record[0].SSD
    })
    setIsCreateCluster(true)
  };

  const storageList = [
    { key: "1", ram: "1 GB", hardDrive: "12 GB" },
    { key: "2", ram: "512 MB", hardDrive: "8 GB" },
  ]

  const clusterListColumns = [
    {
      title: 'Sr no.',
      dataIndex: 'sr_no',
      key: 'sr_no',
      render: (index) => <Link to={'/cluster-detail/' + index[1]}>{index[0] + 1}</Link>,
    },
    {
      title: 'Cluster Name',
      dataIndex: 'cluster_name',
      key: '2',
      render: (index) => <Link to={'/cluster-detail/' + index[1]._id}>{index[0]}</Link>,
    },
    {
      title: 'User Name',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (index) => <Link to={'/cluster-detail/' + index[1]._id}>{index[0]}</Link>,
    },
    {
      title: 'RAM',
      dataIndex: 'RAM',
      key: 'RAM',
      render: (index) => <Link to={'/cluster-detail/' + index._id}>{index.RAM}</Link>,
    },
    {
      title: 'Action',
      key: 'tags',
      dataIndex: 'tags',
      width: '23%',
      render: tags => (
        <>
          <Button type="primary" onClick={() => onEdit(tags)} style={{ marginRight: 5 }}>Edit </Button>
          <Button type="primary" danger onClick={() => onDelete(tags)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Row style={{ marginTop: 20 }}>
        <Col span={4}></Col>
        <Col span={14}>
          <h1>MongoDB clusters</h1>
        </Col>
        <Col>
          <Button type="primary" onClick={onOpenClusterDrawer}>
            <PlusOutlined /> Create Cluster
        </Button>
        </Col>
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col span={3}></Col>
        <Col span={18}>
          <Table columns={clusterListColumns} dataSource={clusterListData} />
        </Col>
      </Row>

      {isCreateCluster &&
        <Drawer
          title={formData._id === '' ? "Create Cluster" : "Update Cluster"}
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
              <Button style={{ marginRight: 8 }} onClick={handleCancel}> Cancel </Button>
              <Button type="primary" onClick={clusterCreate}> Submit </Button>
            </div>
          }
        >
          <Collapse accordion>
            <Panel header="Cloud Provider & Region" key="1">
              <img src={allImage} alt="AWS logo" />
            </Panel>
            <Panel header="Select RAM and SSD" key="2">
              <div class="instance-table-header">
                <div class="instance-table-header-cell">Select</div>
                <div class="instance-table-header-cell">RAM</div>
                <div class="instance-table-header-cell">Hard Drive</div>
              </div>

              {storageList.map((item) => (
                <div>
                  <div class="instance-table-info-cell instance-table-info-cell-is-name instance-table-info-cell-is-inner-shadow">
                    <div>
                      <span>
                        <input type="radio" name="gender" onClick={() => onSelectStorage(item)} />
                        <i class="fa instance-table-hardware-circle instance-table-hardware-circle-is-superscript"></i>
                      </span>
                    </div>
                  </div>
                  <div class="instance-table-info-cell instance-table-info-cell-is-inner-shadow">{item.ram}</div>
                  <div class="instance-table-info-cell instance-table-info-cell-is-inner-shadow">{item.hardDrive}</div>
                </div>
              ))}

            </Panel>
            <Panel header="Cluster Name" key="3">
              <Form layout="vertical" hideRequiredMark>
                <label>Cluster Name: </label>
                <Input placeholder="Cluster Name" name='clusterName' value={formData.clusterName} onChange={onChangeText} id='clusterName' />
                <label>User Name: </label>
                <Input placeholder="User Name" name='userName' value={formData.userName} onChange={onChangeText} id='userName' />
                <label>Password: </label>
                <Input.Password placeholder="Password" name='password' value={formData.password} onChange={onChangeText} id='password' />
                <label>Url: </label>
                <Input placeholder="Url" name='url' value={formData.url} onChange={onChangeText} id='url' />

              </Form>
            </Panel>
            <Panel header="Backup" key="4">
              Backup: <Switch defaultChecked style={{ marginLeft: 8 }} />
            </Panel>

          </Collapse>
          <Row style={{ marginTop: 15 }}>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6}>
              {isLoadingCreateCluster ? <Button type="primary" loading>Loading</Button>
                : <Button type="primary" onClick={onCreateCluster}>{formData._id === '' ? "Create Cluster" : "Update Cluster"}</Button>
              }</Col>
          </Row>
        </Drawer>
      }
    </>
  );
};
export default MongodbCluster;