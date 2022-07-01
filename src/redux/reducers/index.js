// 汇总所有的reducer

import { combineReducers } from 'redux';

import projectName from './clickProjectName';
import zoom from './changeZoom';

export default combineReducers({
    projectName,
    zoom,
});