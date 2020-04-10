import React from 'react';
import Particles from 'react-particles-js';
import './ParticlesComp.css'

class ParticlesComp extends React.Component{

    render(){
        return (
            <Particles className='particules'
              params={{
            		particles: {
                        number: {
                            value:100,
                            density: {
                                enable: true,
                                value_area: 500
                            }
                        },
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
                    },
                    interactivity: {
                        events: {
                            onhover: {
                                enable: true,
                                mode: "repulse"
                            }
                        }
                    }
                }
                }
            />
        );
    };

}
export default ParticlesComp
