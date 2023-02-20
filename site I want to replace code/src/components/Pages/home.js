import React, {useState, useEffect, useRef} from 'react';
import './pages.css';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Carousel from 'react-bootstrap/Carousel';
import about_pic from '../images/about-left.png';
import author1 from '../images/blog-author-1.png';
import blogimg from '../images/blog-img-1.png';
import author2 from '../images/blog-author-2.png';
import blogimg2 from '../images/blog-img-2.png';
import hero1 from '../images/hero-bg-img-1.png';
import hero2 from '../images/hero-bg-img-2.png';
import testimonial1 from '../images/testimonial-img-3.png';
import testimonial2 from '../images/testimonial-img-2.png';
import testimonial3 from '../images/testimonial-img-5.png';
import team5 from '../images/team-img-5.png';
import team2 from '../images/team-img-2.png';
import team6 from '../images/team-img-6.png';
import team7 from '../images/team-img-7.png';
import logo1 from '../images/logo1.png';
import logo2 from '../images/logo2.png';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faFacebookF, faLinkedinIn, faInstagram} from '@fortawesome/free-brands-svg-icons';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

library.add(faTwitter, faFacebookF, faLinkedinIn, faInstagram)

export default function Home(){

    const [open, setOpen] = useState(false);
    const [samples, setSamples] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [token, setToken] = useState(null);

    // slidenavbar
    const [isExpanded, setIsExpanded] = useState(false);

    // carousel
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const scrollRef = useRef()

    const handleScroll = () => {
        const offset = window.scrollY;

        if (offset > 200){
            setScrolled(true)
        }else{
            setScrolled(false)
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    });

    useEffect(() => {
        checkToken()
    }, []);

    function checkToken(){
        let is_token = localStorage.getItem('token');
        setToken(is_token)
    };

    let navbarClasses = ['navigation'];
    
    if(scrolled){
        navbarClasses.push('scrolled')
    };

    const handleOpenOptions = () => {
        setOpen(!open)
        setSamples(false)
    };

    const handleOpenSamples = () => {
        setSamples(!samples)
        setOpen(false)
    };

    let displayOptions, displayIcon, displaySamples, sampleIcon, miniOptions, miniSamples;

    if(open === true){
        displayOptions = (
            <div className="services-container">
                <div className="services-options">
                    <ul>
                        <li>Academic Writing</li>
                        <li>Programming Assignment</li>
                        <li>Calculations Assignment</li>
                    </ul>
                </div>
            </div>
        )
        displayIcon = (
            <ExpandLessIcon />
        )

        miniOptions = (
            <ol className="mini_links">
                <li>Academic Writing</li>
                <li>Programming Assignments</li>
                <li>Calculations Assignments</li>
            </ol>
        )
    } else if(open === false) {
        displayIcon = (
            <ExpandMoreIcon />
        )
    };

    if(samples === true){
        displaySamples = (
                <div className="sample-work-container">
                    <div className="sample-work">
                        <ul>
                            <li>Business Plan</li>
                            <li>Dissertation</li>
                            <li>Creative Writing</li>
                            <li>Research paper</li>
                            <li>Term Paper</li>
                            <li>Article Review</li>
                            <li>Statistics</li>
                            <li>Engineering</li>
                            <li>Mathematics</li>
                            <li>Web Programming</li>
                            <li>Database Design and Optimization</li>
                            <li>Mobile Application Development</li>
                        </ul>
                    </div>
                </div>
        )
        sampleIcon = (
            <ExpandLessIcon />
        )

        miniSamples = (
            <ol className="mini_links">
                <li>Business Plan</li>
                <li>Dissertation</li>
                <li>Creative Writing</li>
                <li>Research paper</li>
                <li>Term Paper</li>
                <li>Article Review</li>
                <li>Statistics</li>
                <li>Engineering</li>
                <li>Mathematics</li>
                <li>Web Programming</li>
                <li>Database Design and Optimization</li>
                <li>Mobile Application Development</li>
            </ol>
        )
    } else if(samples === false) {
        sampleIcon = (
            <ExpandMoreIcon />
        )
    };

    return (
        <div className='home-container'>
            <div className={navbarClasses.join(" ")}>

                <div className={isExpanded ? "navlinks expanded" : "navlinks"}>
                    <ul className="navbars">
                        <li>
                            <img src={logo1} alt="logo" />
                        </li>
                        <ul>
                            <li onClick={handleOpenOptions}>Our Services <span>{displayIcon}</span></li>
                            {miniOptions}
                            <li>How to Order</li>
                            <li onClick={handleOpenSamples}>Sample Work {sampleIcon}</li>
                            {miniSamples}
                            <li>Blog</li>
                            <li>Latest Reviews</li>
                            <li>Pricing</li>
                            <div className="order-slidebar">
                                {token !== null ?
                                <Link to="/dashboard/orders" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '130px', padding: '8px 0'}} >Dashboard</Button></li></Link>
                                :
                                <Link to="/log" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<PersonOutlineOutlinedIcon />} style={{width: '130px', padding: '8px 0'}} >Order now</Button></li></Link>
                                }
                            </div>
                        </ul>
                        {token !== null ?
                                <Link to="/dashboard/orders" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '130px', padding: '8px 0'}} >Dashboard</Button></li></Link>
                                :
                                <Link to="/log" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<PersonOutlineOutlinedIcon />} style={{width: '130px', padding: '8px 0'}} >Order now</Button></li></Link>
                        }
                    </ul>
                </div>

                {displayOptions}

                {displaySamples}

                <div className="hamburger">
                    <div className="mini-logo">
                        <img src={logo1} alt="logo" style={{width: '100px'}}/>
                    </div>
                    <div className="hamburg-menu" onClick={() => setIsExpanded(!isExpanded)}>
                        <span className="h-top"></span>
                        <span className="h-middle"></span>
                        <span className="h-bottom"></span>
                    </div>
                </div>

            </div>

            <div className="home-carousel" ref={scrollRef}>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item>
                        <div className="carousel1">
                            <div className="caption">
                                <h1>We Provide Only The<br className="hide-breakline"/> Best Services</h1>
                                <p>Our company is designed to deliver only the best work. We only hire the top notch experts. Hiring a professional expert will provide you with qualified and unique paper assistance.</p>
                                <div className="carousel-links">
                                    {token === null ?
                                        <Link to="/log" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '150px', padding: '8px 5px'}} >Place Order</Button></li></Link>
                                        :
                                        <Link to="/dashboard/placeorder" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '150px', padding: '8px 5px'}} >Place Order</Button></li></Link>
                                    }
                                    {token === null ?
                                        <Link to="/register" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" style={{width: '150px', padding: '8px 5px'}}  >Create Account</Button></li></Link>
                                        :
                                        <Link to="/dashboard/orders" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" style={{width: '150px', padding: '8px 5px'}} >Dashboard</Button></li></Link>
                                    }
                                </div>
                            </div>
                            <div className="caption-img">
                                <img src={hero1} alt="hero" />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel1">
                            <div className="caption">
                                <h1>We Provide Only <br className="hide-breakline"/> The Best Services</h1>
                                <p>Our company is designed to deliver only the best work. We only hire the top notch experts. Hiring a professional expert will provide you with qualified and unique paper assistance.</p>
                                <div className="carousel-links">
                                    {token === null ?
                                        <Link to="/log" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '150px', padding: '8px 5px'}} >Place Order</Button></li></Link>
                                        :
                                        <Link to="/dashboard/placeorder" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '150px', padding: '8px 5px'}} >Place Order</Button></li></Link>
                                    }
                                    {token === null ?
                                        <Link to="/register" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" style={{width: '150px', padding: '8px 5px'}}  >Create Account</Button></li></Link>
                                        :
                                        <Link to="/dashboard/orders" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" style={{width: '150px', padding: '8px 5px'}} >Dashboard</Button></li></Link>
                                    }
                                </div>
                            </div>
                            <div className="caption-img">
                                <img src={hero2} alt="hero" />
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="smooth-scroll" style={{display: scrolled ? 'block' : 'none', transition: 'display .3s'}} onClick={() => scrollRef.current?.scrollIntoView({behavior: "smooth"})}>
                <ExpandLessIcon style={{color: '#fff', fontWeight: '900', fontSize: '28px'}}/>
            </div>

                <div className="about">
                    <div className="about-pic">
                        <img src={about_pic} alt="about-left" />
                    </div>
                    <div className="about-content">
                        <h1>About Us</h1>
                        <h2>The ultimate accolade across all <br className="hide-breakline" /> fields.</h2>
                        <p>A platform for professional writing and development called Company Name links skilled experts with anyone who requires a top-notch outcome inside an affordable price range.<br/>
                        <br/>
                        We have come a long way in our mission to provide economic possibilities so that people might live better lives. As a result, we have evolved into the global work marketplace where companies of all sizes and freelancers from all over the world join together daily to do amazing things. Use this pool of independent talent if you are a client who has come to us to get things done in order to alter your company and build more quickly. If you're a talented independent person who has come here to fulfill your potential, know that you are an important and useful member of someone's team.</p>

                        <div className="about-cards">
                            <ul>
                                <li>Creative Team</li>
                                <li>Friendly Support</li>
                                <li>Save Your Time</li>
                            </ul>
                            <ul>
                                <li>Original Samples</li>
                                <li>Strict Deadlines</li>
                                <li>Available 24/7</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="services-contain">
                    <div className="services">
                        <div className="services-title">
                            <h1>Services</h1>
                            <h2>Our team offers...</h2>
                        </div>

                        <div className="services-examples">
                            <ul>
                                <li>
                                    <h3>Creative Writing</h3>
                                    <p>Autobiography, flash fiction, Novel, play, poetry, screenplay and short stories.</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Research Paper</h3>
                                    <p>Analytical, compare and constrast, interpretative, Survey research paper, and exploratory research paper.</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Term Paper</h3>
                                    <p>Get a term paper in any format including IEEE.</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Dissertation</h3>
                                    <p>Get a term paper in any format including IEEE.</p>
                                    <h5>Find more</h5>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <h3>Statistics</h3>
                                    <p>Experiments and Sampling, probability, hypothesis, linear reggresion, correlation.</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Mathematics</h3>
                                    <p>Algebra, trigonometry, matrix, geometry, calculus, rate & proportion, percentages...etc.</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Engineering</h3>
                                    <p>Algebra, trigonometry, matrix, geometry, calculus, rate & proportion, percentages...etc</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Chemistry</h3>
                                    <p>Thermo-chemistry, electrochemistry, periodic table, chemical bonding, organic, inorganic chemistry,...etc.</p>
                                    <h5>Find more</h5>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <h3>Web Programming</h3>
                                    <p>HTML, Javascript, CSS, Python, PHP, RUBY, C#, JAVA, C++,...etc.</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Mobile App Development</h3>
                                    <p>Android and IOS application development</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Database Design and Optimization</h3>
                                    <p>MYSQL, SQL, ORACLE, Postgresql, MongoDB, EER diagrams,...etc.</p>
                                    <h5>Find more</h5>
                                </li>
                                <li>
                                    <h3>Graphic Design</h3>
                                    <p>Logo design, web design, book covers, product labels, business cards, software interfaces,...etc.</p>
                                    <h5>Find more</h5>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="order-process-container">
                    <div className="order-process">
                        <h1>How our company works</h1>
                        <h2>Perfect Solution Makes a Success.</h2>
                    </div>
                    <div className="alternate-process">
                        <div className="right-process">
                            <h3>Placing an Order</h3>
                            <h4>Step 1</h4>
                            <p>Press the button to navigate to the order page. Fill out the order form. Provide any extra details regardding the work to provide more clarity. Provide any necesary attachment.</p>
                        </div>
                        <div className="left-process">
                            <h3>Account</h3>
                            <h4>Step 2</h4>
                            <p>All our customers have an account. An account helps you track the order progress. An existing customer will be redirected to the dashboard after placing ane order. A new customer will be redirected to the registration page.</p>
                        </div>
                        <div className="right-process">
                            <h3>Payment</h3>
                            <h4>Step 3</h4>
                            <p>Choose your preferred mode of payment. Making a payments provides a guarantee to our team that the client is serious. It also helps us match the work with the best expert.</p>
                        </div>
                        <div className="left-process">
                            <h3>Expertise Selection</h3>
                            <h4>Step 4</h4>
                            <p>Our team matches the work with the best experts on that area. Selection of an expert depends on the clients service selection including extra services.</p>
                        </div>
                        <div className="right-process">
                            <h3>Tracking Order Progress</h3>
                            <h4>Step 5</h4>
                            <p>After placing an order, the order will appear on the dashboard. The only thing remaining is you to wait for order delivery. You can also ask about the order progress by sending a message to the support team.</p>
                        </div>
                        <div className="left-process">
                            <h3>Receive Order and Rate</h3>
                            <h4>Step 6</h4>
                            <p>After the order is completed, its placed on the dashboard and a message is sent to the client informing them about order delivery. The only thing now left is rating our services and making anothe order if you found our servic es top notch.</p>
                        </div>
                    </div>
                </div>

                <div className="team-section-container">
                    <div className="team-section">
                        <h1>Our Team</h1>
                        <h2>Meet some of the team members</h2>
                        <ul>
                            <li>
                                <img src={team5} alt="team5" />
                                <div className="team-desc">
                                    <h3>Emily Chen</h3>
                                    <h4>Technical writer</h4>
                                </div>
                            </li>
                            <li>
                                <img src={team2} alt="team5" />
                                <div className="team-desc">
                                    <h3>David Miller</h3>
                                    <h4>Project manager</h4>
                                </div>
                            </li>
                            <li>
                                <img src={team6} alt="team5" />
                                <div className="team-desc">
                                    <h3>Chase Myles</h3>
                                    <h4>App developer</h4>
                                </div>
                            </li>
                            <li>
                                <img src={team7} alt="team5" />
                                <div className="team-desc">
                                    <h3>Chloe Johnson</h3>
                                    <h4>Team lead</h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="order-cta-container">
                    <div className="overlay"></div>
                    <div className="order-cta">
                        <h1>Do You Have A Project In <br className='hide-breakline'/> Mind</h1>
                        <div className="order-cta-links">
                            <Link to="/log" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" startIcon={<AddCircleOutlineIcon />} style={{width: '130px', padding: '10px 3px'}} >Order now</Button></li></Link>
                            <Link to="/" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" style={{width: '130px', padding: '10px 3px'}} >Contact Us</Button></li></Link>
                        </div>
                    </div>
                </div>

                <div className="reviews-container">
                    <div className="reviews">
                        <h1>Reviews</h1>
                        <h2>What Customers Say About Us</h2>
                    </div>
                    <Carousel>
                        <Carousel.Item>
                            <div className="review-carousel">
                                <div className="review-carousel-img">
                                    <img src={testimonial1} alt='testimonial1' />
                                </div>
                                <div className="review-carousel-content">
                                    <h3>Miller</h3>
                                    <h4>Australia</h4>
                                    <p>My suggestions were well considered by the designer, who worked diligently to produce a high quality <br/> final product.</p>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="review-carousel">
                                <div className="review-carousel-img">
                                    <img src={testimonial3} alt='testimonial1' />
                                </div>
                                <div className="review-carousel-content">
                                    <h3>Alen</h3>
                                    <h4>Ukraine</h4>
                                    <p>Great work, will recommend</p>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="review-carousel">
                                <div className="review-carousel-img">
                                    <img src={testimonial2} alt='testimonial1' />
                                </div>
                                <div className="review-carousel-content">
                                    <h3>Watson</h3>
                                    <h4>United States</h4>
                                    <p>Excellent talents, excellent communication, and project completed much earlier than expected. I'd be happy <br/>to collaborate with you guys once again.</p>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>

                <div className="blog-section-container">
                    <div className="blog-section">
                        <div className="blog-content">
                            <h1>Our Blog</h1>
                            <h2>Check Our Recent<br className='hide-breakline'/> Blogs</h2>
                            <p>Our blog helps keep you with up to date news, technology and other areas related to our services. Please subscribe so that you may never miss our newly written pieces</p>
                            <Link to="/" style={{textDecoration: 'none'}}><li><Button variant="contained" size="small" style={{width: '130px', padding: '10px 3px'}} >Explore More</Button></li></Link>
                        </div>
                        <div className="blog-samples">
                            <div className="blog">
                                <img src={blogimg} alt="blog" />
                                <div className="blog-content">
                                    <div className="blog-author">
                                        <img src={author1} alt="author" />
                                        <h5>By John Smith</h5>
                                    </div>
                                    <h3>Topic One</h3>
                                    <h4>Learn More</h4>
                                </div>
                            </div>
                        
                            <div className="blog">
                                <img src={blogimg2} alt="blog" />
                                <div className="blog-content">
                                    <div className="blog-author">
                                        <img src={author2} alt="author" />
                                        <h5>By John Smith</h5>
                                    </div>
                                    <h3>Topic Two</h3>
                                    <h4>Learn More</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-container">
                    <div className="overlay"></div>
                    <div className="footer-section">
                        <div className="footer1">
                            <img src={logo2} alt="footer-logo" />
                            <p>We provide only the best services. We hire only the to notch experts . Hiring a professional expert will provide you with time qualified and unique assistance.</p>
                            <div className="social-links">
                                <div className="i">
                                    <FontAwesomeIcon icon={faFacebookF} />
                                </div>
                                <div className="i">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </div>
                                <div className="i">
                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                </div>
                                <div className="i">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </div>
                            </div>
                        </div>
                            <div className="footer2">
                                <h1>Explore</h1>
                                <ul>
                                    <li>Our Services</li>
                                    <li>About Us</li>
                                    <li>Meet Our Team</li>
                                    <li>Our Services</li>
                                    <li>Our Blog</li>
                                </ul>
                            </div>

                            <div className="footer3">
                                <h1>Contact Us</h1>
                                <ul>
                                    <li>
                                        <LocalPhoneOutlinedIcon style={{fontSize: '24px', marginRight: '15px'}}/>
                                        <p>+254728272483</p>
                                    </li>
                                    <li>
                                        <EmailOutlinedIcon style={{fontSize: '24px', marginRight: '15px'}}/>
                                        <p>support@tothemoonexperts.com</p>
                                    </li>
                                    <li>
                                        <LocationOnOutlinedIcon style={{fontSize: '24px', marginRight: '15px'}}/>
                                        <p>3102 Bartlett Avenue</p>
                                    </li>
                                </ul>
                            </div>

                        <div className="footer4">
                            <h1>Newsletter</h1>
                            <form>
                                <input type='email' required 
                                    placeholder="Enter Your Email"
                                />
                                <input type='submit' value='Subscribe' />
                            </form>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        <div className="underline"></div>
                        <h5>Copyright 2022 Klaus | Design By Klaus Lab</h5>
                    </div>
                </div>
        </div>
    )
}