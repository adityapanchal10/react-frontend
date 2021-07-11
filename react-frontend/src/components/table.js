import React, { Component } from "react";
import axios from "axios";
import Record from "./Record";

// const Reecord = ({ record, key, index }) => (
// 	<tr>
// 		<td>{index}</td>
// 		<td>{record.name}</td>
// 		<td>{record.email}</td>
// 		<td>{record.phone}</td>
// 		<td>{record.hobbies}</td>
// 		<td>
// 			<UpdateBtn id={record._id} record={record} />
// 			<DeleteBtn id={record._id} record={record} />
// 		</td>
// 	</tr>
// );

export default class Table extends Component {
	constructor(props) {
		super(props);
		this.state = { records: [], flag: true };
		this.handler = this.handler.bind(this);
	}

	handler() {
		this.setState({
			flag: !this.state.flag,
		});
		console.log("table state changed" + this.state.flag);
		this.updoot();
		this.componentDidMount();
		this.render();
	}

	updoot = () => {
		axios
			.get("https://safe-retreat-89188.herokuapp.com/api")
			.then((response) => {
				this.setState({ records: response.data });
				console.log("table: " + response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	componentDidMount() {
		console.log("mounted");
		axios
			.get("https://safe-retreat-89188.herokuapp.com/api")
			.then((response) => {
				this.setState({ records: response.data });
				console.log("table: " + response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	recordList() {
		// this.update();
		console.log(this.state.records);
		let h = this.handler;
		return this.state.records.map(function (currentRecord, i) {
			console.log(currentRecord.name, i);
			return (
				<Record record={currentRecord} key={i} index={i + 1} handler={h} />
			);
		});
	}

	render() {
		console.log("called render");
		return (
			<div>
				<h3>Table</h3>
				<table
					className='table table-striped display-table'
					style={{ marginTop: 20 }}
				>
					<thead>
						<tr>
							<th>No.</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Hobbies</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{this.recordList()}</tbody>
				</table>
			</div>
		);
	}
}
