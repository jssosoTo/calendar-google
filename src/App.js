import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Navbar, Sidebar, SearchBtns, Year, Month, AddList, EditCard, SearchPage, SideCard} from './components/index';
import { useGlobalContext } from './Providers/AppProvider';
import Day from './components/Day/Day';
import Agenda from './components/Agenda/Agenda';
import Modal from './components/AddList/Modal';
import Error from './components/Error';
import Withdraw from './components/Withdraw';
import Trash from './components/Trash/Trash';

function App() {
  const { isAddListModalShow, listID, modalMessage, closeModalAlert, noteAmount, withdrawMessage, closeWithdrawCard, withdrawList } = useGlobalContext();
  const [isHiding, setIsHiding] = useState(false);
  const [isSideCardShow, setIsSideCardShow] = useState(false);

  const switchSidebar = () => {
    setIsHiding(!isHiding);
  };
  const pushAlert = () => {
    if (!('Notification' in window)) {
            alert('Sorry bro, your browser is not good enough to display notification');
            return;
    }
    if (document.location.pathname !== '/agenda') {
        Notification.requestPermission(function (permission) {
            if (permission === 'granted') {
              console.log(document.location.pathname);
              console.log('用户允许通知！');
              const notification = new Notification("Google日历", {
                body: `今日有${noteAmount}项通知，点击查看详细`,
                icon: 'https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_14_2x.png'
              });

              setTimeout(function () {
                notification.close();
              }, 5000);

              notification.onclick = function () {
                notification.close();//关闭桌面通知
                const href = document.location.href;
                window.close();//将当前页面关闭
                window.open(`${href}agenda`);//新开一个页面，url为当前页面
              };
              navigator.onerror = function () {
                //当有错误发生时会onerror函数会被调用
                console.log('桌面通知发生了错误');
              };
              navigator.onshow = function () {
                //消息框显示时会被调用
                console.log('桌面通知显示ing');
              };
            } else if (permission === 'denied') {
              console.log('用户拒绝通知！');
            } else {
              console.log('用户忽略通知！');
            }
        });
    }
  }

  useEffect(() => {
    pushAlert();
  }, [])

  return (
      <Router>
        <div className='whole'>
          <div className='index'>
            {modalMessage.show && <Modal {...modalMessage} closeModalAlert={closeModalAlert} />}
            <Navbar switchSidebar={switchSidebar}></Navbar>
            <main>
              <Sidebar isHiding={isHiding} />
              <Routes>
                <Route path='/' element={<Year />} />
                <Route path='/month' element={<Month />} />
                <Route path='/day' element={<Day />} />
                <Route path='/agenda' element={<Agenda />} />
                <Route path='/search' element={<SearchPage />} />
                <Route path='/recycle' element={<Trash />} />
                <Route path='*' element={<Error></Error>} />
              </Routes>
              <SearchBtns isSideCardShow={isSideCardShow} withdrawList={withdrawList} setIsSideCardShow={setIsSideCardShow} />
              {isAddListModalShow && <AddList />}
              <Withdraw {...withdrawMessage} closeWithdrawCard={closeWithdrawCard} withdrawList={withdrawList} />
            </main>
            {listID && <EditCard />}
          </div>
          <SideCard isSideCardShow={isSideCardShow} setIsSideCardShow={setIsSideCardShow} />
          </div>
      </Router>
  );
}

export default App;
