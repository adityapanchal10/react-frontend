import React, { Component } from "react";
import axios from "axios";

export class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: {},
			errors: {},
			flag: props.id,
			record: props.record,
		};

		// console.log("form: " + this.state.record.name);
		if (this.state.flag !== 0) {
			console.log("update here");
			let fields = this.state.fields;
			fields["name"] = this.state.record.name;
			fields["email"] = this.state.record.email;
			fields["phone"] = this.state.record.phone;
			fields["hobbies"] = this.state.record.hobbies;
			this.setState({ fields });
			console.log(this.state.fields["name"]);
		}
	}

	handleValidation() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		//Name
		if (!fields["name"]) {
			formIsValid = false;
			errors["name"] = "Cannot be empty";
		}

		if (typeof fields["name"] !== "undefined") {
			if (!fields["name"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["name"] = "Only letters";
			}
		}

		//Email
		if (!fields["email"]) {
			formIsValid = false;
			errors["email"] = "Cannot be empty";
		}

		if (typeof fields["email"] !== "undefined") {
			let lastAtPos = fields["email"].lastIndexOf("@");
			let lastDotPos = fields["email"].lastIndexOf(".");

			if (
				!(
					lastAtPos < lastDotPos &&
					lastAtPos > 0 &&
					fields["email"].indexOf("@@") === -1 &&
					lastDotPos > 2 &&
					fields["email"].length - lastDotPos > 2
				)
			) {
				formIsValid = false;
				errors["email"] = "Email is not valid";
			}
		}

		if (!fields["phone"]) {
			formIsValid = false;
			errors["phone"] = "Cannot be empty";
		}

		if (isNaN(fields["phone"])) {
			console.log(fields["phone"]);
			formIsValid = false;
			errors["phone"] = "Needs to be a number";
		}

		if (!fields["hobbies"]) {
			formIsValid = false;
			errors["hobbies"] = "Cannot be empty";
		}

		this.setState({ errors: errors });
		console.log(errors);
		return formIsValid;
	}

	onSubmit = (event) => {
		event.preventDefault();
		// console.log(event.target.name.value);
		// console.log(event.target.email.value);
		if (!this.handleValidation()) alert("Form validation unsuccessful !");
		else {
			const record = {
				name: this.state.fields["name"],
				email: this.state.fields["email"],
				phone: this.state.fields["phone"],
				hobbies: this.state.fields["hobbies"],
			};
			console.log(record);

			if (this.state.flag === 0) {
				axios.post("https://safe-retreat-89188.herokuapp.com/api", record).then((res) => {
					console.log(res.data + " inserted");
				});
			} else {
				console.log("updating !");
				axios.put("https://safe-retreat-89188.herokuapp.com/api/" + this.state.flag, record).then((res) => {
					console.log(res.data + " updated");
					// this.props.handler();
				});
			}

			this.setState({
				fields: {},
				errors: {},
				flag: 0,
			});

			this.props.afterSubmit();
			this.props.handler();
		}
	};

	handleChange(field, e) {
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({ fields });
	}

	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						className='form-control'
						id='name'
						// ref='name'
						onChange={this.handleChange.bind(this, "name")}
						value={this.state.fields["name"]}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						className='form-control'
						id='email'
						placeholder='name@example.com'
						// ref='email'
						onChange={this.handleChange.bind(this, "email")}
						value={this.state.fields["email"]}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='number'>Phone number</label>
					<input
						type='number'
						className='form-control'
						id='phone'
						// ref='phone'
						onChange={this.handleChange.bind(this, "phone")}
						value={this.state.fields["phone"]}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Hobbies</label>
					<input
						type='text'
						className='form-control'
						id='hobbies'
						// ref='hobbies'
						onChange={this.handleChange.bind(this, "hobbies")}
						value={this.state.fields["hobbies"]}
					/>
				</div>
				<div className='form-group'>
					<button className='form-control btn btn-primary' type='submit'>
						Submit
					</button>
				</div>
			</form>
		);
	}
}
