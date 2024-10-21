const Card = (props) => {
  return (
    <div>
      <div
        onClick={props.onClick}
        className="max-w-sm p-4 cursor-pointer shadow-md m-7 bg-transparent border border-gray-500   dark:text-gray-800"
      >
        <div className="pb-4 border-bottom">
          <div className="">
            <h1
              rel="noopener noreferrer"
              href="#"
              className="mb-0 capitalize text-lightWhite text-2xl text-center w-full"
            >
              {props.title}
            </h1>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <img
              src={props.imgSrc}
              alt=""
              className="block object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
            />
            <div className="flex items-center text-xs"></div>
          </div>
          <div className="space-y-2">
            <a rel="noopener noreferrer" href="#" className="block">
              <h3 className="text-xl font-semibold text-lightWhite">
                {props.shortDescription}
              </h3>
            </a>
            <p className="leading-snug text-gray-400">{props.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
