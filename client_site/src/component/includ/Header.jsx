import React from "react";

const Header = ({ header }) => {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        {header && <h1 className="m-0">{header}</h1>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
