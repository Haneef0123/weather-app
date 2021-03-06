import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forcast from "./components/Forcast";
import Loader from "./components/Loader";
import getFormattedWeatherData from "./services/WeatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      const message = query.q ? query.q : "current location";
      toast.info("Fetching weather for " + message);
      try {
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.success(
            `Successfully fetched weather for ${data.name}, ${data.country}`
          );
          setWeather(data);
          setLoading(false);
        });
      } catch (e) {
        toast.warn("Please check the input values");
        console.log(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md py-5 px-4 sm:px-32 grad bg-gradient-to-br ${formatBackground()} shadow-gray-400`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && !loading ? (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forcast title={"Hourly Forcast"} items={weather.hourly} />
          <Forcast title={"Daily Forcast"} items={weather.daily} />
        </div>
      ) : (
        <div className=" h-screen max-w-screen mx-auto flex items-center justify-center">
          <Loader />
        </div>
      )}

      <div className=" hidden sm:block">
        <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
      </div>
    </div>
  );
}

export default App;
