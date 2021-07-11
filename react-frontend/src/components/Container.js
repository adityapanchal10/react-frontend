import React, { Component } from "react";
import { Modal } from "./Modal";
import TriggerButton from "./TriggerButton";
import Table from "./table";

export class Container extends Component {
	constructor(props) {
		super(props);

		this.state = { isShown: false, flag: true };
		this.handler = this.handler.bind(this);
	}

	handler() {
		this.setState({
			flag: !this.state.flag,
		});
		console.log("state changed");
		window.location.reload();
	}

	showModal = () => {
		this.setState({ isShown: true }, () => {
			this.closeButton.focus();
		});
		this.toggleScrollLock();
	};
	closeModal = () => {
		this.setState({ isShown: false });
		this.TriggerButton.focus();
		this.toggleScrollLock();
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
	render() {
		return (
			<div class='container'>
				<TriggerButton
					showModal={this.showModal}
					buttonRef={(n) => (this.TriggerButton = n)}
				/>

				{this.state.isShown ? (
					<Modal
						onSubmit={this.props.onSubmit}
						modalRef={(n) => (this.modal = n)}
						buttonRef={(n) => (this.closeButton = n)}
						closeModal={this.closeModal}
						onKeyDown={this.onKeyDown}
						onClickOutside={this.onClickOutside}
						id={0}
						record={null}
						handler={this.handler}
					/>
				) : null}

				<Table />
			</div>
		);
	}
}

export default Container;
