import "./index.css"

export const HallwayBtn = ({ className, onClick } : { className?: string | boolean, onClick?: () => void }) =>(
    <svg
        className={`small-btn btn ${className}`}
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path d="M14 10L12 11M12 11L10 10M12 11V13.5M20 7L18 8M20 7L18 6M20 7V9.5M14 4L12 3L10 4M4 7L6 6M4 7L6 8M4 7V9.5M12 21L10 20M12 21L14 20M12 21V18.5M6 18L4 17V14.5M18 18L20 17V14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)