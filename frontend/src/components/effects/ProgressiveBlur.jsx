/**
 * ProgressiveBlur — renders a gradient mask overlay that fades the edge of content.
 */
const ProgressiveBlur = ({
    direction = 'bottom',
    intensity = 1,
    height = '8rem',
    width = '8rem',
    className = '',
    style = {},
}) => {
    const directionStyles = {
        bottom: {
            bottom: 0,
            left: 0,
            right: 0,
            height,
            background: `linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)`,
        },
        top: {
            top: 0,
            left: 0,
            right: 0,
            height,
            background: `linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)`,
        },
        left: {
            top: 0,
            bottom: 0,
            left: 0,
            width,
            background: `linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)`,
        },
        right: {
            top: 0,
            bottom: 0,
            right: 0,
            width,
            background: `linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)`,
        },
    };

    return (
        <div
            className={className}
            style={{
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 10,
                opacity: intensity,
                ...directionStyles[direction],
                ...style,
            }}
            aria-hidden="true"
        />
    );
};

export default ProgressiveBlur;
