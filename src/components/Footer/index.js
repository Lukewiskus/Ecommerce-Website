import React from 'react';
import "./styles.scss"
import { Link } from 'react-router-dom';
const Footer = props => {
    return (
        <div className="footer">
            <table className="table">
                <tbody>
                    <tr>
                        <td className="copyRights">
                            @ 2020 Ben Mercil
                        </td>
                        <td className="interested">
                            Interested in something Custom?
                        </td>
                        <td className="contactMeFooter">
                            <Link to="/contact">
                                Contact me
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  );
    }

export default Footer;