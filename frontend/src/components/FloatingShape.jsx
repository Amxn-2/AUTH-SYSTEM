import { motion } from "framer-motion";
import PropTypes from "prop-types"; // Import PropTypes

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}
      aria-hidden="true"
    />
  );
};

// Define prop types
FloatingShape.propTypes = {
  color: PropTypes.string.isRequired, // color should be a string representing a CSS class
  size: PropTypes.string.isRequired,  // size should be a string representing a CSS class
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // top can be a string or number
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // left can be a string or number
  delay: PropTypes.number.isRequired, // delay should be a number
};

export default FloatingShape;
