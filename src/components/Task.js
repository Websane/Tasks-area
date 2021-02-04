import React from "react";

export function Task({ task }) {
    return (
        <ul className="catalog__tasks tasks">
            {
                task.map((item, i) => {
                    const numTask = item[0];
                    const dataTask = item[1];
                    return (
                        <li className="tasks__item" key={i}>
                            <span className="tasks__content">
                                <span className="tasks__name">Задание {numTask}</span>
                                <span className="tasks__descr">Всего вопросов: {dataTask.all_questions_count}</span>
                            </span>
                            <ul className="tasks__themes themes">
                                {
                                    dataTask.themes.map((item, i) =>
                                        <li className="themes__item" key={i}>
                                            <a className="themes__name" href="#">{item.title}</a>
                                            <span className="themes__descr">{item.questions_count}</span>
                                        </li>
                                    )
                                }
                            </ul>
                        </li>
                    )
                })
            }
        </ul>
    )
}