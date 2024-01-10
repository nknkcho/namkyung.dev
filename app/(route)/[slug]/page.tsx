import React from 'react';
import path from 'path';
import { readdir, readFile } from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import remarkMdxImages from 'remark-mdx-images';

import Post from '../../_components/Post';
import '../../_components/markdown.css';

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const POSTS_PATH = path.join(process.cwd(), `/public/${decodeURIComponent(slug)}`);

  const fileName = `${POSTS_PATH}/index.md`;
  const file = await readFile(fileName, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source: file,
    cwd: POSTS_PATH,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm, remarkMdxImages];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrettyCode];

      return options;
    },
    esbuildOptions: options => {
      options.loader = {
        ...options.loader,
        '.jpg': 'dataurl',
      };

      return options;
    },
  });

  return (
    <article>
      <h1 className={'text-lg'}>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <Post code={code} />
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
