import React from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Route, Switch, NavLink} from 'react-router-dom';
import { loadAllSpots } from '../../store/spots';
import SingleSpot from '../SingleSpot';
import './SpotsIndex.css'
import * as sessionActions from "../../store/session";


function SpotsIndex() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots.allSpots);
    dispatch(sessionActions.restoreUser());

    useEffect(()=>{
        dispatch(loadAllSpots());
    },[dispatch])
    if(!spotsObj) return null;
    const spots = Object.values(spotsObj);

    return (
        <div className='spots-index'>
            <nav>
               {spots.map((spot) => (
                <div className='spot'>
                    <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                        <img src={spot.previewImage} alt={spot.name} /> 
                        <div className='spoti'>
                            <div className = 'info'>
                              <h4> {spot.city}, {spot.state} </h4>
                              <h4> ${spot.price} night </h4>   
                            </div>
                            <div className='rating'>
                                {!spot.avgRating ? 
                                <h4> New </h4> : 
                                (<div className='ratingStar'>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <h4 className='spotRate'>{spot.avgRating}</h4>
                                </div>)}
                            </div>
                        </div>
                    </NavLink>     
                </div>
            ))} 
            </nav>
        </div>
    )
}

export default SpotsIndex;