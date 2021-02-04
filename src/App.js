import React from "react";
import { hot } from 'react-hot-loader/root';

import './style.css';
import {Tree} from "./containers/Tree";

let App = () => {
    return (
        <main>
            <Tree />
        </main>
    );
}

export default hot(App);