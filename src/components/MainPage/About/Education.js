import React from "react";
import EducationItem from "./EducationItem";


const educations = [
	{
		name: "Hutech University",
		time: '2003 - 2007',
		degree: 'Bachelor of science',
		description: 'Ho Chi Minh City University of Technology (HUTECH) was established on 26 April 1995 according to Decision No. 235 / TTg signed by the Prime Minister and officially operated according to Decision No. 2128/GD-DT signed by the Minister of Ministry of Education and Training on 24 June 1995.'
	},
	{
		name: "NIIT Institute",
		time: '2005 - 2007',
		degree: 'Engineer',
		description: 'NIIT Limited is an Indian Multinational company that offers learning management and training delivery solutions to corporations, institutions and individuals. It has three main lines of business worldwide: Corporate Learning Group, Skills and Careers Group, and School Learning Group.'
	}
];

export default () => <div className="col-lg-4">
	<h5 className="text-dark mb-30">My Education</h5>
	<div className="timeline">
		{educations.map(edu => <EducationItem key={edu.name} {...edu} />)}
	</div>
</div>
