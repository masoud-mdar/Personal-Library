import React from "react"

const Navbar = (props) => {

    return (
        <div className="nav-bar">
            <div className="left-part">
                <h2>
                    Personal Library
                </h2>
            </div>
            <div className="right-part">
                <button name="nav-user-btn" onClick={props.data.handleClick} className="btn nav-btn">Welcome {props.data.user}</button>
            </div>
        </div>
    )
}

export default Navbar