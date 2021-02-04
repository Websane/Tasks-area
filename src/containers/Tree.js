import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getNewTasks, getTasks} from "../actions/tasksActions";
import {Task} from "../components/Task";
import {Select} from "../components/Select";
import {TasksOptions} from "../components/TasksOptions";

export function Tree() {
    const dispatch = useDispatch();

    const tasks = useSelector(state => state.tasks.treeTasks);
    const tasksStatus = useSelector(state => state.tasks.status);
    const tasksError = useSelector(state => state.tasks.errorMessage);
    const isLoading = useSelector(state => state.tasks.loading);

    const [examsArray, setExamsArray] = useState([]);
    const [touchedExams, setTouchedExams] = useState(false);

    const [subjectsArray, setSubjectsArray] = useState([]);
    const [touchedSubjects, setTouchedSubjects] = useState(false);

    const [numTaskArray, setNumTaskArray] = useState([]);

    const [selectExams, setSelectExams] = useState('ОГЭ');
    const [selectSubjects, setSelectSubjects] = useState('Математика');

    const [numTask, setNumTask] = useState('');
    const [numThemes, setNumThemes] = useState('');

    //получение массива всех доступных типов экзаменов
    const getExams = (obj) => {
        const exams = obj['exams'];
        return Object.values(exams);
    }
    //получение массива по выбранному ключу
    const getArr = (arr, key, select) => {
        const obj = arr.find(item => item.title === select);
        if (select === selectExams) {
            return Object.values(obj[key]);
        } else {
            return Object.entries(obj[key]);
        }
    }
    //получаем дерево заданий при первом рендере
    useEffect(() => {
        dispatch(getTasks());
    }, []);
    //получаем массив доступных экзаменов
    useEffect(() => {
        if (tasksStatus === 'success' && !touchedExams) {
            setExamsArray(getExams(tasks));
            setTouchedExams(true);
        }
    }, [tasksStatus, touchedExams]);
    //получаем массив доступных предметов по выбранному экзамену
    useEffect(() => {
        if (examsArray && touchedExams) {
            setSubjectsArray(getArr(examsArray, 'subjects', selectExams));
            setTouchedSubjects(true);
        }
    }, [examsArray, touchedExams]);
    //получаем массив доступных заданий по выбранному предмету
    useEffect(() => {
        if (subjectsArray && touchedSubjects) {
            setNumTaskArray(getArr(subjectsArray, 'nums', selectSubjects));
        }
    }, [subjectsArray, touchedSubjects])
    //обрабатываем отправку формы
    const handleSubmit = (ev) => {
        ev.preventDefault();

        const full = {
            "subject": 5,
            "exam": 7,
        };

        const optionsTask =  [
            {
                "num": 15,
                "count": Number(numTask),
            }
        ];

        const optionsThemes = [
            {
                "num": 15,
                "themes": [
                    {
                        "id": 2,
                        "count": Number(numThemes)
                    }
                ]
            }
        ];

        const optionsAll = [
            {
                "num": 15,
                "count": Number(numTask),
            },
            {
                "num": 16,
                "count": Number(numThemes),
            }
        ];

        const body = numThemes && numTask ? {
            ...full,
            "questions": optionsAll,
        } : numTask ? {
            ...full,
            "questions": optionsTask,
        } : numThemes ? {
            ...full,
            "questions": optionsThemes,
        } : full;

        dispatch(getNewTasks(body));
    }

    //обрабатываем изменения в полях ввода
    const handleChangeTask = (ev) => {
        const value = ev.target.value;
        setNumTask(value);
    }
    const handleChangeThemes = (ev) => {
        const value = ev.target.value;
        setNumThemes(value);
    }
    //обрабатываем выборы в select
    const handleSelect = (ev) => {
        const selectValue = ev.target.value;
        if (ev.target.name === 'exams') {
            setSelectExams(selectValue);
        } else {
            setSelectSubjects(selectValue);
        }
    }

    return (
        <section className='catalog'>
            <div className='container catalog__container'>
                <h1 className='catalog__title'>Каталог заданий</h1>
                <div className='catalog__selects'>
                    <Select
                        name={'exams'}
                        array={examsArray}
                        onChange={handleSelect}
                        value={selectExams}
                    />
                    <Select
                        name={'subject'}
                        array={subjectsArray}
                        onChange={handleSelect}
                        value={selectSubjects}
                    />
                </div>
                <TasksOptions
                    onSubmit={handleSubmit}
                    onInputTask={handleChangeTask}
                    onInputThemes={handleChangeThemes}
                    numTask={numTask}
                    numThemes={numThemes}
                    isLoading={isLoading}
                    error={tasksError}
                />
                <Task task={numTaskArray} />
            </div>
        </section>
    )
}