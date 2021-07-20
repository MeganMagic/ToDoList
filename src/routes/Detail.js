import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { actionCreators } from '../store';

function Detail({ toDo, updateToDo }) {
    const history = useHistory();
    const created = new Date(toDo.id);

    const [ text, setText ] = useState(toDo.text);
    const [ desc, setDesc ] = useState(toDo.description);
    const [ isFinished, setIsFinished ] = useState(toDo.isFinished);

    function saveToDo(e) {
        e.preventDefault();
        const newToDo = {
            id: toDo.id,
            text: text,
            description: desc,
            isFinished: isFinished
        }

        updateToDo(newToDo);
        // alert("Todo Saved!");
    }
    
    function handleTextChange(e) {
        setText(e.target.value)
    }
    function handleDescChange(e) {
        setDesc(e.target.value)
    }
    function handleIsFinishedChange(e) {
        setIsFinished(!isFinished);
    }

    function goBack() {
        history.goBack();
    }

    return (
        <div className="Detail flex flex-col flex-jc-fs flex-ai-c">
            
            <div className="gnb flex flex-jc-sb">
                <button className="btn" onClick={goBack}>{`<`}</button>
                <button className="btn"></button>
            </div>

            <form className="Detail__form">

                <input type="text" className="input-toDo-text" value={ text } onChange={handleTextChange}/>
                
                <div className="state flex flex-jc-sb">
                    <div className="flex flex-jc-fs">
                        <button className={["btn", "btn__finished", isFinished? "btn__finished__checked": ''].join(' ')} onClick={handleIsFinishedChange}>
                            <div className="checked-box"></div>
                        </button>
                        {isFinished ? "FINISHED" : "NOT FINISHED..."}
                    </div>
                    <div> created : {created.toDateString()}</div>  
                </div>
                
                <textarea className="input-toDo-desc" placeholder="write down description" value={ desc } onChange={handleDescChange}/>
                
                <div className="toolBar flex flex-jc-c">
                    <button className="btn btn-toDo-save" onClick={saveToDo}>SAVE</button>
                </div>

            </form>

        </div>
    )
}

function mapStateToProps(state, ownProps){
    const { 
        match: {
            params: { id }
        }
    } = ownProps;
    return { toDo: state.find(toDo => toDo.id === parseInt(id)) };
}

function mapDispatchToProps(dispatch, ownProps){
    const {
        match: {
            params: { id }
        }
    } = ownProps;
    return {
        updateToDo: (newObj) => dispatch(actionCreators.updateToDo(id, newObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Detail);