import React from "react";
import EducationItem from "./EducationItem";


const educations = [
	{
		name: "Hutech University",
		time: '2003 - 2007',
		degree: 'Bachelor of science',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit praesentium aut repellendus rem non repudiandae sint dolor illo officia dignissimos.'
	},
	{
		name: "NIIT Insitute",
		time: '2005 - 2007',
		degree: 'Engineer',
		description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit praesentium aut repellendus rem non repudiandae sint dolor illo officia dignissimos.'
	}
];

export default () => <div className="col-lg-4">
	<h5 className="text-dark mb-30">My Education</h5>
	<div className="timeline">
		{educations.map(edu => <EducationItem {...edu} />)}
	</div>
</div>
