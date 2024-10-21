import {Link} from "react-router-dom"

const Button = (props) => {
  return (
    <div className="flex justify-center pt-6">
      <button
        type={props.type}
        className="relative px-8 py-2 ml-4 text-xl overflow-hidden font-semibold rounded text-white hover:bg-darkPurple transition-all bg-purple"
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
