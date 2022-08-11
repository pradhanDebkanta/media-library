import React from 'react';
import { Tabs } from 'antd';
import WatchHistory from './WatchHistory';
import MyCollections from './MyCollections';
import { AppstoreOutlined, HistoryOutlined } from '@ant-design/icons'


const { TabPane } = Tabs;

const index = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1" centered>
                <TabPane
                    tab={
                        <span>
                            <AppstoreOutlined />
                            My Collections
                        </span>
                    }
                    key="1">
                    <MyCollections />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <HistoryOutlined />
                            Watch History
                        </span>
                    }
                    key="2">
                    <WatchHistory />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default index