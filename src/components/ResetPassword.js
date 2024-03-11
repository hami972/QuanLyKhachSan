import React from "react";

function ResetPassword(props) {
    return (props.trigger) ? (
        <div className="modal-container">
            <div className="popup-inner">
                
                {props.children}
                <button className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={()=>props.setTrigger(false)}>
                                Xác nhận
                                </button>  
            </div>
        </div>
    ):""
}
export default ResetPassword;