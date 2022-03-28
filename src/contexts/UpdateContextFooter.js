import { createContext, useContext, useState, useCallback } from "react";

export const UpdateContext = createContext();

const initialUpdateStateComment = { comment: false, type: 'default' };
const initialUpdateStateStadium = { stadium: false, type: 'default' };

export const UpdateProvider = ({
    children
}) => {
    const [updateComment, setUpdateComment] = useState(initialUpdateStateComment);

    const addUpdateComment = useCallback((type) => {
        setUpdateComment({ comment: true, type });
    }, []);
    
    const hideUpdateComment = useCallback(() => setUpdateComment(initialUpdateStateComment), []);


    const [updateStadium, setUpdateStadium] = useState(initialUpdateStateStadium);

    const addUpdateStadium = useCallback((type) => {
        setUpdateStadium({ stadium: true, type });
    }, []);

    const hideUpdateStadium = useCallback(() => setUpdateStadium(initialUpdateStateStadium), []);

    return (
        <UpdateContext.Provider value={{ updateComment, updateStadium, addUpdateComment, addUpdateStadium, hideUpdateComment, hideUpdateStadium }}>
            {children}
        </UpdateContext.Provider>
    )
};

export const useUpdateContext = () => {
    const state = useContext(UpdateContext);

    return state;
};
