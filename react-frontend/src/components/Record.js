import React, { Component } from "react";
import UpdateBtn from "./UpdateButton";
import { DeleteBtn } from "./DeleteBtn";

export class Record extends Component {
	constructor(props) {
		super(props);

		this.state = {
			record: props.record,
			key: props.key,
			index: props.index,
		};
	}

	render() {
		return (
			<tr>
				<td>{this.props.index}</td>
				<td>{this.props.record.name}</td>
				<td>{this.props.record.email}</td>
				<td>{this.props.record.phone}</td>
				<td>{this.props.record.hobbies}</td>
				<td>
					<UpdateBtn
						id={this.props.record._id}
						record={this.props.record}
						handler={this.props.handler}
					/>
					<DeleteBtn
						id={this.props.record._id}
						record={this.props.record}
						handler={this.props.handler}
					/>
				</td>
			</tr>
		);
	}
}

export default Record;
