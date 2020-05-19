import {ProgressBar} from "react-bootstrap";
import React from "react";

export default ({name, percentage}) => <div className='col-lg-6'>
	<small className='text-muted'>{name}</small>
	<ProgressBar now={percentage} />
</div>
