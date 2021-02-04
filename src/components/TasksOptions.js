import React from "react";
import {Loading} from "./Loading";
import {Error} from "./Error";

export function TasksOptions({ onSubmit, onInputTask, onInputThemes, numTask, numThemes, isLoading, error }) {
    return (
        <form className="catalog__options options" onSubmit={onSubmit}>
            <label className="options__label">
                <span className="options__text bold">Количество заданий: </span>
                <input
                    type="number"
                    value={numTask}
                    className="options__task input"
                    onInput={onInputTask}
                />
            </label>
            <label className="options__label">
                <span className="options__text bold">Количество тем в заданиях: </span>
                <input
                    type="number"
                    value={numThemes}
                    className="options__themes input"
                    onInput={onInputThemes}
                />
            </label>
            <span className="options__push">
                <button className="options__btn btn" type="submit">Получить</button>
                {isLoading && <Loading />}
                {error && <Error error={error}/>}
            </span>
        </form>
    );
}