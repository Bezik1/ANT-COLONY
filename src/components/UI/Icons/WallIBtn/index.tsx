import "./index.css"

export const WallBtn = ({ className, onClick } : { className?: string | boolean, onClick?: () => void }) =>(
    <svg
        className={`small-btn btn ${className}`}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>
)