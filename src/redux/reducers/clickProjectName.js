// 创建一个reducer
// reducer接收两个参数：之前状态的preState，动作对象action

import { ONCILCKPROJECTNAME } from '../constant.js';

// 设定初始状态
const initState = '中和新建安置房（中胜家园）建筑物和构筑物变形监测';

export default function changeCenterReducer(preState = initState, action) {
    // 从action中获取type和data
    const { type, data } = action;
    // 根据type决定如何加工数据
    switch (type) {
        case ONCILCKPROJECTNAME:
            return data.target.innerText;
        // 初始化动作
        default:
            return preState;
    }
}