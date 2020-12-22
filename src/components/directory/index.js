import React from 'react';
import './styles.scss';
import Wallet from './../../assets/wallet-temp.png';
import guitarStraps from './../../assets/guitar-straps-temp.png';
import toteBags from './../../assets/tote-bags-temp.png';
import belts from './../../assets/belts-temp.png';
import other from './../../assets/other.png'
import contactMe from './../../assets/contact-me-temp.png'

const Directory = props =>{
        return(
            <div className="directory-wrapper">
            <div className="wrap">
                <div
                    className="items"
                    id="wallet"
                    style ={{backgroundImage: `url(${Wallet})`}}>
            
                </div>
                <div
                    className="items"
                    id="guitar-straps"
                    style ={{backgroundImage: `url(${guitarStraps})`}} > 
                
                </div>
                <div
                    className="items"
                    id="tote-bags" 
                    style ={{backgroundImage: `url(${toteBags})`}}>
            
                </div>
                <div
                    className="items"
                    id="belts" 
                    style ={{backgroundImage: `url(${belts})`}}>
                
                </div>
                <div
                    className="items"
                    id="other"
                    style ={{backgroundImage: `url(${other})`}} >
                    
                </div>
                <div
                    className="items"
                    id="contact-me" 
                    style ={{backgroundImage: `url(${contactMe})`}}>
                    
                </div>
            </div>
        </div> 
        );
}
            
export default Directory;
