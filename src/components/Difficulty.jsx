import PropTypes from "prop-types";
export default function Difficulty({ difficulties, setSelectDifficulty }) {

    if (!difficulties?.length) return "Loading difficulties...";

    return (
        <>
        <div className="row">
            <div className="col-12">
                <div className="list-group" id="list-tab" role="tablist">                
                    {difficulties.map((difficulty, index) => (
                        <a className="list-group-item list-group-item-action" key={index} id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile" onClick={(e) => {
                            e.preventDefault();
                            setSelectDifficulty(difficulty)
                        }}>{difficulty}</a>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
}

Difficulty.propTypes = {
    difficulties: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    setSelectDifficulty: PropTypes.func.isRequired,
};