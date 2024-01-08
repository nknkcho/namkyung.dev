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
    <div>
      {posts.map(post => (
        <Link key={post.slug} href={`/${post.slug}`} className={'block py-3'}>
          <article>
            <h2 className={'text-lg'}>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.spoiler}</p>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default Home;
