
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-indigo-500 text-white p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-4">About Weather Forecast App</h1>
        <p className="text-lg mb-6">
          The Weather Forecast App is a lightweight and user-friendly web application that allows users to search and view real-time weather information for any city worldwide.
          It provides detailed metrics including temperature, humidity, wind speed, and weather conditions such as rain or clear skies.
        </p>
        <p className="text-lg mb-6">
          The app also supports geolocation-based search so users can instantly see the weather forecast for their current location with just one click.
          Our goal is to deliver accurate and fast weather updates in a clean, responsive interface.
        </p>
        <p className="text-md text-indigo-100 italic">
          Built with ❤️ using React.js, Tailwind CSS, OpenWeatherMap API, and the Geolocation API.
        </p>
      </div>
    </div>
  );
};

export default About;
