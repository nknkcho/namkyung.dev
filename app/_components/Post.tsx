import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

const Post = ({ code }: { code: string }) => {
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default Post;
