import React from "react";
import Input from "./Input"
import FilteredList from "./FilteredList"
import {useState} from "react";


const Wrapped = (props) => {

const {items} = props;
const [filter, setFilter] = useState ("");

return(
    <div>
        <h1>My Filtered List</h1>
        <input
            filter={filter}
            setfilter={setFilter}
        />
        <FilteredList
            filter = {filter}
            items = {items.filter((items) => items.indexOf(filter)> -1)}
        />

    </div>
    )

}

export default Wrapped;

