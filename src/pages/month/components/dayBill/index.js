import { useMemo } from 'react'
import classNames from 'classnames'
import './index.scss'
import { billTypeToName } from '@/contants'
import { useState } from 'react'    
import Icon from '@/components/Icon'
const DailyBill = ({date,billList}) => {
    const dayResult = useMemo(() => {
        if(!billList || billList.length === 0) return {pay:0,income:0,total:0}
        const pay = billList.filter(item => item.type === 'pay').reduce((a,c) => a + c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a,c) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
    }  
    },[billList])
    const [visible,setVisible] = useState(false)
    return (
        <div className={classNames('dailyBill')}>
            <div className='header'>
                <div className='dateIcon'>
                    <span className="date">{date}</span>
                    <span className={classNames('arrow',visible && 'expand')} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview" >
                    <div className='pay'>
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className='income'>
                        <span className="type">收入</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className='total'>
                        <span className="type">合计</span>
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div className="billList" style={visible ? {display:'block'} : {display:'none'}}>
                {
                    billList.map(item =>{
                        return (
                            <div className='bill' key={item.id}>
                                <Icon type={item.useFor} />
                                <div className='detail'>
                                    <div className='billType'>{billTypeToName[item.useFor]}</div>
                                </div>
                                <div className={classNames('money',item.type)}>
                                    {item.money.toFixed(2)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
  )
}
export default DailyBill