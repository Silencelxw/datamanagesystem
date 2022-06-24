// 创建action对象

// 引入常量
import { ONCILCKPROJECTNAME } from '../constant';

// 创建加一action对象的函数
export const onClickProjectName = data => ({
    type: ONCILCKPROJECTNAME,
    data,
});
