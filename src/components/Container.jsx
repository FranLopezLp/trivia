import PropTypes from "prop-types";

export default function Container({ children }) {
    return (
        <div className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-center">
            {children}
        </div>
    );
}

Container.PropTypes = {
    children: PropTypes.node
}