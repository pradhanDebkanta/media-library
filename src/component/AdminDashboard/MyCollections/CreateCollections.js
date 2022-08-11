import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { customNotification, msgType } from '../../../utils/notification/customNotification';
import { checkIfCollectionNameExist } from '../../../store/sagas/dashboard/collection';
import { createCollection, editCollection } from '../../../store/actions/dashboard/collection';

const CreateCollections = ({ onAction, initData, open }) => {
    const [isModalVisible, setIsModalVisible] = useState(open);
    const [cName, setCName] = useState(initData?.name || "");
    const [debounceCName, setDebounceCName] = useState(cName);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { collectionName } = useSelector(state => state.collections);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (cName !== debounceCName) {
                (async (data) => {
                    const isExist = await checkIfCollectionNameExist(data);
                    if (isExist.length !== 0) {
                        customNotification({ message: `${isExist[0]?.name} already exist. choose another name`, type: msgType.error });
                    }
                })(cName);
            }
            setDebounceCName(cName);
        }, [1500]);

        return () => clearTimeout(timeOutId);
    }, [cName])


    const handleNameChange = (value) => {
        // console.log(value, "i/p");
        setCName(value);
    }

    const isNewChanges = (data) => {
        let tergetOrder = collectionName.filter(item => item.id === initData.id);
        // console.log(tergetOrder, "terget order")
        return JSON.stringify(data) === JSON.stringify(tergetOrder[0]);
    }

    const handleOk = () => {
        form.validateFields().then((value) => {
            let data = {
                id: value.collectionId,
                name: value.collectionName
            };
            console.log(data);
            if (initData.isNew) {
                dispatch(createCollection(data));

            } else {
                if (!isNewChanges(data)) {
                    dispatch(editCollection(data));
                } else {
                    customNotification({ message: "Nothing new to update.", type: msgType.warning });
                }
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
    return (
        <div>
            <Modal title={initData?.formType || "Modal Title"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} maskClosable={false}
                okText={initData?.isNew ? "Create" : "Update"}
                cancelText="Discard"
            >
                <div className='createForm'>
                    <Form
                        form={form}
                        name="collectionForm"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                            collectionId: initData?.id,
                            collectionName: initData?.name

                        }}

                        autoComplete="off"

                    >
                        <Form.Item
                            label="collection id"
                            name="collectionId"
                        >
                            <Input
                                disabled />
                        </Form.Item>
                        <Form.Item
                            label="collection name"
                            name="collectionName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter collection name',
                                },
                            ]}
                        >
                            <Input onChange={(e) => handleNameChange(e.target.value)} />
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
        </div>
    )
}

export default CreateCollections