import * as types from './actionTypes';
import { Statistics } from '../../services/api';

export function fetchWidgetData(session_id) {
    return async dispatch => {
        try {
            dispatch({ type: types.WIDGET_STATS_FETCH });
            const { isSuccess, ...res } = await Statistics.getWidget(session_id);
            if (!isSuccess) {
                alert(res.message);
                dispatch({ type: types.WIDGET_STATS_ERROR });
                return;
            }
            const { result: widgetItems } = res;
            const widgetSum = Object.keys(widgetItems).reduce((acc, key) => {
                return acc + widgetItems[key].count;
            }, 0);
            dispatch({ type: types.WIDGET_STATS_SUCCESS, data: { widgetItems, widgetSum } });
        } catch (err) {
            console.log(err);
            dispatch({ type: types.WIDGET_STATS_ERROR });
        }
    };
}