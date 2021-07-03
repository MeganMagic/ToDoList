import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";

import { ReactComponent as DeleteIcon } from "../assets/icon_trashCan.svg";


function ToDo({ id, text, isFinished, deleteToDo, finishToDo }) {
    function onDeleteBtnClick(e) {
        const li = e.target.parentNode;
        const currentClass = li.className;
        li.className = currentClass + " slide-out-to-right";
        setTimeout(() => {
            deleteToDo();
        }, 700);
    }

    return (
        <li className="ToDo flex flex-jc-sb flex-ai-c">

            <button className={["btn", "btn__finished", isFinished? "btn__finished__checked": ''].join(' ')} onClick={finishToDo}>
                <div className="checked-box"></div>
            </button>
            
            <div className={["text", isFinished? "text__finished": ""].join(' ')}>
                <Link to={`/${id}`}>
                    {text}
                </Link>
            </div>

            <button className="btn btn__delete" onClick={onDeleteBtnClick}>
                <DeleteIcon />
            </button>
        </li>
    );
}

function mapDispatchToProps(dispatch, ownProps) {
    const { id, text, isFinished } = ownProps;
    return {
        deleteToDo: () => dispatch(actionCreators.deleteToDo(id)),
        finishToDo: () => dispatch(actionCreators.updateToDo(id, { ...ownProps, isFinished: !isFinished}))
    }
}

export default connect(null, mapDispatchToProps) (ToDo);