import React from "react";
import { Layout, Menu, Typography } from 'antd'
import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './pages/Home'
import About from './pages/About'
import './App.css'

const { Content } = Layout
const { Title } = Typography

export default function App(){
  const location = useLocation()

  return (
    <Layout className="app-layout">
      <Header />

      <div className="top-menu-wrap">
        <Menu mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/about">
            <Link to="/about">About</Link>
          </Menu.Item>
        </Menu>
      </div>

      <Content className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Content>
    </Layout>
  )
}
