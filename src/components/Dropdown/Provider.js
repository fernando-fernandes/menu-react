import React, { useCallback, useState, useEffect } from 'react';

const Context = React.createContext();

export function Dropdownprovider({ children }) {
    const [options, setOptions] = useState([]);
    const [targetId, setTargetId] = useState(null);
    const [cacheId, setChachId] = useState(null);

    const registerOption = useCallback(({
        id,
        optionDimensios,
        optionCenterX,
        wrappedContent,
        backgroundHeight,
    }) => {
        setOptions((items) => [
            ...items,
            {
                id,
                optionDimensios,
                optionCenterX,
                wrappedContent,
                backgroundHeight,
            }
        ])
    }, [setOptions]);

    
    const updateOptionProps = useCallback(
        (optionId, props) => {
            setOptions( (items) => 
                items.map( item => {
                    if(item.id === optionId) {
                        item = {...item, ...props}
                    }

                    return item;
                } )
            )
        }, [setOptions]
    );
    

    const getOptionById = useCallback(
        (id) => options.find( item => item.id === id),
    [options] );


    const deleteOptionByID = useCallback(
        (id) => {
            setOptions( items => items.filter( item => item.id !== id));
        },
    [setOptions] );


    useEffect( () => {
        if (targetId !== null) setChachId(targetId);
    }, [targetId]);
    
    
    return (
        <Context.Provider value={{
            registerOption,
            updateOptionProps,
            getOptionById,
            deleteOptionByID,
            options,
            targetId,
            setTargetId,
            cacheId,
            setChachId
        }}>
            {children}
        </Context.Provider>
    )
}