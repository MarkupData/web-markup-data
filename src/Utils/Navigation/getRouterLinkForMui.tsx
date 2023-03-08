import React, {forwardRef} from 'react';
import {Link, LinkProps} from 'react-router-dom';

export default function getRouterLinkForMui(linkProps: LinkProps) {
	// eslint-disable-next-line react/display-name
	return forwardRef<HTMLAnchorElement>((props, ref) => (
		<Link {...props} {...linkProps} role={undefined} ref={ref} />
	));
}
