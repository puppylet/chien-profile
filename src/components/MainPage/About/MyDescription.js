import React from "react";

export default () => <div className="col-lg-7 d-flex align-items-center">
	<div className="details">
		<h5>Hi, I am Le Tat Chien</h5>
		<p className="text-dark mb-25">
			I am a Senior Web Developer - Graphic Designer who has
			an immense love for both computer science and art.
			I soon realized that Web Programming is a beautiful
			mixture of arts, mathematics, designing and coding, so it
			was an easy decision to follow my chosen career path.
			My motto is “Impossible is a word only found in the
			dictionary of fools” meaning that with my creative
			imagination and strong technical background, I am
			capable of applying logic into systems and machines in
			order to make any client’s ideas come true.
		</p>

		<ul className="info mb-5 list-inline">
			<li className="text-dark">
				<span className="font-w-600"><i className="fa fa-user" /></span> Le Tat Chien
			</li>
			<li className="text-dark">
				<span className="font-w-600"><i className="fa fa-phone" /></span> +84 32 737 8918
			</li>
			<li className="text-dark">
				<span className="font-w-600"><i className="fa fa-calendar-minus" /></span> 09-05-1984
			</li>
			<li className="text-dark">
				<span className="font-w-600"><i className="fa fa-envelope" /></span>&nbsp;
				<a href="mailto:me@chiendezign.info" className="text-dark">me@chiendezign.info</a>
			</li>
			<li className="text-dark">
				<span className="font-w-600"><i className="fa fa-globe" /></span> Vietnam
			</li>
			<li className="text-dark">
				<span className="font-w-600"><i className="fa fa-map-marker" /></span> Thuan An, Binh Duong
			</li>
		</ul>

		<a href="#about" className="btn-custom grey">
			<span><i className="fas fa-cloud-download-alt" /></span>
			<span>Downland My CV</span>
		</a>
		<a href="#about" className="btn-custom" style={{ marginLeft: 10 }}>
			<span>I'm availabe.  Hire me now!</span>
		</a>
	</div>
</div>
