import React from "react";
import { connect } from "react-redux";
import { fetchData, applyFilter } from "../redux/api";

class Home extends React.Component {
    componentDidMount() {
        if (this.props.missions.length <= 0) {
            this.props.fetchData();
        }
    }

    render() {
        const { missions, filters, applyFilter } = this.props;
        return (
            <div className="wrapper">
                <Filters
                    launchYear={filters}
                    applyFilter={applyFilter}
                />
                <div className={'container'}>
                    <ul className={'missionList'}>
                        {missions.map((mission, i) => (
                            <li key={i} className={'missionContainer'}>
                                <div className="thumbnail">
                                    <img src={mission.thumbnail} />
                                </div>
                                <p>
                                    <a href="javascript:void(0)">
                                        {mission.name} #{mission.flightNumber}
                                    </a>
                                </p>
                                <p><strong>Mission Ids:</strong>
                                    <ul>
                                        {mission.missionIds.map((mId, j) => (
                                            <li key={j}>{mId}</li>
                                        ))}
                                    </ul>
                                </p>
                                <p><strong>Launch Year:</strong> {mission.launchYear}</p>
                                <p><strong>Successful Launch:</strong> {mission.successfulLaunch}</p>
                                <p><strong>Successful Landing:</strong> {mission.successfulLanding}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

const Filters = ({
    launchYear = [],
    applyFilter
}) => {
    return (
        <div className="filters">
            <h2>Filters</h2>
            <div className={'filterContainer'}>
                <h3>Launch year</h3>
                <ul>
                    {launchYear.map((year, i) => (
                        <li key={i}>
                            <button 
                                onClick={() => {
                                    applyFilter({ 'launch_year': year })
                                }}
                            >{year}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={'filterContainer'}>
                <h3>Successful Launch</h3>
                <ul>
                    <li>
                        <button onClick={() => 
                                applyFilter({ 'launch_success': true })
                            }>True</button>
                    </li>
                    <li>
                        <button onClick={() => 
                                applyFilter({ 'launch_success': false })
                            }>False</button>
                    </li>
                </ul>
            </div>
            <div className={'filterContainer'}>
                <h3>Successful Landing</h3>
                <ul>
                    <li>
                        <button onClick={() => 
                                applyFilter({ 'land_success': true })
                            }>True</button>
                    </li>
                    <li>
                        <button onClick={() => 
                                applyFilter({ 'land_success': false })
                            }>False</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

Home.serverFetch = fetchData; // static declaration of data requirements

const mapStateToProps = (state) => ({
    missions: state.missions,
    filters: state.filters
});

const mapDispatchToProps = {
    fetchData,
    applyFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
