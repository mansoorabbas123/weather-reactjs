import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import rainDrop from "../assets/images/rainDrop.png";

export default ({ forecast }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const dateFormat = (dt) => {
    // formate date
    var options = {
      // weekday: "long",
      // year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeStamp = new Date(dt * 1000);
    let d = timeStamp.toLocaleDateString("en-US", options);
    const numericPartOfDate = Number(d.split(" ")[1]);
    if (numericPartOfDate >= 1 && numericPartOfDate <= 3) {
      switch (numericPartOfDate) {
        case 1:
          return <h3>{d + "st"}</h3>;

        case 2:
          return <h3>{d + "nd"}</h3>;

        case 3:
          return <h3>{d + "rd"}</h3>;

        default:
          return <h3>{d}</h3>;
      }
    } else {
      return <h3>{d + "th"}</h3>;
    }
  };

  return (
    <>
      <Carousel responsive={responsive}>
        {forecast.map((el, idx) => (
          <div key={idx} className="slide-item">
            {dateFormat(el.dt)}
            <div>
              <h3>
                {Math.round(el.temp.day)}
                <span>&#8451;</span>
              </h3>
            </div>
            <div>
              <img src={rainDrop} style={{ width: "30px" }} />
              {el.pop * 100}%
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};
