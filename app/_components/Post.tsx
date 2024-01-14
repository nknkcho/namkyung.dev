import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

import './markdown.css';

const Post = ({ code }: { code: string }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div className="markdown mt-10">
      <Component />
    </div>
  );
};

export default Post;
