import React from "react";

export function Select({ name, array, onChange, value }) {
    const text = name === 'exams' ? 'Тип экзамена: ' : 'Предмет: ';

    return (
        <label className='catalog__select select'>
            <span className="select__descr bold">{text}</span>
            <select className="select__list" name={name} onChange={onChange} value={value}>
                {
                    array.map((item, i) =>
                        <option className="select__item" key={i} value={item.title}>{item.title}</option>
                    )
                }
            </select>
        </label>
    )
}