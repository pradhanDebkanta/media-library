import React, { useState, useEffect } from 'react';
import { Button, Pagination, Typography, Collapse } from 'antd';
import { EditOutlined, AppstoreAddOutlined, } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import CreateCollections from './CreateCollections';
import CreateEachCollectionItem from './CreateEachCollectionItem';

import '../../../assets/css/myCollections.css';
import { getLimitCollection } from '../../../store/actions/dashboard/collection';

const defaultPageSize = [10, 25, 50, 100];
const { Title, Text } = Typography;
const { Panel } = Collapse;


const MyCollections = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setmodalOpen] = useState(false);
    const [initFormData, setInitForm] = useState({});
    const [pageNo, setPageNo] = useState(1);
    const [itemCount, setItemCount] = useState(defaultPageSize[0]);
    const [cNameCards, setCNameCards] = useState([]);

    const [activeCol, setActiveCol] = useState();



    const { collectionName, totalCollection } = useSelector(state => state.collections);


    useEffect(() => {
        let data = {
            pageNo,
            itemCount
        }
        dispatch(getLimitCollection(data));
    }, [pageNo, itemCount, dispatch]);

    useEffect(() => {
        // console.log('construct again');
        constructCollection(collectionName);
    }, [collectionName, activeCol]);

    const onPageChange = (page, pageSize) => {
        // console.log(page, pageSize);
        setPageNo(page);
        setItemCount(pageSize);
    }

    const onAction = (flag) => {
        console.log(flag);
        setmodalOpen(flag);
    }

    const newCollection = () => {
        let data = {
            id: uuidv4(),
            formType: "Create a new collection",
            isNew: true
        }
        setInitForm(data);
        setmodalOpen(true);
    }

    const editCollection = (data) => {
        let dumData = {
            ...data,
            formType: "Edit order details",
            isNew: false
        };
        // console.log(dumData, "dum")
        setInitForm(dumData);
        setmodalOpen(true);

    }

    const genExtra = (item) => (
        <EditOutlined
            style={{ color: '#6E85B7' }}
            onClick={(event) => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
                editCollection(item);
            }}
        />
    );

    const onCollapseChange = (key) => {
        if (key) {
            console.log(key, "collapse");
            let cards = () => (<CreateEachCollectionItem cId={key} />)
            setActiveCol(cards);
        }

    }

    function constructCollection(totalCName) {
        let buildData = totalCName.length !== 0 && totalCName.map((item, idx) => {
            return (

                <Panel
                    header={
                        <Typography>
                            <Title level={4}
                                style={{ color: '#6E85B7' }}
                            >{item.name}</Title>
                        </Typography>
                    } key={item.id} extra={genExtra(item)}
                >
                    <div className='cBody'>
                        {activeCol}
                    </div>
                </Panel>

            );
        });
        setCNameCards(buildData);
    }

    return (
        <div className='myCollections'>
            <div className='createCollectionContainer'>
                <div className='createCollectionBox'>
                    <div></div>
                    <div>
                        <Button type="primary" icon={<AppstoreAddOutlined />} size={"middle"} onClick={newCollection}>
                            Create Collection
                        </Button>
                    </div>
                </div>

                <div className='collectionContainer'>
                    <div style={{ paddingBottom: "1.25rem" }}>
                        <Collapse
                            defaultActiveKey={['1']}
                            onChange={onCollapseChange}
                            expandIconPosition={'start'}
                            accordion
                        >
                            {cNameCards}
                        </Collapse>
                    </div>

                </div>

                {collectionName.length !== 0 && (
                    <div className='paginationContainer'>
                        <div className='paginationBox'>
                            <div></div>
                            <div className='pagination'>
                                <Pagination showQuickJumper defaultCurrent={pageNo} total={totalCollection} onChange={onPageChange} pageSizeOptions={defaultPageSize} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {
                isModalOpen && (
                    <CreateCollections onAction={onAction} initData={initFormData} open={isModalOpen} />
                )
            }

        </div>
    )
}

export default MyCollections;