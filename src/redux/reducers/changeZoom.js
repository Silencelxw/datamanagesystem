// 创建一个reducer
// reducer接收两个参数：之前状态的preState，动作对象action

import { ONCHANGEZOOM } from '../constant.js';

// 设定初始状态
const initState = 6;

export default function changeCenterReducer(preState = initState, action) {
    // 从action中获取type和data
    const { type } = action;
    // 根据type决定如何加工数据
    switch (type) {
        case ONCHANGEZOOM:
            return 10;
        // 初始化动作
        default:
            return preState;
    }
}