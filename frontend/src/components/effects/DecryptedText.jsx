/**
 * DecryptedText — static text renderer.
 * Animation-related props are intentionally ignored.
 */
const DecryptedText = ({
    text = '',
    className = '',
    revealedClassName = 'decrypted-revealed',
}) => {
    return (
        <span className={className} aria-label={text}>
            <span aria-hidden="true">
                {String(text).split('').map((char, i) => (
                    <span key={i} className={revealedClassName}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </span>
        </span>
    );
};

export default DecryptedText;
