import { useState } from "react";
import "./App.css";

const colors = ["#ffadad", "#ffd6a5", "#caffbf", "#9bf6ff", "#bdb2ff"];

function App() {
    const [colorIndex, setColorIndex] = useState(0);

    const changeBackground = () => {
        setColorIndex((prevIndex) => (prevIndex + 1) % colors.length); // rotate around can add more colors and will work
    };

    return (
        <div
            className="App"
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors[colorIndex],
                transition: "background-color 0.5s ease",
            }} // Can't us useState in css needs to be in return
        >
            <button onClick={changeBackground}>Change Background Color</button>
        </div>
    );
}

export default App;
