import React, { Component } from "react";
import axios from "axios";

export class DeleteBtn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			del: false,
			id: props.id,
			record: props.record,
		};
	}

	onDelete = (event) => {
		event.preventDefault();
		this.setState({ del: true });
		console.log("delete: " + this.state.id);
		axios.delete("https://safe-retreat-89188.herokuapp.com/api/" + this.state.id, this.state.record).then((res) => {
			console.log(res.data + "deleted");
			this.props.handler();
		});
	};

	render() {
		return (
			<button
				className='btn btn-sm btn-danger center delete-button'
				onClick={this.onDelete.bind(this)}
			>
				Delete
			</button>
		);
	}
}

export default DeleteBtn;
