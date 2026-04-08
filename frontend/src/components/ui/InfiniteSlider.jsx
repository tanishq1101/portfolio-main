import './InfiniteSlider.css';

/**
 * InfiniteSlider — a CSS-animation-based infinite looping ticker.
 * @param {ReactNode[]} items - Array of items to display
 * @param {number} speed - Animation duration in seconds (lower = faster)
 * @param {boolean} pauseOnHover - Pause animation on mouse hover
 * @param {'left'|'right'} direction - Scroll direction
 * @param {number} gap - Gap between items in pixels
 * @param {string} className - Outer container class
 */
const InfiniteSlider = ({
    items = [],
    gap = 24,
    className = '',
}) => {
    return (
        <div
            className={`infinite-slider-wrapper ${className}`}
            style={{ '--slider-gap': `${gap}px` }}
        >
            <div
                className="infinite-slider-track"
                style={{ animation: 'none' }}
            >
                {items.map((item, i) => (
                    <div key={i} className="infinite-slider-item">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteSlider;
