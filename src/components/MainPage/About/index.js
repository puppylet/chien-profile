import React, {Component} from 'react'
import {connect} from 'react-redux'
import Experiences from './Experiences'
import Technologies from './Technologies'
import Skills from './Skills'
import Education from "./Education";
import MyDescription from "./MyDescription";
import Hero from "./Hero";

class About extends Component {
	render() {
		const {profile} = this.props
		return (
			<section id="about" className="section about">
				<div className="container">
					<div className="row mb-50 pt-30">
						<div className="col-md-12">
							<div className="section-title">
								<h2 className="text-dark mb-0">About me</h2>
								<p className="text-muted mb-0">Main informations about me and what I love to do.</p>
							</div>
						</div>
					</div>
					<div className="row mb-50">

						<Hero/>
						<MyDescription/>

					</div>

					<div className='row'>
						{profile.tech && <Technologies tech={profile.tech}/>}
						{profile.skill && <Skills skill={profile.skill}/>}
					</div>

					<div className="row ">
						{profile.experience && <Experiences
							experience={profile.experience}
							allTechs={profile.tech}/>}
						<Education/>
					</div>
				</div>
			</section>
		)
	}
}

const mapStateToProps = state => {
	return {profile: state.profile.data}
}

export default connect(mapStateToProps)(About)
