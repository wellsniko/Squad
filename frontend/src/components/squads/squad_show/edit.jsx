import React from 'react';
import '../../modal/modal.css'

class Edit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.squads._id,
            generalBio: this.props.squads.generalBio,
            type: 'editBio'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        e.preventDefault();
        let change = {
            id: this.state.id,
            generalBio: this.state.generalBio,
            type: this.state.type
        }
        this.props.updateSquad(change);
        this.props.closeModal();
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    render(){


        return(
            <form className='modal-form' onSubmit={this.handleSubmit}>
                <div className='modal-box'>
                    <p id='squad-name'>Edit Bio</p>
                    <textarea id='modal-text' onChange={this.update('generalBio')} autoComplete='off'/>
                    <input id='modal-btn' type="submit" value="Update Bio"/>
                </div>
            </form>
        )
    }

}

export default Edit