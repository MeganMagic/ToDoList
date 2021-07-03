import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../components/ToDo";

function Home({ toDos, addToDo, deleteAllToDo }) {

    const [ text, setText ] = useState("");
    function onChange(e) {
        setText(e.target.value);
    }
    function onSubmit(e) {
        e.preventDefault();
        addToDo(text);
        setText("");
    }
    function onDeleteAllClicked(e) {
        deleteAllToDo();
    }

    return (
        <div className="Home flex flex-col flex-jc-fs flex-ai-c">
            
            <header className="Home__header">
                THINGS<br/>I HAVE TO DO
            </header>

            <form className="Home__form flex flex-jc-sb" onSubmit={onSubmit}>
                <input 
                    className="input-toDo-text" 
                    type="text" 
                    placeholder="write down a thing To Do"
                    value={text} 
                    onChange={onChange}/>
                <button className="btn-toDo-submit">Add</button>
            </form>
            
            <ul className="Home__list">
                {toDos?.map(toDo => (
                    <ToDo {...toDo} key={toDo.id} />
                ))}
            </ul>

            <div className="Home__footer flex flex-ai-c">
                <button className="btn btn__deleteAll" onClick={onDeleteAllClicked}>DELETE ALL</button>
            </div>

            <div className="Home__decoration"></div>
        </div>
    );
}

function mapStateToProps(state) {
    return { toDos: state }
}

function mapDispatchToProps(dispatch) {
    return { 
        addToDo: (text) => dispatch(actionCreators.addToDo(text)),
        deleteAllToDo: () => dispatch(actionCreators.deleteAllToDo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);