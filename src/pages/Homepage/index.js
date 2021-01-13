import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Ben from './../../assets/benFace.jpg';
import Carousel from 'react-elastic-carousel';
import logo from "./logo.png"
import Image1 from "./images/AldenWallet.jpg"
import Image2 from "./images/Kuzi.jpg";
import Image3 from "./images/OtherWallet.jpg";
import Image4 from "./images/ToteBag.jpg";
import Image5 from "./images/Wallet3.jpg";
import './styles.scss';

const home = props => {
    const state = {
        items: [
          {id: 1, title: logo},
          {id: 2, title: Image1},
          {id: 3, title: Image2},
          {id: 4, title: Image3},
          {id: 5, title: Image4},
          {id: 5, title: Image5}
        ]
      }
    return (
        <div className="homepageWrapper">
            <table border="0" cellPadding="10" cellSpacing="10">
                <tbody>
                    <tr className="row1">
                        <td className="imageOfBen">
                            <img className="profileImage"src={Ben} />
                            <p>
                            These are placeholder words for the homepage description. These are placeholder words for the homepage description.
                            These are placeholder words for the homepage description. These are placeholder words for the homepage description.
                            These are placeholder words for the homepage description. These are placeholder words for the homepage description.
                            These are placeholder words for the homepage description. These are placeholder words for the homepage description.
                            These are placeholder words for the homepage description. These are placeholder words for the homepage description.
                            </p>
                        </td>
                    </tr>
                    <tr className="row2">
                    <div className="carouselWrapper">
                    <Carousel className="carousel">
                        {state.items.map(item => 
                        <div key={item.id}>
                            <img className="carouselImage"src={item.title} />
                        </div>)}
                    </Carousel>
                    </div>
                    </tr>
                    <tr className="row3">
                    <div className="contactMe">
                        <ul>
                            <li>
                                <h1>
                                    Interested In Something Custom? Contact Me At
                                </h1>
                            </li>
                            <li>
                                555-555-5555
                            </li>
                            <li>
                                exampleEmail@email.com
                            </li>
                            <li>
                                Instagram, Facebook, ect..
                            </li>
                        </ul>
                    </div>
                    </tr>
                </tbody>
            </table>
            
        </div>

    )
}
export default home;