import React, { useState, useEffect } from 'react';
import styles from './index.less';
import stylesCommon from '@/css/common.less';
import * as Utility from '@/Utility/utils';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import { QuestionManage } from './content/Question';
import { RumorInfo } from './content/rumorInfo';
import { checkToken } from '@/Utility/OtherUtils';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default ()=>{
    const [collapsed,setCollapsed]=useState(false);
    const [page,setPage]=useState(2);
    const trigger=()=>{setCollapsed(!collapsed)};
    const getContent=()=>{
        switch(page){
            case 1:return <QuestionManage/>
            case 2:return <RumorInfo/>;
            case 3:return <div>用户信息</div>;
            default:return <div></div>;
        }
    }
    useEffect(()=>{
        checkToken(true);
    },[])
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={trigger}>
                <div className={Utility.styleMerge([styles.logo,stylesCommon.ccFlexRow])} >
                    {collapsed?"谣":"辟谣系统后台"}
                </div>
                <Menu theme="dark" 
                    defaultSelectedKeys={[page.toString()]} 
                    mode="inline" 
                    onSelect={(choice)=>{setPage(parseInt(choice.key))}}>
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        提问数据
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        辟谣信息
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        用户信息
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '16px 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, height: 650 }}>
              {getContent()}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>2020.NORUMOR.SE</Footer>
        </Layout>
        </Layout>
        // <div className={Utility.styleMerge([styles.managePage,stylesCommon.ccFlexColumn])}>
        //     管理页面
        // </div>
    )
}