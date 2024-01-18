import React from 'react';
import path from 'path';
import { readdir, readFile } from 'fs/promises';
import { bundleMDX } from 'mdx-bundler';
import remarkGfm from 'remark-gfm';
import remarkMdxImages from 'remark-mdx-images';
import rehypePrism from 'rehype-prism-plus';

import Post from '../../_components/Post/Post';
import '../../_components/Post/markdown.css';

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
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];

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
      <h1 className="text-[40px] font-black">{frontmatter.title}</h1>
      <p className="mt-1 dark:text-[#94a1b2]">
        {new Date(frontmatter.date).toLocaleDateString('ko-KR')}
      </p>
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
