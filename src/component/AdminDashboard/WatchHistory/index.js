import React, { useEffect, useState } from 'react';
import "antd/dist/antd.css";
import '../../../assets/css/eachCollection.css';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Row, Col, Tooltip, Pagination, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined, AppstoreAddOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { customNotification, msgType } from '../../../utils/notification/customNotification';
import { getLimitHistory } from '../../../store/actions/watchList/WatchHistory';


const { Title, Text } = Typography;
const defaultPageSize = [10, 25, 50, 100]


const WatchHistory = () => {
  const { historyList, totalHistory, loading, errormessage } = useSelector(store => store.watchHistory);
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);
  const [itemCount, setItemCount] = useState(defaultPageSize[0]);
  const [historyCards, setHistoryCards] = useState([]);

  useEffect(() => {
    let data = {
      pageNo,
      itemCount
    }
    dispatch(getLimitHistory(data));
  }, [pageNo, itemCount, dispatch]);

  useEffect(() => {
    constructItem(historyList);
  }, [historyList]);

  const onPageChange = (page, pageSize) => {
    // console.log(page, pageSize);
    setPageNo(page);
    setItemCount(pageSize);
  }
  // {
  //   "id": "b4c385f9-d80e-41ef-a0be-86154a6f8c2e",
  //   "mediaName": "mind fresh",
  //   "link": "https://media.istockphoto.com/videos/attractive-woman-blogger-speaks-about-professional-voice-over-and-video-id1253606799",
  //   "mediaType": "mp4",
  //   "collectionId": "7b54193b-40af-4341-89b5-85d1516a930f"
  // },

  function constructItem(totalHistory) {
    let buildData = totalHistory.length !== 0 && totalHistory.map((item, idx) => {
      return (
        <Col xs={24} sm={24} md={24} lg={12} xl={12} key={item.id}>
          <div className="card">
            <div className='itemCard'>
              <Row gutter={16}>
                <Col className="gutter-row" span={20}>
                  <div className='leftSide'>
                    <Row >
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Media Id: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.id}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Media Name: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.mediaName}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Media type: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="strong"> {item?.mediaType}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Collection Id: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Text type="italic"> {item?.collectionId}</Text>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Title level={5}>Link: </Title>
                      </Col>
                      <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Tooltip title={item?.link}>
                          <Text type="strong"> {item?.link.slice(0, 40)}...</Text>
                        </Tooltip>
                      </Col>
                    </Row>
                  </div>
                </Col>
                {/* <Col className="gutter-row" span={4}>
                  <div className='rightSide'>
                    <div>
                      <Row >
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <div className='iconBox'>
                            <Tooltip title="Edit this order">
                              <Button style={{ border: "none" }}
                                onClick={() => editOrder({
                                  id: item.id,
                                  customerName: item?.customer_name,
                                  customerEmail: item?.customer_email,
                                  product: item?.product,
                                  quantity: item?.quantity,
                                })}>
                                <EditOutlined style={{ fontSize: '16px', color: '#00FFAB' }} />
                              </Button>
                            </Tooltip>
                          </div>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                          <div className='iconBox'>
                            <Tooltip title="Delete this order">
                              <Button style={{ border: "none" }}
                                onClick={() => showDeleteConfirm(item.id)}
                              >
                                <DeleteOutlined style={{ fontSize: '16px', color: '#F32424' }} />
                              </Button>
                            </Tooltip>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col> */}
              </Row>
            </div>
          </div>
        </Col>
      );
    });
    setHistoryCards(buildData);

  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", color: "#4D4C7D" }}>
        <Title level={2}>History Details</Title>
      </div>

      <div className='ordersContainer'>
        <div style={{ paddingBottom: "1.25rem" }}>
          <Row gutter={[16, 16]}>
            {historyCards}
          </Row>
        </div>

      </div>
      <div className='paginationContainer'>
        <div className='paginationBox'>
          <div></div>
          <div className='pagination'>
            <Pagination showQuickJumper defaultCurrent={pageNo} total={totalHistory} onChange={onPageChange} pageSizeOptions={defaultPageSize} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default WatchHistory