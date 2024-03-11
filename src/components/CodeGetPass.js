import React from "react";
import ResetPassword from "./ResetPassword";
import { useState } from "react";
function CodeGetPass(props) {
    const [reset, setReset] = useState(false);
    return (props.trigger) ? (
        <div className="modal-container">
            <div className="popup-inner">
        
                {props.children}
                <button className="bluecolor block m-2 bg-0096FF hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={()=>setReset(true) && props.setTrigger(false) }>
                                Xác nhận
                                </button> 
                {reset &&(
                    <ResetPassword trigger="true">
                    <div class="mb-3 mt-3 col-10">
                    <input type="text" class="form-control pb-3 pt-3" id="newpassword" name="newpassword" placeholder="Mật khẩu mới" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập mật khẩu mỡi')} onInput={e => e.target.setCustomValidity('')} required />
                    <br></br>
                    <input type="text" class="form-control pb-3 pt-3" id="comfirmpassword" name="comfirmpassword" placeholder="Xác thực mật khẩu mới" onInvalid={e => e.target.setCustomValidity('Mời bạn nhập xác thực mật khẩu')} onInput={e => e.target.setCustomValidity('')} required />
                                
                    </div>  
                    </ResetPassword>
                )} 
            </div>
        </div>
    ):""
}
export default CodeGetPass;