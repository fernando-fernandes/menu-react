import {motion} from 'framer-motion';
import { useRef, useState, useContext, useEffect } from 'react';
import { useDimensions } from './dimensions';
import { Context } from './Provider';

let lastOptionId = 0;

export function DropdownOption({name, content: Content, backgroundHeight}){

    const idRef = useRef(++lastOptionId);
    const id = idRef.current;

    const [optionHook, optionDimensions] = useDimensions();
    const [registered, setRegistered] = useState(false);

    const {
        registerOption,
        updateOptionProps,
        deleteOptionById,
        setTargetbyId,
        targetId,
    } = useContext(Context);

    useEffect( () => {
        if (!registered && optionDimensions) {
            const WrappedContent  = () => {
                const contentRef = useRef();

                useEffect(() => {
                    const contentDimensions = contentRef.current.getBoundingClientRect();
                    updateOptionProps(id, {contentDimensions});
                }, []);

                return (
                    <div ref={contentRef}>
                        <Content />
                    </div>
                )
            };

            registerOption({
                id,
                optionDimensions,
                optioncenterX: optionDimensions.x + optionDimensions.width / 2,
                WrappedContent,
                backgroundHeight
            });

            setRegistered(true);

        } else if (registered && optionDimensions) {
            updateOptionProps(id, {
                optionDimensions,
                optioncenterX: optionDimensions.x + optionDimensions.width / 2,
            });
        }
    }, [
        registerOption,
        id,
        registered,
        optionDimensions,
        updateOptionProps,
        deleteOptionById,
        backgroundHeight
    ]);

    return(
        <motion.button className="dropdown-option" ref={optionHook}>
            {name}
        </motion.button>
    )
}