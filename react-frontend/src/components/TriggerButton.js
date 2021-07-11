import React from "react";

const triggerText = "Open form";
const Trigger = ({ buttonRef, showModal }) => {
	return (
		<button
			className='btn btn-lg btn-danger center modal-button'
			align='center'
			ref={buttonRef}
			onClick={showModal}
		>
			{triggerText}
		</button>
	);
};
export default Trigger;
