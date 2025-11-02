import PropTypes from "prop-types";
import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { TbGardenCartOff } from "react-icons/tb";
import { VscHeart } from "react-icons/vsc";
import { Link } from "react-router-dom";

function Pair_3({ item, bgColor }) {
  const checkAvailibility = true;
  const wishlist = [];
  const cartlist = [];

  return (
    <div
      id="button"
      className="flex text-black 2xl:gap-[20px] gap-[10px] lg:ga-[15px] sm:gap-[12px]"
    >
      <div
        className={`2xl:p-[10px] md:p-[7px] p-[5px] text-center rounded-full ${bgColor} border hover:cursor-pointer text-black hover:bg-[#ff3f35fa] hover:text-white`}
      >
        {checkAvailibility(wishlist, item) ? (
          <p className="text-[red] hover:text-white" onClick={() => {}}>
            <FaHeart size={20} />
          </p>
        ) : (
          <p onClick={() => {}}>
            <VscHeart size={20} />
          </p>
        )}{" "}
      </div>

      <div id="cart-button">
        {checkAvailibility(cartlist, item) ? (
          <p
            onClick={() => {}}
            className={`p-[5px] 2xl:p-[10px] md:p-[7px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
          >
            <TbGardenCartOff size={20} />{" "}
          </p>
        ) : (
          <p
            onClick={() => {}}
            className={`p-[5px] 2xl:p-[10px] md:p-[7px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
          >
            <BsCart3 size={20} />{" "}
          </p>
        )}
      </div>

      <Link
        onClick={() => {}}
        className={`2xl:p-[10px] md:p-[7px] p-[5px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
      >
        <FaRegEye size={20} />{" "}
      </Link>
    </div>
  );
}
Pair_3.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  bgColor: PropTypes.string.isRequired,
};
export default Pair_3;
