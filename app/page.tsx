import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import Link from 'next/link';

type PostData = {
  slug: string;
  [p: string]: string;
};

const getPosts = async (): Promise<PostData[]> => {
  const entries = await readdir('./public/', { withFileTypes: true });
  const dirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
  const fileContents = await Promise.all(
    dirs.map(dir => readFile(`./public/${dir}/index.md`, 'utf-8'))
  );
  const posts: PostData[] = dirs.map((slug, i) => {
    const fileContent = fileContents[i];
    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    };
  });

  posts.sort((a, b) => {
    return Date.parse(a.date) < Date.parse(b.date) ? 1 : -1;
  });

  return posts;
};
const Home = async () => {
  const posts = await getPosts();

  return (
    <>
      {posts.map(post => (
        <Link key={post.slug} href={`/${post.slug}`} className={'block pt-3 pb-5 relative group'}>
          <article>
            <h2 className="text-[28px] font-black">{post.title}</h2>
            <p className="mt-1 dark:text-[#94a1b2]">
              {new Date(post.date).toLocaleDateString('ko-KR')}
            </p>
            <p className="mt-1 dark:text-[#94a1b2]">{post.spoiler}</p>
          </article>
        </Link>
      ))}
    </>
  );
};

export default Home;
