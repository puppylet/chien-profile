import React from "react";

export default () => <section className="section contact pb-70" id="contact">
	<div className="container">
		<div className="row mb-50">
			<div className="col-md-12">
				<div className="section-title">
					<h2 className="text-dark mb-0">Contact Me</h2>
					<p className="text-muted mb-0">Feel Free To Contact Me Any Time </p>
				</div>
			</div>
		</div>
		<div className="row">
			<div className="col-lg-6">
				<form action="php/mail.php" method="post" id="main_contact_form" className="form contact_form ">
					<div className="alert alert-success contact_msg " style={{display: 'none'}} role="alert">
						Your message was sent successfully.
					</div>
					<div className="form-group">
						<input type="text" name="name" id="name" className="form-control" placeholder="Name"/>
					</div>

					<div className="form-group">
						<input type="email" name="email" id="email" className="form-control" placeholder="Email"
						       required="required"/>
					</div>

					<div className="form-group">
						<input type="text" name="subject" id="subject" className="form-control" placeholder="Subject"
						       required="required"/>
					</div>

					<div className="form-group">
                    <textarea name="message" id="message" cols="30" rows="5" className="form-control"
                              placeholder="Message"></textarea>
					</div>

					<button type="submit" name="submit" className="btn-custom">
						<span><i className="fas fa-paper-plane" /></span>
						<span> Send Message</span>
					</button>

				</form>
			</div>
			<div className="col-lg-6">
				<h5 className="text-dark">Let's talk about everything!</h5>
				<p className="text-dark mb-30">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy nibh euismod tincidunt ut laoreet dolore. Lorem
					ipsum dolor sit amet, consectetuer adipiscing elit.
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
				<div className="contact-info">
					<div className="item mb-20">
						<p className="text-dark font-w-700 mb-0">Phone: </p>
						<p className="text-dark mb-0"><i className="fas fa-phone base-color"/>+113-804-9098</p>
					</div>
					<div className="item mb-20">
						<p className="text-dark font-w-700 mb-0">Email: </p>
						<p className="text-dark mb-0"><i className="fas fa-envelope base-color"> </i> contact@mariam.com</p>
					</div>
					<div className="item mb-20">
						<p className="text-dark font-w-700 mb-0">Adress: </p>
						<p className="text-dark mb-0"><i className="fas fa-map-marker-alt base-color"> </i>1000 Proctor St
							USA.</p>
					</div>
					<div className="item">
						<p className="text-dark font-w-700 mb-0">Skybe: </p>
						<p className="text-dark mb-0"><i className="fab fab fa-skype base-color"> </i>mariam.wallas</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
