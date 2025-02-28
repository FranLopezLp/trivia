import PropTypes from "prop-types";

export default function Category({ categories, setSelectCategory }) {
    if (!categories.length) return "Loading categories...";

    return (
        <div>
            <select
                id="categorySelect"
                className="form-select"
                onChange={(e) => {
                    const selectedCategory = categories.find(category => category.name === e.target.value);
                    setSelectCategory(selectedCategory);
                }}
            >
                <option value="">Categories</option>
                {categories.map((category, index) => (                    
                    <option key={index} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

Category.propTypes = {
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    setSelectCategory: PropTypes.func.isRequired,
};
