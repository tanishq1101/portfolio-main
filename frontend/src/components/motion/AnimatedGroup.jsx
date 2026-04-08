import { createElement } from 'react';

/**
 * AnimatedGroup — static wrapper.
 * Animation-related props are intentionally ignored.
 */
const AnimatedGroup = ({
    children,
    className = '',
    as: Component = 'div',
}) => {
    const childArray = Array.isArray(children) ? children : [children];

    const wrappedChildren = childArray.map((child, i) => (
        <div key={i} style={{ display: 'contents' }}>
            {child}
        </div>
    ));

    return createElement(Component, { className }, wrappedChildren);
};

export default AnimatedGroup;
