import { type ComponentPropsWithoutRef } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  href?: never;
};

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
  href?: string;
};

// type predicate
function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return 'href' in props;
}

function Button(props: ButtonProps | AnchorProps) {
  if (isAnchorProps(props)) {
    return <a className='button' {...props}></a>;
  }
  return <button className='button' {...props}></button>;
}

export default Button;
