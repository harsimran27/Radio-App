import React from "react";
import "./audio.css";
import { useState, useEffect } from "react";
import defaultImage from "./radioImg.jpg";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Audio = () => {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");

  const setUpApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    // query stations by language code and limit to first 30 stations
    const stations = await api
      .searchStations({
        language: "english",
        limit: 30,
        tag: stationFilter,
      })
      .then((data) => {
        return data;
      });
    console.log(stations);
    return stations;
  };

  useEffect(() => {
    setUpApi(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];
  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter) => (
          <span
            className={stationFilter === filter ? "selected" : "notSeleted"}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
        <div className="stations">
          {stations &&
            stations.map((station, index) => {
              return (
                <div className="station" key={index}>
                  <div className="stationName">
                    <img
                      className="logo"
                      src={station.favicon}
                      alt="station"
                      onError={setDefaultSrc}
                    />
                    <div className="songName">{station.name}</div>
                  </div>
                  <AudioPlayer
                    className="player"
                    src={station.urlResolved}
                    showJumpControls={false}
                    layout="stacked"
                    customProgressBarSection={[]}
                    customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                    autoPLayAfterSrcChange={false}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Audio;
