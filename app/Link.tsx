'use client';

import { MouseEvent } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

function isModifiedEvent(event: MouseEvent) {
  const eventTarget = event.currentTarget;
  const target = eventTarget.getAttribute('target');
  return (
    (target && target !== '_self') ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button === 1
  );
}

type CustomLinkProps = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  href: string;
  target?: string;
};

const Link = ({ className, children, style, href, target, ...rest }: CustomLinkProps) => {
  const router = useRouter();

  if (!target && !href.startsWith('/')) {
    target = '_blank';
  }
  return (
    <NextLink
      {...rest}
      target={target}
      href={href}
      onClick={e => {
        if (!isModifiedEvent(e)) {
          e.preventDefault();

          router.push(e.currentTarget.href);
        }
      }}
      className={className}
    >
      {children}
    </NextLink>
  );
};

export default Link;
