import React from "react";

const FilteredList = (props) => {
    
    const {filter, items} = props;

    return(
        <>
        {items && items.map((items,i) => {
            const start  = items.indexOf(filter);
            const end = start + filter.lengt;
                return(
                    <p key={i}>
                    {items.slice(0,start)}   
                    {items.slice(start, end)}
                    {items.slice(end)}
                    </p>
                );
            })};
        </>
        );
    
    };

    export default FilteredList;
                    
            




            



