import { useState, useEffect } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { EquipmentCard, RecipeCard } from "../cards";

const PageIndicator = ({ pages, current, prev, next }) => {
  const prevPage = current <= 1 ? false : current - 1;
  const nextPage = current === pages ? false : current + 1;
  return (
    <div className="mt-10 flex gap-2 justify-center items-center text-black text-lg font-bold">
      {prevPage && (
        <>
          <MdNavigateBefore
            className="text-2xl cursor-pointer"
            onClick={prev}
          />
          <span className="py-2 px-4">{prevPage}</span>
        </>
      )}
      <span className="bg-yellow text-black py-2 px-4 rounded-full">
        {current}
      </span>
      {nextPage && (
        <>
          <span className="py-2 px-4">{nextPage}</span>
          <MdNavigateNext className="text-2xl cursor-pointer" onClick={next} />
        </>
      )}
    </div>
  );
};


const Pagination = ({auto, items, cols, smCols, perPage, type='recipe', cookbook=false})=>{
    const [pageItems, setPageItems] = useState([]);
    const [pages, setPages] = useState(1);
    const [current, setCurrent] = useState(1);
    const prevPage = () => {
      if (current > 1) {
        setCurrent(current - 1);
      }
    };
    const nextPage = () => {
      if (current < pages) {
        setCurrent(current + 1);
      }
    };
    useEffect(()=>{
      setPageItems(items);
      if(items.length%perPage===0){
        setPages(items.length/perPage);
      } else{
        setPages((items.length + (perPage - (items.length % perPage))) / perPage);
      }
    }, [current, items, perPage])
    return (
        <div className='text-center'>
          <div className={`mt-4 grid ${auto?"auto-cols-auto":`grid-cols-${smCols??1} lg:grid-cols-${cols??2}`} gap-4 md:gap-8`}>
            {pageItems.slice((current-1)*perPage, current*perPage).map((item, key) => {
              if(type==='recipe'){
                return <RecipeCard recipe={item} key={key} isDraft={item?.status === 2} cookbook={cookbook}/>
              }
              else{
                return <EquipmentCard equipment={item} key={key} />
              }
            })}
          </div>
          {items.length>perPage
          ? <PageIndicator pages={pages} current={current} prev={prevPage} next={nextPage}/>
          :""}
        </div>
    );
}

export default Pagination;