import React from 'react';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function Rating({ rating, numReviews, right}) {
   
    return (
      <div style={{color:"#E2CE06"}}>
        <span>
            {
              rating == 0
                ? <div>
                  <p>Not yet Rated</p>
                  {right === true 
                      ? <span style={{color:'blue',right:'20px',bottom:'20px', position:'absolute', fontWeight:'bold'}}> No reviews</span>
                      : <div style={{marginTop:'6px'}}><span style={{color:'blue',fontWeight:'bold'}}>No reviews</span></div>
                  }</div>
                : <>
                      <span>
                      {
                        rating >= 1
                          ? <StarIcon></StarIcon>
                          : rating >= 0.5
                          ? <StarHalfIcon></StarHalfIcon>
                          : <StarBorderIcon></StarBorderIcon>
                      }
                  </span>
                  <span>
                  {
                        rating >= 2
                          ? <StarIcon></StarIcon>
                          : rating >= 1.5
                          ? <StarHalfIcon></StarHalfIcon>
                          : <StarBorderIcon></StarBorderIcon>
                      }
                  </span>
                  <span>
                  {
                        rating >= 3
                          ? <StarIcon></StarIcon>
                          : rating >= 2.5
                          ? <StarHalfIcon></StarHalfIcon>
                          : <StarBorderIcon></StarBorderIcon>
                      }
                  </span>
                  <span>
                  {
                        rating >= 4
                          ? <StarIcon></StarIcon>
                          : rating >= 3.5
                          ? <StarHalfIcon></StarHalfIcon>
                          : <StarBorderIcon></StarBorderIcon>
                      }
                  </span>
                  <span>
                  {
                        rating >= 5
                          ? <StarIcon></StarIcon>
                          : rating >= 4.5
                          ? <StarHalfIcon></StarHalfIcon>
                          : <StarBorderIcon></StarBorderIcon>
                      }
                  </span>
                      {
                      right === true 
                      ? <span style={{color:'blue',right:'20px', position:'absolute', fontWeight:'bold'}}> {numReviews} reviews</span>
                      : <div style={{marginTop:'6px'}}><span style={{color:'blue',fontWeight:'bold'}}>{numReviews} reviews</span></div>
                      }
                </>
            }
        </span>
        
            
        
      </div>
    );
  }