import React from 'react'

export const AboutUsVideoOne = () => {
  return (
    <>
      <section className="video-one">
        <div
          className="video-one__bg"
          style={{ backgroundImage: "url(/assets/images/background/banner10.jpg)" }}
        ></div>

        <div className="container text-center">
          <a href="https://www.youtube.com/watch?v=7rQe_Q4FkaY" className="video-popup">
            <i className="fa fa-play"></i>
          </a>  

          <h3>
          Bajo cada roca, junto a cada  <br /> arrecife, un nuevo descubrimiento <span>te espera</span>
          </h3>
        </div>
      </section>

      <div>about-us-video-one</div>
    </>
  );
};
