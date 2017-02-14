import React from "react";

class ProfileInformation extends React.Component {

    render() {
        return (
            <div className="col-lg-12">

                <div className="imageDiv">
                    <img className="img-responsive profileImg" src={this.props.img} alt="User Image"/>
                    <a>Change image</a>
                </div>
                <h2>{this.props.name}</h2>

                <div className="clearfix"></div>

                <h4>Personal information:</h4>

                <div className="tableProfile">
                    <div className="leftSideTable">
                        <h5>First & Last name:</h5>
                    </div>

                    <div className="rightSideTable">
                        <h5>{this.props.name}</h5>
                    </div>
                </div>

            </div>
        )
    }

}


export default ProfileInformation;