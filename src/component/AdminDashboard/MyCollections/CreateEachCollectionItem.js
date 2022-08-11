import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Tooltip, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, ExclamationCircleOutlined, ImportOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux'
import CreateMediaCard from './CreateMediaCard';
import { customNotification, msgType } from '../../../utils/notification/customNotification';
import MoveMediaCard from './MoveMediaCard';
import MediaPlayer from './MediaPlayer';

import '../../../assets/css/eachCollection.css';
import { getSpcColItem, deleteMedia } from '../../../store/actions/dashboard/eachCollection';

const { Title, Text } = Typography;
const { confirm } = Modal;

const CreateEachCollectionItem = ({ cId }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setmodalOpen] = useState(false);
    const [isMoveModalOpen, setMoveModalOpen] = useState(false);
    const [isMPlayerOpen, setMPlayerOpen] = useState(false);
    const [initFormData, setInitForm] = useState({});
    const [mediaCards, setMediaCards] = useState([]);

    const eachCollection = useSelector(state => state.eachCollection);
    // console.log(eachCollection, "each collection");

    const tempDeletedOrdr = [];

    useEffect(() => {
        dispatch(getSpcColItem(cId));
        // console.log(cId, "ceach");

    }, [cId])

    useEffect(() => {
        let mediaArr = eachCollection[cId];
        console.log(mediaArr, "media arr");
        if (Array.isArray(mediaArr)) {
            constructItem(mediaArr);
        }

    }, [eachCollection])

    const onAction = (flag) => {
        console.log(flag);
        setmodalOpen(flag);
    }

    const onMoveAction = (flag) => {
        console.log(flag);
        setMoveModalOpen(flag);
    }

    const onMediaAction = (flag) => {
        console.log(flag);
        setMPlayerOpen(flag);
    }

    const newCollection = () => {
        let data = {
            id: uuidv4(),
            formType: "Create a new media card",
            isNew: true,
            collectionId: cId
        }
        setInitForm(data);
        setmodalOpen(true);
    }

    const editCollection = (data) => {
        let dumData = {
            ...data,
            formType: "Edit media card",
            isNew: false
        };
        // console.log(dumData, "dum")
        setInitForm(dumData);
        setmodalOpen(true);

    }
    const onDeleteMedia = (id) => {
        let flag = tempDeletedOrdr.find((item) => item === id);
        console.log(flag, tempDeletedOrdr, " checking")
        if (flag === undefined) {
            dispatch(deleteMedia({ id, collectionId: cId }));
            tempDeletedOrdr.splice(0, tempDeletedOrdr.length);
            tempDeletedOrdr.push(id);
        } else {
            customNotification({ message: "Please wait this order is deleting.", type: msgType.warning })
            console.log("no no wait untill this order get deleted");
        }

    }

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this media details?',
            icon: <ExclamationCircleOutlined />,
            content: 'After delete this media you can\'t recover it.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            confirmLoading: true,
            onOk() {
                console.log('OK');
                onDeleteMedia(id);
            },

            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const moveCollection = (data) => {
        console.log(data, "move coll");
        let dumData = {
            ...data,
            formType: "Move media card",
        };
        // console.log(dumData, "dum")
        setInitForm(dumData);
        setMoveModalOpen(true);
    }

    const mediaPlayerOpen = (data) => {
        console.log(data, "media player open");
        let dumData = {
            ...data,
        };
        // console.log(dumData, "dum")
        setInitForm(dumData);
        setMPlayerOpen(true);

    }


    function constructItem(totalMedia) {
        let buildData = totalMedia.length !== 0 && totalMedia.map((item, idx) => {
            return (
                <Col xs={24} sm={24} md={24} lg={24} xl={24} key={item.id}
                    onClick={() => {
                        mediaPlayerOpen(item)
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="card">
                        <div className='itemCard'>
                            <Row gutter={16}>
                                <Col className="gutter-row" span={20}>
                                    <div className='leftSide'>
                                        <Row>
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Title level={5}>Media Name: </Title>
                                            </Col>
                                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                <Text type="strong"> {item?.mediaName}</Text>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                                <Title level={5}>Media Type </Title>
                                            </Col>
                                            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                                                <Text type="strong"> {item?.mediaType}</Text>
                                            </Col>
                                        </Row>

                                    </div>
                                </Col>
                                <Col className="gutter-row" span={4}>
                                    <div className='rightSide'>
                                        <div>
                                            <Row >
                                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                                    <div className='iconBox'>
                                                        <Tooltip title="Edit this order">
                                                            <Button style={{ border: "none" }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();

                                                                    editCollection({
                                                                        id: item.id,
                                                                        collectionId: item?.collectionId,
                                                                        mediaName: item?.mediaName,
                                                                        mediaType: item?.mediaType,
                                                                        link: item?.link
                                                                    });
                                                                }}>
                                                                <EditOutlined style={{ fontSize: '16px', color: '#00FFAB' }} />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </Col>
                                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                                    <div className='iconBox'>
                                                        <Tooltip title="Delete this media">
                                                            <Button style={{ border: "none" }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    showDeleteConfirm(item.id);
                                                                }}
                                                            >
                                                                <DeleteOutlined style={{ fontSize: '16px', color: '#F32424' }} />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </Col>
                                                {/* for move */}
                                                <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                                    <div className='iconBox'>
                                                        <Tooltip title="move this media">
                                                            <Button style={{ border: "none" }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    moveCollection(item);
                                                                }}
                                                            >
                                                                <ImportOutlined style={{ fontSize: '16px', color: '#A66CFF' }} />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            );
        });
        setMediaCards(buildData);
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#4D4C7D" }}>
                <div>
                    <Title level={5}>collection details</Title>
                </div>
                <div>
                    <Tooltip title="create a media card" color={'purple'}>
                        <Button type="dashed" icon={<AppstoreAddOutlined />} size={"small"} onClick={newCollection}>
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div className='createOrderContainer'>


            </div>
            <div className='ordersContainer'>
                <div style={{ paddingBottom: "1.25rem" }}>
                    <Row gutter={[16, 16]}>
                        {mediaCards}
                    </Row>
                </div>

            </div>

            {
                isModalOpen && (
                    <CreateMediaCard onAction={onAction} initData={initFormData} open={isModalOpen} />
                )
            }
            {
                isMoveModalOpen && (
                    <MoveMediaCard onAction={onMoveAction} initData={initFormData} open={isMoveModalOpen} />
                )
            }
            {
                isMPlayerOpen && (
                    <MediaPlayer onAction={onMediaAction} initData={initFormData} open={isMPlayerOpen} />
                )
            }

        </div>
    )
}

export default CreateEachCollectionItem