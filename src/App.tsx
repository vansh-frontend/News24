import { useEffect, useState } from "react";
import { FaNewspaper, FaGithub, FaLinkedin } from "react-icons/fa";
import { AiOutlineLoading3Quarters, AiOutlineMail } from "react-icons/ai";

type RedditPost = {
  data: {
    id: string;
    title: string;
    selftext: string;
    permalink: string;
    author: string;
    thumbnail: string;
  };
};

const News = () => {
  const [redditArticles, setRedditArticles] = useState<RedditPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRedditTechNews = async () => {
    try {
      const response = await fetch(
        "https://www.reddit.com/r/technology/top.json?limit=5"
      );
      const data = await response.json();
      if (!data?.data?.children) throw new Error("Invalid Reddit response.");
      setRedditArticles(data.data.children);
    } catch (err) {
      setError("Failed to fetch Reddit articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchRedditTechNews();
    const interval = setInterval(fetchRedditTechNews, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-teal-500" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="content">
            <div className="text">
              <h1>Discover the Latest Tech News</h1>
              <p>
                Stay ahead with trending news and insights from the world of
                technology, curated for you.
              </p>
              <a href="#news" className="explore-btn">
                Explore Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="news">
        <div className="container">
          <h2>Trending News</h2>
          <div className="articles">
            {redditArticles.map((post) => (
              <div key={post.data.id} className="article">
                <div className="image-container">
                  {post.data.thumbnail && post.data.thumbnail.startsWith("http") ? (
                    <img
                      src={post.data.thumbnail}
                      alt={post.data.title}
                      className="article-img"
                    />
                  ) : (
                    <div className="no-image">
                      <FaNewspaper className="icon" />
                    </div>
                  )}
                </div>
                <div className="content">
                  <h3>
                    <a
                      href={`https://www.reddit.com${post.data.permalink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.data.title}
                    </a>
                  </h3>
                  <p>{post.data.selftext || "No additional content available."}</p>
                  <p className="author">Posted by {post.data.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <h4>Connect with Me</h4>
          <p>
            I'm a Frontend Developer passionate about building meaningful web applications. Let's connect!
          </p>
          <div className="social-links">
            <a
              href="https://github.com/vansh-frontend"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/vansh-dhalor-000a7524a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a href="mailto:vanshdhalor04@gmail.com" aria-label="Email">
              <AiOutlineMail />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default News;
