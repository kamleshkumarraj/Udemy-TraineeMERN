import { BsCart3 } from "react-icons/bs";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { TbGardenCartOff } from "react-icons/tb";
import { VscHeart } from "react-icons/vsc";
import { Link } from "react-router-dom";
import {
  useAddCartItemMutation,
  useRemoveCartItemMutation,
} from "../../api/cart.api";
import { useMutation } from "../../hooks/useMutation.hooks";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slice/auth.slice";
import { getProductToCartMap } from "../../store/slice/misc.slice";

function Pair_3({ item, bgColor }) {
  const { executeMutate: addToCartFn } = useMutation(useAddCartItemMutation);
  const { executeMutate: removeToCartFn } = useMutation(
    useRemoveCartItemMutation
  );
  const authData = useSelector(getAuth);
  const cartToProductMap = useSelector(getProductToCartMap);

  const addToCart = (payload) => {
      addToCartFn({
        args: payload,
        toastMessage: "Adding to cart...",
      });
    
  };

  const removeToCart = (payload) => {
    console.log("remove to cart running...", payload);
      removeToCartFn({
        args: payload,
        toastMessage: "Removing from cart...",
      });
  };
  return (
    <div
      id="button"
      className="flex text-black 2xl:gap-[20px] gap-[10px] lg:ga-[15px] sm:gap-[12px]"
    >
      <div
        className={`2xl:p-[10px] md:p-[7px] p-[5px] text-center rounded-full ${bgColor} border hover:cursor-pointer text-black hover:bg-[#ff3f35fa] hover:text-white`}
      >
        {cartToProductMap.has(item._id) ? (
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
        {cartToProductMap.has(item?._id) ? (
          <p
            onClick={() => {
              console.log(cartToProductMap)
              removeToCart({ cartId: cartToProductMap.get(item?._id) });
            }}
            className={`p-[5px] 2xl:p-[10px] md:p-[7px] text-center rounded-full hover:cursor-pointer ${bgColor} border hover:bg-[#ff3f35fa] hover:text-white`}
          >
            <TbGardenCartOff size={20} />{" "}
          </p>
        ) : (
          <p
            onClick={() => {
              addToCart({
                productId: item?._id,
                userId: authData?.userId,
              });
            }}
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

export default Pair_3;
