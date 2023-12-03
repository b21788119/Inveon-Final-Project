import React from 'react'
// import img
import img1 from '../../assets/img/common/img-about.jpg'

const AboutTop = () => {
    return (
        <>
            <section id="about-top" className="ptb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="about_top_img">
                                <img src={"https://storage.googleapis.com/pai-images/27dd0e134e61448eb1549cfd8f27e634.jpeg"} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="about_top_left_content">
                                <h2>About Us</h2>
                                <h4>The Network of Networks</h4>
                                <p><strong>From Soul</strong> To Body... </p>
                                <p>
                                Welcome to [Brand Name], where the world of fashion transcends boundaries and unites individuals in a global celebration of style, sophistication, and elegance. We are more than just a fashion network; we are a dynamic and inclusive community that connects fashion enthusiasts, designers, influencers, and trendsetters from every corner of the globe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutTop
