import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from '../../Link';

import './markdown.css';

const Post = ({ code }: { code: string }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="markdown mt-10">
      <Component components={{ a: Link as React.FC }} />
    </div>
  );
};

export default Post;
