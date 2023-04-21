import React, { createRef, useEffect, useRef, useState } from 'react';
import {Map, Marker, NavigationControl, InfoWindow, Autocomplete} from 'react-bmap';
import styled from 'styled-components';

const BMap = ({addSearchList}) => {
    const [lngValue, setLngValue] = useState(116.404449);
    const [latValue, setLatValue] = useState(39.914889);

    const loadMap = (position = {coords: {latitude: 39.914889, longitude: 116.404449}}) => {
        const { latitude } = position.coords;
        const { longitude } = position.coords;
        setLatValue(latitude);
        setLngValue(longitude);
    }
    const init = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                loadMap,
                function () {
                alert('Could not get your position');
                }
            );
        }
    }

    useEffect(() => {
        console.clear();
        init();
    }, [])

    return (
        <Wrapper id="container">
            <div className='input-location'>
                <Autocomplete
                    input="ac"
                    onConfirm={e => {addSearchList(e.item.value.business)}}
                    onSearchComplete={e => {addSearchList(e.item.value.business)}}
                />
            </div>
            <Map center={{lng: lngValue, lat: latValue}} zoom="11">
                <Marker position={{lng: lngValue, lat: lngValue}} /> 
                <NavigationControl /> 
            </Map>
        </Wrapper>
    )
};

const Wrapper = styled.section`
    .input-location {
        text-align: center;
        margin-bottom: .5rem;
    }
    .input-location input {
        width: 90%;
        outline: none;
        border: none;
        height: 2.5rem;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 0px 4px;
        font-size: 15px;
    }
`;

export default BMap;