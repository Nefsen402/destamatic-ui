import h from './h';
import { Observer } from 'destam-dom';
import Shared from './Shared';

/**
 * Link component for navigation with optional styles and typography integration.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.href - The URL to navigate to when the link is clicked.
 * @param {boolean} [props.underline=true] - Whether to underline the link text.
 * @param {Function} [props.onClick] - Function to call when the link is clicked.
 * @param {JSX.Element | string} props.children - The content to be displayed inside the link component.
 * @param {Object} [props.style] - Custom styles to be applied to the link component.
 * @param {...Object} [props] - Additional properties to spread onto the anchor element.
 * 
 * @returns {JSX.Element} The rendered link component.
 */
const Link = ({
    href,
    underline = true,
    onClick,
    hover=Observer.mutable(false),
    clicked=Observer.mutable(false),
    children,
    style,
    ...props
}) => {
    if (!(hover instanceof Observer )) hover = Observer.mutable(hover);
    if (!(clicked instanceof Observer )) clicked = Observer.mutable(clicked);

    const handleHover = isHovered => () => hover.set(isHovered);
    const handleClick = (event) => {
        clicked.set(true);
        if (onClick) {
            onClick(event);
        }
    };

    return <a
        href={href}
        $onclick={handleClick}
        $onmouseenter={handleHover(true)}
        $onmouseleave={handleHover(false)}
        $style={{
            color: clicked.map(c => c
                ? Shared.Theme.Colours.primary.darker
                : Shared.Theme.Colours.primary.base
            ),
            textDecoration: underline ? hover.map(h => (h ? 'underline 2px' : 'none')) : 'none',
            cursor: 'pointer'
        }}
        {...props}
    >
        {children}
    </a>;
};

export default Link;
