import {TASKS_REQUEST, TASKS_REQUEST_ERROR, TASKS_REQUEST_SUCCESS} from "../actions/tasksActions";

const initialState = {
    status: 'init', //'success' 'loading' 'error'
    treeTasks: {},
    errorMessage: '',
    loading: false,
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASKS_REQUEST:
            return {
                ...state,
                status: 'loading',
                loading: true,
            }
        case TASKS_REQUEST_SUCCESS:
            return {
                ...state,
                status: 'success',
                treeTasks: action.tasks,
                errorMessage: '',
                loading: false,
            }
        case TASKS_REQUEST_ERROR:
            return {
                ...state,
                status: 'error',
                errorMessage: action.error,
                loading: false,
            }
        default: return state
    }
}

export default tasksReducer;