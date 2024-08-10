export const getCategoryClass = (category) => {
  switch (category) {
    case "HotTopic":
      return "bg-orange-500 text-white";
    case "Entertainment":
      return "bg-blue-500 text-white";
    case "Life Topic":
      return "bg-green-500 text-white";
    // Add more cases for other categories
    case "Political Topic":
      return "bg-red-500 text-white";
    case "Sports":
      return " !bg-green-500 text-white";
    case "Health":
      return "bg-purple-500 text-white";
    case "Finance":
      return "bg-orange-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};
