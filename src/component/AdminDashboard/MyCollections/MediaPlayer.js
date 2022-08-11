import React, { useState } from 'react';
import { Modal } from 'antd';
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from 'react-redux'
import { customNotification, msgType } from '../../../utils/notification/customNotification';
import { createWatchHistory } from '../../../store/actions/watchList/WatchHistory';

import ReactPlayer from 'react-player'
import '../../../assets/css/mediaPlayer.css';


const MediaPlayer = ({ onAction, initData, open }) => {
    const [isModalVisible, setIsModalVisible] = useState(open);
    const dispatch = useDispatch();


    const handleClose = () => {

        // here watch list action call
        let data = {
            ...initData,
            id: uuidv4(),
        }

        dispatch(createWatchHistory(data))

        setIsModalVisible(false);
        onAction(false);


    }

    const playError = (e) => {
        console.log(e, "err");
        customNotification({ message: "Error acure when play.", type: msgType.error })

    }

    return (
        <div>
            <Modal title={"Media Player"} visible={isModalVisible} maskClosable={false}
                cancelText="close"
                onCancel={handleClose}
                okButtonProps={{ style: { display: 'none' } }}
                // bodyStyle={{ minWidth: 1000 }}
                width={1000}
            >
                {initData.mediaType === "mp4" && (
                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url={initData.link}
                            width='100%'
                            height='90%'
                            controls={true}
                            volume={1}
                            pip={true}
                            onError={(e) => {
                                playError(e)
                            }}
                        />

                    </div>
                )}
                {
                    initData.mediaType === "mp3" && (
                        <div>
                            <div className='player-wrapper'>
                                <ReactPlayer
                                    className='react-player'
                                    url={initData.link}
                                    width='100%'
                                    height='90%'
                                    controls={true}
                                    volume={1}
                                    pip={true}
                                    onError={(e) => {
                                        playError(e)
                                    }}
                                />

                            </div>
                        </div>
                    )

                }

            </Modal>
        </div>
    )
}

export default MediaPlayer