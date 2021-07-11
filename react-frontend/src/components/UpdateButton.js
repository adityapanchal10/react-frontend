import React, { Component } from "react";
import { Modal } from "./Modal";

export class UpdateBtn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			ModalVis: false,
			id: props.id,
			record: props.record,
		};

		// console.log("btn record: " + this.state.record.name);
	}

	// updoot = this.state.updoot;

	showModal = () => {
		this.setState({ ModalVis: true }, () => {
			// this.closeButton.focus();
		});
		// this.toggleScrollLock();
	};
	closeModal = () => {
		this.setState({ ModalVis: false });
		// this.TriggerButton.focus();
		// this.toggleScrollLock();
	};
	onKeyDown = (event) => {
		if (event.keyCode === 27) {
			this.closeModal();
		}
	};
	onClickOutside = (event) => {
		if (this.modal && this.modal.contains(event.target)) return;
		this.closeModal();
	};

	toggleScrollLock = () => {
		document.querySelector("html").classList.toggle("scroll-lock");
	};

	doUpdate = (event) => {
		event.preventDefault();
		this.setState({ ModalVis: true });
		console.log("update: " + this.state.id);
	};

	render() {
		return (
			<React.Fragment>
				{this.state.ModalVis ? (
					<Modal
						onSubmit={this.props.onSubmit}
						modalRef={(n) => (this.modal = n)}
						buttonRef={(n) => (this.closeButton = n)}
						closeModal={this.closeModal}
						onKeyDown={this.onKeyDown}
						onClickOutside={this.onClickOutside}
						id={this.state.id}
						record={this.props.record}
						handler={this.props.handler}
					/>
				) : null}
				<button
					className='btn btn-sm btn-primary center modal-button'
					id={this.state.id}
					onClick={this.doUpdate.bind(this)}
				>
					Update
				</button>
			</React.Fragment>
		);
	}
}

export default UpdateBtn;
