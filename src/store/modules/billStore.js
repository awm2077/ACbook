// 编写账单列表
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const billStore = createSlice({
    name:'bill',
    initialState:{
        billList : []
    },
    reducers:{
        setBillList(state,action){
            state.billList = action.payload
        },
        addBill(state,action){
            state.billList.unshift(action.payload)
        }
    }
})

// 解构出内部方法
const {setBillList,addBill} = billStore.actions
// 获取数据
const getBillList = () =>{
    return async (dispatch) =>{
        const res = await axios('http://localhost:3001/ka')
        dispatch(setBillList(res.data))
    }
}
const addBillList = (bill) =>{
    return async (dispatch) =>{
        const res = await axios.post('http://localhost:3001/ka',bill)
        dispatch(addBill(res.data))
    }
}
// 导出reducer
const reducer = billStore.reducer
export {getBillList,addBillList}
export default reducer