import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 d-flex align-items-center">
          <img 
            src={require("../../assets/about/about.jpg")}
            alt="About Us" 
            className="img-fluid rounded shadow-lg" 
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h2 className="mb-3">Về chúng tôi</h2>
          <p className="text-muted">
            Đây là website ecommerce được thiết kế cho Đồ án 
          </p>
          <p className="text-muted">
            Website sẽ chức các chức năng cơ bản của một trang web bán hàng <br/>
            Được viết bởi An lê
          </p>
          <button className="btn btn-primary mt-3">Tìm hiểu thêm</button>
        </div>
      </div>
    </div>
  );
};

export default About; 
