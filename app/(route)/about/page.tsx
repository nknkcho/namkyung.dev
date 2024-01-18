import Link from 'next/link';

const About = () => {
  return (
    <>
      <h2 className="text-[28px] font-black">Namkyung Cho</h2>
      <p className="mt-2">프론트엔드 개발자 조남경의 개발 블로그입니다.</p>
      <div className="mt-2 text-[--link] hover:text-violet-600 hover:underline hover:underline-offset-4 w-fit">
        <Link href="https://github.com/nknkcho" rel="noopener noreferrer" target="_blank">
          GitHub
        </Link>
      </div>
    </>
  );
};

export default About;
