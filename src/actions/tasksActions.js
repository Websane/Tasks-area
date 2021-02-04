export const TASKS_REQUEST = 'TASKS_REQUEST';
export const TASKS_REQUEST_SUCCESS = 'TASKS_REQUEST_SUCCESS';
export const TASKS_REQUEST_ERROR = 'TASKS_REQUEST_ERROR';

export const tasksRequest = () => ({
    type: TASKS_REQUEST,
});
export const tasksRequestSuccess = (tasks) => ({
    type: TASKS_REQUEST_SUCCESS,
    tasks,
});
export const tasksRequestError = (error) => ({
    type: TASKS_REQUEST_ERROR,
    error,
});

const headers = () => {
    const token = '7ecb81f446fb4decf08d59d8616d828d45822e02';
    return {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

//запрос дерева тегов с заданиями
export const getTasks = () => async (dispatch) => {
    dispatch(tasksRequest());
    try {
        let response = await fetch('https://stagging.adaptaki.ru/api/tags/tree/', {
            method: 'GET',
            headers: headers(),
        });
        let result = await response.json();
        if (response.ok) {
            dispatch(tasksRequestSuccess(result));
        } else {
            dispatch(tasksRequestError(`${result.message}`));
        }
    } catch (error) {
        dispatch(tasksRequestError(`${error}`));
    }
}
//запрос нового варианта тегов с заданиями
export const getNewTasks = (body) => async (dispatch) => {
    dispatch(tasksRequest());
    try {
        let response = await fetch('https://stagging.adaptaki.ru/api/utrs/', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers(),
        });
        let result = await response.json();
        if (response.ok) {
            console.log(result);
            dispatch(tasksRequestSuccess(result));
        } else {
            console.log(`Ошибка: ${result['Error message']}`);
            dispatch(tasksRequestError(`${result['Error message']}`));
        }
    } catch (error) {
        console.log(error);
        dispatch(tasksRequestError(`${error}`));
    }
}