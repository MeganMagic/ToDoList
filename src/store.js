import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";
const UPDATE = "UPDATE";
const DELETEALL = "DELETEALL";

const addToDo = (text) => {
    return {
        type: ADD,
        text
    };
};
const deleteToDo = (id) => {
    return {
        type: DELETE,
        id: parseInt(id)
    };
};
const updateToDo = (id, newObj) => {
    return {
        type: UPDATE,
        id: parseInt(id),
        newObj: newObj
    }
}
const deleteAllToDo = () =>{
    return {
        type: DELETEALL
    }
}

const initialState = JSON.parse(window.localStorage.getItem("toDoStore")) ?? [];


const reducer = ( state = initialState, action ) => {    
    switch (action.type) {
        case ADD:
            return [{ id: Date.now(), text: action.text, isFinished: false, description: "" }, ...state];
        case DELETE:
            return state.filter(toDo => toDo.id !== parseInt(action.id));
        case UPDATE:
            const updatedState = state.map((toDo) => 
                toDo.id !== parseInt(action.id)
                ? toDo 
                : action.newObj
            )
            return updatedState
        case DELETEALL:
            return []

        default:
            return state;    
    }
}

const store = createStore(reducer);

const saveDataOnLocalStorage = () => {
    const currentState = store.getState();
    window.localStorage.setItem("toDoStore", JSON.stringify(currentState));    
}
store.subscribe(saveDataOnLocalStorage);
//store.subscribe(() => console.log(store.getState()));

export const actionCreators = {
    addToDo,
    deleteToDo,
    updateToDo,
    deleteAllToDo
};


export default store;