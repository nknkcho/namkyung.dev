import React from 'react';
import { readdir, readFile } from 'fs/promises';
import Post from '../../_components/Post';
import { bundleMDX } from 'mdx-bundler';

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const fileName = `./public/${slug}/index.md`;
  const file = await readFile(fileName, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source: file,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? [])];

      return options;
    },
  });

  return (
    <article>
      <h1>{frontmatter.title}</h1>
      <div>
        <Post code={code} />
      </div>
    </article>
  );
};

export default PostPage;

const generateStaticParams = async () => {
  const entries = await readdir('./public/', { withFileTypes: true });
  const dirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);

  return dirs.map(dir => ({
    slug: dir,
  }));
};
