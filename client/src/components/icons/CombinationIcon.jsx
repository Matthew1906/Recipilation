import { CombinationImages } from "../utils";

const CombinationIcon = ({images, name, onClick, status})=>{
    return (
          <div className={`flex gap-2 justify-center items-center mx-4 mb-4 ${onClick?"cursor-pointer":""} ${status?"p-2 border-2 border-light-red rounded-md":""}`} onClick={onClick??null}>
            <CombinationImages
              images={images}
              name={name}
              round
              className="w-20 h-20"
            />
            <h6 className="ml-1 font-fjalla-one font-semibold text-xl md:text-3xl">
              {name}
            </h6>
          </div>
      );
}

export default CombinationIcon