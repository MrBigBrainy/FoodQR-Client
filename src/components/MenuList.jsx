//โชว์menu ทั้งหมด

import MenuCard from "./MenuCard";

const MenuList = ({ items }) => {
  // Group items by category
  const groupedItems = items?.reduce((acc, item) => {
    const categoryName = item.category?.name || "อื่นๆ";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-8 p-4">
      {groupedItems &&
        Object.entries(groupedItems).map(([categoryName, categoryItems]) => (
          <div 
            key={categoryName} 
            id={`category-${categoryName}`}
            className="scroll-mt-40"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800 border-l-4 border-red-600 pl-3">
              {categoryName}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryItems.map((food) => (
                <MenuCard
                  key={food.id}
                  id={food.id}
                  name={food.name}
                  price={food.netPrice}
                  imageUrl={food.imageUrl}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default MenuList;
