import { NavBar,DatePicker } from "antd-mobile"
import { useState,useMemo } from "react"
import './index.scss'
import classNames from 'classnames'
import { useSelector } from "react-redux"
import _ from 'lodash'
import dayjs from "dayjs"
import {useEffect} from "react"
import DailyBill from "./components/dayBill"
const Month= () => {
    
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    },[billList])
    const [date,setDate] = useState(false)
    const [currentMonthList,setCurrentMonthList] = useState([])
    const confirm = (value) => {
        setCurrentDate(value)
        setDate(false)
        const formattedDate = dayjs(value).format('YYYY-MM')
        setCurrentMonthList(monthGroup[formattedDate])
    }
    
    const res = useMemo(() => {
        if (!currentMonthList || currentMonthList.length === 0) {
            return { pay: 0, income: 0, total: 0 };
        }
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            pay,
            income,
            total:pay + income
        }
    },[currentMonthList])
    const [currentDate,setCurrentDate] = useState(() =>{
        return new Date()
    })

    // 按日进行分组
    const dailyGroup = useMemo(() => {
        const tempList = _.groupBy(currentMonthList, item => dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(tempList)
        return {tempList,keys}
    },[currentMonthList])
    
    // 初始化页面计算数据
    useEffect(()=>{
        const nowDate = dayjs().format('YYYY-MM')
        if (monthGroup[nowDate]) {
            setCurrentMonthList(monthGroup[nowDate])
        }
    },[monthGroup])

    return (
        <div className = "monthlyBill">
            <NavBar className="nav" left={null}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={()=>setDate(true)}>
                        <span className="text">
                            {currentDate.getFullYear()} - {currentDate.getMonth() + 1}月账单
                        </span>
                        <span className={classNames('arrow',date && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className="twoLineOverview flex text-center w-full space-x-2 text-lg flex-nowrap">
                        <div className="item flex flex-col items-center w-1/3">
                            <span className="money">{res.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item flex flex-col w-1/3">
                            <span className="money">{res.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item flex flex-col w-1/3">
                            <span className="money">{res.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                       precision="month"
                       visible={date}
                       max={new Date()}
                       onConfirm = {confirm}
                       onClose= {()=>setDate(false)}
                    />
                </div>
                {dailyGroup.keys.map(key => (
                    <DailyBill key={key} date={key} billList={dailyGroup.tempList[key]} />  
                    ))
                    }
            </div>
        </div>
    )
}
export default Month