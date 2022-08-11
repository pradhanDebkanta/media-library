import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { customNotification, msgType } from '../../../utils/notification/customNotification';
import { createMedia, editMedia } from '../../../store/actions/dashboard/eachCollection';

const { Option } = Select;

export const typeOfMedia = [
    {
        name: 'mp4',
        value: 'mp4',
    },
    {
        name: 'mp3',
        value: 'mp3',
    }
];

const CreateMediaCard = ({ onAction, initData, open }) => {
    const [isModalVisible, setIsModalVisible] = useState(open);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const eachCollection = useSelector(state => state.eachCollection);

    console.log(initData);


    const isNewChanges = (data) => {
        let mediaArr = eachCollection[initData?.collectionId];
        console.log(mediaArr, "media arr");
        if (Array.isArray(mediaArr)) {
            let tergetOrder = mediaArr.filter(item => item.id === initData.id);
            // console.log(tergetOrder, "terget order")
            return JSON.stringify(data) === JSON.stringify(tergetOrder[0]);
        }
        return false;
    }

    const handleOk = () => {
        form.validateFields().then((value) => {
            let data = {
                id: initData.id,
                mediaName: value.mediaName,
                link: value.mediaLink,
                mediaType: value.mediaType,
                collectionId: initData.collectionId
            };
            console.log(data);
            if (initData.isNew) {
                dispatch(createMedia(data));

            } else {
                if (!isNewChanges(data)) {
                    dispatch(editMedia(data));
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
                        name="mediaForm"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                            mediaName: initData?.mediaName,
                            mediaLink: initData?.link,
                            mediaType: initData?.mediaType

                        }}

                        autoComplete="off"

                    >
                        <Form.Item
                            label="media name"
                            name="mediaName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter media name',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="mediaType"
                            label="Media Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select media type'
                                },
                            ]}
                        >
                            <Select
                                placeholder="Select a media type"
                            // onChange={onGenderChange}
                            >
                                {typeOfMedia.map((item, idx) => {
                                    return (
                                        <Option value={item.value} key={idx}>{item.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="media link"
                            name="mediaLink"
                            rules={[
                                {
                                    // type: "regexp",
                                    pattern: new RegExp('^(https?:\\/\\/)?' + // protocol
                                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                                        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                                        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                                        '(\\#[-a-z\\d_]*)?$', 'i'),
                                    message: "enter valid link"
                                },
                                {
                                    required: true,
                                    message: 'Please enter media link',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                </div>

            </Modal >
        </div >
    )
}

export default CreateMediaCard
