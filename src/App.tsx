import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
export interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, ms: 0 });
  const [isActive, setIsActive] = useState(false);
  const intervalRef: MutableRefObject<number> | MutableRefObject<undefined> =
    useRef();
  const convertToTwoDigitString = (num: number) =>
    num.toString().length > 1 ? num.toString() : "0" + num.toString();
  const incrimentTime = () => {
    setTime((time) => {
      return {
        hr: time.min === 59 ? time.hr + 1 : time.hr,
        min: time.sec === 59 ? (time.min === 59 ? 0 : time.min + 1) : time.min,
        sec: time.ms === 100 ? (time.sec === 59 ? 0 : time.sec + 1) : time.sec,
        ms: time.ms === 100 ? 0 : time.ms + 1,
      };
    });
    console.log(time);
    setIsActive(true);
  };

  const resetTime = () => {};

  return (
    <div className="bg-gray-800 w-screen h-screen text-gray-200 flex justify-center items-center flex-col transition-all ">
      <div className=" bg-gray-600 rounded-3xl h-fit flex flex-col transition-all">
        <div className="p-16 m-5 bg-gray-800 rounded-3xl text-9xl font-black transition-all">
          <h1 className="text-center">
            {time.hr === 0 ? "" : convertToTwoDigitString(time.hr) + ":"}
            {convertToTwoDigitString(time.min)}:
            {convertToTwoDigitString(time.sec)}
          </h1>
        </div>
        <div className="flex justify-center items-center m-5 transition-all gap-5">
          <button
            className="btn"
            onClick={() => {
              if (isActive) {
                clearInterval(intervalRef.current);
                setIsActive(false);
              } else {
                intervalRef.current = setInterval(() => {
                  incrimentTime();
                });
              }
            }}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button className="btn">Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
