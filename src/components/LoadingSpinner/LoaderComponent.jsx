import { DNA } from "react-loader-spinner";
import css from "./LoaderComponent.module.css";

const LoaderComponent = () => (
  <div className={css.loaderContainer}>
    <DNA
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  </div>
);

export default LoaderComponent;
