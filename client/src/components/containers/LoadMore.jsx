import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../utils";

const LoadMore = ({ id, title, children, className, cols, items=4 }) => {
  const [numItems, setNumItems] = useState(items);
  const showMore = ()=>setNumItems(numItems+items);
  const showLess = ()=>setNumItems(items);
  return(
    <>    
    {children.length >0 && 
      <section className={className} id={id}>
        {children.length > 0 && title && (<h5 className="font-nunito font-bold text-xl md:text-2xl mb-4 md:mb-0">{title}</h5>)}
        <div className={`mt-4 grid grid-cols-1 lg:grid-cols-${cols ?? 2} gap-8`}>
          {children.slice(0, numItems)}
        </div>
        <div className="text-center">
          {numItems > items && 
          <a href={"#"+id}>
            <Button theme="red" className="mx-4 mt-4 md:text-xl" expand onClick={showLess}>
              Show Less
            </Button>
          </a>
          }
          {children.length > numItems &&
          <Button theme="orange" className="mt-4 md:text-xl" expand onClick={showMore}>
            Show More
          </Button>
          }
        </div>
        
      </section>
    }
  </>)
};

LoadMore.propTypes = {
  id: PropTypes.string, 
  title: PropTypes.string, 
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.bool]), 
  className: PropTypes.string, 
  cols: PropTypes.number, 
  items: PropTypes.number
}

export default LoadMore;
