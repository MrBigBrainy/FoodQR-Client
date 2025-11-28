//โชว์menu ทั้งหมด

import MenuCard from "./MenuCard";

const MenuList = ({ items }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items?.map((food) => (
        <MenuCard
          key={food.id}
          id={food.id}
          name={food.name}
          price={food.netPrice}
          ImageUrl={food.imageUrl}
        />
      ))}
    </div>
  );
};

export default MenuList;
