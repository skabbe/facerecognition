import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma' >
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl}
                    width='500px' height='auto'></img>
                {
                    box.map(obj => {
                        return (
                            <div key={`box${obj.topRow}${obj.rightCol}`}
                                className='bounding-box'
                                style={{
                                    top: obj.topRow,
                                    right: obj.rightCol,
                                    bottom: obj.bottomRow,
                                    left: obj.leftCol
                                }}>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
}

export default FaceRecognition
