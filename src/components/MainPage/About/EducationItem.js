import React from 'react';

export default ({name, degree, description, time}) => <div className='item'>
	<div className='content'>
		<h6 className='text-dark mb-0'>{name}</h6>
		<p className='text-dark mb-0'><b className='text-muted'>{degree}</b></p>
		<small className='text-muted'>{time}</small>
		<p className='text-dark pt-15 mb-0'>{description}</p>
	</div>
</div>
