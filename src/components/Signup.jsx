import React from 'react'
import { useState } from 'react';
import '../CSS/login_and_signup.css';

const Signup = () => {

    const [data, setData] = useState();
    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        
    }
    const sendData = async () => {
        console.log(data);
        const response = await fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const content = await response.json();
        if (content.success === "true") {
            alert("Signup Successful");
        }
        else {
            alert("Signup Unsuccesful");
        }
        console.log("In senddata : ", content);
    }

    return (
        <>
        <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
    <div className="row gx-lg-5 align-items-center mb-5">
      <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex:"10"}}>
        <h1 className="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
          The best offer <br />
          <span style={{color: "hsl(218, 81%, 75%)"}}>for your business</span>
        </h1>
        <p className="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Temporibus, expedita iusto veniam atque, magni tempora mollitia
          dolorum consequatur nulla, neque debitis eos reprehenderit quasi
          ab ipsum nisi dolorem modi. Quos?
        </p>
      </div>

      <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <div className="card bg-glass">
          <div className="card-body px-4 py-5 px-md-5">
            <form>

            <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example1" className="form-control" name="name" onChange={handleOnChange}/>
                    <label className="form-label" htmlFor="form3Example1">Full Name</label>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="form-outline">
                    <input type="text" id="form3Example2" className="form-control" name="contact" onChange={handleOnChange} />
                    <label className="form-label" htmlFor="form3Example2">Contact Number</label>
                  </div>
                </div>
              </div>


              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control" name="email" onChange={handleOnChange}/>
                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control" name="password" onChange={handleOnChange}/>
                <label className="form-label" htmlFor="form3Example3">Password</label>
              </div>

              <div className="form-outline mb-4">
                <input type="password" id="form3Example4" className="form-control" name="cpassword" onChange={handleOnChange}/>
                <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
              </div>

        
              {/* <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example33" checked />
                <label className="form-check-label" htmlFor="form2Example33">
                  Subscribe to our newsletter
                </label>
              </div> */}

              <center>
              <button type="submit" className="btn btn-primary btn-block mb-4" onClick={sendData}>
                Sign up
              </button>
              </center>

             
              <div className="text-center">
                <p>or sign up with:</p>
                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-link btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
 </section>







        {/* ********************************************* */}
            {/* <center className="h1 mt-2">Sign UP</center>
            <form className='container w-25 mt-3'>
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-control" name="name" onChange={handleOnChange} />
                    <label className="form-label" htmlhtmlFor="form2Example1">Full Name</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="number" id="form2Example2" className="form-control" name="contact" onChange={handleOnChange} />
                    <label className="form-label" htmlhtmlFor="form2Example2">Contact No</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example2" className="form-control" name="email" onChange={handleOnChange} />
                    <label className="form-label" htmlhtmlFor="form2Example2">Email ID</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" name="password" onChange={handleOnChange} />
                    <label className="form-label" htmlhtmlFor="form2Example2">Password</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" className="form-control" name="cpassword" onChange={handleOnChange} />
                    <label className="form-label" htmlhtmlFor="form2Example2">Confim Password</label>
                </div>
                <center>
                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={sendData}>Sign in</button>
                </center>
            </form> */}
        </>
    )
}

export default Signup;

