import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

function Detail({ toDo, updateToDo }) {
    const created = new Date(id);

    function onTextChange(e) {
        console.log(e.target.value);
    }
    function onDescChange(e) {
        console.log(e.target.value);
    }

    return (
        <div className="Detail flex flex-col flex-jc-fs flex-ai-c">
            
            <div className="gnb flex flex-jc-sb">
                <button className="btn">{`<`}</button>
                <button className="btn"></button>
            </div>

            <form className="Detail__form" onSubmit={()=>console.log("submit")}>

                <input type="text" 
                    className="input-toDo-text" 
                    value={text}
                    onChange={onTextChange}
                />
                
                <div className="state flex flex-jc-sb">
                    <span>
                        <strong>finished :</strong> {isFinished ? "YES" : "not yet..."}
                    </span>

                    <div> created : {created.toDateString()}</div>  
                </div>
                
                <input className="input-toDo-desc"
                    type="text"
                    placeholder="write down description"
                    value=""
                    onChange={onDescChange} />

                <button>SAVE</button>
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