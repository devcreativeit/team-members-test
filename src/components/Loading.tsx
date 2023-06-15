import { Circles } from "react-loader-spinner";

const Loading = () => (
  <Circles
    height="50"
    width="50"
    color="#000"
    ariaLabel="circles-loading"
    wrapperClass="loading"
    visible={true}
  />
);
export default Loading;
