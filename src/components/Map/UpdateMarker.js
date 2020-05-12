import React from 'react';
import { Marker} from 'google-maps-react';

const UpdateMarker = (props) => {
    return (
        <div>
            <Marker
                position={props.pick}
                name="Start"
                color="green"
                draggable={false}
                animation={props.animate}
            />
            <Marker
                position={props.drop}
                name="End"
                color="red"
                draggable={false}
                animation={props.animate}
            />
        </div>
    );
}

export default UpdateMarker;