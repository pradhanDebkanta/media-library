import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { customNotification, msgType } from '../../../utils/notification/customNotification';
import { moveMedia } from '../../../store/actions/dashboard/eachCollection';

import { checkIfCollectionNameExist } from '../../../store/sagas/dashboard/collection';

const { Option } = Select;



const MoveMediaCard = ({ onAction, initData, open }) => {
    const [isModalVisible, setIsModalVisible] = useState(open);
    const [dCol, setDCol] = useState([]);
    const [searchValue, setSearchValue] = useState();

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // console.log(initData);



    const handleOk = () => {
        form.validateFields().then((value) => {
            console.log(value, "form value");
            if (value?.collectionName) {
                let data = {
                    current: {
                        id: initData.id,
                        mediaName: initData.mediaName,
                        link: initData.link,
                        mediaType: initData.mediaType,
                        collectionId: value?.collectionName
                    },
                    prev: initData.collectionId
                };
                console.log(data);
                // dispatch move action here
                dispatch(moveMedia(data));

            } else {
                customNotification({ type: msgType.warn, message: 'destination collection not found!' });
            }
            setIsModalVisible(false);
            onAction(false);

        }).catch(info => {
            console.log(info);
            customNotification({ type: msgType.warn, multiMsg: info.errorFields });

        })
    }
    const handleCancel = () => {
        setIsModalVisible(false);
        onAction(false);

    };

    const handleChange = (newValue) => {
        setSearchValue(newValue);
        form.setFieldValue({
            collectionName: newValue
        })
        // console.log(form.getFieldValue('collectionName'), "form value get fun");
    };

    const handleSearch = (newValue) => {
        // console.log(newValue, "search");

        if (newValue) {
            (async (data) => {
                const isExist = await checkIfCollectionNameExist(data);
                if (isExist.length !== 0) {
                    console.log(isExist, "is exist");
                    setDCol(isExist)
                }
            })(newValue);
        } else {
            setDCol([]);
        }
    };

    const searchInput = useCallback(() => {

        const options = dCol.map((d) => <Option key={d.id}>{d.name}</Option>);
        return (
            <Select
                showSearch
                value={searchValue}
                placeholder={"search collection name"}
                style={{}}
                defaultActiveFirstOption={false}
                // showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        );

    }, [dCol])


    return (
        <div>
            <Modal title={initData?.formType || "Modal Title"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}
                okText={"Move"}
                cancelText="Discard"
            >
                <div className='createForm'>
                    <Form
                        form={form}
                        name="moveForm"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                            collectionName: ""
                        }}

                        autoComplete="off"

                    >
                        <Form.Item
                            label="Collection Name"
                            name="collectionName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter collection name',
                                },
                            ]}
                        >
                            {searchInput()}
                        </Form.Item>

                    </Form>
                </div>

            </Modal >
        </div >
    )
}

export default MoveMediaCard
