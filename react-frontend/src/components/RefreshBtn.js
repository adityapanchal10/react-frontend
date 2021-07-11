import React, { Component } from "react";

export class RefreshBtn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			refresh: true,
		};
	}

	render() {
		return (
			<button
				className='btn btn-lg btn-success center refresh-button'
				onClick={this.props.handler}
			>
				Refresh
			</button>
		);
	}
}

export default RefreshBtn;
