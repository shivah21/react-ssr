import fetch from "isomorphic-fetch";
import {
    storeData,
    storeFilters
} from './store';
const normalizeMissionData = missions => {
    return Array.isArray(missions) ? missions.map(mission => {
        return {
            name: mission.mission_name,
            flightNumber: mission.flight_number,
            missionIds: mission.mission_id,
            launchYear: mission.launch_year,
            successfulLaunch: `${mission.launch_success}`,
            successfulLanding: `${mission.rocket.first_stage.cores[0].land_success || false}`,
            thumbnail: mission.links.mission_patch_small || mission.links.mission_patch
        }
    }) : [];
}

export function fetchMissions(obj) {
    const serializedParams = new URLSearchParams(obj).toString();
    return fetch( `https://api.spacexdata.com/v3/launches?limit=100&${serializedParams}` )
        .then( res => res.json() )
        .then( res => normalizeMissionData(res) );
}

export const fetchData = () => (dispatch) =>
    fetchMissions().then(res => {
        const filters = res.reduce((acc, cur) => {
            if(acc.indexOf(cur.launchYear) == -1) {acc.push(cur.launchYear)} return acc;
        }, []);
        dispatch(storeData(res));
        dispatch(storeFilters(filters))
    });

export const applyFilter = filter => (dispatch) => {
    fetchMissions(filter).then(res => {
        dispatch(storeData(res));
    });
}