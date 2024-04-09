import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
    const { toggle, theme } = useContext(ThemeContext);

    return (
        <div>
            <label className="switch">
                <input type="checkbox" onClick={toggle} checked={theme === 'dark' ? true : false} />
                <span class="slider" />
            </label>
        </div >
    );
};

export default ThemeToggle;