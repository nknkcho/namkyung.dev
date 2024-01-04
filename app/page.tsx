import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>
        <Link href="">@nkakmk</Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <Link href="/tags">tags</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
