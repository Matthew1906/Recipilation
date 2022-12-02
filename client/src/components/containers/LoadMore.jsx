import Button from "../utils/Button";

const LoadMore = ({ id, title, children, className, cols }) => {
  return (
    <section className={className} id={id}>
      {title?(<h5 className="font-nunito font-bold text-xl mb-4 md:mb-0">{title}</h5>):""}
      <div
        className={`mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
          cols ? cols : 2
        } gap-8`}
      >
        {children}
      </div>
      <div className="text-center">
        <Button theme="orange" className="mt-4 text-xl" expand={true}>
          Load More
        </Button>
      </div>
    </section>
  );
};

export default LoadMore;
