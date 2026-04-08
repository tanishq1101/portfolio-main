import { createElement } from 'react';

/**
 * TextEffect — static text renderer.
 * Animation-related props are intentionally ignored.
 */
const TextEffect = ({
    text = '',
    splitBy = 'words',
    className = '',
    segmentClassName = '',
    as: Component = 'span',
}) => {
    const segments = splitBy === 'chars'
        ? String(text).split('')
        : splitBy === 'words'
            ? String(text).split(' ')
            : [String(text)];

    const children = segments.map((seg, i) => (
        <span
            key={i}
            className={segmentClassName}
            style={{ whiteSpace: splitBy === 'chars' ? 'pre' : 'normal' }}
        >
            {seg}
            {splitBy === 'words' && i < segments.length - 1 ? '\u00A0' : ''}
        </span>
    ));

    return createElement(Component, { className, 'aria-label': String(text) }, children);
};

export default TextEffect;
